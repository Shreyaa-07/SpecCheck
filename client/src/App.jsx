import React, { useState } from 'react';
import axios from 'axios';
import { Search, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import SpecCheck from './components/SpecCheck';
import IssueList from './components/IssueList';

function App() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState(null);

  const handleScan = async (e) => {
    e.preventDefault();
    if (!url) return;
    
    setLoading(true);
    setError(null);
    setResults(null);

    console.log('Scanning...');
    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await axios.post(`${apiUrl}/scan`, { url });
      console.log('Scan complete');
      setResults(response.data);
    } catch (err) {
      const errorMessage = err.response?.data?.error || 'Failed to scan the URL. Please try again.';
      console.error('Scan failed');
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans">
      <header className="bg-white border-b border-slate-200 px-6 py-4 flex items-center shadow-sm">
        <ShieldCheck className="w-8 h-8 text-indigo-600 mr-3" />
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">
          SpecCheck
        </h1>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8 text-center transition-all duration-300 hover:shadow-md">
          <h2 className="text-2xl font-semibold mb-2">Automated Accessibility Auditor</h2>
          <p className="text-slate-500 mb-6">Enter a URL to analyze its accessibility and get actionable insights.</p>
          
          <form onSubmit={handleScan} className="max-w-2xl mx-auto flex gap-3">
            <div className="relative flex-1 group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none group-focus-within:text-indigo-500">
                <Search className="h-5 w-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
              </div>
              <input
                type="text"
                autoCapitalize="off"
                autoCorrect="off"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm text-lg transition-shadow bg-slate-50 focus:bg-white"
                placeholder="example.com"
                required
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="bg-indigo-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed flex items-center transition-all duration-200 shadow-sm hover:shadow active:scale-95"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                'Scan Now'
              )}
            </button>
          </form>

          {error && (
            <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start text-left max-w-2xl mx-auto animate-in fade-in slide-in-from-top-4 duration-300">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" />
              <p className="text-red-800">{error}</p>
            </div>
          )}
        </div>

        {results && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="lg:col-span-1 lg:sticky lg:top-8 self-start">
              <SpecCheck score={results.score} passesCount={results.passesCount} violationsCount={results.violationsCount} />
            </div>
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold mb-4 border-b pb-3 text-slate-800">Scan Summary</h3>
                <div className="flex space-x-6 text-sm">
                  <div className="flex flex-col">
                    <span className="text-slate-500 uppercase tracking-wider text-xs font-semibold">Health Score</span>
                    <span className={`text-3xl font-bold ${results.score > 80 ? 'text-green-600' : results.score > 50 ? 'text-yellow-600' : 'text-red-600'}`}>
                      {results.score}/100
                    </span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 uppercase tracking-wider text-xs font-semibold">Checks Passed</span>
                    <span className="text-3xl font-bold text-slate-800">{results.passesCount}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-500 uppercase tracking-wider text-xs font-semibold">Issues Found</span>
                    <span className="text-3xl font-bold text-red-600">{results.violationsCount}</span>
                  </div>
                </div>
              </div>

              <IssueList violations={results.violations} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
