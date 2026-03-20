import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle } from 'lucide-react';

function SpecCheck({ score, passesCount, violationsCount }) {
  const [animatedScore, setAnimatedScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedScore(score);
    }, 150);
    return () => clearTimeout(timer);
  }, [score]);

  const getColor = (s) => {
    if (s >= 90) return { primary: '#22c55e', text: 'text-green-600', ring: 'ring-green-100', bg: 'bg-green-50', edge: 'border-green-100' };
    if (s >= 70) return { primary: '#eab308', text: 'text-yellow-600', ring: 'ring-yellow-100', bg: 'bg-yellow-50', edge: 'border-yellow-100' };
    if (s >= 50) return { primary: '#f97316', text: 'text-orange-500', ring: 'ring-orange-100', bg: 'bg-orange-50', edge: 'border-orange-100' };
    return { primary: '#ef4444', text: 'text-red-600', ring: 'ring-red-100', bg: 'bg-red-50', edge: 'border-red-100' };
  };

  const colors = getColor(score);
  
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (animatedScore / 100) * circumference;

  return (
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-lg flex flex-col items-center relative overflow-hidden group">
      <div 
        className={`absolute -top-32 -right-32 w-64 h-64 rounded-full opacity-10 blur-3xl transition-colors duration-1000`} 
        style={{ backgroundColor: colors.primary }}
      ></div>

      <div className="w-full flex items-center justify-between mb-8 z-10">
        <h3 className="text-xl font-bold text-slate-800">Health Overview</h3>
        {score >= 90 ? (
          <ShieldCheck className="text-green-500 w-7 h-7 drop-shadow-sm" />
        ) : (
          <AlertTriangle className={`${colors.text} w-7 h-7 drop-shadow-sm`} />
        )}
      </div>
      
      <div className="relative flex items-center justify-center w-full z-10 mb-4">
        {score >= 90 && (
          <div className="absolute inset-0 rounded-full bg-green-50 animate-ping opacity-20 scale-125"></div>
        )}
        
        <svg 
          className="transform -rotate-90 w-64 h-64 drop-shadow-md transition-transform duration-700 ease-out group-hover:scale-[1.03]" 
          viewBox="0 0 200 200"
        >
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke="currentColor"
            strokeWidth="12"
            fill="transparent"
            className="text-slate-100"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            stroke={colors.primary}
            strokeWidth="14"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-2">
          <span className={`text-6xl font-black tracking-tighter ${colors.text} transition-colors duration-1000 drop-shadow-sm`}>
            {animatedScore}
          </span>
          <span className="text-sm text-slate-400 font-extrabold uppercase tracking-[0.25em] mt-1 ml-1">Score</span>
        </div>
      </div>

      <div className="w-full grid grid-cols-2 gap-4 mt-8 z-10">
        <div className="bg-green-50/50 rounded-xl p-4 border border-green-100/50 flex flex-col items-center text-center transition-all duration-300 hover:bg-green-50 hover:-translate-y-1 hover:shadow-md hover:shadow-green-100/50">
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mb-3">
            <span className="w-3 h-3 rounded-full bg-green-500 shadow-sm shadow-green-300"></span>
          </div>
          <span className="text-3xl font-black text-green-700 tracking-tight">{passesCount}</span>
          <span className="text-xs text-green-600/80 font-bold uppercase tracking-wider mt-1">Passes</span>
        </div>
        
        <div className="bg-red-50/50 rounded-xl p-4 border border-red-100/50 flex flex-col items-center text-center transition-all duration-300 hover:bg-red-50 hover:-translate-y-1 hover:shadow-md hover:shadow-red-100/50">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center mb-3">
            <span className="w-3 h-3 rounded-full bg-red-500 shadow-sm shadow-red-300"></span>
          </div>
          <span className="text-3xl font-black text-red-700 tracking-tight">{violationsCount}</span>
          <span className="text-xs text-red-600/80 font-bold uppercase tracking-wider mt-1">Issues</span>
        </div>
      </div>
    </div>
  );
}

export default SpecCheck;
