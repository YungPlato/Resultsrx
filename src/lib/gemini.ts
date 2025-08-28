import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export interface LabResult {
  testName: string;
  value: string;
  units: string;
  normalRange: string;
}

export interface GeminiResponse {
  explanation: string;
  whatItMeasures: string;
  whatItMeans: string;
  suggestedQuestions: string[];
}

export async function explainLabResult(labResult: LabResult): Promise<GeminiResponse> {
  const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

  const prompt = `You are a clinical assistant. Explain the following lab result in plain language:

Test: ${labResult.testName}
Value: ${labResult.value} ${labResult.units}
Normal Range: ${labResult.normalRange}

Format your response as JSON with the following structure:
{
  "explanation": "A clear, concise explanation of what this result means",
  "whatItMeasures": "What this test measures in simple terms",
  "whatItMeans": "What this specific result might indicate",
  "suggestedQuestions": ["Question 1", "Question 2", "Question 3"]
}

Important guidelines:
- Use simple, non-medical jargon language
- Be informative but not alarming
- Avoid giving specific medical advice
- Suggest 3-4 thoughtful questions a patient could ask their doctor
- Keep explanations under 100 words each
- Focus on education, not diagnosis`;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Extract JSON from the response
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
    
    // Fallback if JSON parsing fails
    return {
      explanation: "Unable to parse AI response. Please consult with your healthcare provider.",
      whatItMeasures: "This test measures various health indicators.",
      whatItMeans: "Please discuss your results with your doctor.",
      suggestedQuestions: [
        "What do these results mean for my health?",
        "Are there any lifestyle changes I should consider?",
        "When should I have this test again?"
      ]
    };
  } catch (error) {
    console.error('Gemini API error:', error);
    throw new Error('Failed to get AI explanation');
  }
}
