'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        <div className="prose prose-lg text-gray-700">
          <p>
            <em>Last updated: {new Date().toLocaleDateString()}</em>
          </p>
          <p>
            Please read these Terms of Service ("Terms", "Terms of Service") carefully before using the ResultRx website (the "Service") operated by ResultRx ("us", "we", or "our").
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Acceptance of Terms</h2>
          <p>
            By accessing or using the Service you agree to be bound by these Terms. If you disagree with any part of the terms then you may not access the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Use of Service</h2>
          <p>
            You agree not to use the Service for any purpose that is illegal or prohibited by these Terms. You are responsible for all of your activity in connection with the Service.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. Disclaimer of Warranties and Limitation of Liability</h2>
          <p>
            The Service is provided for educational and informational purposes only. It is not intended as a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition. Never disregard professional medical advice or delay in seeking it because of something you have read on the Service.
          </p>
          <p>
            The Service is provided "as is" and "as available" without any warranties of any kind, express or implied. We do not warrant that the Service will be uninterrupted, timely, secure, or error-free.
          </p>
          <p>
            In no event shall ResultRx, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other legal theory, whether or not we have been informed of the possibility of such damage, and even if a remedy set forth herein is found to have failed of its essential purpose.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Intellectual Property</h2>
          <p>
            The Service and its original content, features and functionality are and will remain the exclusive property of ResultRx and its licensors.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Termination</h2>
          <p>
            We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">6. Changes to Terms</h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace these Terms at any time. We will try to provide at least 30 days' notice prior to any new terms taking effect.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about these Terms, please contact us.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
