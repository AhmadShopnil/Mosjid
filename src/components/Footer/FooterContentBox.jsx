import React from 'react'
import Container from '../Shared/Container'
import FooterSections from './FooterSections'
import { getSettings } from '@/helper/actions';
import { getMetaValueByMetaName } from '@/helper/metaHelpers';

export default async function FooterContent() {

  const settings = await getSettings();


  return (
      <Container className='  '>
        <div className='bg-white h-[300px] mx-2 border border-[#E6ECE8]
         rounded-[30px]'>
      <FooterSections settings={settings}/>           
        </div>

    </Container>
  )
}
