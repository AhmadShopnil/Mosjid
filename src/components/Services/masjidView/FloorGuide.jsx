import React from 'react';
import { CheckCircle2, User } from 'lucide-react';
import SectionTitleRow from '@/components/SectionTitleRow/SectionTitleRow';
import GradientBorder from '@/components/GradientBorder/GradientBorder';

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
    <div className='pb-6'>
      <GradientBorder>
        <div className="w-full rounded-[12px] p-4 md:p-6" style={{
          background: 'linear-gradient(99.25deg, #FAFFF9 0.3%, #FFFFFF 99.39%)'
        }}>
          <div>
            <SectionTitleRow leftTitle={'Masjid Structure'} rightTitle={'マスジドの構造'} />
            
            {/* CHANGED TO GRID SYSTEM */}
            <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-12 lg:gap-8 pt-6">
              
              {/* LEFT SIDE: Building Image */}
              <div className="flex justify-center items-center">
                <div className="relative">
                  <img 
                    src="/images/offerServices/masjidView/structure.svg" 
                    alt="Building Illustration" 
                    className="max-w-full h-auto drop-shadow-md"
                  />
                  <div className="hidden lg:block absolute top-0 right-[-40px] w-[40px] h-full">
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE: Floor Details */}
              <div className="flex flex-col space-y-3">
                {floorData.map((floor) => (
                  <div key={floor.id} className="relative group">
                    <div className="flex items-center gap-4">
                      
                      {/* Floor Icon Indicator */}
                      <div className="shrink-0">
                        <div className="flex items-center justify-center bg-white">
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
      </GradientBorder>
    </div>
  );
};

export default FloorGuide;