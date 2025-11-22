export function formatFatwaBooksForSidebar(apiData) {
  return apiData.map((item) => {
    return {
      id: item.id,
      icon: item?.icon ||"/images/QuickLinks/fatwa.png", 
      // activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
   
      name: item.name_en || item.name,
      subtitle: item.name_jp || "",
      hasSubItems: (item.items && item.items.length > 0) ? true : false,
      isArrow: true,

      subItems: item.items?.length
        ? item.items.map((sub) => sub.name_en || sub.name)
        : [],
      originalData:item
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
