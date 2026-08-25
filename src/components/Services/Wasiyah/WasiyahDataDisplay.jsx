import React from 'react'

export default function WasiyahDataDisplay({ version }) {
    return (
        <div className="px-2 md:px-4 pb-4 pt-2 border-t border-gray-50 bg-gray-50/30">
            <h4 className="text-xl font-bold text-gray-500 uppercase tracking-wider mb-5">
                Wasiyah Informations
            </h4>

            {/* ================= Applicant Info ================= */}
            <div className="text-sm font-medium text-gray-700 mb-6">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Applicant Info
                </h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span>Full Name:</span>
                    <span>{version.data?.fullName || "-"}</span>

                    <span>Japanese Name:</span>
                    <span>{version.data?.japaneseName || "-"}</span>

                    <span>Father’s Name:</span>
                    <span>{version.data?.fatherName || "-"}</span>

                    <span>Passport No:</span>
                    <span>{version.data?.passportNo || "-"}</span>

                    <span>I.D Card No:</span>
                    <span>{version.data?.idCardNo || "-"}</span>

                    <span>Date of Birth:</span>
                    <span>{version.data?.dateOfBirth || "-"}</span>

                    <span>Gender:</span>
                    <span>{version.data?.gender || "-"}</span>

                    <span>Nationality:</span>
                    <span>{version.data?.nationality || "-"}</span>

                    <span>Phone Number:</span>
                    <span>{version.data?.phone || "-"}</span>

                    <span>Email Address:</span>
                    <span>{version.data?.email || "-"}</span>

                    <span>Current City / Prefecture:</span>
                    <span>{version.data?.currentCity || "-"}</span>

                    <span>Address in Japan:</span>
                    <span>{version.data?.addressInJapan || "-"}</span>
                </div>
            </div>

            {/* ================= Islamic Information ================= */}
            <div className="text-sm font-medium text-gray-700 mb-6">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Islamic Information
                </h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span>Muslim Name:</span>
                    <span>{version.data?.muslimName || "-"}</span>

                    <span>Date of Shahadah:</span>
                    <span>{version.data?.shahadahDate || "-"}</span>

                    <span>Location of Shahadah:</span>
                    <span>{version.data?.shahadahLocation || "-"}</span>

                    <span>Masjid / Community Affiliation:</span>
                    <span>{version.data?.community || "-"}</span>

                    <span>Preferred Islamic Burial Arrangement:</span>
                    <span>{version.data?.preferredBurialArrangement || "-"}</span>
                </div>
            </div>

            {/* ================= Burial Wishes ================= */}
            <div className="text-sm font-medium text-gray-700 mb-6">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Burial Wishes
                </h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span>Ghusl (Washing):</span>
                    <span>
                        {version.data?.ghusl ? "Yes" : "No"}
                    </span>

                    <span>Kafan:</span>
                    <span>
                        {version.data?.kafan ? "Yes" : "No"}
                    </span>

                    <span>Janazah Prayer:</span>
                    <span>
                        {version.data?.janazah ? "Yes" : "No"}
                    </span>

                    <span>Muslim Cemetery:</span>
                    <span>
                        {version.data?.muslimCemetery ? "Yes" : "No"}
                    </span>

                    <span>Burial in Japan:</span>
                    <span>
                        {version.data?.burialInJapan ? "Yes" : "No"}
                    </span>

                    <span>Burial Outside Japan:</span>
                    <span>
                        {version.data?.burialOutsideJapan ? "Yes" : "No"}
                    </span>

                    <span>No Cremation:</span>
                    <span>
                        {version.data?.noCremation ? "Yes" : "No"}
                    </span>

                    <span>Osaka Masjid Funeral Assistance:</span>
                    <span>
                        {version.data?.osakaMasjidAssistance ? "Yes" : "No"}
                    </span>

                    <span>Other Wishes:</span>
                    <span>{version.data?.otherBurialWishes || "-"}</span>
                </div>
            </div>

            {/* ================= Emergency Contact ================= */}
            <div className="text-sm font-medium text-gray-700 mb-6">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Emergency Contact
                </h2>

                <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Contact 1
                </h3>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                    <span>Full Name:</span>
                    <span>{version.data?.contact1Name || "-"}</span>

                    <span>Relationship:</span>
                    <span>{version.data?.contact1Relationship || "-"}</span>

                    <span>Phone:</span>
                    <span>{version.data?.contact1Phone || "-"}</span>

                    <span>Email:</span>
                    <span>{version.data?.contact1Email || "-"}</span>

                    <span>Address:</span>
                    <span>{version.data?.contact1Address || "-"}</span>
                </div>

                <h3 className="text-base font-semibold text-gray-800 mb-2">
                    Contact 2
                </h3>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span>Full Name:</span>
                    <span>{version.data?.contact2Name || "-"}</span>

                    <span>Relationship:</span>
                    <span>{version.data?.contact2Relationship || "-"}</span>

                    <span>Phone:</span>
                    <span>{version.data?.contact2Phone || "-"}</span>

                    <span>Email:</span>
                    <span>{version.data?.contact2Email || "-"}</span>

                    <span>Address:</span>
                    <span>{version.data?.contact2Address || "-"}</span>
                </div>
            </div>

            {/* ================= Religious Matters ================= */}
            <div className="text-sm font-medium text-gray-700 mb-6">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Religious Matters
                </h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span>Missed Salah - Fajr:</span>
                    <span>{version.data?.missedSalahFajr || "-"}</span>

                    <span>Missed Salah - Dhuhr:</span>
                    <span>{version.data?.missedSalahDhuhr || "-"}</span>

                    <span>Missed Salah - Asr:</span>
                    <span>{version.data?.missedSalahAsr || "-"}</span>

                    <span>Missed Salah - Maghrib:</span>
                    <span>{version.data?.missedSalahMaghrib || "-"}</span>

                    <span>Missed Salah - Isha:</span>
                    <span>{version.data?.missedSalahIsha || "-"}</span>

                    <span>Missed Salah - Witr:</span>
                    <span>{version.data?.missedSalahWitr || "-"}</span>

                    <span>Fasting:</span>
                    <span>{version.data?.fasting || "-"}</span>

                    <span>Zakah:</span>
                    <span>{version.data?.zakah || "-"}</span>

                    <span>Hajj:</span>
                    <span>{version.data?.hajj || "-"}</span>

                    <span>Fidya / Kaffarah:</span>
                    <span>{version.data?.fidyaKaffarah || "-"}</span>

                    <span>Sadaqah / Nafli Sadaqaat Instructions:</span>
                    <span>{version.data?.sadaqahInstructions || "-"}</span>
                </div>
            </div>

            {/* ================= Japan-Specific Burial Information ================= */}
            <div className="text-sm font-medium text-gray-700 mb-6">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Japan-Specific Burial Information
                </h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span>Preferred Muslim Cemetery:</span>
                    <span>{version.data?.preferredMuslimCemetery || "-"}</span>

                    <span>Preferred Burial Location:</span>
                    <span>{version.data?.preferredBurialLocation || "-"}</span>

                    <span>Do you have a burial reservation?</span>
                    <span>{version.data?.hasBurialReservation || "-"}</span>

                    <span>Cemetery Name:</span>
                    <span>{version.data?.cemeteryName || "-"}</span>

                    <span>Reservation / Reference Number:</span>
                    <span>{version.data?.reservationNumber || "-"}</span>
                </div>
            </div>

            {/* ================= Final Confirmation ================= */}
            <div className="text-sm font-medium text-gray-700 mb-2">
                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Final Confirmation
                </h2>

                <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                    <span>Signature:</span>
                    <span>
                        {version.data?.signature ? "Uploaded" : "-"}
                    </span>

                    <span>Date:</span>
                    <span>{version.data?.confirmationDate || "-"}</span>

                    <span>Confirmation:</span>
                    <span>
                        {version.data?.confirmation ? "Confirmed" : "Not Confirmed"}
                    </span>
                </div>
            </div>
        </div>
    )
}
