export function formatFatwaBooksForSidebar(apiData) {
  return apiData?.data?.map((item) => {
    return {
      id: item.id,
      icon: item?.icon ||"/images/QuickLinks/fatwa.png", 
      // activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
   
      name: item.name_en || item.name,
      subtitle: item.name_jp || "",
      hasSubItems: (item.chapters && item.chapters.length > 0) ? true : false,
      isArrow: true,

      subItems: item.chapters?.length
        ? item?.chapters?.map((sub) => sub.name_en || sub.name)
        : [],
      originalData:item,
      childs:item?.chapters
      // childs: [
      //   {
      //     name: "Ask Fatwa",
      //     link: "/fatwah/ask-question",
      //     description: item.description_jp || "",
      //   },
      // ],
    };
  });
}
