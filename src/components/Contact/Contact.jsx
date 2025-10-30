"use client";
import React from "react";

export default function Contact() {
  return (
    <section className=" grid md:grid-cols-2 gap-6 h-[668px]">
      {/* Left Side: Contact Form */}
      <div className="bg-gradient-to-br from-[#3198A0]  to-[#51F909] p-6 md:p-10 rounded-[10px] shadow-lg flex flex-col justify-center">
        <form className="space-y-6">
          <input
            type="text"
            placeholder="Name"
            className="w-full bg-white h-[66px] placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
          <input
            type="tel"
            placeholder="Phone"
            className="w-full bg-white h-[66px] placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full bg-white h-[66px] placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
          <input
            type="text"
            placeholder="Ask your subject"
            className="w-full bg-white h-[66px] placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
          <textarea
            rows={4}
            placeholder="Message"
            className="w-full bg-white  placeholder:text-base p-3 rounded-[10px] outline-none focus:ring-2 focus:ring-green-500 text-gray-700 placeholder-gray-400"
          />
           <button
            type="submit"
            className="h-[60px] text-bold text-[20px] w-full bg-[#3E8B18] shadow-lg text-white font-semibold py-3 rounded-[10px] hover:opacity-90 transition"
          >
            Submit
          </button>
          {/* <button
            type="submit"
            className="h-[60px] text-bold text-[20px] w-full bg-gradient-to-r from-green-600 to-lime-600 text-white font-semibold py-3 rounded-md hover:opacity-90 transition"
          >
            Submit
          </button> */}
        </form>
      </div>

      {/* Right Side: Map */}
      <div className="w-full h-full rounded-[10px] overflow-hidden shadow-lg">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13144.682918739936!2d135.4584222!3d34.70085625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6000e7dd9a7a22f3%3A0x6e2f9e76e5b69b37!2sOwada%2C%20Nishiyodogawa%20Ward%2C%20Osaka%2C%20555-0034%2C%20Japan!5e0!3m2!1sen!2sjp!4v1698593754001!5m2!1sen!2sjp"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  );
}
