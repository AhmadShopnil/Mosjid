import Image from 'next/image'
import React from 'react'
import SectionTitle from './SectionTitle'
import SectionTitleRow from '@/components/SectionTitleRow/SectionTitleRow'


export default function MadrashaTimeline({ timeLineImage, timeline_image }) {



  return (
    <div className=''>
      {/* <SectionTitle first_title={"Madrasa Time Line"} second_title={"マドラサのタイムライン"} /> */}

      <SectionTitleRow
        leftTitle={"Madrasa Time Line"}
        rightTitle={"マドラサのタイムライン"}
      />

      <div>
        <Image
          src={timeline_image}
          alt="madrasha time line "
          width={1400}
          height={500}
        />
      </div>
    </div>
  )
}
