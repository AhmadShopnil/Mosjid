
import BlogsPage from '@/components/Blogs/BlogsPage';
import { getCategories, getPage, getSettings } from '@/helper/actions'

import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'


const categories = [
  {
    id: "worship",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/1.png",
    title: "Worship",
    subtitle: "イバーダ",
    hasSubItems: true,
    subItems: ["Prayer", "Fasting", "Hajj"],
  },
  {
    id: "lifeMatters",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Blog & event-1.png",
    title: "Life Matters",
    subtitle: "詳細",
    hasSubItems: true,
    subItems: ["Family", "Work", "Health"],
  },
  {
    id: "prohibition",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Prohibition & Lawful",
    subtitle: "ハラール",
    hasSubItems: true,
    subItems: ["Halal", "Haram", "Makruh"],
  },
  {
    id: "chapter",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Chapter",
    subtitle: "イスラムの章",
    hasSubItems: false,
    isArrow: true,
  },
  {
    id: "section",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Section",
    subtitle: "イスラムの章",
    hasSubItems: false,
    isArrow: true,
  },
  {
    id: "quran",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Quran and Hadith",
    subtitle: "ギャラリー",
    hasSubItems: true,
    subItems: ["Quran", "Hadith", "Tafsir"],
  },
  {
    id: "purity",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Purity and Impurity",
    subtitle: "詳細",
    hasSubItems: true,
    subItems: ["Wudu", "Ghusl", "Tayammum"],
  },
  {
    id: "social",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Social Life",
    subtitle: "ブログイベント",
    hasSubItems: true,
    subItems: ["Etiquette", "Rights", "Duties"],
  },
  {
    id: "beliefs",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Beliefs",
    subtitle: "",
    hasSubItems: true,
    subItems: ["Aqeedah", "Tawheed"],
  },
  {
    id: "decency",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Decency",
    subtitle: "イスラム教の道徳",
    hasSubItems: true,
    subItems: ["Modesty", "Honesty", "Kindness"],
  },
];

const categories2 = [
  {
    id: "worship",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/1.png",
    title: "Worship",
    subtitle: "イバーダ",
    hasSubItems: true,
    subItems: ["Prayer", "Fasting", "Hajj"],
  },
  {
    id: "lifeMatters",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Blog & event-1.png",
    title: "Life Matters",
    subtitle: "詳細",
    hasSubItems: true,
    subItems: ["Family", "Work", "Health"],
  },
  {
    id: "prohibition",
    icon: "/images/fatwah/pen.png",
    activeIcon: "/images/QuickLinks/hover/Fatwa 03.png",
    title: "Prohibition & Lawful",
    subtitle: "ハラール",
    hasSubItems: true,
    subItems: ["Halal", "Haram", "Makruh"],
  },

];


export default async function page() {
  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management")
  const cat = await getCategories("post_category")

  const formattedCategories = transformNoticeCategories(cat);



  return (
    <div>

      <BlogsPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}

      />

    </div>
  )
}
