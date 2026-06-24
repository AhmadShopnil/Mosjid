'use client'
import { useState, useEffect } from "react";
import SectionTitleRow from "@/components/SectionTitleRow/SectionTitleRow";
import axiosInstance from "@/helper/axiosInstance";
import { useAuth } from "@/context/AuthContext";

const Booking = ({ slots = [], onBookingSubmitted, onActionClick }) => {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [values, setValues] = useState({
    applicantName: "",
    phoneNumber: "",
    eventDate: "",
    slotId: "",
    kabinNama: null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });
  const [dynamicSlots, setDynamicSlots] = useState([]);
  const [loadingSlots, setLoadingSlots] = useState(false);
  const [kabinNamaPreview, setKabinNamaPreview] = useState(null);

  useEffect(() => {
    const fetchSlots = async () => {
      if (!values.eventDate) {
        setDynamicSlots([]);
        return;
      }
      try {
        setLoadingSlots(true);
        const res = await axiosInstance.get('/slots', {
          params: { booked_date: values.eventDate, type: 'marriage' }
        });
        if (res.data && res.data.slots) {
          setDynamicSlots(res.data.slots);
        } else {
          setDynamicSlots([]);
        }
      } catch (err) {
        console.error("Failed to fetch slots:", err);
        setDynamicSlots([]);
      } finally {
        setLoadingSlots(false);
      }
    };
    fetchSlots();
  }, [values.eventDate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => {
      const newValues = { ...prev, [name]: value };
      if (name === "eventDate") {
        newValues.slotId = ""; // Reset slot when date changes
      }
      return newValues;
    });
  };

  const handleFileChange = (e) => {
    const { name } = e.target;
    const file = e.target.files[0];
    setValues((prev) => ({ ...prev, [name]: file }));

    if (name === "kabinNama") {
      if (file && file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setKabinNamaPreview(reader.result);
        };
        reader.readAsDataURL(file);
      } else {
        setKabinNamaPreview(null);
      }
    }
  };

  // Find the selected slot to display start/end time
  const selectedSlot = dynamicSlots.find((s) => s.id === Number(values.slotId));

  const handleSubmit = async (e) => {

    console.log("selectedSlot", selectedSlot);
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
      formData.append("slot_id", selectedSlot?.id || "");
      formData.append("informations[others][applicant_name]", values.applicantName);
      formData.append("informations[others][phone_number]", values.phoneNumber);
      formData.append("informations[attached][kabin_nama]", values.kabinNama);


      // console.log("Booking formData before api call", formData);

      const bookingResponse = await axiosInstance.post("/marriage", formData);
      console.log("Booking Response", bookingResponse);

      setMessage({ text: "Booking submitted successfully!", type: "success" });
      setValues({ applicantName: "", phoneNumber: "", eventDate: "", slotId: "", kabinNama: null });
      setKabinNamaPreview(null);

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

        <div className="bg-orange-50/30 flex items-center justify-center p-0 md:p-2 lg:p-6 rounded-2xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full">
            {/* LEFT */}
            <div className="flex flex-col">
              <p className="text-[#B98C20] mb-6">
                "Lorem ipsum" is not a real address but a standard dummy text
                used in design and publishing to demonstrate layout.
              </p>

              <div className="rounded-[30px] p-4 lg:p-6 shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] mt-auto flex flex-wrap justify-around 
              items-end gap-3">
                {[
                  { label: "Booking List\n", label2: "予約一覧", icon: "bookingIcon.svg" },
                  { label: "My Applications\n", label2: "私のアプリケーション", icon: "mariage.svg" },
                  { label: "Marriage Guideline\n", label2: "結婚ガイドライン", icon: "mariage.svg" },
                ].map((item, i) => (
                  <div
                    key={i}
                    onClick={() => onActionClick && onActionClick(item.label)}
                    className="flex flex-col items-center text-center cursor-pointer hover:opacity-80 transition"
                  >
                    <img
                      src={`/images/offerServices/marriageFacilities/${item.icon}`}
                      alt=""
                    />
                    <div className="text-[#B98C20] font-bold text-base whitespace-pre-wrap ">
                      <span>{item.label}</span>
                      <span className="">{item.label2}</span>
                      
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT */}
            {isAuthenticated ? (
              <form
                onSubmit={handleSubmit}
                className="space-y-5 text-[#B98C20]"
              >
                {/* Applicant Name */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                  <div className="grid grid-col-2 gap-0.5">
                    <label className="font-bold">Applicant Name</label>
                    <label className="font-bold">申請者名</label>
                  </div>

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
                  <div className="grid grid-col-2 gap-0.5">
                    <label className="font-bold">Phone Number</label>
                    <label className="font-bold">電話番号</label>
                  </div>

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
                  <div className="grid grid-col-2 gap-0.5">
                    <label className="font-bold">Event Date</label>
                    <label className="font-bold">イベント日</label>
                  </div>

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
                  <div className="grid grid-col-2 gap-0.5">
                    <label className="font-bold">Time Slot</label>
                    <label className="font-bold">開始時間</label>
                  </div>

                  <select
                    name="slotId"
                    value={values.slotId}
                    onChange={handleChange}
                    className={`sm:col-span-2 border-2 border-[#F7BA2A] rounded-xl px-4 h-14 bg-white/50 focus:outline-none appearance-none ${!values.eventDate || loadingSlots ? 'opacity-70 cursor-not-allowed' : ''}`}
                    disabled={!values.eventDate || loadingSlots}
                  >
                    <option value="" disabled>
                      {!values.eventDate
                        ? "Select event date first"
                        : loadingSlots
                          ? "Loading slots..."
                          : "Select a time slot"}
                    </option>
                    {dynamicSlots
                      .filter((slot) => slot.status === "1")
                      .map((slot) => {
                        const isBooked = slot.slot_trace_count >= 1;
                        return (
                          <option
                            key={slot.id}
                            value={slot.id}
                            disabled={isBooked}
                            className={isBooked ? "text-red-500 font-semibold bg-red-50" : "text-green-700"}
                          >
                            {slot.name} ({slot.start_time} - {slot.end_time}) {isBooked ? "- Already Booked" : ""}
                          </option>
                        );
                      })}
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
                  <div className="grid grid-col-2 gap-0.5">
                    <label className="font-bold">Kabin Nama</label>
                    <label className="font-bold">カビン・ナマ</label>
                  </div>

                  <div className="sm:col-span-2 flex flex-col gap-3">
                    <input
                      key={values.kabinNama ? "has-file" : "no-file"}
                      name="kabinNama"
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.jpg,.jpeg,.png"
                      className="border-2 border-[#F7BA2A] rounded-xl px-4 py-3 bg-white/50 focus:outline-none w-full"
                    />
                    {kabinNamaPreview && (
                      <div className="mt-2">
                        <img
                          src={kabinNamaPreview}
                          alt="Kabin Nama Preview"
                          className="h-16 object-contain border border-gray-300 rounded-lg p-1 bg-white"
                        />
                      </div>
                    )}
                  </div>
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
                    className="w-full h-14 rounded-xl text-[#333333] font-medium transition-colors
                     hover:opacity-90 sm:max-w-[43.75rem] disabled:opacity-50 cursor-pointer"
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
                      setKabinNamaPreview(null);
                      setMessage({ text: "", type: "" });
                    }}
                    className="border border-[#FF0000] text-[#FF0000] bg-[#FFE9E9] h-14 w-full sm:max-w-[22.75rem] rounded-xl font-medium hover:bg-red-50 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-6 text-center bg-white/60 p-8 rounded-2xl h-full shadow-inner border border-orange-100 w-full min-h-[400px]">
                <div className="text-4xl p-4 rounded-full bg-white text-[#B98C20] shadow-sm">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-[#B98C20]">Authentication Required</h3>
                <p className="text-gray-700 text-base max-w-md">
                  Please log in or register an account to continue with Marriage booking.
                </p>
                <button
                  type="button"
                  onClick={() => openAuthModal("login")}
                  className="bg-[#58b847] hover:bg-[#4a9f3b] text-white px-10 py-3 rounded-xl font-bold transition-all shadow-md mt-4 cursor-pointer"
                >
                  Quick Login / Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Booking;
