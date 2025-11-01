"use client";

import { ArrowRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import Sidebar from "./Sidebar";
import SubmitRequest from "../Fatwah/SubmitRequest";
import { MdArrowForwardIos } from "react-icons/md";
import AskQuestionSidebar from "../Fatwah/AskQuestionSidebar";

export default function SidebarMainDrawer({
  categories,
  isAskQuestion = false,
  isSubmitRequest = true, setSelectedCat = null,
  isNavigate = false }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      {/* Floating Arrow Toggle (over main content) */}
      {!isDrawerOpen && (
        <button
          onClick={() => setIsDrawerOpen(!isDrawerOpen)}
          className={`
          fixed top-1/2 -translate-y-1/2 left-0 z-[60]
          flex items-center justify-center w-10 h-10
          bg-[#EEF8E9] border border-[#C9E9BA] rounded-r-2xl
          shadow-md hover:bg-[#E2F4D9]
          transition-transform duration-300 lg:hidden
        `}
        >
          {isDrawerOpen ? (
            <MdArrowBackIosNew />
            //   <ArrowLeft size={18} className="text-[#00401A]" />
          ) : (
            <MdArrowForwardIos />
            //   <ArrowRight size={18} className="text-[#00401A]" />
          )}
        </button>
      )}

      {/* Overlay */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setIsDrawerOpen(false)}
        />
      )}

      {/* Drawer itself (slides in from left, over content) */}
      <div
        className={`fixed top-0 left-0 z-50 h-full w-[85%] max-w-[380px] bg-white shadow-lg transform transition-transform duration-300
          ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
          lg:translate-x-0 lg:static lg:w-[400px] lg:shadow-none
        `}
      >
        {/* Drawer Header */}
        <div className="lg:hidden flex justify-between items-center p-4 border-b border-[#C9E9BA]">
          <h3 className="text-lg font-semibold text-[#00401A]">Menu</h3>
          <button
            onClick={() => setIsDrawerOpen(false)}
            className="p-2 rounded-md bg-[#EEF8E9]"
          >
            <ArrowLeft size={24} className="text-[#00401A]" />
          </button>
        </div>

        {/* Sidebar + SubmitRequest */}
        <div className="h-full overflow-y-auto p-4 xl:p-0 space-y-6">
          <Sidebar
            categories={categories}
            setSelectedCat={setSelectedCat}
            isNavigate={isNavigate} />
          {isAskQuestion && <AskQuestionSidebar />}
          {isSubmitRequest && <SubmitRequest />}

        </div>
      </div>
    </>
  );
}
