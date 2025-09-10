
import React from 'react';
import type { OnlinePresencePlan, SocialMediaPlatformPlan } from '../types';
import { WebsiteIcon } from './icons/WebsiteIcon';
import { SocialMediaIcon } from './icons/SocialMediaIcon';
import { ContentIcon } from './icons/ContentIcon';
import { SeoIcon } from './icons/SeoIcon';

interface PlanDisplayProps {
  plan: OnlinePresencePlan;
}

const PlanSection: React.FC<{ title: string; icon: React.ReactNode; children: React.ReactNode }> = ({ title, icon, children }) => (
  <div className="bg-gray-800/60 backdrop-blur-md p-6 rounded-xl border border-gray-700 shadow-lg hover:border-purple-500/50 transition-all duration-300">
    <div className="flex items-center mb-4">
      <div className="bg-gray-700 p-2 rounded-full mr-4">{icon}</div>
      <h3 className="text-xl font-bold text-purple-300">{title}</h3>
    </div>
    <div className="space-y-3 text-gray-300">{children}</div>
  </div>
);

const PlanDisplay: React.FC<PlanDisplayProps> = ({ plan }) => {
  return (
    <div className="w-full max-w-5xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center p-6 bg-gray-800/80 rounded-xl border border-gray-700">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 mb-2">
          Your Strategic Online Presence Plan
        </h2>
        <div>
            <h4 className="text-lg font-semibold text-gray-200 mt-4">Branding & Voice</h4>
            <p className="text-gray-400">{plan.brandingVoice}</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Website Strategy */}
        <PlanSection title="Website Strategy" icon={<WebsiteIcon className="w-6 h-6 text-purple-400" />}>
          <p><strong className="font-semibold text-gray-100">Platform:</strong> {plan.websiteStrategy.platformSuggestion}</p>
          <p><strong className="font-semibold text-gray-100">Design Concept:</strong> {plan.websiteStrategy.designConcept}</p>
          <div>
            <strong className="font-semibold text-gray-100 block mb-2">Key Features:</strong>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {plan.websiteStrategy.keyFeatures.map((feature, index) => <li key={index}>{feature}</li>)}
            </ul>
          </div>
        </PlanSection>
        
        {/* SEO Keywords */}
        <PlanSection title="SEO Keywords" icon={<SeoIcon className="w-6 h-6 text-purple-400" />}>
            <p className="text-sm text-gray-400 mb-2">A mix of keywords to target in your content and on your site.</p>
            <div className="flex flex-wrap gap-2">
                {plan.seoKeywords.map((keyword, index) => (
                    <span key={index} className="bg-gray-700 text-purple-300 text-xs font-medium px-3 py-1 rounded-full">{keyword}</span>
                ))}
            </div>
        </PlanSection>
      </div>

       {/* Content Marketing */}
      <PlanSection title="Content Marketing" icon={<ContentIcon className="w-6 h-6 text-purple-400" />}>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-gray-100 mb-2">Blog Ideas</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {plan.contentMarketing.blogIdeas.map((idea, index) => <li key={index}>{idea}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-100 mb-2">Video Ideas</h4>
            <ul className="list-disc list-inside space-y-1 pl-2">
              {plan.contentMarketing.videoIdeas.map((idea, index) => <li key={index}>{idea}</li>)}
            </ul>
          </div>
        </div>
      </PlanSection>
      
      {/* Social Media Plan */}
      <PlanSection title="Social Media Plan" icon={<SocialMediaIcon className="w-6 h-6 text-purple-400" />}>
        <div className="grid md:grid-cols-3 gap-4">
          {plan.socialMediaPlan.map((smp: SocialMediaPlatformPlan, index: number) => (
            <div key={index} className="bg-gray-900/50 p-4 rounded-lg border border-gray-600">
              <h4 className="font-bold text-lg text-pink-400">{smp.platform}</h4>
              <p className="text-sm mt-1 mb-3 text-gray-400">{smp.strategy}</p>
              <ul className="list-disc list-inside space-y-1 text-sm pl-2">
                {smp.contentIdeas.map((idea, i) => <li key={i}>{idea}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </PlanSection>

    </div>
  );
};

export default PlanDisplay;
