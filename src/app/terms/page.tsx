import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
        <p className="text-gray-700 mb-6">Last updated: {new Date().toLocaleDateString()}</p>

        <div className="prose max-w-none">
          <h2>Use of Service</h2>
          <p>ResultRx is an educational tool and does not provide medical advice. Use the information to support, not replace, discussions with your healthcare provider.</p>

          <h2>Accounts</h2>
          <p>You are responsible for maintaining the confidentiality of your account and for all activities that occur under your account.</p>

          <h2>Subscriptions and Billing</h2>
          <p>Paid plans are billed via Stripe. You may cancel anytime; access continues until the end of the billing period.</p>

          <h2>Acceptable Use</h2>
          <p>Do not misuse the service, attempt to access data you do not own, or disrupt operations.</p>

          <h2>Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, ResultRx is not liable for any indirect or consequential damages arising from use of the service.</p>

          <h2>Changes</h2>
          <p>We may update these terms from time to time. Continued use constitutes acceptance of the updated terms.</p>
        </div>
      </main>

      <Footer />
    </div>
  )
}


