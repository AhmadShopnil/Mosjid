

import EventsPage from '@/components/Events/EventsPage';
import { getCategories, getPage, getSettings } from '@/helper/actions'

import { transformNoticeCategories } from '@/helper/transformNoticeCategories'
import React from 'react'




export default async function page() {
  const settings = await getSettings();
  const homePage = await getPage("home-sections-heading-management")
  const cat = await getCategories("events_categories")

  const formattedCategories = transformNoticeCategories(cat);



  return (
    <div>

      <EventsPage
        settings={settings}
        homePage={homePage}
        formattedCategories={formattedCategories}

      />

    </div>
  )
}
