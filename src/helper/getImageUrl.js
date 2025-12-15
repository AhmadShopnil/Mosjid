export const getImageUrl = (image_media) => {
  if (!image_media) return null;
  return (
    `https://admin.osakamasjid.org/${image_media.file_directory}${image_media.filename}` ||
    null
  );

  //   return (
  //   `https://www.admin.osakamasjid.org/${image_media.file_directory}${image_media.filename}` ||
  //   null
  // );

};