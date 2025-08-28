'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useStripe } from '@/components/providers/StripeProvider';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { 
  Beaker, 
  Check, 
  Star,
  Zap,
  Shield,
  TrendingUp,
  Brain,
  Loader2
} from 'lucide-react';

export default function PricingPage() {
  const { user } = useAuth();
  const { stripe, loading: stripeLoading } = useStripe();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'free' | 'pro'>('free');

  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for trying out ResultRx',
      features: [
        '1 lab result analysis per month',
        'AI-powered explanations',
        'Basic health insights',
        'Email support'
      ],
      popular: false,
      planId: 'free'
    },
    {
      name: 'Pro',
      price: '$19',
      period: 'per month',
      description: 'Best for active health monitoring',
      features: [
        'Unlimited lab result analyses',
        'Advanced AI explanations',
        'Trend tracking & charts',
        'Priority support',
        'Export reports',
        'Family account sharing',
        'Custom health goals',
        'Advanced analytics'
      ],
      popular: true,
      planId: 'pro'
    }
  ];

  const handleUpgrade = async () => {
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
          priceId: 'price_pro', // This would be your Stripe price ID
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
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Choose the plan that fits your health monitoring needs. 
            Start free and upgrade anytime.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative card ${
                plan.popular 
                  ? 'ring-2 ring-medical-500 shadow-lg' 
                  : 'hover:shadow-lg transition-shadow'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-medical-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                    <Star className="w-4 h-4" />
                    <span>Most Popular</span>
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                  {plan.period !== 'forever' && (
                    <span className="text-gray-600 ml-1">/{plan.period}</span>
                  )}
                </div>
                <p className="text-gray-600">{plan.description}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-success-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              {plan.planId === 'free' ? (
                <button className="w-full btn-secondary">
                  Current Plan
                </button>
              ) : (
                <button
                  onClick={handleUpgrade}
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
                      <span>Upgrade to Pro</span>
                    </>
                  )}
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Features Comparison */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Feature Comparison
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 font-semibold text-gray-900">Feature</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Free</th>
                  <th className="text-center py-4 px-6 font-semibold text-gray-900">Pro</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Lab Result Analyses</td>
                  <td className="py-4 px-6 text-center text-gray-600">1 per month</td>
                  <td className="py-4 px-6 text-center text-gray-900 font-semibold">Unlimited</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">AI Explanations</td>
                  <td className="py-4 px-6 text-center text-gray-600">Basic</td>
                  <td className="py-4 px-6 text-center text-gray-900 font-semibold">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Trend Tracking</td>
                  <td className="py-4 px-6 text-center text-gray-600">Limited</td>
                  <td className="py-4 px-6 text-center text-gray-900 font-semibold">Full Access</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Charts & Analytics</td>
                  <td className="py-4 px-6 text-center text-gray-600">Basic</td>
                  <td className="py-4 px-6 text-center text-gray-900 font-semibold">Advanced</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Export Reports</td>
                  <td className="py-4 px-6 text-center text-gray-600">✗</td>
                  <td className="py-4 px-6 text-center text-gray-900 font-semibold">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Family Sharing</td>
                  <td className="py-4 px-6 text-center text-gray-600">✗</td>
                  <td className="py-4 px-6 text-center text-gray-900 font-semibold">✓</td>
                </tr>
                <tr>
                  <td className="py-4 px-6 font-medium text-gray-900">Priority Support</td>
                  <td className="py-4 px-6 text-center text-gray-600">✗</td>
                  <td className="py-4 px-6 text-center text-gray-900 font-semibold">✓</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="card mb-16">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I cancel my Pro subscription anytime?
              </h3>
              <p className="text-gray-600">
                Yes, you can cancel your Pro subscription at any time. You'll continue to have access 
                until the end of your current billing period.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What happens if I exceed my free tier limit?
              </h3>
              <p className="text-gray-600">
                You'll receive a notification when you reach your monthly limit. You can either wait 
                until next month or upgrade to Pro for unlimited access.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Is my health data secure?
              </h3>
              <p className="text-gray-600">
                Absolutely. We use enterprise-grade encryption and follow HIPAA guidelines to ensure 
                your health data remains private and secure.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Can I upgrade from Free to Pro later?
              </h3>
              <p className="text-gray-600">
                Yes, you can upgrade to Pro at any time. Your existing data and lab results will 
                be preserved and you'll immediately gain access to all Pro features.
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <div className="bg-medical-50 rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Ready to Take Control of Your Health?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already using ResultRx to understand their lab results 
              and track their health trends.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleUpgrade}
                disabled={isLoading || stripeLoading}
                className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5" />
                    <span>Start Pro Trial</span>
                  </>
                )}
              </button>
              <button className="btn-secondary text-lg px-8 py-3">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
