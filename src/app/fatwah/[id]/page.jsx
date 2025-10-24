import AskQuestionSidebar from '@/components/Fatwah/AskQuestionSidebar'
import FatwaDetailSection from '@/components/Fatwah/FatwaDetailSection'
import FatwaFinder from '@/components/Fatwah/FatwahFinder'
import FatwaListInner from '@/components/Fatwah/FatwaListInner'
import SubmitRequest from '@/components/Fatwah/SubmitRequest'
import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import Sidebar from '@/components/Shared/Sidebar'
import { getFatwa, getPage, getSettings } from '@/helper/actions'
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

    const fatwahs = await getFatwa();
    const settings = await getSettings()
    const homePage = await getPage("home-sections-heading-management")
    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" />
            </div>
            <Container className='mt-10'>
                <FatwaFinder />
            </Container>

            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <div className='w-[400px] space-y-6'>
                    <Sidebar categories={categories} />
                    <AskQuestionSidebar />
                    <SubmitRequest />
                </div>
                {/* main content */}
                <div className=' w-full'>
                    <div>
                        <FatwaDetailSection />
                    </div>
                    <div className='grid grid-cols-2 gap-6  mt-6'>
                        <FatwaListInner title="Related Fatawa " titleWidth="w-[220px]" fatwahs={fatwahs} settings={settings} homePage={homePage} />
                        <FatwaListInner title="Related Topics" titleWidth="w-[220px]" fatwahs={fatwahs} settings={settings} homePage={homePage} />
                    </div>
                </div>
            </Container>

        </div>
    )
}
