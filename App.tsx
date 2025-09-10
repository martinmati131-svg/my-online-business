
import React, { useState, useCallback } from 'react';
import BusinessInputForm from './components/BusinessInputForm';
import PlanDisplay from './components/PlanDisplay';
import LoadingSpinner from './components/LoadingSpinner';
import { generatePlan } from './services/geminiService';
import type { BusinessInfo, OnlinePresencePlan } from './types';

function App() {
  const [plan, setPlan] = useState<OnlinePresencePlan | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFormSubmit = useCallback(async (info: BusinessInfo) => {
    setIsLoading(true);
    setError(null);
    setPlan(null);
    try {
      const generatedPlan = await generatePlan(info);
      setPlan(generatedPlan);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetForm = () => {
    setPlan(null);
    setError(null);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white font-sans p-4 sm:p-6 lg:p-8">
      <div 
        className="absolute top-0 left-0 w-full h-full bg-cover bg-center opacity-10"
        style={{backgroundImage: "url('https://picsum.photos/seed/business/1920/1080')"}}
      ></div>
      <div className="relative container mx-auto flex flex-col items-center justify-center min-h-screen py-10">
        <header className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">
                AI Business Planner
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                Transform your business idea into a powerful online presence. Our AI-driven planner crafts a tailored strategy to help you succeed in the digital world.
            </p>
        </header>

        <main className="w-full">
          {!plan && !isLoading && <BusinessInputForm onSubmit={handleFormSubmit} isLoading={isLoading} />}
          
          {isLoading && <LoadingSpinner />}
          
          {error && (
            <div className="text-center max-w-2xl mx-auto p-6 bg-red-900/50 border border-red-700 rounded-lg">
              <h3 className="text-xl font-semibold text-red-300">An Error Occurred</h3>
              <p className="text-red-400 mt-2">{error}</p>
              <button
                onClick={resetForm}
                className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Try Again
              </button>
            </div>
          )}
          
          {plan && (
            <div className="animate-fade-in">
              <PlanDisplay plan={plan} />
              <div className="text-center mt-10">
                <button
                  onClick={resetForm}
                  className="font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-3 px-8 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  Create Another Plan
                </button>
              </div>
            </div>
          )}
        </main>
        
        <footer className="text-center mt-16 text-gray-500 text-sm">
            <p>Powered by Google Gemini. Your imagination, amplified.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
