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
      <div className="pt-6">
        <div className="rounded-b-[30px] p-[1px] bg-[linear-gradient(180deg,_#3198A0_0%,_#51F909_100%)]">
          <div className="rounded-b-[29px] bg-[linear-gradient(96.62deg,_#FFFFFF_0.29%,_#FDF2FF_99.59%)] p-6">
            {/* Header Section */}
            <div className="flex flex-col sm:flex-row justify-between items-baseline border-b border-gray-200 pb-3 mb-8">
              <h2 className="text-3xl font-serif font-bold text-[#B98C20]">
                Masjid Benefits
              </h2>
              <h2 className="text-3xl font-serif font-bold text-[#B98C20]">
                マスジドの利点
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
              {benefitsData.map((benefit) => (
                <div key={benefit.id} className="flex items-center gap-4">
                  <div className="w-9 h-9">
                    <Image
                      src="/images/offerServices/masjidView/checkMark.svg"
                      alt="Checkmark"
                      width={36}
                      height={36}
                    />
                  </div>
                  <p className="text-[#333333] text-base md:text-2xl">
                    {benefit.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Top Div with Gradient Border and 30px Radius */}
    </div>
  );
};

export default MasjidBenefits;
