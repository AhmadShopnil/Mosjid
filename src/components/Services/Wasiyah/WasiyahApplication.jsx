"use client";

import { useState, useRef, useEffect } from "react";
import { Check } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/helper/axiosInstance";
import { useAuth } from "@/context/AuthContext";
import WasiyahForm from "./WasiyahForm";
import { wasiyahSections } from "./wasiyahFields";

const initialData = {};

wasiyahSections.forEach((section) => {
  section.fields.forEach((field) => {
    initialData[field.name] = field.type === "checkbox" ? false : "";
  });
});

  // Accept editData from parent
export default function WasiyahApplication({ editData, onSuccessfulSubmit }) {
  const { isAuthenticated, openAuthModal } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formTopRef = useRef(null);

  // When editData changes, populate form
  useEffect(() => {
    if (editData) {
      // Ensure we fill out all fields matching our structure
      const updatedData = { ...initialData, ...editData };
      setFormData(updatedData);
      setCurrentStep(0);
    }
  }, [editData]);

  const currentSection = wasiyahSections[currentStep];

  const updateField = (event) => {
    const { name, value, type, files } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const updateCheckbox = (name) => {
    setFormData((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  const scrollToForm = () => {
    if (formTopRef.current) {
      // Small offset for fixed headers
      const y = formTopRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const nextStep = () => {
    if (currentStep < wasiyahSections.length - 1) {
      setCurrentStep((prev) => prev + 1);
      scrollToForm();
    }
  };

  const previousStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      scrollToForm();
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const toastId = toast.loading(editData?.id ? "Updating Wasiyah..." : "Registering Wasiyah...");
    
    try {
      const payload = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        if (val !== null && val !== undefined) {
          // If boolean, pass as 1/0 or true/false depending on API. We'll use 1/0
          if (typeof val === 'boolean') {
            payload.append(key, val ? 1 : 0);
          } else {
            payload.append(key, val);
          }
        }
      });
      console.log("payload",payload)

      if (editData?.id) {
        // Update (Method spoofing for PUT with FormData in Laravel)
        payload.append("_method", "PUT");
        await axiosInstance.post(`/wasiyat/${editData.id}`, payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Wasiyah updated successfully!", { id: toastId });
      } else {
        // Create
        await axiosInstance.post("/wasiyat", payload, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Wasiyah registered successfully!", { id: toastId });
      }

      setFormData(initialData);
      setCurrentStep(0);
      if (onSuccessfulSubmit) onSuccessfulSubmit();

    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "An error occurred.", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isLastStep = currentStep === wasiyahSections.length - 1;

  // Calculate overall progress percentage
  const progressPercentage = ((currentStep + 1) / wasiyahSections.length) * 100;

  return (
    <div className="w-full" ref={formTopRef}>
      
      {/* Header */}
      <div className="mb-6 lg:mb-10 text-center lg:text-left">
        <h2 className="text-2xl lg:text-3xl font-bold text-[#00401A]">
          Wasiyah Registration / ワシヤ（遺言）の登録
        </h2>
        <p className="mt-2 text-sm text-gray-500 font-medium">
          Please provide your information and wishes carefully.
        </p>
      </div>

      {isAuthenticated ? (
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Left Sidebar: Stepper */}
          <div className="w-full lg:w-1/3 xl:w-1/4 shrink-0">
          
          {/* Mobile Progress Bar (hidden on desktop) */}
          <div className="lg:hidden mb-6">
            <div className="flex justify-between items-end mb-2">
              <span className="text-sm font-bold text-[#00401A]">Step {currentStep + 1} of {wasiyahSections.length}</span>
              <span className="text-xs font-medium text-gray-500">{Math.round(progressPercentage)}%</span>
            </div>
            <div className="h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#3198A0] to-[#51F909] transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
          </div>

          {/* Desktop/Tablet Vertical Stepper List */}
          <div className="hidden lg:flex flex-col gap-2">
            {wasiyahSections?.map((section, index) => {
              const isActive = index === currentStep;
              const isPast = index < currentStep;

              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => {
                    setCurrentStep(index);
                    scrollToForm();
                  }}
                  className={`flex items-center gap-4 rounded-xl p-4 text-left transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-gradient-to-r from-[#3198A0]/10 to-[#51F909]/10 border border-[#3198A0]/20 shadow-sm"
                      : "hover:bg-gray-50 border border-transparent"
                  }`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                      isActive
                        ? "bg-[#3198A0] text-white shadow-md shadow-[#3198A0]/30"
                        : isPast
                        ? "bg-[#3198A0]/20 text-[#3198A0]"
                        : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {isPast ? <Check className="h-4 w-4" /> : index + 1}
                  </div>
                  <span
                    className={`text-sm font-semibold transition-colors ${
                      isActive
                        ? "text-[#00401A]"
                        : isPast
                        ? "text-gray-700"
                        : "text-gray-400"
                    }`}
                  >
                    {section.title}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Content: Form Container */}
        <div className="w-full flex-1">
          {/* Main Form Block */}
          <div className="mb-6">
            <WasiyahForm
              section={currentSection}
              data={formData}
              updateField={updateField}
              updateCheckbox={updateCheckbox}
            />
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={previousStep}
              disabled={currentStep === 0}
              className="w-full sm:w-auto rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-bold text-gray-600 
              transition-colors hover:bg-gray-50 disabled:invisible cursor-pointer"
            >
              Back
            </button>

            {isLastStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.confirmation || isSubmitting}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#3198A0] to-[#51F909] px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#3198A0]/20 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </>
                ) : (
                  editData?.id ? "Update Wasiyah" : "Submit Wasiyah"
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto rounded-xl bg-[#00401A] px-10 py-3.5 text-sm font-bold text-white shadow-lg
                 shadow-[#00401A]/20 transition-all hover:bg-[#002B11] hover:scale-[1.02] cursor-pointer"
              >
                Continue
              </button>
            )}
          </div>
        </div>
      </div>
      ) : (
        <div className="flex flex-col items-center justify-center space-y-6 text-center bg-white/60 p-8 rounded-2xl h-full shadow-inner border border-green-100 w-full min-h-[400px]">
          <div className="text-4xl p-4 rounded-full bg-white text-[#00401A] shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
          </div>
          <h3 className="text-2xl font-bold text-[#00401A]">Authentication Required</h3>
          <p className="text-gray-700 text-base max-w-md">
            Please log in or register an account to continue with Wasiyah Registration.
          </p>
          <button
            type="button"
            onClick={() => openAuthModal("login")}
            className="bg-[#00401A] hover:bg-[#002B11] text-white px-10 py-3 rounded-xl font-bold transition-all shadow-md mt-4 cursor-pointer"
          >
            Quick Login / Register
          </button>
        </div>
      )}
    </div>
  );
}