import GraveyardSection from '@/components/Services/Graveyard/page'
import { getPage } from '@/helper/actions'
import React from 'react'

export default async function page() {

  const madrashaPageData = await getPage("madrasha-2")

  return (
    <div>
      <GraveyardSection madrashaPageData={madrashaPageData} />

    </div>
  )
}
