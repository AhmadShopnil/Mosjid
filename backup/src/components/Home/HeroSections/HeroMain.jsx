import React from 'react'

import Link from 'next/link'
import { getSettings, getSliders } from '@/helper/actions';
import HeroSectionSlider from './HeroSectionSlider';
import HeroSectionMobileSlider from './HeroSectionMobileSlider';
import { getMetaValueByMetaName, getMetaValueFromExtra_Fields } from '@/helper/metaHelpers';

export default async function HeroMain() {

  const sliders = await getSliders();
  const settings = await getSettings();
    const read_more_button = getMetaValueByMetaName(settings, "read_more") || "";

// console.log("slider",sliders)
    return (
        <div>
            <div className="hidden xl:block">
                <HeroSectionSlider sliders={sliders} read_more_button={read_more_button} />
            </div>
            <div className='block xl:hidden '>
             <HeroSectionMobileSlider sliders={sliders} read_more_button={read_more_button}/>
            </div>

        </div>
    )
}
