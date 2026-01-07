import React from 'react';

const Background = ({ youtubeId }) => {
    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
            <div className="absolute top-1/2 left-1/2 w-[100%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                <iframe
                    className="w-full h-full pointer-events-none opacity-80"
                    src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=0&controls=0&loop=1&playlist=${youtubeId}&showinfo=0&rel=0&iv_load_policy=3&disablekb=1&modestbranding=1`}
                    title="Background Video"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                />
            </div>
            {/* Overlay to dim video slightly for better text visibility */}
            <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
        </div>
    );
};

export default Background;
