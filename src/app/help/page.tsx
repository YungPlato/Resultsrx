import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Help Center</h1>
        <p className="text-gray-700 mb-8">
          Find quick answers to common questions and learn how to get the most out of ResultRx.
        </p>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Getting Started</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700">
            <li>Create an account or sign in to access your dashboard.</li>
            <li>Paste your lab test name, value, units, and normal range into the form.</li>
            <li>Review the AI explanation and suggested questions for your provider.</li>
            <li>Save results to track trends over time in your dashboard.</li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-900">Do you store my health data?</h3>
              <p className="text-gray-700">Yes, if you choose to save results we store them securely so you can track trends. You can delete your data at any time.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Is this medical advice?</h3>
              <p className="text-gray-700">No. ResultRx provides educational explanations. Always consult your healthcare provider for medical advice.</p>
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Which AI model do you use?</h3>
              <p className="text-gray-700">We use Google Gemini to generate plain‑language explanations tailored to your inputs.</p>
            </div>
          </div>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Need more help?</h2>
          <p className="text-gray-700">Contact us at <a className="text-medical-600 underline" href="mailto:support@resultrx.com">support@resultrx.com</a>.</p>
        </section>
      </main>

      <Footer />
    </div>
  )
}


