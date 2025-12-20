import React from 'react'
import Image from 'next/image'
const IslamicSchoolContact = () => {
  return (
    <div>
          <div>
                  <div className="lg:p-5 p-3 rounded-[10px] mt-6 border-5 border-[#FFCE4D] bg-[#F9FFF6]">
                    <h3 className="text-[#B98C20] text-2xl lg:text-4xl text-center font-normal">
                      Suggestion Box / 提案箱{" "}
                    </h3>
                  </div>
                  <div>
                    <div className="p-[30px] border-[5px] mt-6 border-[rgba(255,206,77,1)] rounded-[10px] bg-[rgba(249,255,246,1)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[30px]">
                      <div>
                        {/* form */}
                        <form>
                          <div className="flex flex-col gap-[20px]">
                            <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                              <input
                                type="text"
                                className="w-full rounded-[9px] p-[19px] outline-none bg-white"
                                placeholder="Name"
                              />
                            </div>
                            <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                              <input
                                type="number"
                                className="w-full rounded-[9px] p-[19px] outline-none bg-white"
                                placeholder="Phone"
                              />
                            </div>
                            <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                              <input
                                type="email"
                                className="w-full rounded-[9px] p-[19px] outline-none bg-white"
                                placeholder="Email"
                              />
                            </div>
                            <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                              <input
                                type="text"
                                className="w-full rounded-[9px] p-[19px] outline-none bg-white"
                                placeholder="Ask your subject"
                              />
                            </div>
                            <div className="p-[1px] rounded-[10px] bg-gradient-to-b from-[#3198A0] to-[#51F909]">
                              <textarea className="w-full p-[19px] rounded-[9px] outline-none bg-white" />
                            </div>
        
                            <div>
                              <button className="pt-[10px] pr-[20px] pb-[10px] pl-[20px] w-full rounded-[10px] bg-[#3E8B18] text-white font-[700] transition-all duration-300 ease-in-out hover:opacity-90 hover:scale-[1.03]">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>
                      </div>
                      <div>
                        {/* image */}
                        <div className="">
                          {" "}
                          {/* full viewport height */}
                          <Image
                            src="/images/offerServices/islamicSchool/contactImage.svg"
                            alt="Contact"
                            width={1000}
                            height={495}
                            className="object-cover " // ensures the image covers full width & height
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
    </div>
  )
}

export default IslamicSchoolContact