'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { LabSubmissionForm } from '@/components/LabSubmissionForm';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Beaker, 
  Brain, 
  TrendingUp, 
  Shield, 
  Zap,
  CheckCircle,
  Star
} from 'lucide-react';

export default function HomePage() {
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);

  const features = [
    {
      icon: Brain,
      title: 'AI-Powered Explanations',
      description: 'Get clear, plain-language explanations of your lab results using Google Gemini AI.'
    },
    {
      icon: TrendingUp,
      title: 'Trend Tracking',
      description: 'Monitor your health metrics over time with beautiful charts and insights.'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health data is encrypted and stored securely with enterprise-grade security.'
    },
    {
      icon: Zap,
      title: 'Instant Results',
      description: 'Get AI explanations in seconds, not days. No more waiting for doctor appointments.'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      role: 'Patient',
      content: 'ResultRx made my lab results crystal clear. I finally understand what those numbers mean!',
      rating: 5
    },
    {
      name: 'Dr. James Chen',
      role: 'Primary Care Physician',
      content: 'This tool helps my patients be more informed and engaged in their healthcare decisions.',
      rating: 5
    },
    {
      name: 'Maria L.',
      role: 'Health Enthusiast',
      content: 'The trend tracking feature is amazing. I can see how my lifestyle changes affect my health.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="medical-gradient py-24 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-6">
            <div className="bg-white p-4 rounded-full shadow-lg">
              <Beaker className="w-12 h-12 text-medical-600" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Turn Confusing Numbers Into
            <span className="text-medical-600 block">Clear Health Insights</span>
          </h1>
          
          <p className="text-xl text-gray-700 mb-10 max-w-3xl mx-auto">
            Paste your lab results and get plain‑English explanations in seconds. See trends, know what matters, and walk into appointments prepared.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn-primary text-lg px-10 py-4"
                >
                  Get Your Free Explanation
                </button>
                <a href="#how-it-works" className="btn-secondary text-lg px-10 py-4">
                  How It Works
                </a>
                <a href="/pricing" className="btn-secondary text-lg px-10 py-4">
                  See Pricing
                </a>
              </>
            ) : (
              <button 
                onClick={() => setShowForm(true)}
                className="btn-primary text-lg px-10 py-4"
              >
                Submit New Lab Result
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose ResultRx?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We combine cutting-edge AI technology with medical expertise to make your 
              lab results understandable and actionable.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="bg-medical-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="w-8 h-8 text-medical-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">How it works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From PDF to plain English in under a minute.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card text-left">
              <div className="bg-medical-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <span className="text-medical-700 text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Paste your results</h3>
              <p className="text-gray-600">Enter the test name, value, units, and normal range from your lab report. No uploads required.</p>
            </div>
            <div className="card text-left">
              <div className="bg-medical-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <span className="text-medical-700 text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Get AI explanations</h3>
              <p className="text-gray-600">We use Google Gemini to translate medical jargon into plain language and suggest smart questions for your doctor.</p>
            </div>
            <div className="card text-left">
              <div className="bg-medical-100 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                <span className="text-medical-700 text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Track trends over time</h3>
              <p className="text-gray-600">Save results to your dashboard to spot patterns and share insights with your care team.</p>
            </div>
          </div>
          <div className="text-center mt-12">
            <button onClick={() => setShowForm(true)} className="btn-primary text-lg px-10 py-4">Try it now</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of patients and healthcare providers who trust ResultRx.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 medical-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Ready to Understand Your Health?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Start with one free lab result analysis per month. Upgrade to Pro for unlimited access.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary text-lg px-8 py-3"
            >
              Try It Free
            </button>
            <button className="btn-secondary text-lg px-8 py-3">
              View Pricing
            </button>
          </div>
        </div>
      </section>

      {/* Lab Submission Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  Submit Lab Result
                </h3>
                <button 
                  onClick={() => setShowForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
              <LabSubmissionForm onClose={() => setShowForm(false)} />
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
