'use client'
import { useState } from "react";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";

const Booking = () => {
  const [values, setValues] = useState({
    applicantName: "",
    eventType: "",
    eventDate: "",
    startTime: "",
    endTime: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
  };

  return (
    <section
      className="
        rounded-[30px]
        bg-[linear-gradient(rgba(249,255,246,0.9),rgba(249,255,246,0.6)),url('/public/images/MariageFacilities/booking.png')]
        bg-cover
        bg-center
        bg-no-repeat
      "
    >
      <div className="p-4">
        <SectionTitleRow
          leftTitle={"Marriage Event Booking"}
          rightTitle={"結婚イベント予約"}
        />

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
                    <span className="text-[#B98C20] font-bold text-base">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5 text-[#B98C20]"
            >
              {[
                {
                  label: "Applicant Name",
                  name: "applicantName",
                  type: "text",
                  placeholder: "Enter full name",
                  tag: "input",
                },
                {
                  label: "Event Type",
                  name: "eventType",
                  tag: "select",
                  options: [
                    "Wedding",
                    "Seminar",
                    "Conference",
                    "Party",
                    "Other",
                  ],
                },
                {
                  label: "Event Date",
                  name: "eventDate",
                  type: "date",
                  tag: "input",
                },
                {
                  label: "Start Time",
                  name: "startTime",
                  type: "time",
                  tag: "input",
                },
                {
                  label: "End Time",
                  name: "endTime",
                  type: "time",
                  tag: "input",
                },
              ].map((field) => (
                <div
                  key={field.name}
                  className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center"
                >
                  <label className="font-bold">{field.label}</label>

                  {field.tag === "select" ? (
                    <select
                      name={field.name}
                      value={values[field.name]}
                      onChange={handleChange}
                      className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none appearance-none"
                    >
                      <option value="" disabled>
                        Select an event type
                      </option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <input
                      name={field.name}
                      type={field.type}
                      value={values[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder || ""}
                      className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none"
                    />
                  )}
                </div>
              ))}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                <button
                  type="submit"
                  className="w-full h-14 rounded-xl text-[#333333] font-medium transition-colors hover:opacity-90 sm:max-w-[43.75rem]"
                  style={{
                    border: "2px solid transparent",
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(to bottom, #3198A0, #51F909)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  Submit Booking
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setValues({
                      applicantName: "",
                      eventType: "",
                      eventDate: "",
                      startTime: "",
                      endTime: "",
                    })
                  }
                  className="border border-[#FF0000] text-[#FF0000] bg-[#FFE9E9] h-14 w-full sm:max-w-[22.75rem] rounded-xl font-medium hover:bg-red-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
