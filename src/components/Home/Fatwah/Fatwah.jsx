

import Image from "next/image";

import FatwahBox from "./FatwahBox";

export default function FatwahSection() {


  return (
    <div className="relative min-h-[600px]
    "
     id="fatwah"
    >
      {/* Background Image - Top Half Only */}
      <div className="absolute top-0 left-0 w-full h-2/3">
        <Image
          src="/images/fatwah/bg.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content Section */}
      <div className="relative z-10">
        <FatwahBox />
      </div>
    </div>
  );
}
