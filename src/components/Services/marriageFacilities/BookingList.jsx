import React from "react";

const bookings = [
  { id: "01", applicant: "Marriage Ceremony", type: "Marriage", date: "11-15-2025", start: "2:56", end: "04:00" },
  { id: "02", applicant: "Marriage Ceremony", type: "Marriage", date: "11-15-2025", start: "2:56", end: "04:00" },
  { id: "03", applicant: "Marriage Ceremony", type: "Marriage", date: "11-15-2025", start: "2:56", end: "04:00" },
  { id: "04", applicant: "Marriage Ceremony", type: "Marriage", date: "11-15-2025", start: "2:56", end: "04:00" },
];

const BookingList = () => {
  return (
    <div className="w-full rounded-2xl border border-green-400 p-6 bg-white">
      {/* Title */}
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Booking List</h2>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse min-w-[600px]">
          <thead>
            <tr>
              {["Sl. No.", "Applicant Name", "Event Type", "Event Date", "Start Time", "End Time"].map((head) => (
                <th key={head}>
                  <div className="bg-[#52B920] text-white border border-[#B0C4B8] font-bold rounded-t-full py-1.5 text-center whitespace-nowrap">
                    {head}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={booking.id}
                className={index % 2 === 0 ? "bg-white" : "bg-[#52B920]/40"}
              >
                <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{booking.id}</td>
                <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{booking.applicant}</td>
                <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{booking.type}</td>
                <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{booking.date}</td>
                <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{booking.start}</td>
                <td className="py-2 px-2 border-r border-l border-r-[#B0C4B8] border-l-[#B0C4B8] text-center whitespace-nowrap">{booking.end}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookingList;
