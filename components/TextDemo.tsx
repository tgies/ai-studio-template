import React, { useState, useCallback } from 'react';
import { generateTextContent } from '../services/gemini';
import { LoadingSpinner, SendIcon } from './Icons';

export const TextDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;
    
    setLoading(true);
    setError(null);
    setResult('');

    try {
      const text = await generateTextContent(prompt);
      setResult(text);
    } catch (err: any) {
      setError(err.message || "Failed to generate text");
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  return (
    <section className="bg-surface rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-1">Text Generation</h2>
        <p className="text-xs text-primary font-mono bg-primary/10 inline-block px-2 py-0.5 rounded">model: gemini-3-flash-preview</p>
      </div>

      <div className="flex-grow space-y-4">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Ask something (e.g., 'Explain quantum physics to a 5 year old')"
            className="w-full bg-slate-900/50 border border-slate-600 rounded-lg p-3 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none h-32 transition-all"
            disabled={loading}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="absolute bottom-3 right-3 p-2 bg-primary hover:bg-primaryHover disabled:opacity-50 disabled:cursor-not-allowed rounded-md text-white transition-colors"
            title="Generate Text"
          >
            {loading ? <LoadingSpinner className="w-5 h-5" /> : <SendIcon className="w-5 h-5" />}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
            {error}
          </div>
        )}

        {result && (
          <div className="animate-fade-in">
            <h3 className="text-xs uppercase tracking-wider text-slate-500 mb-2 font-bold">Output</h3>
            <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 text-slate-300 text-sm leading-relaxed overflow-y-auto max-h-[300px] whitespace-pre-wrap">
              {result}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};