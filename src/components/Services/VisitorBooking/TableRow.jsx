import GetStatusBadge, { isBookingExpired } from "@/components/Shared/GetStatusBadge";

export default function VisiTorTableRow({ item, i, showStatus, onCancelClick }) {
  const cell =
    "border border-gray-300 px-3 py-2 text-center text-sm " +
    "overflow-x-auto whitespace-nowrap";

  const slCell =
    "border border-gray-300 px-2 py-2 text-center text-sm " +
    "w-[40px] min-w-[40px] max-w-[60px]";

  const getStatusBadge = (app) => {
const status = app?.status;

  const expired = isBookingExpired(
    app?.booked_date || app?.intended_date || app?.visit_date ,
    app?.start_time,
    app?.end_time
  );

  
  // console.log("status",app?.visit_date)
  if (status == 4 || status == "4"  ) {
  
    return (
      <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
        Cancelled
      </span>
    );
  }

  if (status == 2) {
    return (
      <span className="bg-red-100 text-red-700 text-xs font-semibold px-3 py-1 rounded-full">
        Rejected
      </span>
    );
  }
   if (status == 3) {
    return (
      <span className="bg-green-200 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
        Visited
      </span>
    );
  }

  if (expired && !app?.form_status == 1) {
    return (
      <span className="bg-yellow-100 text-red-500 text-xs font-semibold px-3 py-1 rounded-full">
        Expired
      </span>
    );
  }

  if (status == 1) {
    return (
      <span className="bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
        Approved
      </span>
    );
  }
  
 

  return (
    <span className="bg-yellow-100 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">
      Pending
    </span>
  );
  };

  const actionTake = (booking) => {

    const expired = isBookingExpired(
      booking?.visit_date || booking?.booked_date,
      booking?.start_time,
      booking?.end_time
    );

    // console.log("actionTake expired", expired)

    if (booking?.status == "0" && !expired) {
      return (
        <button
          className="bg-red-500 hover:bg-red-600 text-white text-xs font-semibold px-4 py-1.5 rounded-full transition-colors cursor-pointer"
          onClick={() => onCancelClick && onCancelClick(booking)}
        >
          Cancel
        </button>
      );
    }
    return <span className="text-gray-400">—</span>;
  };

  return (
    <tr className={`${i % 2 === 0 ? "bg-white" : "bg-[#E5F5DE]"} h-[42px]`}>
      {/* SL column */}
      {/* <td className={slCell}>{String(i + 1).padStart(2, "0")}</td> */}

      {/* Other columns */}
         
       <td className={cell}>{item?.full_name || "—"}</td>
      <td className={cell}>{item?.visit_date || "—"}</td>
      <td className={cell}>{item?.start_time || "—"}</td>
      <td className={cell}>{item?.end_time ? `${item.end_time} ${item.hours ? `(${item.hours}h)` : ''}` : (item.hours ? `${item.hours}h` : "—")}</td>
      <td className={cell}>{item?.purpose_visit || "—"}</td>
      <td className={cell}>{item?.program_request || "—"}</td>

      {showStatus && (
        <>
          <td className={cell}>
            {/* <GetStatusBadge app={item} /> */}
            {getStatusBadge(item)}

          </td>
          <td className={cell}>{actionTake(item)}</td>
        </>
      )}
    </tr>
  );
}
