
"use client"

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import React, { useEffect, useState } from 'react'
import axiosInstance from '@/helper/axiosInstance'
import SidebarMainDrawer from '../Shared/SidebarMainDrawer'
import MakeDonationInner from './MakeDonationInner'
import { getImageUrl } from '@/helper/getImageUrl'
import BreadcrumbForNested from '../Shared/BreadcrumbForNested'
import { useSelected } from '@/context/SelectedContext'
import { useSelectedParrent } from '@/context/SelectedContextParrent'
import DonationCardList from './DonationCardList'
import { motion, AnimatePresence } from "framer-motion"
import SocialShare from '../Shared/SocialShare'



export default function SingleDonationPage({ homePage, settings, formattedCategories, donationsListForBottom,donations }) {
  const { selected, setSelected, clearSelected } = useSelected();
  const { selectedParrent, setSelectedParrent, clearSelectedParrent } = useSelectedParrent();
  const [selectedCat, setSelectedCat] = useState(null)



  const sections = homePage.sections_on_api;
  const make_your_donation = sections.find((s) => s.title_slug === "make-your-doantion");
  const image_arabic = getImageUrl(make_your_donation?.image_media);





  const requestData = selected?.name ? `Dontion of ${selected?.name} ` : "Donations"


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 20,
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  }


  return (
    <div>

      <div>

        <BreadcrumbForNested
          items={[
            { label: "Home", link: "/" },
            { label: "Donation", link: "/donation" },
            { label: selectedParrent?.name, link: "/donation" },
            { label: selected?.name, link: null },

          ]}
        />
      </div>


      <Container className='flex gap-6 my-6'>
        {/* sidebar */}
        <SidebarMainDrawer 
        categories={formattedCategories}
         setSelectedCat={setSelectedCat}
          dataForContact={requestData}
          isDonationNavigate={true}
          />

        {/* main content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedCat}`}
            className="w-full space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.div variants={itemVariants}>
              <InnerHeader
                title={make_your_donation?.sub_title}
                image={image_arabic}
              />
            </motion.div>

            <motion.div variants={itemVariants}>
              <MakeDonationInner
                donations={donations}
                settings={settings}
                homePage={homePage}
               
              />
              <div className=" mt-6 flex items-center  text-[#D9E2DD]">
              <SocialShare />
            </div>
            </motion.div>
            
          </motion.div>
        </AnimatePresence>

      </Container>
      <div>
        <DonationCardList allDonationsList={donationsListForBottom} />
      </div>

    </div>
  )
}
