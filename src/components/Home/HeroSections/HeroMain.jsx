import React from 'react'

import Link from 'next/link'
import { getSettings, getSliders } from '@/helper/actions';
import HeroSectionSlider from './HeroSectionSlider';
import HeroSectionMobileSlider from './HeroSectionMobileSlider';
import { getMetaValueFromExtra_Fields } from '@/helper/metaHelpers';

export default async function HeroMain() {

  const sliders = await getSliders();
  const settings = await getSettings();
//  const short_description = getMetaValueFromExtra_Fields(
//     slide,
//     "short_description"
//   );

    return (
        <div>
            <div className="hidden xl:block">
                <HeroSectionSlider sliders={sliders} />
            </div>
            <div className='block xl:hidden '>
             <HeroSectionMobileSlider sliders={sliders}/>
            </div>

        </div>
    )
}
