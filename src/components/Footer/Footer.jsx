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
    <div>
      <div
        className='w-full h-[1110px] sm:h-[610px] lg:h-[530px] relative mt-[200px] lg:mt-[220px]'
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
        
        

      </div>
      <div className='bg-[#003014] py-3 w-full  bottom-0 absolute flex items-center justify-center'>
          <p className='text-[#E6ECE8] text-[15px] text-center '>{copyright_content}</p>
        </div>

      {/* <div className='bg-[#003014] w-full h-[50px] flex items-center justify-center  '>
        <p className='text-[#E6ECE8] text-base text-center'>{copyright_content}</p>
      </div> */}
    </div>
  )
}
