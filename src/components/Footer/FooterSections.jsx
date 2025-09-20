// components/Footer.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaEnvelope,
} from "react-icons/fa";
import { FaPhoneVolume, FaLocationDot } from "react-icons/fa6";
import { ImFacebook2 } from "react-icons/im";

export default function FooterSections() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // -----------------------------
  // Demo Data
  // -----------------------------

  const contactInfo = [
    {
      id: 1,
      icon: <FaLocationDot className="text-[#00401A] min-w-[20px]" />,
      text: "555-0032 4-12-16 Owada, Nishiyodogawa-ku, Osaka City, Osaka Prefecture",
    },
    {
      id: 2,
      icon: <FaPhoneVolume className="text-[#00401A] min-w-[20px]" />,
      text: "+(81) 080-3822-4143",
    },
    {
      id: 3,
      icon: <FaEnvelope className="text-[#00401A] min-w-[20px]" />,
      text: "info@osakamasjid.org",
    },
  ];

  const socialLinks = [
    { id: 1, icon: <FaFacebookF />, url: "#" },
    { id: 2, icon: <FaInstagram />, url: "#" },
    { id: 3, icon: <FaLinkedinIn />, url: "#" },
  ];

  const usefulLinks = [
    { id: 1, label: "Home", url: "#" },
    { id: 2, label: "Fatwa", url: "#" },
    { id: 3, label: "Prayer Time", url: "#" },
    { id: 4, label: "Notice Board", url: "#" },
    { id: 5, label: "Blog & Event", url: "#" },
    { id: 6, label: "Dictionary", url: "#" },
    { id: 7, label: "Contact Us", url: "#" },
  ];

  // -----------------------------
  // Handlers
  // -----------------------------
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // TODO: Replace with API call
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <footer className="bg-white shadow-md px-6 md:px-12 xl:px-16 py-10 rounded-[30px]">
      <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-4
       gap-10 xl:gap-8">
        {/* Logo + About */}
        <div>
          <div className="mb-4 gradient-border_b pb-2">
            <Image
              src="/images/footer/footer logo.png"
              alt="Osaka Masjid Logo"
              width={280}
              height={60}
            />
          </div>
          <p className="text-[#333333] text-base">
            Lorem ipsum dolor sit amet consectetur. Sodales integer vitae sed
            mauris proin gravida. Proin vestibulum adipiscing iaculis quis quis.
          </p>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-2xl text-[#00401A] font-bold mb-4">
            Get In Touch
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {contactInfo.map((info) => (
              <li key={info.id} className="flex items-start   gap-2">
               <span className=" text-lg bg-[#D9E2DD] p-2 rounded-full">
                 {info.icon}
               </span>
                <span className="text-[#333333] text-base">{info.text}</span>
              </li>
            ))}
          </ul>
            <div className='flex gap-2 mt-6 px-1  items-center'>
                <span className='text-blue-500 text-xl'>
            <ImFacebook2 />
                </span>
                <span className=''>
             <Image
              src="/images/footer/insta.png"
              alt='a1'
              width={38}
              height={38}
              className='hidden sm:flex'
             />
                </span>
                <span className='text-blue-500'>
             <Image
              src="/images/footer/linkdin.png"
              alt='a1'
              width={26}
              height={26}
              className='hidden sm:flex'
             />

                </span>
            </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-2xl text-[#00401A] font-bold mb-3">
            Useful Link
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            {usefulLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.url}
                  className="text-[#333333] text-lg hover:text-[#F7BA2A]"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Quick Contact Form */}
        <div>
          <h3 className="text-2xl text-[#00401A] font-bold mb-3">
            Quick Contact
          </h3>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-green-600"
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-green-600"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-green-600"
            />
            <textarea
              name="message"
              placeholder="Message"
              rows="3"
              value={formData.message}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 text-sm outline-none focus:border-green-600"
            />
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-2 rounded-md font-medium hover:bg-green-700 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </footer>
  );
}
