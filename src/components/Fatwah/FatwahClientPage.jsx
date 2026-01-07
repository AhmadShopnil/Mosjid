"use client";

import { motion, AnimatePresence } from "framer-motion";
import FatwaFinder from "@/components/Fatwah/FatwahFinder";
import FatwahSlected from "@/components/Fatwah/FatwahSlected";
import BreadcrumbForNested from "@/components/Shared/BreadcrumbForNested";
import Container from "@/components/Shared/Container";
import SidebarDrawerForBooks from "@/components/Shared/SidebarDrawerForBooks";
import { useFatwaFilters } from "@/context/FatwaFilterContext";
import { getImageUrl } from "@/helper/getImageUrl";
import NewFatwa from "./NewFatwa";
import TopRatedFatwa from "./TopRatedFatwa";




const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.35,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: "blur(1px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.35,
      ease: "easeOut",
    },
  },
};

export default function FatwahClientPage({
  settings,
  homePage,
  books,
  data_for_filter,
}) {
  const {
    selectedBooks,
    selectedChapter,
  } = useFatwaFilters();


  const sections = homePage?.sections_on_api || [];
  const fatwahExtraData = sections.find(
    (s) => s.title_slug === "fatwah"
  );

  const icon = getImageUrl(fatwahExtraData?.background_media);


  const requestData = "Fatwa";

  return (
    <div>

      <div>
        <BreadcrumbForNested
          items={[
            { label: "Home", link: "/" },
            { label: "Fatwah", link: "/fatwah" },
            { label: selectedBooks?.name_en, link: "/fatwah" },
            { label: selectedChapter?.name_en, link: null },
          ]}
        />
      </div>


      <Container className="mt-10">
      

        <FatwaFinder data_for_filter={data_for_filter} fatwahExtraData={fatwahExtraData} />
      </Container>

      <Container className="flex gap-6 my-6">

        <SidebarDrawerForBooks
          books={books}
          isAskQuestion
          isFatwah_Dictionary_Filter
          data_for_filter={data_for_filter}
          dataForContact={requestData}
          icon={icon}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={`${selectedBooks?.id || "all"}-${selectedChapter?.id || "all"}`}
            className="w-full space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: 10 }}
          >
            <motion.div variants={itemVariants}>
              <FatwahSlected
                settings={settings}
                homePage={homePage}
              />
            </motion.div>

            <motion.div
              className="grid grid-cols-1 xl:grid-cols-2 gap-3 lxl:gap-6"
              variants={containerVariants}
            >
              <motion.div variants={itemVariants}>
                <NewFatwa
                  settings={settings}
                  homePage={homePage}
                />
              </motion.div>

              <motion.div variants={itemVariants}>
                <TopRatedFatwa

                  settings={settings}
                  homePage={homePage}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </div>
  );
}
