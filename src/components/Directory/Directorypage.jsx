import Image from "next/image";

export default function DirectoryPage() {
    return (
        <div className=" bg-gray-50 space-y-4">
            {/* First Section - Table */}
            <div className="  gradient-border rounded-2xl p-8 bg-white">
                {/* Table Header */}
                <div className="bg-[#52B920] h-[50px] text-white  flex items-center justify-center rounded-t-[10px] ">
                    <h2 className=" text-center text-xl font-bold">Table for selected category</h2>
                </div>

                {/* Table */}
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-[#D9E2DD] h-[28px]">
                            <th className="border border-[#B0C4B8] py-1 text-base  text-center text-[#000000]">SL.No</th>
                            <th className="border border-[#B0C4B8] py-1 text-base  text-center  text-[#000000]">Name</th>
                            <th className="border border-[#B0C4B8] py-1 text-base  text-center  text-[#000000]">Phone</th>
                            <th className="border border-[#B0C4B8] py-1 text-base  text-center  text-[#000000]">Juma Time</th>
                            <th className="border border-[#B0C4B8] py-1 text-base  text-center  text-[#000000]">Address</th>
                            <th className="border border-[#B0C4B8] py-1 text-base  text-center  text-[#000000]">View in Detail</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white h-[28px]">
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                        </tr>
                        <tr className="bg-[#E5F5DE] h-[28px]">
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                        </tr>
                        <tr className="bg-white h-[28px]">
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                        </tr>
                        <tr className="bg-[#E5F5DE] h-[28px]">
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                            <td className="border border-gray-300 p-3"></td>
                        </tr>
                    </tbody>
                </table>

                {/* Website URL */}
                <div className="text-center mt-6 text-[#000000] text-2xl">www.osakamasjid.com</div>
            </div>

            {/* Social Icons */}
            <div className="py-4 flex justify-end items-center">
                <div className="  flex items-center gap-4 text-[#D9E2DD]">
                    <div className="border-r-2 border-gray-300 pr-3">
                        <Image
                            src="/images/notice/twiter.png"
                            alt='a1'
                            width={23}
                            height={23}
                        />
                    </div>
                    <div className="border-r-2 border-gray-300 pr-3">
                        <Image
                            src="/images/notice/fb.png"
                            alt='a1'
                            width={15}
                            height={15}
                        />
                    </div>
                    <div className="border-r-2 border-gray-300 pr-3">
                        <Image
                            src="/images/notice/whatsapp.png"
                            alt='a1'
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className="border-r-2 border-gray-300 pr-3">
                        <Image
                            src="/images/notice/printer.png"
                            alt='a1'
                            width={22}
                            height={22}
                        />
                    </div>
                    <div>
                        <Image
                            src="/images/notice/download.png"
                            alt='a1'
                            width={22}
                            height={22}
                        />
                    </div>


                </div>
            </div>

            {/* Second Section - Details Form */}
            <div className="gradient-border rounded-2xl p-8 bg-white">
                {/* Form Header */}
                <div className="bg-[#E5F5DE] h-[50px] flex items-center justify-center rounded-[8px] mb-6">
                    <h2 className="text-center text-xl font-semibold text-[#00401A]">Heading</h2>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Name</span>
                                <span className="">:</span>
                            </div>
                        </div>
                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Address</span>
                                <span className="">:</span>
                            </div>
                        </div>
                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Phone/Fax</span>
                                <span className="">:</span>
                            </div>
                        </div>
                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Email</span>
                                <span className="">:</span>
                            </div>
                        </div>
                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Website</span>
                                <span className="">:</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Established in</span>
                                <span className="">:</span>
                            </div>
                        </div>
                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Juma prayer</span>
                                <span className="">:</span>
                            </div>
                        </div>



                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Status</span>
                                <span className="">:</span>
                            </div>
                        </div>

                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Facilities</span>
                                <span className="">:</span>
                            </div>
                        </div>
                        <div className="border border-[#E0E0E0] rounded-[10px] h-[50px]">
                            <div className="w-[30%] h-full px-3 bg-[#e0e0e06d] flex  items-center justify-between 
                          text-base text-[#000000]">
                                <span className=" ">Others</span>
                                <span className="">:</span>
                            </div>
                        </div>

                    </div>
                </div>

                {/* Website URL */}
                <div className="text-center mt-8 text-[#000000] text-2xl ">www.osakamasjid.com</div>
            </div>


            {/* Social Icons */}
            <div className="py-4 flex justify-end items-center">
                <div className="  flex items-center gap-4 text-[#D9E2DD]">
                    <div className="border-r-2 border-gray-300 pr-3">
                        <Image
                            src="/images/notice/twiter.png"
                            alt='a1'
                            width={23}
                            height={23}
                        />
                    </div>
                    <div className="border-r-2 border-gray-300 pr-3">
                        <Image
                            src="/images/notice/fb.png"
                            alt='a1'
                            width={15}
                            height={15}
                        />
                    </div>
                    <div className="border-r-2 border-gray-300 pr-3">
                        <Image
                            src="/images/notice/whatsapp.png"
                            alt='a1'
                            width={20}
                            height={20}
                        />
                    </div>
                    <div className="border-r-2 border-gray-300 pr-3">
                        <Image
                            src="/images/notice/printer.png"
                            alt='a1'
                            width={22}
                            height={22}
                        />
                    </div>
                    <div>
                        <Image
                            src="/images/notice/download.png"
                            alt='a1'
                            width={22}
                            height={22}
                        />
                    </div>


                </div>
            </div>
        </div>
    )
}
