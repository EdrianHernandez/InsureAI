import React, { useState } from 'react';
import { InsuranceType } from '../types';
import { Car, Home, Heart, ArrowRight, ArrowLeft, Check } from 'lucide-react';

const STEPS = [
  { id: 'type', title: 'Coverage Type', description: 'What do you need to protect?' },
  { id: 'personal', title: 'Personal Info', description: 'Tell us a bit about yourself.' },
  { id: 'details', title: 'Asset Details', description: 'Specifics about your property or health.' },
  { id: 'review', title: 'Review', description: 'Confirm your details.' }
];

export const FormWizard = ({ onComplete, isLoading }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    insuranceType: InsuranceType.AUTO,
    age: 30,
    zipCode: '',
    gender: 'Prefer not to say',
  });

  const updateData = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      onComplete(formData);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(prev => prev - 1);
  };

  // Render Steps
  const renderStepContent = () => {
    switch (currentStep) {
      case 0: // Type Selection
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
            {[
              { type: InsuranceType.AUTO, icon: Car, label: "Auto", desc: "Car, Truck, Motorcycle" },
              { type: InsuranceType.HOME, icon: Home, label: "Home", desc: "House, Condo, Renters" },
              { type: InsuranceType.LIFE, icon: Heart, label: "Life", desc: "Term, Whole Life" },
            ].map((option) => (
              <button
                key={option.type}
                onClick={() => updateData('insuranceType', option.type)}
                className={`relative group p-6 rounded-2xl border-2 text-left transition-all duration-300 ${
                  formData.insuranceType === option.type
                    ? 'border-brand-500 bg-brand-50 ring-4 ring-brand-500/10'
                    : 'border-slate-200 hover:border-brand-300 hover:bg-slate-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 transition-colors ${
                  formData.insuranceType === option.type ? 'bg-brand-500 text-white' : 'bg-slate-100 text-slate-500 group-hover:bg-brand-100 group-hover:text-brand-600'
                }`}>
                  <option.icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{option.label}</h3>
                <p className="text-sm text-slate-500 mt-1">{option.desc}</p>
                {formData.insuranceType === option.type && (
                  <div className="absolute top-4 right-4 text-brand-500">
                    <Check className="w-6 h-6" />
                  </div>
                )}
              </button>
            ))}
          </div>
        );

      case 1: // Personal Info
        return (
          <div className="space-y-6 max-w-lg mx-auto pt-4">
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Age</label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => updateData('age', parseInt(e.target.value) || 0)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                  min={16} max={100}
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Zip Code</label>
                <input
                  type="text"
                  value={formData.zipCode}
                  onChange={(e) => updateData('zipCode', e.target.value)}
                  placeholder="e.g. 90210"
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all"
                />
             </div>
             <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Gender</label>
                <select
                  value={formData.gender}
                  onChange={(e) => updateData('gender', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none transition-all bg-white"
                >
                  <option>Male</option>
                  <option>Female</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
             </div>
          </div>
        );

      case 2: // Specific Details
        if (formData.insuranceType === InsuranceType.AUTO) {
          return (
            <div className="space-y-6 max-w-lg mx-auto pt-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Vehicle Details</h3>
              <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Year</label>
                    <input
                      type="number"
                      placeholder="2023"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none"
                      onChange={(e) => updateData('carYear', parseInt(e.target.value))}
                    />
                 </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Make</label>
                    <input
                      type="text"
                      placeholder="Toyota"
                      className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none"
                      onChange={(e) => updateData('carMake', e.target.value)}
                    />
                 </div>
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Model</label>
                 <input
                   type="text"
                   placeholder="Camry SE"
                   className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none"
                   onChange={(e) => updateData('carModel', e.target.value)}
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Driving History</label>
                 <select
                   className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                   onChange={(e) => updateData('drivingHistory', e.target.value)}
                 >
                   <option value="">Select...</option>
                   <option value="Clean">Clean Record (No accidents/tickets)</option>
                   <option value="Minor">Minor Incidents (1 ticket/fender bender)</option>
                   <option value="Major">Major Incidents (DUI, Multiple accidents)</option>
                 </select>
              </div>
            </div>
          );
        } else if (formData.insuranceType === InsuranceType.HOME) {
          return (
            <div className="space-y-6 max-w-lg mx-auto pt-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Property Details</h3>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Estimated Home Value ($)</label>
                 <input
                   type="number"
                   placeholder="450000"
                   className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none"
                   onChange={(e) => updateData('homeValue', parseInt(e.target.value))}
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Year Built</label>
                 <input
                   type="number"
                   placeholder="1995"
                   className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none"
                   onChange={(e) => updateData('homeYearBuilt', parseInt(e.target.value))}
                 />
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-slate-50">
                 <input
                   type="checkbox"
                   id="security"
                   className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300"
                   onChange={(e) => updateData('securitySystem', e.target.checked)}
                 />
                 <label htmlFor="security" className="text-slate-700 font-medium cursor-pointer">Has Monitored Security System?</label>
              </div>
            </div>
          );
        } else {
             return (
            <div className="space-y-6 max-w-lg mx-auto pt-4">
              <h3 className="text-lg font-semibold text-slate-800 border-b pb-2">Health & Coverage</h3>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Desired Coverage Amount ($)</label>
                 <input
                   type="number"
                   placeholder="500000"
                   className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none"
                   onChange={(e) => updateData('coverageAmount', parseInt(e.target.value))}
                 />
              </div>
              <div>
                 <label className="block text-sm font-medium text-slate-700 mb-1">Health Condition</label>
                 <select
                   className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-brand-500 outline-none bg-white"
                   onChange={(e) => updateData('healthCondition', e.target.value)}
                 >
                    <option value="Excellent">Excellent</option>
                    <option value="Average">Average</option>
                    <option value="Poor">Poor</option>
                 </select>
              </div>
              <div className="flex items-center gap-3 p-4 border rounded-lg bg-slate-50">
                 <input
                   type="checkbox"
                   id="smoker"
                   className="w-5 h-5 text-brand-600 rounded focus:ring-brand-500 border-gray-300"
                   onChange={(e) => updateData('smoker', e.target.checked)}
                 />
                 <label htmlFor="smoker" className="text-slate-700 font-medium cursor-pointer">Smoker / Tobacco User?</label>
              </div>
            </div>
          );
        }

      case 3: // Review
        return (
           <div className="max-w-lg mx-auto pt-4">
             <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
                <h3 className="text-lg font-bold text-slate-900">Summary</h3>
                <div className="grid grid-cols-2 gap-y-4 text-sm">
                    <div className="text-slate-500">Type</div>
                    <div className="font-semibold text-slate-900">{formData.insuranceType}</div>
                    
                    <div className="text-slate-500">Age</div>
                    <div className="font-semibold text-slate-900">{formData.age}</div>

                    <div className="text-slate-500">Zip Code</div>
                    <div className="font-semibold text-slate-900">{formData.zipCode || "N/A"}</div>

                    {formData.insuranceType === InsuranceType.AUTO && (
                        <>
                            <div className="text-slate-500">Vehicle</div>
                            <div className="font-semibold text-slate-900">{formData.carYear} {formData.carMake} {formData.carModel}</div>
                        </>
                    )}
                </div>
                <div className="pt-4 border-t border-slate-200">
                    <p className="text-xs text-slate-500 italic">
                        By clicking "Get Quotes", you agree to allow our AI underwriter to process your data for simulation purposes.
                    </p>
                </div>
             </div>
           </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      {/* Enhanced Progress Steps */}
      <div className="mb-12 pt-4">
        <div className="relative flex justify-between items-center max-w-2xl mx-auto">
            {/* Background Line */}
            <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200 -translate-y-1/2 -z-10 rounded-full"></div>
            
            {/* Active Line */}
            <div 
                className="absolute top-1/2 left-0 h-1 bg-brand-600 -translate-y-1/2 -z-10 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
            ></div>

            {STEPS.map((step, idx) => {
                const isCompleted = idx < currentStep;
                const isActive = idx === currentStep;

                return (
                <div key={step.id} className="flex flex-col items-center relative z-10">
                    <div 
                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-[3px] ${
                            isCompleted 
                                ? 'bg-brand-600 border-brand-600 text-white' 
                                : isActive 
                                    ? 'bg-white border-brand-600 text-brand-600 shadow-lg scale-110' 
                                    : 'bg-white border-slate-200 text-slate-400'
                        }`}
                    >
                        {isCompleted ? <Check className="w-5 h-5" /> : idx + 1}
                    </div>
                    <div className={`absolute top-12 w-32 text-center transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
                         <span className={`text-xs font-bold uppercase tracking-wider mt-2 block ${
                            isActive ? 'text-brand-600' : isCompleted ? 'text-brand-600' : 'text-slate-400'
                         }`}>
                             {step.title}
                         </span>
                    </div>
                </div>
            )})}
        </div>
        
        <div className="text-center mt-16 mb-8 space-y-2">
            <h2 className="text-3xl font-bold text-slate-900 tracking-tight">{STEPS[currentStep].title}</h2>
            <p className="text-slate-500 text-lg">{STEPS[currentStep].description}</p>
        </div>
      </div>

      {/* Content */}
      <div className="min-h-[400px] bg-white rounded-2xl shadow-xl shadow-slate-200/50 p-6 md:p-8 border border-slate-100">
         {renderStepContent()}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handleBack}
          disabled={currentStep === 0 || isLoading}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all ${
            currentStep === 0 ? 'opacity-0 pointer-events-none' : 'text-slate-600 hover:bg-slate-100'
          }`}
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </button>
        
        <button
          onClick={handleNext}
          disabled={isLoading}
          className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold text-white shadow-xl transition-all hover:scale-105 active:scale-95 ${
             isLoading ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-500 shadow-brand-600/20'
          }`}
        >
          {isLoading ? (
            <>
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               Analyzing Risk...
            </>
          ) : currentStep === STEPS.length - 1 ? (
             <>Get Smart Quotes <ArrowRight className="w-4 h-4" /></>
          ) : (
             <>Next Step <ArrowRight className="w-4 h-4" /></>
          )}
        </button>
      </div>
    </div>
  );
};
