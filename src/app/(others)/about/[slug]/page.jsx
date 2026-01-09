import AboutInnerPage from "@/components/About/AboutInnerPage";
import BannerInnerPageServerSide from "@/components/Shared/BannerInnerPageServerSide";
import { getAboutCat, getCategories, getPage, getSettings } from "@/helper/actions";
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
                canonical: `/about/${slug}`,
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
    const homePage = await getPage("home-sections-heading-management");
    const cat = await getCategories("about_categories");

    const formattedCategories = transformNoticeCategories(cat);

    return (
        <div>
            <BannerInnerPageServerSide />

            <AboutInnerPage
                slug={slug}
                settings={settings}
                homePage={homePage}
                formattedCategories={formattedCategories}
            />
        </div>
    );
}
