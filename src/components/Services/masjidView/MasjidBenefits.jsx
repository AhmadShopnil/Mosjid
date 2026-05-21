import GradientBorder from "@/components/GradientBorder/GradientBorder";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import Image from "next/image";

const MasjidBenefits = () => {
  const benefitsData = [
    { id: 1, text: "Five Daily Prayers with Adhan and Jama'ah" },
    { id: 2, text: "Spiritual Rewards and Waqf (Endowment) under Shariah Law" },
    { id: 3, text: "Religious Consultancy for personal and family matters" },
    { id: 4, text: "Qur'an Dars after Fajr for deeper understanding" },
    { id: 5, text: "Da'wah Opportunities to share and strengthen faith" },
    { id: 6, text: "Islamic Education for Adults and Children" },
    { id: 7, text: "Welcoming Community of Muslims from Diverse Backgrounds" },
    { id: 8, text: "Zakat and Sadaqatul Fitr collection" },
  ];

  return (
    <div>
      <div className="">

        <GradientBorder>
          <div className=" p-4">
            {/* Header Section */}
            <SectionTitleRow leftTitle={'Masjid Benefits'} rightTitle={'マスジドの利点'} c />


            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6  pt-6">
              {benefitsData.map((benefit) => (
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
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </GradientBorder>
      </div>

      {/* Top Div with Gradient Border and 30px Radius */}
    </div>
  );
};

export default MasjidBenefits;
