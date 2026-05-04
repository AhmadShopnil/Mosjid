"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import axiosInstance from "@/helper/axiosInstance";

export default function PolicyModal({ isOpen, onClose, slug, title }) {
  const [content, setContent] = useState("");
  const [apiTitle, setApiTitle] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen && slug) {
      const fetchContent = async () => {
        try {
          setLoading(true);
          setContent("");
          const res = await axiosInstance.get(`/post`, { params: { slug } });
          if (res.data?.success && res.data?.data) {
            setContent(res?.data?.data?.description || "");
            setApiTitle(res?.data?.data?.name);
          } else {
            setContent("<p>No content found.</p>");
          }
        } catch (err) {
          console.error("Failed to fetch policy content:", err);
          setContent("<p style='color:red;'>Failed to load content. Please try again later.</p>");
        } finally {
          setLoading(false);
        }
      };
      fetchContent();
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
            <h2 className="text-2xl font-bold text-[#B98C20]">{apiTitle || title || "Information"}</h2>
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
