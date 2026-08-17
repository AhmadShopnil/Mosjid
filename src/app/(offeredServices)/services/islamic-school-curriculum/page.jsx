import IslamicCurriculum from '@/components/Services/IslamicSchool Curriculum/IslamicSchoolCurriculum';
import MadrashaCourse from '@/components/Services/MadrashaCourse/MadrashaCourse';
import { getPage } from '@/helper/actions';
import React from 'react'

export default async function page() {

   // extract page content
    const islamicCurriculum_data = await getPage("islamic-school-curriculum");

    //  console.log("maktab_nazirah_foundation", madrasha_course_data)

  return (
    <div>
       <IslamicCurriculum
       islamicCurriculum_data={islamicCurriculum_data}
       /> 
    </div>
  )
}
