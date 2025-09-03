'use client';

import React, { useState } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { Beaker, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

interface LabSubmissionFormProps {
  onClose: () => void;
}

interface LabResult {
  testName: string;
  value: string;
  units: string;
  normalRange: string;
}

interface AIExplanation {
  friendlyExplanation: string;
  testOverview: string;
  whatItMeasures: string;
  whatYourResultMeans: string;
  potentialNextSteps: string[];
  suggestedQuestions: string[];
}

export function LabSubmissionForm({ onClose }: LabSubmissionFormProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<LabResult>({
    testName: '',
    value: '',
    units: '',
    normalRange: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [explanation, setExplanation] = useState<AIExplanation | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('Please sign in to submit lab results');
      return;
    }

    if (!formData.testName || !formData.value || !formData.units || !formData.normalRange) {
      setError('Please fill in all fields');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call Firebase Cloud Function
      const response = await fetch('/api/explainLab', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userId: user.uid,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to get explanation');
      }

      const data = await response.json();
      setExplanation(data.explanation);
    } catch (err: any) {
      setError(err.message || 'Failed to get AI explanation');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      testName: '',
      value: '',
      units: '',
      normalRange: '',
    });
    setExplanation(null);
    setError(null);
  };

  if (explanation) {
    return (
      <div className="space-y-6">
        <div className="text-center">
          <CheckCircle className="w-16 h-16 text-success-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Your Lab Result Explained
          </h3>
          <p className="text-gray-600">
            Here's what your {formData.testName} result means:
          </p>
        </div>

        <div className="space-y-6">
          {/* Test Summary */}
          <div className="bg-medical-50 p-4 rounded-lg">
            <h4 className="font-semibold text-medical-800 mb-2">Test Summary</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Test:</span>
                <span className="ml-2 font-medium">{formData.testName}</span>
              </div>
              <div>
                <span className="text-gray-600">Your Value:</span>
                <span className="ml-2 font-medium">{formData.value} {formData.units}</span>
              </div>
              <div>
                <span className="text-gray-600">Normal Range:</span>
                <span className="ml-2 font-medium">{formData.normalRange}</span>
              </div>
            </div>
          </div>

          {/* AI Explanation */}
          <div className="space-y-6">
            <div className="bg-medical-50 p-4 rounded-lg">
              <p className="text-gray-800 text-lg">
                {explanation.friendlyExplanation}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Test Overview</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
                {explanation.testOverview}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">What This Test Measures</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
                {explanation.whatItMeasures}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">What Your Result Means</h4>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg leading-relaxed">
                {explanation.whatYourResultMeans}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Potential Next Steps</h4>
              <ul className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {explanation.potentialNextSteps.map((step, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-success-500 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-gray-900 mb-2 text-lg">Questions to Ask Your Doctor</h4>
              <ul className="space-y-3 bg-gray-50 p-4 rounded-lg">
                {explanation.suggestedQuestions.map((question, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <Beaker className="w-5 h-5 text-medical-600 mt-1 flex-shrink-0" />
                    <span className="text-gray-700">{question}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm text-yellow-800">
                <p className="font-medium">Important Disclaimer</p>
                <p className="mt-1">
                  This AI explanation is for educational purposes only and should not replace 
                  professional medical advice. Always consult with your healthcare provider 
                  about your lab results and any health concerns.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetForm}
              className="btn-secondary flex-1"
            >
              Submit Another Result
            </button>
            <button
              onClick={onClose}
              className="btn-primary flex-1"
            >
              View Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {!user && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-blue-800 text-sm">
            <strong>Note:</strong> You'll need to sign in to submit lab results and get AI explanations.
          </p>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-600" />
            <span className="text-red-800 text-sm">{error}</span>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="testName" className="block text-sm font-medium text-gray-700 mb-2">
            Test Name *
          </label>
          <input
            type="text"
            id="testName"
            name="testName"
            value={formData.testName}
            onChange={handleInputChange}
            placeholder="e.g., ALT, Hemoglobin, Cholesterol"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="value" className="block text-sm font-medium text-gray-700 mb-2">
            Your Value *
          </label>
          <input
            type="text"
            id="value"
            name="value"
            value={formData.value}
            onChange={handleInputChange}
            placeholder="e.g., 72, 14.2, 180"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="units" className="block text-sm font-medium text-gray-700 mb-2">
            Units *
          </label>
          <input
            type="text"
            id="units"
            name="units"
            value={formData.units}
            onChange={handleInputChange}
            placeholder="e.g., U/L, g/dL, mg/dL"
            className="input-field"
            required
          />
        </div>

        <div>
          <label htmlFor="normalRange" className="block text-sm font-medium text-gray-700 mb-2">
            Normal Range *
          </label>
          <input
            type="text"
            id="normalRange"
            name="normalRange"
            value={formData.normalRange}
            onChange={handleInputChange}
            placeholder="e.g., 7-56, 12-16, <200"
            className="input-field"
            required
          />
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <div className="flex items-start space-x-3">
          <Beaker className="w-5 h-5 text-medical-600 mt-0.5" />
          <div className="text-sm text-gray-600">
            <p className="font-medium text-gray-700">Example:</p>
            <p>Test: ALT | Value: 72 | Units: U/L | Normal Range: 7-56</p>
            <p className="mt-1">
              This would indicate elevated liver enzymes, which the AI would explain in detail.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={onClose}
          className="btn-secondary flex-1"
          disabled={isSubmitting}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn-primary flex-1"
          disabled={isSubmitting || !user}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin mr-2" />
              Getting AI Explanation...
            </>
          ) : (
            'Get AI Explanation'
          )}
        </button>
      </div>

      {!user && (
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onClose}
              className="text-medical-600 hover:text-medical-700 font-medium"
            >
              Sign up for free
            </button>
          </p>
        </div>
      )}
    </form>
  );
}
