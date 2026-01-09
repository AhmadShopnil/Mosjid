import { BASE_URL } from "./baseUrl";

export function convertMenuToSidebar(menus) {
  return menus?.map((item) => {
    return {
      id: item.label,                      
      name: item.label,                       
      subtitle: item.other_info_one || "",    
      targetId: item.css_id || null,          
      link: item.link || "/",               
      icon:`${BASE_URL}${item?.menu_icon_url}` || "",      
      activeIcon: `${BASE_URL}${item?.menu_icon_hover_url}` || `${BASE_URL}${item?.menu_icon_url}`|| "",
    //   activeIcon: item.menu_icon_hover_url || item.menu_icon_url || "",
      isArrow: true,
    };
  });
}
