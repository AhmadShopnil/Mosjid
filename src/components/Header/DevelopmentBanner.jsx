"use client";

import { AlertTriangle } from "lucide-react";
import { useState } from "react";

export default function DevelopmentBanner() {

 const [visible, setVisible] = useState(true);

  if (!visible) return null;


  return (
    <div className="w-full   bg-yellow-100 border-b border-yellow-300 text-yellow-900 text-sm sm:text-base py-2 px-4 
    flex items-center justify-center gap-2 text-center z-50">
      <div className="hidden sm:flex">
        <AlertTriangle className="w-10 h-10 md:w-5 md:h-5 shrink-0" />
      </div>
      <p>
        <strong>Notice:</strong> Our website is currently <span className="font-semibold">under development</span>.  
        Some features may not work as expected. Thank you for your patience!
      </p>
        <button
        onClick={() => setVisible(false)}
        className="text-yellow-800 hover:text-yellow-950 text-xs sm:text-sm font-semibold ml-2"
      >
        ✕ Close
      </button>
    </div>
  );
}
