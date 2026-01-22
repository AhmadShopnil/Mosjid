"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";

export default function ConversionForm() {
  const { register, handleSubmit } = useForm();

  const [applicantPhoto, setApplicantPhoto] = useState(null);
  const [pictureArea, setPictureArea] = useState(null);
  const [imamSign, setImamSign] = useState(null);

  const onSubmit = (data) => {
    console.log({
      ...data,
      applicantPhoto,
      pictureArea,
      imamSign,
    });
  };

  return (
    <section className="borderDonationHome p-4 sm:p-6">
      <h2 className="text-xl sm:text-2xl font-semibold mb-6">
        Converted Person Information
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-6">

          <FormRow en="Name" jp="氏名" {...register("name")} />
          <FormRow en="Nationality" jp="国籍" {...register("nationality")} />

          <FormRow en="Muslim Name" jp="イスラム教徒の名前" {...register("muslimName")} />
          <FormRow en="Address" jp="住所" {...register("address")} />

          <FormRow en="Date of Birth" jp="生年月日" type="date" {...register("dob")} />
          <FormRow en="Declared Date" jp="申告日" type="date" {...register("declaredDate")} />

          <FormRow en="Mobile No" jp="携帯電話番号" {...register("mobile")} />
          <FormRow en="Witness" jp="証人" {...register("witness1")} />

          <FormRow en="Witness" jp="証人" {...register("witness2")} />
          <ImageField en="Picture Area" jp="画像エリア" image={pictureArea} setImage={setPictureArea} />

          <FormRow en="Previous Religion" jp="以前の宗教" {...register("previousReligion")} />
          <ImageField en="Imam Sign" jp="イマームのサイン" image={imamSign} setImage={setImamSign} />

          <FormRow en="Passport No." jp="パスポート番号" {...register("passport")} />
          <ImageField en="Applicant Picture" jp="申請者の写真" image={applicantPhoto} setImage={setApplicantPhoto} />
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex flex-wrap gap-3 mt-10">
          <button className="bg-green-500 text-white px-6 py-2.5 rounded-md hover:bg-green-600 text-sm">
            Submit Form
          </button>

          <button type="button" className="border border-green-500 text-green-700 px-6 py-2.5 rounded-md hover:bg-green-50 text-sm">
            View Certificate
          </button>

          <button type="button" className="border border-green-500 text-green-700 px-6 py-2.5 rounded-md hover:bg-green-50 text-sm">
            Download Certificate
          </button>
        </div>
      </form>
    </section>
  );
}

function FormRow({ en, jp, type = "text", ...props }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-3">
      <label className="md:w-44">
        <p className="font-semibold text-gray-800 text-sm sm:text-base">
          {en}
        </p>
        <p className="text-[11px] sm:text-xs text-gray-400">
          {jp}
        </p>
      </label>

      <span className="hidden md:block text-gray-400">:</span>

      <input
        type={type}
        placeholder="Type Now"
        {...props}
        className="w-full md:flex-1 px-3 py-2.5 rounded-md border border-green-700 outline-none text-sm"
      />
    </div>
  );
}

function ImageField({ en, jp, image, setImage }) {
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage({
      file,
      preview: URL.createObjectURL(file),
    });
  };

  const removeImage = () => {
    URL.revokeObjectURL(image.preview);
    setImage(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-2 md:gap-3">
      <label className="md:w-44">
        <p className="font-semibold text-gray-800 text-sm sm:text-base">
          {en}
        </p>
        <p className="text-[11px] sm:text-xs text-gray-400">
          {jp}
        </p>
      </label>

      <span className="hidden md:block pt-2 text-gray-400">:</span>

      <div className="flex-1">
        {!image ? (
          <label className="cursor-pointer flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-md p-4 text-xs sm:text-sm text-gray-500 hover:bg-green-50">
            <span>Click to upload image</span>
            <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
          </label>
        ) : (
          <div className="relative w-full max-w-[80px]">
            <img src={image.preview} alt="preview" className="rounded-md w-full object-cover" />
            <button
              type="button"
              onClick={removeImage}
              className="absolute top-1 right-1 bg-red-500 text-white text-xs px-2 py-0.5 rounded"
            >
              ✕
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

