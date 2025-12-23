

import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import ScrollToTopButton from "@/components/Shared/ScrollToTopButton";
import { Toaster } from "react-hot-toast";
import DevelopmentBanner from "@/components/Header/DevelopmentBanner";
import { AnimatePresence } from "framer-motion";
import PageRevealWithSpinner from "@/components/Shared/LoadingAnimation/PageRevealWithSpinner";



export default function CommonProvider({
  children,
}) {
  return (
    <AnimatePresence mode="wait">
      <PageRevealWithSpinner >
        <div className=" min-h-screen bg-background">
          <DevelopmentBanner />
          <Header />

          {children}

          <Footer />
          <ScrollToTopButton />
          <Toaster position="top-right" />
        </div>

      </PageRevealWithSpinner>
    </AnimatePresence>
  );
}
