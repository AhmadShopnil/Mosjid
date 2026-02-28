import React from "react";
import Image from "next/image";
const ContactFormIslamicSchool = () => {
  return (
    <div>
<div>
  <div className="lg:p-5 p-3 rounded-[10px] mt-5 border-5 border-[#FFCE4D] bg-[#F9FFF6]">
    <h3 className="text-[#B98C20] text-2xl lg:text-4xl text-center font-normal">
      Suggestion Box / 提案箱{" "}
    </h3>
  </div>
  <div>
    <div className="md:p-[30px] p-4 border-[5px] mt-5 border-[rgba(255,206,77,1)] rounded-[10px] bg-[rgba(249,255,246,1)] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-[30px]">
      <div>
        {/* form */}
        <form>
          <div className="flex flex-col gap-[20px]">
            {/* Reusable Style for Gradient Border */}
            {[ 
              { placeholder: "Name", type: "text" },
              { placeholder: "Phone", type: "number" },
              { placeholder: "Email", type: "email" },
              { placeholder: "Ask your subject", type: "text" }
            ].map((field, index) => (
              <div key={index}>
<input
  type={field.type}
  className="w-full rounded-[10px] p-[19px] outline-none"
  placeholder={field.placeholder}
  style={{
    border: '1px solid transparent',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    backgroundImage:
      'linear-gradient(white, white), linear-gradient(to bottom, #3198A0, #51F909)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  }}
/>

</div>
            ))}

            <div 
             
            >
<textarea
  className="w-full p-[19px] rounded-[9px] outline-none"
  style={{
    border: '1px solid transparent',
    boxSizing: 'border-box',
    backgroundColor: 'transparent',
    backgroundImage:
      'linear-gradient(white, white), linear-gradient(to bottom, #3198A0, #51F909)',
    backgroundOrigin: 'border-box',
    backgroundClip: 'padding-box, border-box',
  }}
/>

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
          <Image
            src="/images/offerServices/islamicSchool/contactImage.svg"
            alt="Contact"
            width={1000}
            height={495}
            className="object-cover"
          />
        </div>
      </div>
    </div>
  </div>
</div>
    </div>
  );
};

export default ContactFormIslamicSchool;
