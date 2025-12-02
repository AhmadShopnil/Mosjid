import AskQuestionPage from '@/components/Fatwah/AskQuestionPage'
import AskQuestionSidebar from '@/components/Fatwah/AskQuestionSidebar'
import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
import { getFatwa, getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
import Image from 'next/image'
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





export default async function page() {
  const fatwahs = await getFatwah();
  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")


 const majhabs = await getFatwahFiltersData("majhabs")
  const books = await getFatwahFiltersData("books")
  const chapter = await getFatwahFiltersData("bookchapters")
  const section = await getFatwahFiltersData("booksections")
  const data_for_filter = { majhabs, books, chapter, section }

  const requestData = "ask question form"

  return (
    <div>

      <div>
        <BannerInnerPage />
        <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" />
      </div>
      {/* Header */}
      <Container className='mt-10'>

        <div className="bg-[#52B920] h-[85px] text-white px-6 py-4 rounded-lg mt-4 flex justify-between items-center shadow-md">
          <h1 className="text-4xl ">イスラム教のファトワ</h1>
          <Image
            src="/images/fatwah/fatwaharbic_white.png"
            alt="Logo"
            width={200}
            height={60}
            className='hidden sm:flex w-[223px] h-[60px]'
          />
        </div>
      </Container>

      <Container className='flex gap-6 my-6'>
        <SidebarDrawerForBooks
          books={books?.data}
          isAskQuestion={true}
          isFatwah_Dictionary_Filter={true}
          isNavigate={true}
          dataForContact={requestData} 
          data_for_filter={data_for_filter}
          />
        {/* main content */}
        <div className=' w-full'>
          <div>
            <AskQuestionPage />
          </div>
        </div>
      </Container>

    </div>
  )
}
