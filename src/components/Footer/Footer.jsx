import React from 'react'
import FooterContent from './FooterContentBox'
import { getMetaValueByMetaName } from '@/helper/metaHelpers';
import { getSettings } from '@/helper/actions';

export default async function Footer() {

  const settings = await getSettings();
  const copyright_content =
    getMetaValueByMetaName(settings, "copyright_text") ||
    "OSAKA MASJID© 2026 | ALL RIGHTS RESERVED";


  return (
    <div className='pt-[150px] lg:pt-[150px]'>
      <div
        className='w-full h-[1350px] sm:h-[780px] lg:h-[530px] relative '
        style={{
          backgroundImage: "url('/images/footer/footerbg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >

        <div className='absolute top-[-150px] left-0 w-full '>
          <FooterContent />
        </div>


        <div className='bg-[#003014] px-2 py-3 w-full  bottom-0 absolute flex items-center justify-center'>
          <p className='text-[#E6ECE8] text-[13px] sm:text-[14px] md:text-[15px] text-center '>{copyright_content}</p>
        </div>
      </div>


      {/* <div className='bg-red-300 w-full  flex items-center justify-center  '>
        <p className='text-[#E6ECE8] text-base text-center'>{copyright_content}</p>
      </div> */}
    </div>
  )
}
