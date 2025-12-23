
import { getImageFromExtraFields, getMetaValueFromExtraFields } from "@/helper/metaHelpers";

import Image from "next/image";
import { getBannerInnerPage } from "@/helper/actions";
import Container from "../Shared/Container";

export default async function BannerFatwaServer() {

  const banners = await getBannerInnerPage()

  const banner = banners[0] || {};
  const left_logo = getImageFromExtraFields(banner, "left_logo");
  const right_logo = getImageFromExtraFields(banner, "right_logo");
  const center_top_image = getImageFromExtraFields(banner, "center_top_image");
  const center_bottom_image = getImageFromExtraFields(banner, "center_bottom_image");
  const center_bottom_title = getMetaValueFromExtraFields(banner, "center_bottom_title");



  return (
     <div
         className="w-full overflow-hidden "
         style={{
           backgroundImage: `url(${banner?.featured_image})`,
           backgroundSize: "cover",
           backgroundPosition: "center",
         }}
       >
         <div className="items-center justify-center">
           <Container className="h-[150px] sm:h-[180px] md:h-[286px]  relative">
         
             <div className="relative h-full w-full">
   
               {/* Left Logo */}
               {left_logo && (
                 <div className="absolute left-0 bottom-0">
                   <Image
                     src={left_logo}
                     alt="Left Logo"
                     width={188}
                     height={205}
                     priority={false}
                     loading="lazy"
                     className=" h-auto w-[130px] sm:w-[180px] md:w-[250px] lg:w-[320px] xl:w-[288px]"
                   />
   
                 </div>
               )}
   
               {/* Center Images */}
               {center_top_image && (
                 <div className="hidden  md:flex flex-col items-center absolute bottom-4 left-1/2 -translate-x-1/2 ">
                   <Image
                     src={center_top_image}
                     alt="Center Top"
                     width={340}
                     height={100}
                     priority={false}
                     loading="lazy"
                     className="h-auto w-[130px] sm:w-[180px] md:w-[280px] lg:w-[320px] xl:w-[340px]"
                   />
                   {center_bottom_title && (
                     <p className=" text-[50px] md:text-[60px] lg:text-[72px] text-[#00401A] font-medium ">
                       {center_bottom_title}
                       {/* 大阪モスク */}
                     </p>
                     // <Image
                     //   src={center_bottom_image}
                     //   alt="Center Bottom"
                     //   width={360}
                     //   height={72}
                     //   priority={false}
                     //   loading="lazy"
                     //   className="h-auto w-[150px] sm:w-[200px] md:w-[260px] lg:w-[300px] xl:w-[348px]"
                     // />
                   )}
                 </div>
               )}
   
               {/* Right Logo */}
               {right_logo && (
                 <div className="absolute right-0 bottom-0 md:bottom-6">
                   <Image
                     src={right_logo}
                     alt="Right Logo"
                     width={164}
                     height={205}
                     priority={false}
                     loading="lazy"
                     className="h-auto w-[80px] sm:w-[100px] md:w-[120px] lg:w-[144px] xl:w-[164px]"
                   />
                 </div>
               )}
             </div>
           </Container>
         </div>
       </div>
  );
}
