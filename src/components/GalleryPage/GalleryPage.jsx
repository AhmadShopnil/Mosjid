
"use client"
import { getImageGallery, getPage, getSettings } from '@/helper/actions'
import React, { useState } from 'react'

import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import ImageGalleryInnerPage from './ImageGalleryInnerPage';
import Pagination from '../Shared/Pagination';

export default  function GalleryPage({ gallery,
  img_gallery_heading,
  view_more_button_text, }) {

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);




  return (
    <div
      id='gallery'
    >

      <ImageGalleryInnerPage gallery={gallery} img_gallery_heading={img_gallery_heading} view_more_button_text={view_more_button_text} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

    </div>
  )
}
