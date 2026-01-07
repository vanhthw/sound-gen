import React, { useState, useRef, useEffect } from 'react';

const SoundControl = ({ sound }) => {
    const [volume, setVolume] = useState(0); // Start muted/low
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);

        if (audioRef.current) {
            audioRef.current.volume = newVolume;
            if (newVolume > 0 && !isPlaying) {
                audioRef.current.play().catch(e => console.log("Audio play failed, possibly user interaction needed", e));
                setIsPlaying(true);
            } else if (newVolume === 0 && isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            }
        }
    };

    const togglePlay = () => {
        const newIsPlaying = !isPlaying;
        setIsPlaying(newIsPlaying);
        if (audioRef.current) {
            if (newIsPlaying) {
                if (volume === 0) {
                    setVolume(0.5);
                    audioRef.current.volume = 0.5;
                }
                audioRef.current.play().catch(e => console.log("Audio play failed", e));
            } else {
                audioRef.current.pause();
            }
        }
    }

    return (
        <div className="flex items-center gap-4 py-2">
            <button
                onClick={togglePlay}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-xl transition-all ${isPlaying && volume > 0 ? 'bg-white/20 text-white' : 'text-white/50 hover:bg-white/10'
                    }`}>
                {sound.icon}
            </button>

            <div className="flex-1 flex flex-col gap-1">
                <label className="text-white/90 text-sm font-medium ml-1">{sound.name}</label>
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="w-full h-1.5 bg-white/20 rounded-lg appearance-none cursor-pointer accent-white hover:bg-white/30 transition-colors"
                />
            </div>

            <audio ref={audioRef} src={sound.path} loop />
        </div>
    );
};

export default SoundControl;
