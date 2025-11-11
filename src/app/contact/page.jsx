"use client";

import Contact from '@/components/Contact/Contact'


import BannerInnerPage from '@/components/Shared/BannerInnerPage'
import Breadcrumb from '@/components/Shared/Breadcrumb'
import Container from '@/components/Shared/Container'
import InnerHeader from '@/components/Shared/InnerHeader'
import Sidebar from '@/components/Shared/Sidebar'
import SidebarMainDrawer from '@/components/Shared/SidebarMainDrawer'
import { sideBarCategories } from '@/data/sidebar'

import Image from 'next/image'
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default  function page() {
 const searchParams = useSearchParams();
  const [name, setName] = useState("");

  useEffect(() => {
    const nameFromQuery = searchParams.get("name");
    if (nameFromQuery) {
      setName(nameFromQuery);
    }
  }, [searchParams]);






    return (
        <div>

            <div>
                <BannerInnerPage />
                <Breadcrumb homeLabel="Home" homeLink="/" currentPage="Contact" />

            </div>


            <Container className='flex gap-6 my-6'>
                {/* sidebar */}
                <SidebarMainDrawer isSubmitRequest={false} categories={sideBarCategories} />
            
                {/* main content */}
                <div className=' w-full space-y-6'>
                    <InnerHeader title={"お問い合わせ"} image={"/images/contact/title.png"} />

                 <Contact name={name}/>

                </div>
            </Container>

        </div>
    )
}
