import React, { useState, useCallback } from 'react';
import { generateImageContent } from '../services/gemini';
import { LoadingSpinner, ImageIcon } from './Icons';

export const ImageDemo: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setError(null);
    setImageUrl(null);

    try {
      const url = await generateImageContent(prompt);
      setImageUrl(url);
    } catch (err: any) {
      setError(err.message || "Failed to generate image");
    } finally {
      setLoading(false);
    }
  }, [prompt]);

  return (
    <section className="bg-surface rounded-xl p-6 shadow-lg border border-slate-700 flex flex-col h-full">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-white mb-1">Image Generation</h2>
        <p className="text-xs text-purple-400 font-mono bg-purple-500/10 inline-block px-2 py-0.5 rounded">model: gemini-2.5-flash-image (Nano Banana)</p>
      </div>

      <div className="flex-grow space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe an image (e.g., 'Cyberpunk cat')"
            className="flex-grow bg-slate-900/50 border border-slate-600 rounded-lg px-4 py-2 text-sm focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
            disabled={loading}
            onKeyDown={(e) => e.key === 'Enter' && handleGenerate()}
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-medium text-sm transition-colors flex items-center gap-2"
          >
            {loading ? <LoadingSpinner className="w-4 h-4" /> : <span>Generate</span>}
          </button>
        </div>

        {error && (
          <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg">
            {error}
          </div>
        )}

        <div className="relative aspect-square w-full rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center overflow-hidden group">
          {loading ? (
            <div className="flex flex-col items-center gap-3 text-slate-500">
              <LoadingSpinner className="w-8 h-8 text-purple-500" />
              <span className="text-xs animate-pulse">Dreaming...</span>
            </div>
          ) : imageUrl ? (
            <img 
              src={imageUrl} 
              alt="Generated output" 
              className="w-full h-full object-contain animate-fade-in" 
            />
          ) : (
            <div className="text-slate-600 flex flex-col items-center gap-2">
              <ImageIcon className="w-12 h-12 opacity-50" />
              <span className="text-sm">Enter a prompt to start</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};