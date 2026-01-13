import React from 'react';
import { Check, ShieldAlert, Zap, TrendingUp, Info } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

export const ResultsDashboard = ({ result, onReset }) => {
  const { packages, analysis } = result;

  // Data for chart
  const chartData = packages.map(pkg => ({
    name: pkg.name.split(' ')[0], // Short name
    premium: pkg.monthlyPremium,
    score: pkg.recommendationScore
  }));

  const getRiskColor = (level) => {
    switch (level) {
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      case 'Moderate': return 'text-amber-600 bg-amber-50 border-amber-200';
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-slate-600';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Personalized Insurance Packages</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Our Gemini-powered underwriter has analyzed your profile and generated these custom quotes. 
          The risk assessment is simulated based on the provided parameters.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
        {packages.map((pkg, idx) => (
          <div 
            key={idx} 
            className={`relative rounded-3xl p-8 border-2 transition-all hover:-translate-y-1 duration-300 flex flex-col ${
              idx === 1 
                ? 'border-brand-500 bg-white shadow-2xl shadow-brand-900/10 z-10 scale-105' 
                : 'border-slate-100 bg-white shadow-xl shadow-slate-200/50 hover:border-brand-200'
            }`}
          >
            {idx === 1 && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-brand-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                Best Value
              </div>
            )}
            
            <div className="mb-6">
              <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
              <div className="flex items-baseline gap-1 mt-2">
                <span className="text-4xl font-extrabold text-slate-900">${pkg.monthlyPremium}</span>
                <span className="text-slate-500 font-medium">/mo</span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                 <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-500 rounded-full" style={{ width: `${pkg.recommendationScore}%` }}></div>
                 </div>
                 <span className="text-xs font-bold text-brand-600">{pkg.recommendationScore}% Match</span>
              </div>
            </div>

            <div className="space-y-4 mb-8 flex-grow">
               <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-sm">Coverage Limit</span>
                  <span className="font-semibold text-slate-800 text-sm">{pkg.coverageLimit}</span>
               </div>
               <div className="flex justify-between py-2 border-b border-slate-50">
                  <span className="text-slate-500 text-sm">Deductible</span>
                  <span className="font-semibold text-slate-800 text-sm">{pkg.deductible}</span>
               </div>
               <div className="space-y-2 pt-2">
                  {pkg.features.map((feature, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center mt-0.5">
                        <Check className="w-3 h-3" />
                      </div>
                      <span className="text-sm text-slate-600">{feature}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl mb-6">
                <div className="flex items-start gap-2">
                    <Zap className="w-4 h-4 text-amber-500 mt-1 flex-shrink-0" />
                    <p className="text-xs text-slate-600 leading-relaxed italic">"{pkg.aiAnalysis}"</p>
                </div>
            </div>

            <button className={`w-full py-3 rounded-xl font-bold transition-colors ${
                idx === 1 ? 'bg-brand-600 text-white hover:bg-brand-700' : 'bg-slate-100 text-slate-900 hover:bg-slate-200'
            }`}>
                Select Plan
            </button>
          </div>
        ))}
      </div>

      {/* Analysis Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {/* Risk Assessment */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg">
            <div className="flex items-center gap-3 mb-6">
                <ShieldAlert className="w-6 h-6 text-slate-700" />
                <h3 className="text-xl font-bold text-slate-900">AI Risk Assessment</h3>
            </div>
            
            <div className="flex items-center gap-6 mb-8">
                <div className={`px-4 py-2 rounded-lg border text-sm font-bold uppercase tracking-wide ${getRiskColor(analysis.riskLevel)}`}>
                    {analysis.riskLevel} Risk
                </div>
                <div className="text-slate-500 text-sm">
                    Safety Score: <span className="font-bold text-slate-900">{analysis.score}/100</span>
                </div>
            </div>

            <div className="space-y-4">
                {analysis.factors.map((factor, idx) => (
                    <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-slate-50 hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100">
                        <div className={`w-2 h-12 rounded-full flex-shrink-0 ${factor.impact === 'Positive' ? 'bg-green-400' : 'bg-red-400'}`}></div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h4 className="font-semibold text-slate-900">{factor.name}</h4>
                                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${factor.impact === 'Positive' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                    {factor.impact}
                                </span>
                            </div>
                            <p className="text-sm text-slate-500 mt-1">{factor.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-lg flex flex-col">
            <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="w-6 h-6 text-slate-700" />
                <h3 className="text-xl font-bold text-slate-900">Premium Comparison</h3>
            </div>
            <div className="flex-grow min-h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                        <YAxis hide />
                        <Tooltip 
                            cursor={{fill: '#f1f5f9'}}
                            contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        />
                        <Bar dataKey="premium" radius={[8, 8, 8, 8]} barSize={60}>
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={index === 1 ? '#0284c7' : '#cbd5e1'} />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </div>
             <div className="mt-4 flex items-start gap-2 text-xs text-slate-400">
                <Info className="w-4 h-4 mt-0.5" />
                <p>Premiums are simulated estimates. Actual rates may vary based on credit score and final verification.</p>
            </div>
        </div>
      </div>

      <div className="text-center">
         <button onClick={onReset} className="text-slate-500 hover:text-brand-600 font-medium transition-colors">
            Start a New Quote
         </button>
      </div>
    </div>
  );
};
