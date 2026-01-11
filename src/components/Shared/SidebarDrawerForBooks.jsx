"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";

import SubmitRequest from "../Fatwah/SubmitRequest";
import { MdArrowForwardIos } from "react-icons/md";
import AskQuestionSidebar from "../Fatwah/AskQuestionSidebar";
import SidebarForBooks from "./SidebarForBooks";
import MajhabSelection from "../Fatwah/MajhabSelection";

export default function SidebarDrawerForBooks({
  isMajhabShow = true,
  books,
  isFatwah_Dictionary_Filter = false,
  isFatwahNavigate = false,
  isAskQuestion = false,
  isSubmitRequest = true,
  setSelectedCat = null,
  isNavigate = false,
  directoryNavigate = false,
  dataForContact = "",
  data_for_filter,
  icon
}) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Floating Arrow Toggle (visible when closed) */}
      {!isDrawerOpen && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="
            fixed top-1/2 -translate-y-1/2 left-0 z-[60]
            flex items-center justify-center w-10 h-10
            bg-[#EEF8E9] border border-[#C9E9BA] rounded-r-2xl
            shadow-md hover:bg-[#E2F4D9]
            transition-transform duration-300 lg:hidden 
          "
        >
          <MdArrowForwardIos />
        </button>
      )}

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer itself */}
      <div
        className={`
          fixed top-0 left-0 z-[1000] lg:z-[50] h-full w-[85%] max-w-[380px] bg-white shadow-lg
          transform transition-transform duration-300
          ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-[400px] lg:shadow-none
          flex flex-col
        `}
      >
        {/* Header */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-[#C9E9BA]">
          <h3 className="text-lg font-semibold text-[#00401A]">Menu</h3>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-md bg-[#EEF8E9]"
          >
            <ArrowLeft size={24} className="text-[#00401A]" />
          </button>
        </div>

        {/* Entire content scrollable */}
        <div className="flex-1 overflow-y-auto p-4 xl:p-0 space-y-6">
          {isMajhabShow && <div className="w-full bg-white rounded-[20px] border border-[#C9E9BA] overflow-hidden shadow-sm p-4">
            <MajhabSelection data_for_filter={data_for_filter} />
          </div>}


          {/* Category list */}
          <SidebarForBooks
            books={books}
            setSelectedCat={setSelectedCat}
            isFatwah_Dictionary_Filter={isFatwah_Dictionary_Filter}
            isFatwahNavigate={isFatwahNavigate}
            isNavigate={isNavigate}
            directoryNavigate={directoryNavigate}
            setIsDrawerOpen={setIsDrawerOpen}
            icon={icon}
          />

          {/* Shown below sidebar content */}

          {isSubmitRequest && <SubmitRequest dataForContact={dataForContact} />}
          {isAskQuestion && <AskQuestionSidebar />}
        </div>
      </div>
    </>
  );
}
