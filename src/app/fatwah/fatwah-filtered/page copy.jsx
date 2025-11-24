
// import FatwaFinder from '@/components/Fatwah/FatwahFinder'
// import FatwahSearchResult from '@/components/Fatwah/FatwahSearchResult'
// import BannerInnerPage from '@/components/Shared/BannerInnerPage'
// import Breadcrumb from '@/components/Shared/Breadcrumb'
// import Container from '@/components/Shared/Container'
// import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
// import { getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'
// import { formatFatwaBooksForSidebar } from '@/helper/formatFatwaBooksForSidebar'
// import React from 'react'


// export default async function page() {

//   const fatwahs = await getFatwah();
//   const settings = await getSettings()
//   const homePage = await getPage("home-sections-heading-management")
 
//    const majhabs = await getFatwahFiltersData("majhabs")
//    const books = await getFatwahFiltersData("books")
//    const chapter = await getFatwahFiltersData("bookchapters")
//    const section = await getFatwahFiltersData("booksections")
//    const data_for_filter = { majhabs, books, chapter, section }


//   const requestData = "Fatwah"
//   // console.log("fatwah", fatwahs?.data)
//   return (
//     <div>

//       <div>
//         <BannerInnerPage />
//         <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" />
//       </div>
//       <Container className='mt-10'>
//         <FatwaFinder data_for_filter={data_for_filter} />
//       </Container>

//       <Container className='flex gap-6 my-6'>
//         {/* sidebar */}
//         <SidebarDrawerForBooks
//           books={books?.data}
//           isAskQuestion={true}
//           isFatwah_Dictionary_Filter={true}
//           dataForContact={requestData}
//         />


//         {/* <div className='w-[400px] space-y-6'>
//           <Sidebar categories={categories} />
//         </div> */}



//         {/* main content */}
//         <div className=' w-full'>
//           <FatwahSearchResult title="Fatwa Finder Results" titleWidth="w-[420px]" settings={settings} homePage={homePage} />

//         </div>
//       </Container>

//     </div>
//   )
// }
