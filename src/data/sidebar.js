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
    // {
    //   id: "Donation",
    //   icon: "/images/QuickLinks/donation.png",
    //   link: "/donation",
    //   activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    //   title: "Donation",
    //   subtitle: "寄付",
    //   hasSubItems: false,
    //   isArrow: true,
    // },
      {
      id: "Offered Services",
    title: "Offered Services",
    subtitle: "提供されるサービス",
    targetId: "offered-services",
    link: "/",
    icon: "/images/QuickLinks/offer-service.png",
    // icon: "/images/QuickLinks/normal/Blog & event.png",
    activeIcon: "/images/QuickLinks/hover/Blog & event.png",
  },
  {
     id: "Dictionary",
    title: "Dictionary",
    subtitle: "辞書",
    targetId: "dictionary",
    link: "/dictionary",
    icon: "/images/QuickLinks/dictionary.png",
    // icon: "/images/QuickLinks/normal/Dictionary.png",
    activeIcon: "/images/QuickLinks/hover/Dictionary.png",
  },
  {
    id: "Directory",
    title: "Directory",
    subtitle: "ディレクトリ",
    targetId: "directory",
    link: "/directory",
    icon: "/images/QuickLinks/directory.png",
    // icon: "/images/QuickLinks/normal/Directory.png",
    activeIcon: "/images/QuickLinks/hover/Directory.png",
  },
  {
    id: "Blogs",
    title: "Blogs",
    subtitle: "ブログ",
    targetId: "blogs-events",
    link: "/blogs",
    icon: "/images/QuickLinks/blog-event.png",
    // icon: "/images/QuickLinks/normal/Donation.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
  {
    id: "Events",
    title: "Events",
    subtitle: "イベント",
    targetId: "blogs-events",
    link: "/events",
    icon: "/images/QuickLinks/blog-event.png",
    // icon: "/images/QuickLinks/normal/Donation.png",
    activeIcon: "/images/QuickLinks/hover/Donation.png",
  },
  {
    id: "Gallery",
    title: "Gallery",
    subtitle: "ギャラリー",
    targetId: "gallery",
    link: "/gallery",
    icon: "/images/QuickLinks/gallery.png",
    // icon: "/images/QuickLinks/normal/Gallery.png",
    activeIcon: "/images/QuickLinks/hover/Gallery.png",
    
  },
    {
         id: "Islamic Books",
    title: "Islamic Books",
    subtitle: "イスラム教の本",
    targetId: "books",
     link: "/books",
    icon: "/images/QuickLinks/books.png",
    // icon: "/images/QuickLinks/normal/Gallery.png",
    activeIcon: "/images/QuickLinks/hover/Gallery.png",
  },
    {
        id: "About",
    title: "About",
    subtitle: "について",
    targetId: "about",
     link: "/about",
   icon: "/images/QuickLinks/directory.png",
    // icon: "/images/QuickLinks/normal/Gallery.png",
    activeIcon: "/images/QuickLinks/hover/Gallery.png",
  },

  ];