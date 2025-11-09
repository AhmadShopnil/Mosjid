
import Container from "@/components/Shared/Container";
import Image from "next/image";
import DuaCard from "./DuaCard";
import Link from "next/link";
import { getDua, getPage } from "@/helper/actions";
import DuaCardNew from "./DuaCardNew";
import { getImageUrl } from "@/helper/getImageUrl";
import { splitBySlash } from "@/helper/splitBySpace";

const duas = [
  {
    id: 1,
    title: "اسم الدعاء",
    arabic:
      "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
    japanese: "主よ、私たちを不正を働く人々と一緒にしないでください。",
    meaning: "主よ、私たちを不正を働く人々と一緒にしないでください。",
  },
  {
    id: 2,
    title: "اسم الدعاء",
    arabic:
      "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
    japanese: "主よ、私たちを不正を働く人々と一緒にしないでください。",
    meaning: "主よ、私たちを不正を働く人々と一緒にしないでください。",
  },
  {
    id: 3,
    title: "اسم الدعاء",
    arabic:
      "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
    japanese: "主よ、私たちを不正を働く人々と一緒にしないでください。",
    meaning: "主よ、私たちを不正を働く人々と一緒にしないでください。",
  },
  {
    id: 4,
    title: "اسم الدعاء",
    arabic:
      "رَبَّنَا لَا تَجْعَلْنَا مَعَ الْقَوْمِ الظَّالِمِينَ",
    japanese: "主よ、私たちを不正を働く人々と一緒にしないでください。",
    meaning: "主よ、私たちを不正を働く人々と一緒にしないでください。",
  },
]



export default async function DuaSection() {
  const homePage = await getPage("home-sections-heading-management")
  const sections = homePage?.sections_on_api;

  const duas = await getDua()
  const dua_extraData = sections.find((s) => s.title_slug === "dua");


  const heading_part_1 = splitBySlash(dua_extraData?.title)[0]
  const heading_part_2 = splitBySlash(dua_extraData?.title)[1]

  const arabic_image = getImageUrl(dua_extraData?.image_media)
  const image_icon = getImageUrl(dua_extraData?.background_media)

  const find_more_dua_button = dua_extraData?.custom_information.find((item) => item.label === "find_more_dua_button")

  // console.log("dua_extraData", heading_part_1)



  return (
    <div className="pt-18 pb-2 "
    // style={{
    //   background: "linear-gradient(to bottom, rgba(245, 255, 250, 1), rgba(206, 255, 227, 1))",
    // }}
    >
      <Container className=" px-4">
        {/* heading */}
        <div className="flex flex-col sm:flex-row  justify-between items-center mb-8">

          <div className="flex justify-between items-center gap-2 gradient-border_b mb-4 sm:mb-0 pb-3  ">
            <Image
              src={image_icon}
              // src="/images/dua/icon.png"
              alt="Book Icon"
              width={65}
              height={65}
              className=""
            />
            <div className="text-xl sm:text-2xl md:text-3xl font-bold text-[#00401A]">
              <p><span className="text-[#F7BA2A]">{heading_part_1}</span> {heading_part_2}</p>
              <p>{dua_extraData?.sub_title}</p>

            </div>
          </div>

          <div className="flex gap-4 items-center justify-center ">
            <Image
              // src="/images/others/duaarabic.png"
              src={arabic_image}
              alt="mosque"
              width={150}
              height={50}
              className="mx-auto "
            />
            <div>
              <Link
                href="/dua"
                className=" border rounded-[50px] font-bold text-[#00401A]  border-[#00401A] text-base py-3 px-5
                 hover:bg-[#00401A] hover:text-white transition-colors duration-400"
              >
                {find_more_dua_button?.value}
              </Link>
            </div>
          </div>
        </div>
        {/* Dua list */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 justify-center items-center">
          {/* Dua Card  */}
          {duas.map((dua) => (
            <DuaCardNew
              key={dua.id}
              dua={dua}
            />

          ))}
        </div>
      </Container>
    </div>
  );
}
