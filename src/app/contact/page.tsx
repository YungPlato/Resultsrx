import React from 'react'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Contact Us</h1>
        <p className="text-gray-700 mb-8">We're here to help. Reach out with questions, feedback, or support needs.</p>

        <div className="card space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Email</h2>
            <p className="text-gray-700"><a className="text-medical-600 underline" href="mailto:support@resultrx.com">support@resultrx.com</a></p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Response Time</h2>
            <p className="text-gray-700">We typically respond within 1–2 business days.</p>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Feature Requests</h2>
            <p className="text-gray-700">Have an idea? We’d love to hear it. Email us with the subject “Feature Request”.</p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}


