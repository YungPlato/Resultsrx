'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto py-16 px-4">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        <div className="prose prose-lg text-gray-700">
          <p>
            <em>Last updated: {new Date().toLocaleDateString()}</em>
          </p>
          <p>
            Your privacy is important to us. It is ResultRx's policy to respect your privacy regarding any information we may collect from you across our website, and other sites we own and operate.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">1. Information We Collect</h2>
          <p>
            We only ask for personal information when we truly need it to provide a service to you. We collect it by fair and lawful means, with your knowledge and consent. We also let you know why we’re collecting it and how it will be used.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">2. Data We Do Not Collect</h2>
          <p>
            We do not collect or store any personal health information (PHI), including but not limited to lab results, medical history, or any other data you submit for analysis. The information you provide is used only to generate the AI explanation and is not saved on our servers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">3. How We Use Your Information</h2>
          <p>
            We use the information we collect in various ways, including to:
          </p>
          <ul>
            <li>Provide, operate, and maintain our website</li>
            <li>Improve, personalize, and expand our website</li>
            <li>Understand and analyze how you use our website</li>
            <li>Develop new products, services, features, and functionality</li>
            <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes</li>
            <li>Send you emails</li>
            <li>Find and prevent fraud</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Security of Your Information</h2>
          <p>
            We value your trust in providing us your Personal Information, thus we are striving to use commercially acceptable means of protecting it. But remember that no method of transmission over the internet, or method of electronic storage is 100% secure and reliable, and we cannot guarantee its absolute security.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">4. Links to Other Sites</h2>
          <p>
            Our Service may contain links to other sites. If you click on a third-party link, you will be directed to that site. Note that these external sites are not operated by us. Therefore, we strongly advise you to review the Privacy Policy of these websites. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">5. Changes to This Privacy Policy</h2>
          <p>
            We may update our Privacy Policy from time to time. Thus, we advise you to review this page periodically for any changes. We will notify you of any changes by posting the new Privacy Policy on this page. These changes are effective immediately after they are posted on this page.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions or suggestions about our Privacy Policy, do not hesitate to contact us.
          </p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
