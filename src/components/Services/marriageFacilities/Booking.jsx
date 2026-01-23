

const Booking = () => {
  return (
    <section
      className="
        rounded-[30px]
        bg-[linear-gradient(rgba(249,255,246,0.9),rgba(249,255,246,0.9)),url('/public/images/MariageFacilities/booking.png')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      <div className="p-4 md:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-baseline border-b border-gray-200 pb-3 mb-8">
          <h2 className="text-3xl font-bold text-[#B98C20]">
            Masjid Benefits
          </h2>
          <h2 className="text-3xl font-bold text-[#B98C20]">
            マスジドの利点
          </h2>
        </div>

        {/* Content */}
        <div className="bg-orange-50/30 flex items-center justify-center p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {/* LEFT */}
            <div className="flex flex-col">
              <p className="text-[#B98C20] mb-6">
                "Lorem ipsum" is not a real address but a standard dummy text
                used in design and publishing to demonstrate layout.
              </p>

              <div className="rounded-[30px] p-7.5 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] mt-auto flex justify-around items-end">
                {[
                  { label: "Booking\nList", icon: "bookingIcon.svg" },
                  { label: "Marriage\nForm", icon: "mariage.svg" },
                  { label: "Marriage\nGuideline", icon: "mariage.svg" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center text-center">
                    <img
                      src={`/images/offerServices/marriageFacilities/${item.icon}`}
                      alt=""
                    />
                    <span className="text-[#B98C20] font-bold whitespace-pre-line">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <div className="space-y-5 text-[#B98C20]">
              {[
                "Applicant Name",
                "Event Type",
                "Event Date",
                "Start Time",
                "End Time",
              ].map((label, i) => (
                <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <label className="font-bold">{label}</label>
                  <input
                    className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none"
                  />
                </div>
              ))}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                <div className="p-px rounded-xl bg-gradient-to-b from-[#3198A0] to-[#51F909] w-full sm:max-w-[43.75rem]">
                  <button className="w-full h-14 rounded-[11px] bg-white font-medium hover:bg-green-50">
                    Submit Booking
                  </button>
                </div>

                <button className="border border-red-500 text-red-500 h-14 w-full sm:max-w-[22.75rem] rounded-xl font-medium hover:bg-red-50">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;        