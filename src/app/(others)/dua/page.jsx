
import DuaPageInner from '@/components/Dua/DuaPageInner'

import { getCategories, getNotices, getPage, getSettings } from '@/helper/actions'
import { transformNoticeCategories } from '@/helper/transformNoticeCategories'

import React from 'react'



export default async function page() {

  const settings = await getSettings()
  const homePage = await getPage("home-sections-heading-management")
  const cat = await getCategories("dua_categories")

  const formattedCategories = transformNoticeCategories(cat);
 


  return (
    <div>

      <DuaPageInner
        settings={settings}
        homePage={homePage}
       
        formattedCategories={formattedCategories}

      />

    </div>
  )
}
