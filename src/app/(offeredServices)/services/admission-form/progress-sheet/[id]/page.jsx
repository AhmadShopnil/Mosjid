
"use client"

import StudentProgressSheet from '@/components/Services/Madrasha/StudentProgressSheet'
import React from 'react'

import { useParams, useRouter } from 'next/navigation';


export default function page() {

    const params = useParams();
    const router = useRouter();
    const id = params?.id;



  return (
    <div><StudentProgressSheet studentId={id}/></div>
  )
}
