import React from 'react';
import { ShieldCheck, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-lg bg-white/80 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.location.reload()}>
            <ShieldCheck className="h-8 w-8 text-brand-600" />
            <span className="font-bold text-xl tracking-tight text-slate-900">InsureAI</span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-8">
            <a href="#" className="text-slate-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Products</a>
            <a href="#" className="text-slate-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Claims</a>
            <a href="#" className="text-slate-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">About Us</a>
            <a href="#" className="text-slate-600 hover:text-brand-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">Support</a>
          </nav>

          {/* CTA */}
          <div className="hidden md:flex items-center">
             <button className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
               Sign In
             </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-brand-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-slate-100">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50">Products</a>
             <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-slate-700 hover:text-brand-600 hover:bg-slate-50">Claims</a>
          </div>
        </div>
      )}
    </header>
  );
};
