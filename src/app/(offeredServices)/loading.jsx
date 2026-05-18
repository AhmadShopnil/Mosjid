import React from 'react';

export default function GlobalLoader() {
  return (
    <div className="min-h-[70vh] w-full flex flex-col items-center justify-center py-12 px-4 relative overflow-hidden bg-white/40 backdrop-blur-sm rounded-3xl">
      {/* Background radial glowing effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-[#52B920]/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[250px] h-[250px] bg-[#B98C20]/5 rounded-full blur-[60px] pointer-events-none" />

      <div className="relative flex flex-col items-center max-w-sm w-full text-center space-y-6 z-10">
        {/* Modern Concentric Spinning Loader */}
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Outer Ring - Gold */}
          <div className="absolute inset-0 rounded-full border-4 border-t-[#B98C20] border-r-transparent border-b-transparent border-l-transparent animate-[spin_1.5s_linear_infinite]" />
          
          {/* Inner Ring - Green */}
          <div className="absolute inset-2 rounded-full border-4 border-t-transparent border-r-[#52B920] border-b-transparent border-l-[#52B920] animate-[spin_1s_linear_infinite_reverse]" />
          
          {/* Central Pulsing Symbol */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#52B920]/15 to-[#B98C20]/15 flex items-center justify-center animate-[pulse_1.8s_ease-in-out_infinite]">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-5 h-5 text-[#52B920]"
            >
              <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 000-1.5h-3.75V6z" clipRule="evenodd" />
            </svg>
          </div>
        </div>

        {/* Dynamic Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-gray-800 tracking-wide font-sans animate-[pulse_2s_ease-in-out_infinite]">
            Osaka Masjid
          </h3>
          <div className="flex flex-col items-center justify-center space-y-1">
            <span className="text-xs text-gray-500 font-bold uppercase tracking-widest">
              Loading Service Page
            </span>
            <span className="text-[10px] text-gray-400 font-semibold tracking-wider">
              読み込み中... お待ちください
            </span>
          </div>
        </div>

        {/* Premium animated loader line bar */}
        <div className="w-36 h-[4px] bg-gray-100 rounded-full overflow-hidden relative">
          <div className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-r from-[#52B920] to-[#B98C20] rounded-full animate-[loading-bar_1.6s_infinite_ease-in-out]" />
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes loading-bar {
          0% { left: -50%; width: 35%; }
          50% { width: 55%; }
          100% { left: 120%; width: 35%; }
        }
      `}} />
    </div>
  );
}
