import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { GoogleGenerativeAI } from '@google/generative-ai';
import Stripe from 'stripe';
import * as cors from 'cors';

admin.initializeApp();

const corsHandler = cors({ origin: true });

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(functions.config().gemini.api_key);

// Initialize Stripe
const stripe = new Stripe(functions.config().stripe.secret_key, {
  apiVersion: '2023-10-16',
});

export const explainLab = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { testName, value, units, normalRange, userId } = req.body;

      if (!testName || !value || !units || !normalRange) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
      }

      // Check user credits
      const userDoc = await admin.firestore().collection('users').doc(userId).get();
      if (!userDoc.exists) {
        res.status(404).json({ error: 'User not found' });
        return;
      }

      const userData = userDoc.data();
      const credits = userData?.credits || 0;

      if (credits <= 0) {
        res.status(403).json({
          error: 'You have no credits left. Please purchase more to get an explanation.',
        });
        return;
      }

      // Generate AI explanation
      const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

      const prompt = `You are an expert clinical assistant AI named 'ResultRx'. Your goal is to explain medical lab results to patients in a way that is clear, reassuring, and empowering, without providing medical advice or a diagnosis.

A patient has provided the following lab result:
- Test: ${testName}
- Their Value: ${value} ${units}
- Normal Range: ${normalRange}

Please provide a detailed explanation formatted as a JSON object. The tone should be calm, empathetic, and professional.

JSON Structure:
{
  "friendlyExplanation": "Start with a gentle, reassuring summary. For example, 'This result gives us a snapshot of...' or 'It's good that you're looking into this.' Acknowledge their result and briefly state its relation to the normal range (e.g., 'is within the normal range', 'is slightly elevated', 'is below the normal range').",
  "testOverview": "Provide a brief overview of the lab test itself. Explain what it's used for, what it helps diagnose or monitor, and what a 'normal' result generally signifies for this test.",
  "whatItMeasures": "Explain what this test measures in simple, easy-to-understand terms. Describe what the substance/marker is and its role in the body. Also, briefly mention why a doctor might order this test.",
  "whatYourResultMeans": "Objectively explain what the patient's specific value means in the context of the normal range. If it's abnormal, explain what this might indicate in general terms (e.g., 'Elevated levels can sometimes suggest...'). Avoid definitive or alarming language. If the result is normal, explain what this suggests (e.g., 'A normal result here is a good sign of...').",
  "potentialNextSteps": ["Provide 2-3 general, non-prescriptive next steps as an array of strings. These should be safe, responsible suggestions. Focus on actions like 'You might consider keeping a diet log to discuss with your doctor,' 'It's a good idea to schedule a follow-up to discuss this result,' or 'Continue to monitor this as part of your regular check-ups.' NEVER suggest specific treatments, medications, or dramatic lifestyle changes."],
  "suggestedQuestions": ["Provide 3-4 thoughtful, open-ended questions the patient could ask their doctor. These questions should empower the patient to have a productive conversation, for example: 'What other factors could be influencing this result?', 'What are the next steps for monitoring this?', 'Are there any lifestyle adjustments I should consider discussing with you?']
}

IMPORTANT RULES:
- **DO NOT PROVIDE MEDICAL ADVICE OR A DIAGNOSIS.** This is a strict rule.
- Use plain, everyday language. Avoid medical jargon.
- Maintain a supportive and reassuring tone throughout.
- Ensure the JSON is perfectly formatted.
- The user is a patient, not a doctor. Address them directly and with empathy.
- At the end of the friendlyExplanation, add the following sentence: 'Remember, this is not a substitute for professional medical advice.'
- Add a new field to the JSON called 'importantNote' and set its value to 'This AI-powered explanation is for informational purposes only and should not be used as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.'`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      let aiResponse;
      
      if (jsonMatch) {
        aiResponse = JSON.parse(jsonMatch[0]);
      } else {
        aiResponse = {
          explanation: "Unable to parse AI response. Please consult with your healthcare provider.",
          whatItMeasures: "This test measures various health indicators.",
          whatItMeans: "Please discuss your results with your doctor.",
          suggestedQuestions: [
            "What do these results mean for my health?",
            "Are there any lifestyle changes I should consider?",
            "When should I have this test again?"
          ]
        };
      }

      // Decrement user's credits
      await admin.firestore().collection('users').doc(userId).update({
        credits: admin.firestore.FieldValue.increment(-1),
      });

      res.json({
        success: true,
        explanation: aiResponse,
      });

    } catch (error) {
      console.error('Error in explainLab:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
});

export const createStripeCheckoutSession = functions.https.onRequest(async (req, res) => {
  return corsHandler(req, res, async () => {
    try {
      const { userId, successUrl, cancelUrl } = req.body;

      const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'ResultRx AI Explanation',
              },
              unit_amount: 999,
            },
            quantity: 1,
          },
        ],
        success_url: successUrl,
        cancel_url: cancelUrl,
        client_reference_id: userId,
        metadata: {
          userId,
        },
      });

      res.json({ sessionId: session.id });
    } catch (error) {
      console.error('Error creating checkout session:', error);
      res.status(500).json({ error: 'Failed to create checkout session' });
    }
  });
});

export const stripeWebhook = functions.https.onRequest(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  const endpointSecret = functions.config().stripe.webhook_secret;

  let event;

  try {
    event = stripe.webhooks.constructEvent(req.rawBody, sig!, endpointSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err);
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        const userId = session.metadata.userId;

        if (userId) {
          await admin.firestore().collection('users').doc(userId).update({
            credits: admin.firestore.FieldValue.increment(1),
          });
        }
        break;
    }

    res.json({ received: true });
  } catch (error) {
    console.error('Error processing webhook:', error);
    res.status(500).json({ error: 'Webhook processing failed' });
  }
});
