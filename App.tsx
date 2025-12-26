import React from 'react';
import { TextDemo } from './components/TextDemo';
import { ImageDemo } from './components/ImageDemo';
import { SparklesIcon } from './components/Icons';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-background text-slate-200 p-4 md:p-8 font-sans selection:bg-primary selection:text-white">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <header className="flex items-center space-x-3 pb-6 border-b border-slate-700">
          <div className="p-2 bg-primary/20 rounded-lg text-primary">
            <SparklesIcon className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Gemini Skeleton</h1>
            <p className="text-slate-400 text-sm">Minimal implementation of Text (Flash 3) & Image (Nano Banana)</p>
          </div>
        </header>

        {/* Grid Layout for Demos */}
        <main className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <TextDemo />
          <ImageDemo />
        </main>

      </div>
    </div>
  );
};

export default App;