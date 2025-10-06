import { getIslamicBooks, getPage } from '@/helper/actions';
import React from 'react'
import IslamicBooksSlider from './IslamicBooksSlider';

export default async function IslamicBooks() {

const books=await getIslamicBooks()

 const homePage = await getPage("home-sections-heading-management")
  const sections = homePage?.sections_on_api;
  // const islamic_books_ExtraData = sections.find((s) => s.title_slug === "offered-services");


  return (
    <div>
      <IslamicBooksSlider books={books} />
    </div>
  )
}
