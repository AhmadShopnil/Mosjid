"use client";

import { useState, useRef } from "react";
import { Check } from "lucide-react";
import WasiyahForm from "./WasiyahForm";
import { wasiyahSections } from "./wasiyahFields";

const initialData = {};

wasiyahSections.forEach((section) => {
  section.fields.forEach((field) => {
    initialData[field.name] = field.type === "checkbox" ? false : "";
  });
});

export default function WasiyahApplication() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(initialData);
  const formTopRef = useRef(null);

  const currentSection = wasiyahSections[currentStep];

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
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
    console.log("Wasiyah:", formData);
    // API request here
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
            {wasiyahSections.map((section, index) => {
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
                  className={`flex items-center gap-4 rounded-xl p-4 text-left transition-all duration-300 ${
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
              className="w-full sm:w-auto rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-bold text-gray-600 transition-colors hover:bg-gray-50 disabled:invisible"
            >
              Back
            </button>

            {isLastStep ? (
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!formData.confirmation}
                className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-[#3198A0] to-[#51F909] px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#3198A0]/20 transition-all hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
              >
                Submit Wasiyah
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="w-full sm:w-auto rounded-xl bg-[#00401A] px-10 py-3.5 text-sm font-bold text-white shadow-lg shadow-[#00401A]/20 transition-all hover:bg-[#002B11] hover:scale-[1.02]"
              >
                Continue
              </button>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}