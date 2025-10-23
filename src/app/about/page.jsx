

import SubmitRequest from '@/components/Fatwah/SubmitRequest'

import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'

import Image from 'next/image'
import React from 'react'

export default async function page() {


    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="About us" />

            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <div className='w-[400px] space-y-6'>
                    <Sidebar />

                    <SubmitRequest />
                </div>
                {/* main content */}
                <div className=' w-full space-y-6'>
                    <InnerHeader title={"掲示板"} image={"/images/fatwah/fatwaharbic_white.png"} />

                    <div>
                        <div>
                            <h4 className='text-[#333333] font-bold text-2xl'>Lorem ipsum dolor sit amet consectetur. </h4>

                            <p className='text-[#333333] text-base mt-4'>
                                Vitae nibh elit auctor pretium maecenas. Euismod tincidunt dolor tincidunt morbi magna.
                                Auctor arcu tincidunt lobortis ultricies ullamcorper dui aliquam. Aliquam cursus quis sapien amet. Diam dui vitae amet nibh
                                eget sed. Duis velit tincidunt ornare sit. Fringilla adipiscing id quis fringilla purus scelerisque. <br /> <br />

                                Turpis purus vestibulum pellentesque ac pretium sit at. Vitae massa posuere nulla tristique eu facilisi imperdiet sapien proin.
                                Risus id nam quis nulla faucibus metus tristique molestie phasellus. Tellus ultricies convallis etiam lacus posuere nisi.
                                Mattis massa facilisi sodales integer fermentum ultricies adipiscing. Enim libero magnis elit purus amet in. Sit in tellus
                                cursus consequat purus nec ut morbi ultrices. Laoreet vulputate congue malesuada egestas condimentum in diam bibendum sit.
                                Tempus morbi turpis in nullam porttitor volutpat tortor magna. <br /> <br />
                                Ultrices diam mus lacus commodo. Eget adipiscing tortor nisi quis mus amet sed. Sed at nisi tortor nunc. Integer tristique
                                quam amet laoreet in augue nec commodo pharetra. Platea porttitor viverra morbi tincidunt. Eu dictumst senectus ornare lacus et.
                                Ultrices diam mus lacus commodo. Eget adipiscing tortor nisi quis mus amet sed. Sed at nisi tortor nunc. Integer tristique
                                quam amet laoreet in augue nec commodo pharetra. Platea porttitor viverra morbi tincidunt. Eu dictumst senectus ornare lacus et.</p>
                        </div>
                        <div className="border-t mt-8 pt-3 flex items-center gap-4 text-[#D9E2DD]">
                            <div className="border-r-2 border-gray-300 pr-3">
                                <Image
                                    src="/images/notice/twiter.png"
                                    alt='a1'
                                    width={23}
                                    height={23}
                                />
                            </div>
                            <div className="border-r-2 border-gray-300 pr-3">
                                <Image
                                    src="/images/notice/fb.png"
                                    alt='a1'
                                    width={15}
                                    height={15}
                                />
                            </div>
                            <div className="border-r-2 border-gray-300 pr-3">
                                <Image
                                    src="/images/notice/whatsapp.png"
                                    alt='a1'
                                    width={20}
                                    height={20}
                                />
                            </div>
                            <div className="border-r-2 border-gray-300 pr-3">
                                <Image
                                    src="/images/notice/printer.png"
                                    alt='a1'
                                    width={22}
                                    height={22}
                                />
                            </div>
                            <div>
                                <Image
                                    src="/images/notice/download.png"
                                    alt='a1'
                                    width={22}
                                    height={22}
                                />
                            </div>


                        </div>

                    </div>

                </div>
            </Container>

        </div>
    )
}
