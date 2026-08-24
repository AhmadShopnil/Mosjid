import React from 'react';

export default function FormFile({ name, label, value, onChange, required = false, accept }) {
  // value is expected to be a File object if a file is selected
  
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-[#00401A]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative flex items-center justify-center w-full">
        <label
          htmlFor={name}
          className="flex flex-col items-center justify-center w-full h-32 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-100 hover:border-[#3198A0] transition-all cursor-pointer overflow-hidden relative group"
        >
          {value && value instanceof File ? (
            <div className="flex flex-col items-center justify-center p-4 text-center">
              <div className="bg-[#3198A0]/10 p-3 rounded-full mb-2 group-hover:bg-[#3198A0]/20 transition-colors">
                <svg className="w-6 h-6 text-[#3198A0]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-sm font-semibold text-[#00401A] truncate max-w-[200px]">
                {value.name}
              </p>
              <p className="text-xs text-gray-500 mt-1">Click to change file</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-8 h-8 mb-3 text-gray-400 group-hover:text-[#3198A0] transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold text-[#3198A0]">Click to upload</span> or drag and drop
              </p>
              <p className="text-xs text-gray-400">PNG, JPG, PDF (Max 5MB)</p>
            </div>
          )}
          
          <input
            id={name}
            name={name}
            type="file"
            accept={accept}
            onChange={onChange}
            required={required && !value} 
            className="hidden"
          />
        </label>
      </div>
    </div>
  );
}
