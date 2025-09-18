import React from 'react'
import FooterContent from './FooterContentBox'

export default function Footer() {
  return (
    <div
    className='h-[400px] relative mt-[200px]'
        style={{
        backgroundImage: "url('/images/footer/footerbg.png')",
        backgroundSize: "cover",          
        backgroundPosition: "center",     
        backgroundRepeat: "no-repeat",  
      }}
    >

      <div className='absolute top-[-130px] left-0 w-full '>
        <FooterContent/>
      </div>
    </div>
  )
}
