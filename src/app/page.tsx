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
      <section className="medical-gradient py-28 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <div className="bg-white p-5 rounded-full shadow-2xl">
              <Beaker className="w-16 h-16 text-medical-700" />
            </div>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-8 leading-tight">
            Turn Your Lab Results Into
            <span className="text-medical-700 block">Clear Health Insights</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-4xl mx-auto">
            Stop guessing what your lab results mean. Get instant, AI-powered explanations that are easy to understand, so you can take control of your health.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!user ? (
              <>
                <button 
                  onClick={() => setShowForm(true)}
                  className="btn-primary text-lg"
                >
                  Analyze My Results for Free
                </button>
                <a href="#how-it-works" className="btn-secondary text-lg">
                  Learn More
                </a>
              </>
            ) : (
              <button 
                onClick={() => setShowForm(true)}
                className="btn-primary text-lg"
              >
                Submit New Lab Result
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose ResultRx?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We empower you with the knowledge to understand your health, backed by cutting-edge AI and a commitment to your privacy and security.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-lg">
                <div className="bg-medical-200 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                  <feature.icon className="w-9 h-9 text-medical-700" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">A Simple Path to Clarity</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">From confusing medical jargon to clear, actionable insights in just three simple steps.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="card text-center">
              <div className="bg-medical-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Submit Your Data</h3>
              <p className="text-gray-600 leading-relaxed">Enter the test name, value, and normal range from your lab report. It's secure and only takes a moment.</p>
            </div>
            <div className="card text-center">
              <div className="bg-medical-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Receive AI Analysis</h3>
              <p className="text-gray-600 leading-relaxed">Our AI, powered by Google's Gemini, provides a clear explanation of what your results mean for your health.</p>
            </div>
            <div className="card text-center">
              <div className="bg-medical-600 text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Track Your Progress</h3>
              <p className="text-gray-600 leading-relaxed">Save your results to monitor trends over time and have more informed conversations with your doctor.</p>
            </div>
          </div>
          <div className="text-center mt-16">
            <button onClick={() => setShowForm(true)} className="btn-primary text-lg">Get Your Free Analysis</button>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Trusted by Patients and Professionals
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See why thousands of users rely on ResultRx to make sense of their health data.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-10">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card">
                <div className="flex mb-5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic leading-relaxed">
                  "{testimonial.content}"
                </p>
                <div>
                  <p className="font-semibold text-gray-900 text-lg">{testimonial.name}</p>
                  <p className="text-md text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 medical-gradient">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Take the First Step Towards a Healthier You
          </h2>
          <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            Get your first AI-powered lab result explanation for free. No credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => setShowForm(true)}
              className="btn-primary text-lg"
            >
              Get My Free Explanation
            </button>
            <a href="/pricing" className="btn-secondary text-lg">
              View Pro Plans
            </a>
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
