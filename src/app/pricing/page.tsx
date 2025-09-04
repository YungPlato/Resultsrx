'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useStripe } from '@/components/providers/StripeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import {
  Beaker,
  Check,
  Zap,
  Loader2
} from 'lucide-react';

export default function PricingPage() {
  const { user } = useAuth();
  const { stripe, loading: stripeLoading } = useStripe();
  const [isLoading, setIsLoading] = useState(false);

  const handlePurchase = async () => {
    if (!user) {
      // Redirect to login
      window.location.href = '/login';
      return;
    }

    if (!stripe) {
      console.error('Stripe not loaded');
      return;
    }

    setIsLoading(true);

    try {
      // Create checkout session
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.uid,
          successUrl: `${window.location.origin}/dashboard?success=true`,
          cancelUrl: `${window.location.origin}/pricing?canceled=true`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const { sessionId } = await response.json();

      // Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });
      
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      alert('Failed to start checkout. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="bg-medical-600 p-3 rounded-full">
              <Beaker className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Get Your AI-Powered Lab Result Explanation
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            For a one-time payment, get a detailed, AI-powered explanation of your lab results.
          </p>
        </div>

        {/* Pricing Card */}
        <div className="max-w-md mx-auto mb-16">
          <div className="card ring-2 ring-medical-500 shadow-lg">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">One-Time Purchase</h3>
              <div className="mb-4">
                <span className="text-4xl font-bold text-gray-900">$9.99</span>
                <span className="text-gray-600 ml-1">per explanation</span>
              </div>
              <p className="text-gray-600">Get a single, detailed AI explanation for one lab result.</p>
            </div>

            <ul className="space-y-4 mb-8">
              {[
                'AI-powered explanations',
                'Advanced health insights',
                'Printable report',
                'Email support'
              ].map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <button
              onClick={handlePurchase}
              disabled={isLoading || stripeLoading}
              className="w-full btn-primary flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  <span>Purchase Now</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* FAQ */}
        <div className="card mb-16 max-w-md mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What do I get with my purchase?
              </h3>
              <p className="text-gray-600">
                You get one credit to submit a single lab result and receive a detailed, AI-powered explanation.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is this a subscription?
              </h3>
              <p className="text-gray-600">
                No, this is a one-time payment. There are no recurring charges.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my health data secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We do not store your lab results or any other personal health information. Your data is processed securely and is not saved on our servers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
