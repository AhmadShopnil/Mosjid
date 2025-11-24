// import FatwaFinder from '@/components/Fatwah/FatwahFinder'
// import FatwahSlected from '@/components/Fatwah/FatwahSlected'
// import FatwaListInner from '@/components/Fatwah/FatwaListInner'

// import BannerInnerPage from '@/components/Shared/BannerInnerPage'
// import Breadcrumb from '@/components/Shared/Breadcrumb'
// import BreadcrumbForNested from '@/components/Shared/BreadcrumbForNested'
// import Container from '@/components/Shared/Container'
// import SidebarDrawerForBooks from '@/components/Shared/SidebarDrawerForBooks'
// import { getFatwah, getFatwahFiltersData, getPage, getSettings } from '@/helper/actions'

// import React from 'react'


// export default async function page() {

//   const fatwahs = await getFatwah();
//   const settings = await getSettings()
//   const homePage = await getPage("home-sections-heading-management")
//   const books = await getFatwahFiltersData("books")

//   // console.log("books", books)



//   // console.log("formatFatwaBooksForSidebarData", formatFatwaBooksForSidebarData);



//   //  const requestData = selected?.name ? `Blogs of ${selected?.name} ` : "Blogs"
//   const requestData = "Fatwah"

//   return (
//     <div>

//       <div>
//         <BannerInnerPage />
//         {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Fatwah" /> */}
//         <BreadcrumbForNested
//           items={[
//             { label: "Home", link: "/" },
//             { label: "About", link: "/about" },
//             { label: selectedParrent?.name, link: "/about" },
//             { label: selected?.name, link: null },

//           ]}
//         />
//       </div>
//       <Container className='mt-10'>
//         <FatwaFinder />
//       </Container>

//       <Container className='flex gap-6 my-6'>
//         {/* sidebar */}

//         <SidebarDrawerForBooks
//           books={books?.data}
//           isAskQuestion={true}
//           isFatwah_Dictionary_Filter={true}

//           dataForContact={requestData} />



//         {/* main content */}
//         <div className=' w-full'>
//           <FatwaListInner title="New Fatawa" titleWidth="w-[420px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} />
//           <div className='grid grid-cols-1 xl:grid-cols-2 gap-3 lxl:gap-6  mt-6'>
//             <FatwahSlected settings={settings} homePage={homePage} />
//             {/* <FatwaListInner title="Selected Fatwah " titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} /> */}
//             <FatwaListInner title="Top Rated Fatwah" titleWidth="w-[220px]" fatwahs={fatwahs?.data} settings={settings} homePage={homePage} />
//           </div>
//         </div>
//       </Container>

//     </div>
//   )
// }
