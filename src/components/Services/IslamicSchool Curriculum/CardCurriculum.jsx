"use client";

import React, { useState } from "react";

export default function CardCurriculum({
  curriculum,
  curriculumNo = "01",
}) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    language: "en",
  });

  const [modalData, setModalData] = useState("");

  // Open modal with selected description
  const openModal = (description, language) => {
    setModalData(description || "");

    setModalState({
      isOpen: true,
      language,
    });
  };

  // Close modal
  const closeModal = () => {
    setModalState({
      isOpen: false,
      language: "en",
    });

    setModalData("");
  };

  return (
    <div className="w-full">
      {/* =====================================================
          LARGE SCREEN
      ====================================================== */}
      <div className="hidden lg:block h-[500px]">
        <div className="relative bg-[#EEF8E9] w-full h-[350px] border-8 border-[#FFCE4D] rounded-[110px]">

          {/* Header */}
          <div className="absolute left-20 right-20 top-6 flex justify-between">
            {/* Left Header */}
            <div className="flex gap-8">
              <span className="text-[60px] font-bold text-[#B98C20]">
                {curriculumNo}
              </span>

              <div className="space-y-1 pt-4">
                <p className="text-[20px] font-semibold text-[#B98C20]">
                  {curriculum?.title}
                </p>

                <p className="text-[20px] font-semibold text-[#B98C20]">
                  {curriculum?.short_description}
                </p>
              </div>
            </div>

            {/* Right Header */}
            <div className="space-y-1 pt-4 text-right">
              <p className="text-[20px] font-semibold text-[#B98C20]">
                {curriculum?.sub_title}
              </p>

              <p className="text-[20px] font-semibold text-[#B98C20]">
                {curriculum?.description}
              </p>
            </div>
          </div>

          {/* Cards Container */}
          <div className="absolute bg-white rounded-tl-[60px] w-[90%] h-[220px] -right-2 -bottom-2">
            <div
              className="w-full h-[221px] flex justify-end relative
              border-8 border-l-[#FFCE4D] border-t-[#FFCE4D]
              border-b-white border-r-white rounded-tl-[60px]"
            >
              <div className="absolute w-[98%] top-8">
                <div className="flex flex-wrap gap-2">
                  {curriculum?.item_lists?.map((data, i) => (
                    <Card
                      key={i}
                      data={data}
                      onOpenModal={openModal}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =====================================================
          MOBILE / SMALL SCREEN
      ====================================================== */}
      <div
        className="lg:hidden bg-[#EEF8E9] border-4 border-[#FFCE4D]
        rounded-[30px] p-4 space-y-4"
      >
        {/* Header */}
        <div className="flex justify-between items-start">
          {/* Left */}
          <div className="flex gap-3 mb-6">
            <span className="text-[36px] font-bold text-[#B98C20]">
              {curriculumNo}
            </span>

            <div>
              <p className="text-[16px] font-semibold text-[#B98C20]">
                {curriculum?.title}
              </p>

              <p className="text-[14px] text-[#B98C20]">
                {curriculum?.short_description}
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="text-right">
            <p className="text-[15px] font-semibold text-[#B98C20]">
              {curriculum?.sub_title}
            </p>

            <p className="text-[13px] text-[#B98C20]">
              {curriculum?.description}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="space-y-6">
          {curriculum?.item_lists?.map((data, i) => (
            <Card
              key={i}
              data={data}
              onOpenModal={openModal}
            />
          ))}
        </div>
      </div>

      {/* =====================================================
          MODAL
      ====================================================== */}
      {modalState.isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center
          p-4 bg-black/60 backdrop-blur-sm"
          onClick={closeModal}
        >
          {/* Modal Box */}
          <div
            className="relative w-full max-w-3xl max-h-[90vh]
            bg-white rounded-[30px] border-4 border-[#FFCE4D]
            shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* =================================================
                CLOSE BUTTON
            ================================================== */}
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 z-10
              w-10 h-10 flex items-center justify-center
              bg-red-50 text-red-500
              hover:bg-red-500 hover:text-white
              rounded-full font-bold text-2xl
              transition-all shadow cursor-pointer"
            >
              &times;
            </button>

            {/* =================================================
                MODAL HEADER
            ================================================== */}
            <div
              className="text-center px-6 md:px-10 pt-8 pb-6
              border-b-2 border-gray-100"
            >
              {/* Curriculum Number */}
              <span
                className="block text-[45px] md:text-[50px]
                font-bold text-[#B98C20] mb-1"
              >
                {curriculumNo}
              </span>

              {/* Title */}
              <h2
                className="text-[24px] md:text-[32px]
                font-bold text-[#005312]
                leading-tight"
              >
                {curriculum?.title}
              </h2>

              {/* Short Description */}
              {/* <p
                className="mt-2 text-[16px] md:text-[20px]
                font-medium text-[#B98C20]"
              >
                {curriculum?.short_description}
              </p> */}

              {/* Language Badge */}
              <span
                className="inline-block mt-4
                px-4 py-1 rounded-full
                bg-[#EEF8E9] text-[#3E8B18]
                text-sm font-semibold"
              >
                {modalState.language === "ja"
                  ? "Japanese"
                  : "English"}
              </span>
            </div>

            {/* =================================================
                MODAL CONTENT
            ================================================== */}
            <div
              className="px-6 md:px-10 py-6
              max-h-[55vh] overflow-y-auto"
            >
              <div
                className="text-gray-700
                text-[16px] md:text-[18px]
                leading-8 whitespace-pre-line"
              >
                {modalData ? (
                  modalData
                ) : (
                  <p className="text-center text-gray-400">
                    No description available.
                  </p>
                )}
              </div>
            </div>

            {/* =================================================
                MODAL FOOTER
            ================================================== */}
            <div
              className="flex justify-end
              px-6 md:px-10 py-4
              border-t border-gray-100"
            >
              <button
                type="button"
                onClick={closeModal}
                className="px-6 py-2
                rounded-[10px]
                bg-[#52B920]
                hover:bg-[#439c19]
                text-white font-semibold
                transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


/* ============================================================
   CARD COMPONENT
============================================================ */

function Card({
  data,
  showButtons = true,
  onOpenModal,
}) {
  return (
    <div className="h-full flex flex-col w-[49%]">

      {/* =====================================================
          CARD CONTENT
      ====================================================== */}
      <div
        className={`
          w-full
          bg-white
          relative
          pt-5
          border-x-2
          border-t-2
          border-[#005312]
          rounded-tl-[20px]
          rounded-tr-[20px]
          flex-grow

          ${
            !showButtons
              ? `
                border-b-2
                rounded-bl-[20px]
                rounded-br-[20px]
                shadow-sm
                pb-4
              `
              : ""
          }
        `}
      >
        {/* Card Title */}
        <div
          className="absolute
          left-1/2
          -translate-x-1/2
          px-3
          py-1.5
          text-white
          text-[13px]
          font-medium
          whitespace-nowrap
          bg-[#52B920]
          rounded-[10px]"
          style={{
            top: "-18px",
          }}
        >
          <span className="text-[15px] lg:text-[18px]">
            {data?.title?.en}
          </span>
        </div>

        {/* =================================================
            LIST ITEMS
        ================================================== */}
        <div className="px-4 pt-5 pb-4">
          <ul className="space-y-2">
            {data?.items?.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3
                border-b border-b-[#E0E0E0]
                pb-3 last:border-b-0"
              >
                {/* Bullet */}
                <span
                  className="w-4 h-4
                  rounded-full
                  flex-shrink-0
                  bg-[#52B920]"
                />

                {/* Item */}
                <span
                  className="text-[#333333]
                  text-[15px] lg:text-[18px]
                  leading-snug"
                >
                  {item?.en}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* =====================================================
          BUTTONS
      ====================================================== */}
      {showButtons && (
        <div
          className="flex gap-2
          bg-white
          p-3
          border-t-2
          border-[#C9E9BA]
          shadow-xl
          rounded-bl-[20px]
          rounded-br-[20px]"
        >
          {/* =================================================
              ENGLISH BUTTON
          ================================================== */}
          <button
            type="button"
            aria-label="view details"
            onClick={() =>
              onOpenModal(
                data?.description?.en,
                "en"
              )
            }
            className="flex-1
            px-2 py-2
            text-[12px]
            lg:text-[14px]
            xl:text-[16px]
            text-[#3E8B18]
            font-bold
            rounded-[10px]
            bg-[#C9E9BA]
            hover:bg-[#b8dfa7]
            transition-colors
            cursor-pointer"
          >
            View in Details
          </button>

          {/* =================================================
              JAPANESE BUTTON
          ================================================== */}
          <button
            type="button"
            aria-label="view in japanese"
            onClick={() =>
              onOpenModal(
                data?.description?.jp,
                "ja"
              )
            }
            className="flex-1
            px-2 py-2
            text-[12px]
            lg:text-[14px]
            xl:text-[16px]
            font-bold
            text-white
            rounded-[10px]
            bg-[#52B920]
            hover:bg-[#439c19]
            transition-colors
            cursor-pointer"
          >
            View in Japanese
          </button>
        </div>
      )}
    </div>
  );
}