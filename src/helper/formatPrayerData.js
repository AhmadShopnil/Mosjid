export function formatPrayerData(data) {
  return data.map(item => {
    // Start with core item fields
    const formatted = {
      id: item.id,
      name: item.name,
      sub_title: item.sub_title,
      slug: item.slug,
      description: item.description,
      featured_image: item.featured_image,
      term_type: item.term_type,
      categories: item.categories,
      meta_title: item.meta_title,
      meta_description: item.meta_description,
      meta_keyword: item.meta_keyword,
      meta_author: item.meta_author,
      order_column: item.order_column,
      template: item.template,
      is_featured: item.is_featured,
    };

    // Add extraFields into the same object
    item.extraFields?.forEach(field => {
      formatted[field.meta_name] = field.meta_value || null;
    });

    return formatted;
  });
}


export function mergePrayerTimes(formattedPrayerTimes, prayerTimesDataFromOusideApi) {
  return formattedPrayerTimes.map(item => {
    const itemName = item?.slug?.toLowerCase();

    // Normal match
    let match = prayerTimesDataFromOusideApi.find(
      p => p?.prayer_name?.toLowerCase() === itemName
    );

    // Handle Jummah → use Dhuhr as fallback
    if (!match && itemName === "jummah") {
      match = prayerTimesDataFromOusideApi.find(
        p => p?.prayer_name?.toLowerCase() === "dhuhr"
      );
    }

    return {
      ...item,
      ...(match || {})
    };
  });
}


// export function mergePrayerTimes(formattedPrayerTimes, prayerTimesDataFromOusideApi) {
//   return formattedPrayerTimes.map(item => {
//     const match = prayerTimesDataFromOusideApi.find(p => 
//       p?.name?.toLowerCase() === item?.slug?.toLowerCase()
//     );

//     return {
//       ...item,   
//       ...(match || {}) 
//     };
//   });

// }
