import MadrashaCourse from '@/components/Services/MadrashaCourse/MadrashaCourse';
import { getPage } from '@/helper/actions';
import React from 'react'

export default async function page() {

   // extract page content
    const madrasha_course_data = await getPage("madrasa-course");

    //  console.log("maktab_nazirah_foundation", madrasha_course_data)

  return (
    <div>
       <MadrashaCourse
       madrasha_course_data={madrasha_course_data}
       /> 
    </div>
  )
}
