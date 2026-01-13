import React, { useState } from 'react';
import { Header } from './components/Layout';
import { FormWizard } from './components/FormWizard';
import { ResultsDashboard } from './components/ResultsDashboard';
import { generateQuotes } from './services/geminiService';
import { UserData, QuoteResult } from './types';
import { Shield, Lock } from 'lucide-react';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [quoteResult, setQuoteResult] = useState<QuoteResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFormComplete = async (data: UserData) => {
    setLoading(true);
    setError(null);
    try {
      const result = await generateQuotes(data);
      setQuoteResult(result);
    } catch (err) {
      console.error(err);
      setError("We encountered an issue generating your smart quote. Please check your API key or try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setQuoteResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      
      <main className="pb-20">
        {!quoteResult ? (
          <>
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-slate-900 py-20 lg:py-28 mb-12">
               {/* Abstract Background pattern */}
               <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
                  <div className="absolute -top-[50%] -left-[20%] w-[80%] h-[200%] bg-gradient-to-tr from-brand-500 to-transparent rounded-full blur-[120px]"></div>
                  <div className="absolute top-[20%] right-[0%] w-[50%] h-[100%] bg-gradient-to-bl from-purple-500 to-transparent rounded-full blur-[100px]"></div>
               </div>
               
               <div className="relative max-w-7xl mx-auto px-4 text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white/80 border border-white/20 text-sm font-medium mb-6 backdrop-blur-sm">
                     <Shield className="w-4 h-4 text-brand-400" />
                     <span>Powered by Gemini 3 Flash</span>
                  </div>
                  <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6">
                    Insurance quoted in seconds, <br/>
                    <span className="text-brand-400">analyzed by AI.</span>
                  </h1>
                  <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
                    Skip the phone calls. Get personalized Auto, Home, and Life insurance packages with real-time risk assessment driven by next-gen artificial intelligence.
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-slate-400">
                    <div className="flex items-center gap-2">
                        <Lock className="w-4 h-4" /> Bank-grade Security
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> 98% Quote Accuracy
                    </div>
                  </div>
               </div>
            </div>

            {/* Wizard Section */}
            <div className="-mt-20 relative z-10 mb-20">
               {error && (
                 <div className="max-w-4xl mx-auto mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center">
                   {error}
                 </div>
               )}
               <FormWizard onComplete={handleFormComplete} isLoading={loading} />
            </div>

            {/* Features Grid */}
            <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-8 mb-20">
               {[
                 { title: "Real-time Analysis", desc: "Our AI breaks down your risk factors instantly to find you the best rates." },
                 { title: "Transparent Pricing", desc: "No hidden fees. See exactly what you're paying for with visual breakdowns." },
                 { title: "Smart Bundling", desc: "The system automatically suggests bundles to save you up to 20%." }
               ].map((f, i) => (
                 <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                    <h3 className="font-bold text-slate-900 text-lg mb-2">{f.title}</h3>
                    <p className="text-slate-500 leading-relaxed">{f.desc}</p>
                 </div>
               ))}
            </div>
          </>
        ) : (
          <ResultsDashboard result={quoteResult} onReset={handleReset} />
        )}
      </main>
      
      <footer className="bg-white border-t border-slate-200 py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center text-slate-400 text-sm">
            <p>&copy; {new Date().getFullYear()} InsureAI. All rights reserved.</p>
            <p className="mt-2">This is a demo application using Google Gemini API. Quotes are simulated.</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
