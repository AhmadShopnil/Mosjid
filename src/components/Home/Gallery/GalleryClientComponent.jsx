"use client";

import React from "react";
import ImageGallery from "./ImageGallery";
import { motion } from "framer-motion";

export default function GalleryClientComponent({
  gallery,
  img_gallery_Extradata,
  view_more_button_text,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6 }}
    >
      <ImageGallery
        gallery={gallery}
        img_gallery_Extradata={img_gallery_Extradata}
        view_more_button_text={view_more_button_text}
      />
    </motion.div>
  );
}
