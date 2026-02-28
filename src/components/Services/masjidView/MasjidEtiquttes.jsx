import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import Image from "next/image";
import React from "react";

const MasjidEtiquttes = () => {
  const masjidEtiquttes = [
    {
      id: 1,
      title: "Dress Modesty",
      text: "Wear clean, respectful clothing. Women should wear hijab.",
    },
    {
      id: 2,
      title: "Be Quiet & Respectful",
      text: "Keep phones silent and avoid loud talking.",
    },
    {
      id: 3,
      title: "No Photography",
      text: "Please don’t take pictures inside the prayer area.",
    },
    {
      id: 4,
      title: "Men and Women Separate",
      text: "Use your designated entrance and prayer space",
    },
    {
      id: 5,
      title: "Keep It Clean",
      text: "No Eating or Drinking Inside the Masjid",
    },
  ];

  return (
    <div className="mt-6">
      {/* rounded-[29px] bg-[linear-gradient(96.62deg,_#F4FFF2_0.29%,_#FFFFFF_99.59%)] */}
      <GradientBorder>
        <div className="  p-4">
  
          <SectionTitleRow leftTitle={'Masjid Etiquttes'} rightTitle={'マスジドのマナー'} />

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 pt-6">
            {masjidEtiquttes.map((benefit) => (
              <div key={benefit.id} className="flex items-center gap-4">
                <div className="shrink-0 mt-1 w-9 h-9">
                  <Image
                    src="/images/offerServices/masjidView/elements.svg"
                    alt="Checkmark"
                    width={36}
                    height={36}
                  />
                </div>
                <p className="text-[#333333] text-base md:text-2xl">
                  <span className="font-bold mr-0.5">{benefit.title}:</span>
                  {benefit.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </GradientBorder>
    </div>
  );
};

export default MasjidEtiquttes;
