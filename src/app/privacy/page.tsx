import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
        <p className="text-gray-700 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose max-w-none">
          <h2>What We Collect</h2>
          <p>We collect account information (such as email) and any lab result data you enter. You can delete your data at any time.</p>

          <h2>How We Use Data</h2>
          <p>Your data is used to generate AI explanations, display trends, and improve the service. We do not sell your data.</p>

          <h2>Storage and Security</h2>
          <p>We use secure cloud infrastructure and industry best practices to protect your information.</p>

          <h2>Third‑Party Services</h2>
          <p>We use Google Gemini for AI explanations and Stripe for payments. Their handling of data is governed by their policies.</p>

          <h2>Your Choices</h2>
          <p>You may export or delete your data and close your account at any time.</p>

          <h2>Contact</h2>
          <p>Questions? Email <a className="text-medical-600 underline" href="mailto:privacy@resultrx.com">privacy@resultrx.com</a>.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}


