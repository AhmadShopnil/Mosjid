import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import GradientBorderWrapper1 from "@/components/Shared/GradientBorderWrapper1";
import Image from "next/image";

const MasjidBenefits = ({masjid_benefits}) => {

  const data = masjid_benefits?.sub_sections;

 
  return (
    <div>
      <div className="">

        <GradientBorderWrapper1
        rounded="rounded-[30px]" innerRounded="rounded-[29px]"
        >
          <div className="w-full rounded-[29px] p-4 md:p-6"
           style={{
          background: 'linear-gradient(99.25deg, #FAFFF9 0.3%, #FFFFFF 99.39%)'
        }}
          
          >
            {/* Header Section */}
            <SectionTitleRow leftTitle={'Masjid Benefits'} rightTitle={'マスジドの利点'} c />


            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6  pt-6">
              {data?.map((benefit) => (
                <div key={benefit.id} className="flex items-center gap-4">
                  {/* Added flex-shrink-0 to ensure the width stays exactly 36px */}
                  <div className="w-9 h-9 flex-shrink-0">
                    <Image
                      src="/images/offerServices/masjidView/elements.svg"
                      alt="Checkmark"
                      width={36}
                      height={36}
                      className="w-full h-full object-contain" // Ensures image fills the 36px perfectly
                    />
                  </div>
                  <p className="text-[#333333] text-base md:text-2xl leading-tight">
                    {benefit.title}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GradientBorderWrapper1>
      </div>

      {/* Top Div with Gradient Border and 30px Radius */}
    </div>
  );
};

export default MasjidBenefits;
