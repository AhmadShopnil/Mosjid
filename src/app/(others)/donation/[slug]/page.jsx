import AboutInnerPage from "@/components/About/AboutInnerPage";
import SingleDonationPage from "@/components/Donation/SingleDonationPage";
import BannerInnerPageServerSide from "@/components/Shared/BannerInnerPageServerSide";
import { getAboutCat, getAllDonationsMethods, getCategories, getDonationsMethods, getDonationsMethodsByCat, getFeaturedCategories, getPage, getSettings } from "@/helper/actions";
import { transformNoticeCategories } from "@/helper/transformNoticeCategories";
import React from "react";


export async function generateMetadata({ params }) {
    const { slug } = await params;


    try {
        const pageData = await getAboutCat(slug);

        // console.log("about meta", { pageData })

        return {
            title:
                pageData?.meta_title ||
                pageData?.name ||
                "About Page",

            description:
                pageData?.meta_description ||
                pageData?.name ||
                pageData?.sub_title ||
                "Learn more about us",

            openGraph: {
                title: pageData?.meta_title || pageData?.name,
                description:
                    pageData?.meta_description || pageData?.name ||
                    pageData?.sub_title,
                images: pageData?.featured_image
                    ? [{ url: pageData?.featured_image }]
                    : [],
            },

            alternates: {
                canonical: `/${slug}`,
            },
        };
    } catch (error) {
        return {
            title: "About Page",
            description: "About page",
        };
    }
}




export default async function Page({ params }) {
    const { slug } = await params;

     const settings = await getSettings();
     const homePage = await getPage("home-sections-heading-management")
     // const categories = await getCategories("donation_categories")
     const categories = await getFeaturedCategories("donation_categories")
   
   
     const activeCategories = categories?.filter((cat) => cat?.is_status != "draft")
     const formattedCategories = transformNoticeCategories(activeCategories);
   
     const allDonationsList = await getDonationsMethods()
     const donationsListForBottom = await getAllDonationsMethods()

    const donationsByCat = await getDonationsMethodsByCat(slug);


    return (
        <div>
            <BannerInnerPageServerSide />
            <SingleDonationPage
                settings={settings}
                homePage={homePage}
                formattedCategories={formattedCategories}
                allDonationsList={allDonationsList}
                donationsListForBottom={donationsListForBottom}
                donations={donationsByCat}
            />
        </div>
    );
}
