"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

export default function PolicyModal({ isOpen, onClose, slug, title }) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && slug) {
      // Future API Call goes here:
      // setLoading(true);
      // axiosInstance.get(`/policies/${slug}`).then(res => setContent(res.data.html)).finally(() => setLoading(false));

      // For now, use dummy data:
      setLoading(true);
      setTimeout(() => {
        setContent(`
          <div style="font-family: sans-serif; line-height: 1.6; color: #333;">
            <h3 style="color: #52B920; margin-bottom: 16px; font-size: 24px;">General Guidelines and Policies</h3>
            <p style="margin-bottom: 12px;">This is a demonstration of dynamically loaded HTML content for the requested slug: <strong>${slug}</strong>.</p>
            <ul style="margin-bottom: 12px; padding-left: 20px;">
              <li style="margin-bottom: 8px;">All applications must be submitted with correct documentation.</li>
              <li style="margin-bottom: 8px;">Management reserves the right to decline applications that do not meet the standard criteria.</li>
              <li style="margin-bottom: 8px;">Please ensure your contact details are accurate for further communication.</li>
            </ul>
            <p>For more specific questions regarding these rules, please reach out directly to the administration.</p>
          </div>
        `);
        setLoading(false);
      }, 500); // simulate network delay
    }
  }, [isOpen, slug]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-100 bg-gray-50">
            <h2 className="text-2xl font-bold text-[#B98C20]">{title || "Information"}</h2>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
            >
              <X size={24} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8 overflow-y-auto flex-1">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12 space-y-4">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-[#52B920]"></div>
                <p className="text-gray-500 animate-pulse">Loading content...</p>
              </div>
            ) : (
              <div
                className="prose prose-green max-w-none"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            )}
          </div>
          
          {/* Footer */}
          <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-end">
             <button
                onClick={onClose}
                className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg transition-colors font-medium"
              >
                Close
              </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
