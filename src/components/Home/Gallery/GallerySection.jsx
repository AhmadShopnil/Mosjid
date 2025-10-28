import { getImageGallery, getPage, getSettings } from '@/helper/actions'
import React from 'react'
import ImageGallery from './ImageGallery'
import { getMetaValueByMetaName } from '@/helper/metaHelpers';

export default async function GallerySection() {
  const gallery = await getImageGallery();

  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management");
  const sections = homePage.sections_on_api;
  const view_more_button_text = getMetaValueByMetaName(settings, "view_more") || "";

  
  const img_gallery_heading = sections.find((s) => s.title_slug === "gallery");



  // console.log("img_gallery_heading", img_gallery_heading)

  return (
    <div
    id='gallery'
    >
      <ImageGallery gallery={gallery} img_gallery_heading={img_gallery_heading} view_more_button_text={view_more_button_text} />
    </div>
  )
}
