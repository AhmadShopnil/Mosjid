'use client'
import { useState } from "react";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import axiosInstance from "@/helper/axiosInstance";

const Booking = ({ slots = [], onBookingSubmitted }) => {
  const [values, setValues] = useState({
    applicantName: "",
    phoneNumber: "",
    eventDate: "",
    slotId: "",
    kabinNama: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setValues((prev) => ({ ...prev, [name]: file }));
  };

  // Find the selected slot to display start/end time
  const selectedSlot = slots.find((s) => s.id === Number(values.slotId));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!values.applicantName || !values.phoneNumber || !values.eventDate || !values.slotId || !values.kabinNama) {
      setMessage({ text: "Please fill all required fields.", type: "error" });
      return;
    }

    try {
      setLoading(true);
      setMessage({ text: "", type: "" });

      const formData = new FormData();
      formData.append("booked_date", values.eventDate);
      formData.append("start_time", selectedSlot?.start_time || "");
      formData.append("end_time", selectedSlot?.end_time || "");
      formData.append("informations[others][applicant_name]", values.applicantName);
      formData.append("informations[others][phone_number]", values.phoneNumber);
      formData.append("informations[attached][kabin_nama]", values.kabinNama);

      await axiosInstance.post("/marriage", formData);

      setMessage({ text: "Booking submitted successfully!", type: "success" });
      setValues({ applicantName: "", phoneNumber: "", eventDate: "", slotId: "", kabinNama: null });

      // Refresh data after successful booking
      if (onBookingSubmitted) onBookingSubmitted();
    } catch (err) {
      console.error(err);
      setMessage({ text: "Failed to submit booking. Please try again.", type: "error" });
    } finally {
      setLoading(false);
    }
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
              {/* Applicant Name */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                <label className="font-bold">Applicant Name</label>
                <input
                  name="applicantName"
                  type="text"
                  value={values.applicantName}
                  onChange={handleChange}
                  placeholder="Enter full name"
                  className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none"
                />
              </div>

              {/* Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                <label className="font-bold">Phone Number</label>
                <input
                  name="phoneNumber"
                  type="text"
                  value={values.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter phone number"
                  className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none"
                />
              </div>

              {/* Event Date */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                <label className="font-bold">Event Date</label>
                <input
                  name="eventDate"
                  type="date"
                  value={values.eventDate}
                  onChange={handleChange}
                  className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none"
                />
              </div>

              {/* Time Slot Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                <label className="font-bold">Time Slot</label>
                <select
                  name="slotId"
                  value={values.slotId}
                  onChange={handleChange}
                  className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none appearance-none"
                >
                  <option value="" disabled>Select a time slot</option>
                  {slots
                    .filter((slot) => slot.status === "1")
                    .map((slot) => (
                      <option key={slot.id} value={slot.id}>
                        {slot.name} ({slot.start_time} - {slot.end_time})
                      </option>
                    ))}
                </select>
              </div>

              {/* Display selected slot time */}
              {selectedSlot && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <span className="font-bold text-sm">Selected Time</span>
                  <div className="sm:col-span-2 bg-green-50 border border-green-300 rounded-xl px-4 py-3 text-green-800 text-sm font-medium">
                    {selectedSlot.start_time} – {selectedSlot.end_time}
                  </div>
                </div>
              )}

              {/* Kabin Nama Attachment */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                <label className="font-bold">Kabin Nama</label>
                <input
                  key={values.kabinNama ? "has-file" : "no-file"}
                  name="kabinNama"
                  type="file"
                  onChange={handleFileChange}
                  accept=".pdf,.jpg,.jpeg,.png"
                  className="sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 py-3 bg-white/50 focus:outline-none"
                />
              </div>

              {/* Message */}
              {message.text && (
                <p className={`text-sm font-medium ${message.type === "success" ? "text-green-600" : "text-red-600"}`}>
                  {message.text}
                </p>
              )}

              {/* Buttons */}
              <div className="flex flex-col sm:flex-row justify-end gap-3 pt-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full h-14 rounded-xl text-[#333333] font-medium transition-colors hover:opacity-90 sm:max-w-[43.75rem] disabled:opacity-50"
                  style={{
                    border: "2px solid transparent",
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(to bottom, #3198A0, #51F909)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "padding-box, border-box",
                  }}
                >
                  {loading ? "Submitting..." : "Submit Booking"}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setValues({ applicantName: "", phoneNumber: "", eventDate: "", slotId: "", kabinNama: null });
                    setMessage({ text: "", type: "" });
                  }}
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
