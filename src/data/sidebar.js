 export const sideBarCategories = [
    {
      id: "Prayer Times",
      icon: "/images/QuickLinks/prayer-times.png",
      link: "/prayer-times",
      activeIcon: "/images/QuickLinks/hover/1.png",
      title: "Prayer Times",
      subtitle: "祈りの時間",
      hasSubItems: false,
       isArrow: true,
      // subItems: ["Prayer", "Fasting", "Hajj"],
      // childs: [
      //   {
      //     name: "Sub Item",
      //     description: "Japanese"
      //   }
      // ]
    },
    {
      id: "notice-board",
      icon: "/images/QuickLinks/notice.png",
      link: "/notices",
      activeIcon: "/images/QuickLinks/hover/Blog & event-1.png",
      title: "Notice Board",
      subtitle: "掲示板",
       isArrow: true,
      hasSubItems: false,
      // subItems: ["Family", "Work", "Health"],
      // childs: [
      //   {
      //     name: "Sub Item",
      //     description: "Japanese"
      //   }
      // ]
    },
    {
      id: "Fatwa",
      icon: "/images/QuickLinks/fatwa.png",
      link: "/fatwah",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Fatwa",
      subtitle: "ファトワ",
      hasSubItems: true,
       isArrow: true,
      subItems: ["Halal", "Haram", "Makruh"],
      childs: [
        {
          name: "Ask Fatwa",
          link:"/fatwah/ask-question",
          description: "Japanese"
        }
      ]
    },
    {
      id: "Donation",
      icon: "/images/QuickLinks/donation.png",
      link: "/donation",
      activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
      title: "Donation",
      subtitle: "寄付",
      hasSubItems: false,
      isArrow: true,
    },
    

  ];