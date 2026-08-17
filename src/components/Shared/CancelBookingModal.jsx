'use client';
import React from 'react';

/**
 * CancelBookingModal – reusable confirmation dialog for cancelling a booking.
 *
 * Props:
 *  isOpen      {boolean}   – controls visibility
 *  onClose     {function}  – called when user dismisses (Cancel / overlay click)
 *  onConfirm   {function}  – called when user confirms; receives no arguments
 *  isLoading   {boolean}   – shows spinner on confirm button while API is pending
 *  title       {string}    – optional modal title
 *  message     {string}    – optional body message
 */
const CancelBookingModal = ({
  isOpen,
  onClose,
  onConfirm,
  isLoading = false,
  title = 'Cancel Booking',
  message = 'Are you sure you want to cancel this booking? This action cannot be undone.',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={!isLoading ? onClose : undefined}
      />

      {/* Panel */}
      <div className="relative z-10 bg-white rounded-2xl shadow-2xl w-full max-w-md mx-4 overflow-hidden">
        {/* Red accent top bar */}
        <div className="h-1.5 bg-gradient-to-r from-red-400 to-red-600 w-full" />

        <div className="p-6">
          {/* Icon */}
          <div className="flex items-center justify-center w-14 h-14 rounded-full bg-red-50 mx-auto mb-4">
            <svg className="w-7 h-7 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round"
                d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
              />
            </svg>
          </div>

          <h3 className="text-lg font-bold text-gray-800 text-center mb-2">{title}</h3>
          <p className="text-sm text-gray-500 text-center leading-relaxed mb-6">{message}</p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Keep Booking
            </button>
            <button
              onClick={onConfirm}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 rounded-full bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors disabled:opacity-70 cursor-pointer inline-flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                  </svg>
                  Cancelling…
                </>
              ) : (
                'Yes, Cancel'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelBookingModal;
