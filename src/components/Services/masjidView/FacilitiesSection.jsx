import React from 'react';
import { 
  Users, 
  Bath, 
  School, 
  BookOpen, 
  LayoutDashboard, 
  Library,
  ArrowLeftRight
} from 'lucide-react';

const FacilitiesSection = () => {
  // 1. JSON Data Structure for easy management
  const facilityData = [
    {
      id: 1,
      title: "Separate Prayer Areas for Males and Females",
      icon: <Users size={24} className="text-green-600" />,
    },
    {
      id: 2,
      title: "Separate Entrances for Men and Women",
      icon: <ArrowLeftRight size={24} className="text-green-600" />,
    },
    {
      id: 3,
      title: "Toilet Facilities for Both Genders",
      icon: <Bath size={24} className="text-green-600" />,
    },
    {
      id: 4,
      title: "Islamic Education Room for Adults and Children",
      icon: <School size={24} className="text-green-600" />,
    },
    {
      id: 5,
      title: "Adult Reading and Study Area",
      icon: <BookOpen size={24} className="text-green-600" />,
    },
    {
      id: 6,
      title: "Meeting Area Available",
      icon: <LayoutDashboard size={24} className="text-green-600" />,
    },
    {
      id: 7,
      title: "Islamic Resource Library (Adults)",
      icon: <Library size={24} className="text-green-600" />,
    }
  ];

  return (
    <section>
      {/* Main Container with rounded green border matching your design */}
      <div>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* LEFT/TOP: Facilities List (8 columns on desktop) */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
              {facilityData.map((item) => (
                <div key={item.id} className="flex items-center gap-4 group">
                  {/* Icon Container: Dashed/Rounded look */}
                  <div className="shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100 transition-colors group-hover:bg-green-100">
                    {item.icon}
                  </div>
                    {/* Feature Title */}
                  <p className="text-[#333333]  text-base md:text-2xl leading-tight">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT/BOTTOM: Building Sketch (4 columns on desktop) */}
          <div className="lg:col-span-4 flex justify-center">
            <div className="border-2 border-green-400 rounded-[30px] p-4 bg-white shadow-sm overflow-hidden">
              {/* Replace with your local monochrome image path */}
              <img 
                src="/images/offerServices/masjidView/blackWhiteStructure.svg" 
                alt="Masjid Facilities Illustration" 
                className="max-w-full h-auto object-contain grayscale opacity-80"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;