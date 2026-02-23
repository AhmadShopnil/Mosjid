import MadrasaSection from '@/components/Services/Madrasha/page'
import { getPage } from '@/helper/actions'
import React from 'react'

export default async function page() {

const madrashaPageData = await getPage("madrasha-2")

  return (
    <div>
      <MadrasaSection madrashaPageData={madrashaPageData} />

    </div>
  )
}
