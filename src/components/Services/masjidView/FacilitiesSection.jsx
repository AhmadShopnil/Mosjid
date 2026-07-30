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
import SectionTitleRow from '@/components/SectionTitleRow/SectionTitleRow';
import GradientBorder from '@/components/GradientBorder/GradientBorder';
import GradientBorderWrapper1 from '@/components/Shared/GradientBorderWrapper1';
import { getImageUrl } from '@/helper/getImageUrl';

const FacilitiesSection = ({ masjid_facilities }) => {
  const data = masjid_facilities?.sub_sections;
  const image = getImageUrl(masjid_facilities?.image_media);


  return (
    <section>
      {/* Main Container with rounded green border matching your design */}
      <div>

        <GradientBorderWrapper1
        rounded="rounded-[30px]" innerRounded="rounded-[29px]"
        innerClassName="p-3"
        
        >
          <div className='w-full rounded-[29px] p-4 md:p-6"'
            style={{
              background: 'linear-gradient(0deg, #FAFFF9 0.3%, #FFFFFF 99.39%)'
            }}
          >
            <SectionTitleRow leftTitle={'Masjid Facilities'} rightTitle={'マスジドの設備'} />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center pt-6">
              {/* LEFT/TOP: Facilities List (8 columns on desktop) */}
              <div className="lg:col-span-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-4">
                  {data?.map((item) => {
                    const icon = getImageUrl(item?.image_media)
                    return (
                      <div key={item.id} className="flex items-center gap-4 group">
                        {/* Icon Container: Dashed/Rounded look */}
                        <div className="shrink-0">
                          <div className="flex items-center justify-center bg-white">
                            <img src={icon} alt="" />
                          </div>
                        </div>
                        {/* <div className="shrink-0 w-12 h-12 rounded-full bg-green-50 flex items-center justify-center border border-green-100 transition-colors group-hover:bg-green-100">
                        {item.icon}
                      </div> */}
                        {/* Feature Title */}
                        <p className="text-[#333333]  text-base md:text-2xl leading-tight">
                          {item.title}
                        </p>
                      </div>
                    )
                  }
                  )}
                </div>
              </div>

              {/* RIGHT/BOTTOM: Building Sketch (4 columns on desktop) */}
              <div className="lg:col-span-4 flex justify-center">
                <div className="border-2 border-green-400 rounded-[30px] p-4 bg-white shadow-sm overflow-hidden">
                  {/* Replace with your local monochrome image path */}
                  <img
                    src={image}
                    // src="/images/offerServices/masjidView/structure.svg"
                    // src="/images/offerServices/masjidView/blackWhiteStructure.svg" 
                    alt="Masjid Facilities Illustration"
                    className="max-w-full h-auto object-contain grayscale opacity-80 "
                  />
                </div>
              </div>

            </div>
          </div>
        </GradientBorderWrapper1>
      </div>
    </section>
  );
};

export default FacilitiesSection;