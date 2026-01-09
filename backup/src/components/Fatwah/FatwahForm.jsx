"use client";
import { useState } from "react";

export default function FatwahForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    contact: "",
    address: "",
    question: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({ name: "", email: "", contact: "", address: "", question: "" });
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border">
      <h2 className="text-center text-lg font-semibold text-green-700 mb-3">
        Fatwah Form / ファットワフォーム
      </h2>
      <p className="text-gray-700 text-sm leading-relaxed mb-4">
        例えばあるフィギュア...（ここに説明テキストが入ります）...
      </p>

      <form className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">あなたの名前 / Your Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">電子メールアドレス / Email Address</label>
            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
            <p className="text-xs text-red-500">Please add valid email</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">氏名や連絡先 / WhatsApp or Contact</label>
            <input
              name="contact"
              value={form.contact}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">住所 / Address</label>
            <input
              name="address"
              value={form.address}
              onChange={handleChange}
              className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium">質問内容 / Your Question in Short</label>
          <textarea
            name="question"
            value={form.question}
            onChange={handleChange}
            className="w-full border rounded-md px-3 py-2 mt-1 focus:ring-2 focus:ring-green-500 outline-none"
            rows="4"
          ></textarea>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={resetForm}
            className="px-6 py-2 border border-green-500 rounded-md hover:bg-green-50"
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
          >
            Submit Your Question
          </button>
        </div>
      </form>
    </div>
  );
}
