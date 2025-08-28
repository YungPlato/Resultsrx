'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/components/providers/AuthProvider';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { LabSubmissionForm } from '@/components/LabSubmissionForm';
import { LabResultsChart } from '@/components/LabResultsChart';
import { 
  Beaker, 
  Plus, 
  TrendingUp, 
  Clock, 
  AlertCircle,
  CheckCircle,
  BarChart3,
  Calendar,
  Activity
} from 'lucide-react';

interface LabReport {
  id: string;
  testName: string;
  value: string;
  units: string;
  normalRange: string;
  aiExplanation: {
    explanation: string;
    whatItMeasures: string;
    whatItMeans: string;
    suggestedQuestions: string[];
  };
  createdAt: any;
}

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [showForm, setShowForm] = useState(false);
  const [labReports, setLabReports] = useState<LabReport[]>([]);
  const [isLoadingReports, setIsLoadingReports] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchLabReports();
    }
  }, [user]);

  const fetchLabReports = async () => {
    try {
      // This would call your Firebase Cloud Function or API
      // For now, we'll use mock data
      const mockReports: LabReport[] = [
        {
          id: '1',
          testName: 'ALT',
          value: '72',
          units: 'U/L',
          normalRange: '7-56',
          aiExplanation: {
            explanation: 'Your ALT level is elevated, which may indicate liver stress or damage.',
            whatItMeasures: 'ALT measures liver enzyme levels and helps assess liver function.',
            whatItMeans: 'Elevated ALT suggests the liver may be working harder than normal.',
            suggestedQuestions: [
              'What could be causing my elevated ALT levels?',
              'Are there lifestyle changes I should consider?',
              'When should I have this test repeated?'
            ]
          },
          createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
        },
        {
          id: '2',
          testName: 'Hemoglobin',
          value: '14.2',
          units: 'g/dL',
          normalRange: '12-16',
          aiExplanation: {
            explanation: 'Your hemoglobin level is within the normal range, indicating good oxygen-carrying capacity.',
            whatItMeasures: 'Hemoglobin carries oxygen from the lungs to the body tissues.',
            whatItMeans: 'Normal levels suggest adequate red blood cell production and iron stores.',
            suggestedQuestions: [
              'How can I maintain healthy hemoglobin levels?',
              'What foods support good iron absorption?',
              'Should I be concerned about any symptoms?'
            ]
          },
          createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000) // 14 days ago
        }
      ];
      
      setLabReports(mockReports);
    } catch (error) {
      console.error('Error fetching lab reports:', error);
    } finally {
      setIsLoadingReports(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-medical-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const recentReports = labReports.slice(0, 3);
  const totalReports = labReports.length;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.email?.split('@')[0]}!
          </h1>
          <p className="text-gray-600 mt-2">
            Here's an overview of your lab results and health insights.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="card">
            <div className="flex items-center">
              <div className="bg-medical-100 p-3 rounded-lg">
                <Beaker className="w-6 h-6 text-medical-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Reports</p>
                <p className="text-2xl font-bold text-gray-900">{totalReports}</p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-success-100 p-3 rounded-lg">
                <CheckCircle className="w-6 h-6 text-success-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Normal Results</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labReports.filter(r => r.value === 'Normal').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-warning-100 p-3 rounded-lg">
                <AlertCircle className="w-6 h-6 text-warning-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Abnormal Results</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labReports.filter(r => r.value !== 'Normal').length}
                </p>
              </div>
            </div>
          </div>

          <div className="card">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {labReports.filter(r => {
                    const reportDate = new Date(r.createdAt);
                    const currentMonth = new Date().getMonth();
                    return reportDate.getMonth() === currentMonth;
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="btn-primary flex items-center justify-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Submit New Lab Result</span>
            </button>
            <button className="btn-secondary flex items-center justify-center space-x-2">
              <BarChart3 className="w-5 h-5" />
              <span>View All Reports</span>
            </button>
          </div>
        </div>

        {/* Recent Reports */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Recent Reports</h2>
              <button className="text-medical-600 hover:text-medical-700 text-sm font-medium">
                View All
              </button>
            </div>
            
            {isLoadingReports ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-medical-600 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading reports...</p>
              </div>
            ) : recentReports.length > 0 ? (
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{report.testName}</h3>
                      <span className="text-sm text-gray-500">
                        {new Date(report.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600">Value:</span>
                        <span className="ml-1 font-medium">{report.value} {report.units}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Range:</span>
                        <span className="ml-1 font-medium">{report.normalRange}</span>
                      </div>
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`ml-1 font-medium ${
                          report.value === 'Normal' ? 'text-success-600' : 'text-warning-600'
                        }`}>
                          {report.value === 'Normal' ? 'Normal' : 'Abnormal'}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-700 text-sm line-clamp-2">
                      {report.aiExplanation.explanation}
                    </p>
                    <button className="text-medical-600 hover:text-medical-700 text-sm font-medium mt-2">
                      View Details →
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Beaker className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No lab reports yet</h3>
                <p className="text-gray-600 mb-4">
                  Submit your first lab result to get started with AI-powered explanations.
                </p>
                <button
                  onClick={() => setShowForm(true)}
                  className="btn-primary"
                >
                  Submit First Result
                </button>
              </div>
            )}
          </div>

          {/* Trends Chart */}
          <div className="card">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Health Trends</h2>
              <TrendingUp className="w-5 h-5 text-medical-600" />
            </div>
            
            {labReports.length > 1 ? (
              <LabResultsChart reports={labReports} />
            ) : (
              <div className="text-center py-8">
                <Activity className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">Not enough data yet</h3>
                <p className="text-gray-600">
                  Submit more lab results to see trends and patterns over time.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Health Insights */}
        <div className="card mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">Health Insights</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-medical-50 rounded-lg p-4">
              <h3 className="font-medium text-medical-900 mb-2">Recent Activity</h3>
              <p className="text-medical-800 text-sm">
                You've been actively monitoring your health with {totalReports} lab reports this year.
                Keep up the great work!
              </p>
            </div>
            <div className="bg-success-50 rounded-lg p-4">
              <h3 className="font-medium text-success-900 mb-2">Recommendations</h3>
              <p className="text-success-800 text-sm">
                Consider scheduling your next checkup to maintain optimal health monitoring.
              </p>
            </div>
          </div>
        </div>
      </div>

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
