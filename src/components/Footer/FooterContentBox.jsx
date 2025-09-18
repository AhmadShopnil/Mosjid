import React from 'react'
import Container from '../Shared/Container'
import FooterSections from './FooterSections'

export default function FooterContent() {
  return (
      <Container className='  '>
        <div className='bg-white h-[300px] border border-[#E6ECE8]
         rounded-[30px]'>
      <FooterSections/>           
        </div>

    </Container>
  )
}
