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
      <div className="rounded-[30px] p-[1px] bg-[linear-gradient(180deg,_#3198A0_0%,_#51F909_100%)]">
        <div className=" rounded-[29px] bg-[linear-gradient(96.62deg,_#F4FFF2_0.29%,_#FFFFFF_99.59%)] p-8">
          {/* Header Section */}
          <div className="flex flex-col sm:flex-row justify-between items-baseline border-b border-gray-200 pb-3 mb-8">
            <h2 className="text-3xl font-serif font-bold text-[#B98C20]">
              Masjid Etiquettes
            </h2>
            <h2 className="text-3xl font-serif font-bold text-[#B98C20]">
              マスジドのマナー
            </h2>
          </div>

          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
            {masjidEtiquttes.map((benefit) => (
              <div key={benefit.id} className="flex items-center gap-4">
                <div className="shrink-0 mt-1 w-9 h-9">
                  <Image
                    src="/images/offerServices/masjidView/checkMark.svg"
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
      </div>
    </div>
  );
};

export default MasjidEtiquttes;
