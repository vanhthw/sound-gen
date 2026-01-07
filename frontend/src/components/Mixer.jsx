import React, { useState } from 'react';
import SoundControl from './SoundControl';
import { SOUNDS } from '../data/assets';
import { X, AudioLines } from 'lucide-react';

const Mixer = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-6 left-6 z-50">
            {/* Mixer Panel */}
            <div
                className={`absolute bottom-full mb-4 left-0 w-80 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transition-all duration-500 origin-bottom-left ${isOpen
                    ? 'opacity-100 scale-100 translate-y-0'
                    : 'opacity-0 scale-90 translate-y-4 pointer-events-none'
                    }`}
            >
                <div className="flex justify-between items-center mb-4 border-b border-white/10 pb-2">
                    <h3 className="text-white font-bold text-lg">Sound Scape</h3>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-white/50 hover:text-white"
                    >
                        <X />
                    </button>
                </div>

                <div className="flex flex-col gap-2 max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20">
                    {SOUNDS.map((sound) => (
                        <SoundControl key={sound.id} sound={sound} />
                    ))}
                </div>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`group flex items-center justify-center w-14 h-14 rounded-full shadow-lg transition-all duration-300 border border-white/20 ${isOpen ? 'bg-white text-black rotate-180' : 'bg-black/50 text-white backdrop-blur-md hover:scale-110 hover:bg-black/70'
                    }`}
            >
                <span className="text-2xl material-symbols-outlined emoji-font"><AudioLines /></span>
            </button>
        </div>
    );
};

export default Mixer;
