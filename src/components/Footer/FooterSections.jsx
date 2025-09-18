// components/Footer.jsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";

export default function FooterSections() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Later: replace with API call
    // fetch("/api/contact", { method: "POST", body: JSON.stringify(formData) })
  };

  return (
    <footer className="bg-white shadow-md px-6 md:px-16 py-10">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + About */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Image
              src="/images/logo.png"
              alt="Osaka Masjid Logo"
              width={50}
              height={50}
            />
            <h2 className="text-xl font-bold text-yellow-600">OSAKA MASJID</h2>
          </div>
          <p className="text-sm text-gray-600">
            Lorem ipsum dolor sit amet consectetur. Sodales integer vitae sed mauris proin gravida. 
            Proin vestibulum adipiscing iaculis quis quis.
          </p>
        </div>

        {/* Get In Touch */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Get In Touch</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <FaMapMarkerAlt className="text-green-700 mt-1" />
              <span>555-0032 4-12-16 Owada, Nishiyodogawa-ku, Osaka City, Osaka Prefecture</span>
            </li>
            <li className="flex items-center gap-2">
              <FaPhoneAlt className="text-green-700" /> <span>+(81) 080-3822-4143</span>
            </li>
            <li className="flex items-center gap-2">
              <FaEnvelope className="text-green-700" /> <span>info@osakamasjid.org</span>
            </li>
          </ul>
          <div className="flex gap-3 mt-4 text-green-700">
            <FaFacebookF className="cursor-pointer hover:text-green-900" />
            <FaInstagram className="cursor-pointer hover:text-green-900" />
            <FaLinkedinIn className="cursor-pointer hover:text-green-900" />
          </div>
        </div>

        {/* Useful Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Useful Link</h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li><a href="#" className="hover:text-green-700">Home</a></li>
            <li><a href="#" className="text-yellow-600 font-medium">Fatwa</a></li>
            <li><a href="#" className="hover:text-green-700">Prayer Time</a></li>
            <li><a href="#" className="hover:text-green-700">Notice Board</a></li>
            <li><a href="#" className="hover:text-green-700">Blog & Event</a></li>
            <li><a href="#" className="hover:text-green-700">Dictionary</a></li>
            <li><a href="#" className="hover:text-green-700">Contact Us</a></li>
          </ul>
        </div>

        {/* Quick Contact Form */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Contact</h3>
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
