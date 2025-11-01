

import Contact from '@/components/Contact/Contact'
import SubmitRequest from '@/components/Fatwah/SubmitRequest'

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'

import Image from 'next/image'
import React from 'react'

export default async function page() {

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


    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Contact" />

            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <SidebarMainDrawer isSubmitRequest={false} categories={sideBarCategories} />
            
                {/* main content */}
                <div className=' w-full space-y-6'>
                    <InnerHeader title={"お問い合わせ"} image={"/images/contact/title.png"} />

                 <Contact/>

                </div>
            </Container>

        </div>
    )
}
