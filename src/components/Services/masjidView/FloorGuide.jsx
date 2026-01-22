import React from 'react';
import { CheckCircle2, User } from 'lucide-react';

const FloorGuide = () => {
  // 1. JSON Data Structure
  const floorData = [
    {
      id: 5,
      floorName: "Rooftop Area",
      features: ["Rooftop Area", "Male Prayer Area Facility"],
    },
    {
      id: 4,
      floorName: "Forth Floor",
      features: ["Male Prayer Area", "Imam's Residence", "Common Kitchen"],
    },
    {
      id: 3,
      floorName: "Third Floor",
      features: ["Male Prayer Area", "Children's Madrasa", "Masjid Office"],
    },
    {
      id: 2,
      floorName: "Second Floor",
      features: ["Male Prayer Area", "Female Prayer Area", "Female Wudu & Toilet Area"],
    },
    {
      id: 1,
      floorName: "First Floor",
      features: ["Male Entrance", "Female Entrance", "Male Wudu & Toilet Area", "Halal Store(1st floor)"],
    },
  ];

  return (
    <div className="w-full py-12 bg-white">
      <div>
        <div className="flex flex-col lg:flex-row items-center  gap-12 lg:gap-8">
          
          {/* LEFT SIDE: Building Image */}
          <div className="w-full lg:w-1/2 flex justify-between items-center">
            <div className="relative">
              {/* Replace the src with your local building image path */}
              <img 
                src="/images/offerServices/masjidView/structure.svg" 
                alt="Building Illustration" 
                className="max-w-full h-auto drop-shadow-md"
              />
              
              {/* Decorative Lines: These are hidden on mobile for better responsiveness */}
              <div className="hidden lg:block absolute top-0 right-[-40px] w-[40px] h-full">
                {/* You can add custom SVG dashed lines here to connect to the text */}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE: Floor Details */}
          <div className="w-full lg:w-1/2 flex flex-col space-y-3">
            {floorData.map((floor) => (
              <div key={floor.id} className="relative group">
                <div className="flex items-center gap-4">
                  
                  {/* Floor Icon Indicator (Dashed Circle) */}
                  <div className="shrink-0">
                    <div className=" flex items-center justify-center bg-white">
                      <img src="/images/offerServices/masjidView/user.svg" alt="" />
                    </div>
                  </div>

                  {/* Floor Content */}
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-[#00401A]">
                      {floor.floorName}
                    </h3>
                    
                    {/* Features List */}
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      {floor.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <img src="/images/offerServices/masjidView/checkMark.svg" alt="" />
                          <span className="text-[#333333] font-medium text-sm md:text-base">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
              
              </div>
            ))}
          </div>

        </div>
      </div>
    </div>
  );
};

export default FloorGuide;