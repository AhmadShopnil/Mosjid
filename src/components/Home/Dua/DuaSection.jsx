
import Container from "@/components/Shared/Container";
import Image from "next/image";
import DuaCard from "./DuaCard";
import Link from "next/link";
import { getDua } from "@/helper/actions";
import DuaCardNew from "./DuaCardNew";

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
;

  const duas =await getDua()



  return (
    <div className="pt-18 pb-2 "
      // style={{
      //   background: "linear-gradient(to bottom, rgba(245, 255, 250, 1), rgba(206, 255, 227, 1))",
      // }}
    >
      <Container className=" px-4">
        {/* heading */}
        <div className="flex flex-col sm:flex-row  justify-between items-center mb-8">
          <div className="flex gap-2 justify-center items-center gradient-border_b pb-2 ">
            <Image
              src="/images/others/duaicon.png"
              alt="mosque"
              width={45}
              height={40}
              className="mx-auto "
            />
            <h4 className="text-[#00401A] font-bold text-3xl">
              <span className="text-[#F7BA2A]">Submit </span>
               a Duah</h4>
          </div>
          <div className="flex gap-4 items-center justify-center ">
            <Image
              src="/images/others/duaarabic.png"
              alt="mosque"
              width={150}
              height={50}
              className="mx-auto "
            />
            <div>
              <Link
                href="/"
                className="border rounded-[50px] font-bold text-[#00401A]  border-[#00401A] text-base py-2.5 px-5
                 hover:bg-[#00401A] hover:text-white transition-colors duration-400"
              >
                Find More Duah
              </Link>
            </div>
          </div>
        </div>
        {/* Dua list */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 justify-center items-center">
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
