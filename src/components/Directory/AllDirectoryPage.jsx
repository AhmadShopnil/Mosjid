"use client";

import { useEffect, useState } from "react";
import DirectorySearchInnerPage from "@/components/Directory/DirectorySearchInnerPage";
import BannerInnerPage from "@/components/Shared/BannerInnerPage";
import Breadcrumb from "@/components/Shared/Breadcrumb";
import Container from "@/components/Shared/Container";
import InnerHeader from "@/components/Shared/InnerHeader";
import SidebarMainDrawer from "@/components/Shared/SidebarMainDrawer";
import { getImageUrl } from "@/helper/getImageUrl";
import { transformNoticeCategories } from "@/helper/transformNoticeCategories";
import DirectoryPage from "./Directorypage";
import axiosInstance from "@/helper/axiosInstance";
import BreadcrumbForNested from "../Shared/BreadcrumbForNested";
import { useRegionFilters } from "@/context/RegionFilterContext ";
import { useSelectedParrent } from "@/context/SelectedContextParrent";


export default function AllDirectoryPage({ settings, homePage, slug, filterData, locations }) {

    const {
        selectedRegion,
        selectedPrefecture,
        selectedCity,
        selectedDistrict,
    } = useRegionFilters();

    const { setSelectedSlug } = useSelectedParrent();


    const [selectedDirectoryLocation, setSelectedDirectoryLocation] = useState(null);
    const [selected, setSelected] = useState(null);
    const [selectedCat, setSelectedCat] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [directories, setDirectories] = useState([]);


    const formattedCategories = transformNoticeCategories(filterData?.cat);
    const sections = homePage?.sections_on_api;
    const directory_extradata = sections.find((s) => s.title_slug === "directory");
    const arabic_image = getImageUrl(directory_extradata?.image_media);



    // useEffect(() => {
    //     setSelectedSlug(slug)
       
    // }, [])


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);

            let url = `/category`;

            try {
                const response = await axiosInstance.get(url);
                const data = response?.data?.data || [];
                setSelectedCat(data);
            } catch (err) {
                console.error("Error fetching:", err);
                setError(err.message || "Failed to fetch");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);



    // console.log({ selectedCat })


    const getCategoryIds = () => {
        const ids = [
            selectedRegion?.id,
            selectedPrefecture?.id,
            selectedCity?.id,
            selectedDistrict?.id,
         
        ].filter(Boolean);

        return ids.join(",");
    };

    const fetchData = async () => {
        setLoading(true);

        const categoryIds = getCategoryIds();

        let url = `/posts?term_type=directory&strict=true`;

        if (categoryIds) {
            url += `&category_id=${categoryIds}`;
        }

        try {
            const response = await axiosInstance.get(url);
            const data = response?.data?.data || [];
            setDirectories(data);
        } catch (err) {
            console.error("Error fetching directory:", err);
            setError(err.message || "Failed to fetch directory");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedRegion, selectedPrefecture, selectedCity, selectedDistrict]);





    const handleSetSelectByLocations = (data) => {
        setSelectedDirectoryLocation(data)
        setSelected(data?.id);
    }


    const getData = () => {
        //  console.log("from get data skug",selected)
        // console.log("from get data selected",selected)
        fetchData();
    }

    return (
        <div>
            <div>
                <BannerInnerPage />
                {/* <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Directory" /> */}
                <BreadcrumbForNested
                    items={[
                        { label: "Home", link: "/" },
                        { label: "Directory", link: "/directory/19" },
                        { label: selectedCat?.name, link: null },
                        // { label: selected?.name, link: null },

                    ]}
                />
            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}

                <SidebarMainDrawer categories={formattedCategories} setSelectedCat={null} directoryNavigate={true} dataForContact={`Directories`} />

                {/* main content */}
                <div className=' w-full space-y-6'>
                    {/* Header */}
                    <InnerHeader title={directory_extradata?.sub_title} image={arabic_image} />
                    <div className='w-full'>
                        <div className='w-full lg:w-[80%] py-3'>
                            <DirectorySearchInnerPage
                                filterData={filterData}
                                setSelected={handleSetSelectByLocations}
                                selected={selectedDirectoryLocation}
                                getData={getData}
                                locations={locations}

                            />
                        </div>
                    </div>
                    <DirectoryPage directories={directories} loading={loading} />
                </div>
            </Container>

        </div>
    );
}
