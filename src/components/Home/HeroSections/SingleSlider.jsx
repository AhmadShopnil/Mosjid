import Container from '@/components/Shared/Container'
import { getImageFromExtraFields, getMetaValueFromExtraFields } from '@/helper/metaHelpers'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'




export default function SingleSlider({ slide, read_more_button }) {

    const logo = getImageFromExtraFields(slide, "slider_logo") || "";

    return (
        <div className="relative h-full w-full">
            {/* Full-width Banner Image */}
            <div className="absolute inset-0 w-full h-full">
                <Image
                    // src={"/images/bannerNew/bannerblank.png"}
                    src={slide?.featured_image}
                    alt={slide?.name || "Hero Banner"}
                    fill
                    priority
                    className="object-cover object-center"
                />
            </div>

            <Container className="relative ">
                <div
                    className="absolute right-0 top-8   "
                >
                    <Image
                        src={logo}
                        // src="/images/bannerNew/logo2.png"
                        alt='img'
                        width={550}
                        height={550}
                        className="object-contain transition-all duration-300"
                    />
                </div>
            </Container>


            {/* Content on top of the banner */}
            <Container className="relative flex h-full">
                <div className="absolute top-1/4 w-[40%] min-h-[280px] flex flex-col justify-between ">
                    <div>
                        <h3 className="text-2xl 2xl:text-4xl text-[#00401A] font-bold leading-12">
                            {slide?.name}
                        </h3>
                        <p className="text-lg 2xl:text-2xl text-[#00401A] font-bold leading-10 my-2">
                            {slide?.sub_title}
                        </p>
                        <p className="text-base text-[#001609] mb-10">
                            {getMetaValueFromExtraFields(slide, "short_description")}
                        </p>
                    </div>
                    <Link
                        href="/about"
                        className="bg-[#F7BA2A] px-5 py-4 rounded-[10px] text-[#00401A] text-xl font-semibold w-[148px]
                    h-[60px]"
                    >
                        {read_more_button}
                    </Link>
                </div>
            </Container>
        </div>
    )
}
