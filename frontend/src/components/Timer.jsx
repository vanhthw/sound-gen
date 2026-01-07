import React, { useState, useEffect } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';

const Timer = () => {
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('pomodoro'); // 'pomodoro' | 'short' | 'long'

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        setIsActive(false);
                        // Optionally play a sound here
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        if (mode === 'pomodoro') setMinutes(25);
        else if (mode === 'short') setMinutes(5);
        else setMinutes(15);
        setSeconds(0);
    };

    const switchMode = (newMode) => {
        setMode(newMode);
        setIsActive(false);
        setSeconds(0);
        if (newMode === 'pomodoro') setMinutes(25);
        else if (newMode === 'short') setMinutes(5);
        else setMinutes(15);
    };

    const formatTime = (time) => {
        return time < 10 ? `0${time}` : time;
    };

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl border border-white/20 transition-all hover:bg-white/15">
            <div className="flex gap-4 mb-8">
                {[
                    { id: 'pomodoro', label: 'Pomodoro' },
                    { id: 'short', label: 'Short Break' },
                    { id: 'long', label: 'Long Break' }
                ].map((m) => (
                    <button
                        key={m.id}
                        onClick={() => switchMode(m.id)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${mode === m.id
                            ? 'bg-white text-gray-900 shadow-lg scale-105'
                            : 'text-white/70 hover:text-white hover:bg-white/10'
                            }`}
                    >
                        {m.label}
                    </button>
                ))}
            </div>

            <div className="text-9xl font-bold text-white mb-8 font-mono tracking-tighter drop-shadow-lg">
                {formatTime(minutes)}:{formatTime(seconds)}
            </div>

            <div className="flex gap-6">
                <button
                    onClick={toggleTimer}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-white text-gray-900 text-2xl shadow-lg hover:scale-110 active:scale-95 transition-all duration-300"
                >
                    {isActive ? <Pause /> : <Play />}
                </button>
                <button
                    onClick={resetTimer}
                    className="w-16 h-16 flex items-center justify-center rounded-full bg-white/20 text-white text-2xl backdrop-blur-sm hover:bg-white/30 hover:scale-110 active:scale-95 transition-all duration-300"
                >
                    <RotateCcw />
                </button>
            </div>
        </div>
    );
};

export default Timer;
