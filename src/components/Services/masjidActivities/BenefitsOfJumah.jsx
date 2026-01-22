import React from 'react';
import Image from 'next/image'; // Import Next.js Image component

const adhanData = [
  { img: '/images/offerServices/masjidActivities/male.svg', title: "Over 300 men gather" },
  { img: "/images/offerServices/masjidActivities/Female.svg", title: "10 to 15 women attend" },
  { img: "/images/offerServices/masjidActivities/ladies.svg", title: "Separate prayer area for women" },
  { img: "/images/offerServices/masjidActivities/separate_entries.svg", title: "Dedicated etrance for sisters" },
  { img: "/images/offerServices/masjidActivities/image14.svg", title: "Both khutbahs delivered in Arabic" },
  { img: "/images/offerServices/masjidActivities/juma.svg", title: "Spiritual atmosphere and sense of community" },
  { img: "/images/offerServices/masjidActivities/hala_store.svg", title: "Halal shopping and meals available nearby" },
  { img: "/images/offerServices/masjidActivities/restaurants.svg", title: "Bayan (religious talk) in japanese" },
];

const BenefitsOfJumah = () => {
  return (
    <div className="p-px rounded-2xl bg-gradient-to-b from-[#3198A0] to-[#51F909]">
      <div className='bg-white p-5'>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {adhanData.map((item, index) => (
            <div 
              key={index} 
              className="relative w-full rounded-2xl"
            >
              <div className="p-px rounded-2xl bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                <div className="relative w-full min-h-[130px] bg-white rounded-2xl overflow-hidden p-px flex items-center">
                  
                  <div className="flex items-center gap-5 z-10 w-full">
                    
                    {/* The Number Circle */}
                    <div className="flex-shrink-0 w-20 h-20 ml-4 p-px rounded-full bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center overflow-hidden">
                        <Image 
                          src={item.img} 
                          alt={item.title} 
                          width={40} // Adjust size as needed
                          height={40} 
                          className="object-contain"
                        />
                      </div>
                    </div>

                    {/* The Title */}
                    <div className="grow">
                      <h2 className="text-[#00401A] text-base font-bold">
                        {item.title}
                      </h2>
                    </div>

                  </div>
                  
                  <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_top_left,rgba(49,152,160,0.1),transparent_60%)]" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BenefitsOfJumah;