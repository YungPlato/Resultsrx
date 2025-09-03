'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { Heart, Target, Users, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto py-20 px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">Our Mission</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            To empower every individual with the knowledge and confidence to take control of their health journey.
          </p>
        </div>

        <div className="prose prose-lg text-gray-700 mx-auto">
          <div className="flex justify-center mb-12">
            <Heart className="w-20 h-20 text-medical-600" />
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4">The Story Behind ResultRx</h2>
          <p>
            ResultRx was born from a simple, yet profound, experience: the confusion and anxiety that often comes with receiving a medical lab report. One of our founders watched a loved one struggle to understand a page of numbers and acronyms, waiting days for a doctor's call to translate it into meaningful information. That moment sparked a question: "What if understanding your health data could be as simple as reading a text message?"
          </p>
          <p>
            We realized that in an age of instant information, healthcare was lagging behind. Patients deserve to be active participants in their own care, not passive recipients of data they can't comprehend. We envisioned a world where anyone could instantly understand their lab results, identify trends, and walk into their doctor's office feeling prepared and empowered.
          </p>

          <div className="flex justify-center my-12">
            <Lightbulb className="w-20 h-20 text-yellow-500" />
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4">Our Approach</h2>
          <p>
            We are a team of passionate software engineers, designers, and healthcare advocates dedicated to bridging the gap between medical data and patient understanding. By harnessing the power of cutting-edge AI like Google's Gemini, we translate complex medical jargon into clear, concise, and empathetic explanations.
          </p>
          <p>
            But we're more than just a technology company. We're building a tool for confidence. Every feature, from our secure data handling to our trend analysis charts, is designed with one goal in mind: to give you the clarity you need to make informed decisions about your health.
          </p>

          <div className="flex justify-center my-12">
            <Users className="w-20 h-20 text-blue-500" />
          </div>

          <h2 className="text-3xl font-bold mt-12 mb-4">Join Us on Our Mission</h2>
          <p>
            Your health is your most valuable asset. Understanding it shouldn't be a privilege; it should be a right. We invite you to join the thousands of users who are using ResultRx to transform their relationship with their health data.
          </p>
          <p>
            Together, we can create a future where healthcare is more transparent, accessible, and patient-centered.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
