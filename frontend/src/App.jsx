import React, { useState } from 'react';
import Background from './components/Background';
import Timer from './components/Timer';
import Mixer from './components/Mixer';
import { BACKGROUNDS } from './data/assets';
import { Palette } from 'lucide-react';

function App() {
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);

  const switchBackground = () => {
    setCurrentBackgroundIndex((prev) => (prev + 1) % BACKGROUNDS.length);
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center font-sans antialiased overflow-hidden">

      {/* Background Layer */}
      <Background youtubeId={BACKGROUNDS[currentBackgroundIndex].youtubeId} />

      {/* Main Content (Timer) */}
      <main className="z-10 relative flex flex-col items-center gap-8 animate-fade-in-up">
        <Timer />
      </main>

      {/* Mixer (Bottom Left) */}
      <Mixer />

      {/* Theme/Background Toggle (Bottom Right or Top Right) */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={switchBackground}
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-medium shadow-lg hover:bg-black/60 transition-all hover:scale-105 active:scale-95"
        >
          <span>Theme</span>
          <span className="text-xl">
            <Palette />
          </span>
        </button>
      </div>

      {/* Credit / Footer (Optional) */}
      <div className="fixed top-6 left-6 z-40 text-white/40 text-sm font-light tracking-widest uppercase pointer-events-none">
        vanhthuww
      </div>
    </div>
  );
}

export default App;
