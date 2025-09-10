
import React, { useState } from 'react';
import type { BusinessInfo } from '../types';

interface BusinessInputFormProps {
  onSubmit: (info: BusinessInfo) => void;
  isLoading: boolean;
}

const BusinessInputForm: React.FC<BusinessInputFormProps> = ({ onSubmit, isLoading }) => {
  const [info, setInfo] = useState<BusinessInfo>({
    name: '',
    industry: '',
    targetAudience: '',
    goals: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(info);
  };
  
  const formFields = [
    { name: 'name', label: 'Business Name', placeholder: 'e.g., Artisan Coffee Roasters', type: 'text' },
    { name: 'industry', label: 'Industry / Niche', placeholder: 'e.g., Specialty Coffee & Cafe', type: 'text' },
    { name: 'targetAudience', label: 'Target Audience', placeholder: 'e.g., Young professionals, students, remote workers', type: 'textarea' },
    { name: 'goals', label: 'Primary Business Goals', placeholder: 'e.g., Increase online sales, build a local community, become a thought leader', type: 'textarea' },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl shadow-2xl border border-gray-700">
      <h2 className="text-3xl font-bold text-center mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
        Describe Your Business
      </h2>
      <p className="text-center text-gray-400 mb-8">
        Provide the details and let AI craft your online strategy.
      </p>
      <form onSubmit={handleSubmit} className="space-y-6">
        {formFields.map(field => (
           <div key={field.name}>
            <label htmlFor={field.name} className="block text-sm font-medium text-gray-300 mb-2">{field.label}</label>
            {field.type === 'textarea' ? (
              <textarea
                id={field.name}
                name={field.name}
                value={info[field.name as keyof BusinessInfo]}
                onChange={handleChange}
                placeholder={field.placeholder}
                rows={3}
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                required
              />
            ) : (
              <input
                type={field.type}
                id={field.name}
                name={field.name}
                value={info[field.name as keyof BusinessInfo]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="w-full bg-gray-900/50 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-300"
                required
              />
            )}
           </div>
        ))}
       
        <button
          type="submit"
          disabled={isLoading}
          className="w-full font-semibold text-lg bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
        >
          {isLoading ? 'Generating...' : 'Create My Plan'}
        </button>
      </form>
    </div>
  );
};

export default BusinessInputForm;
