"use client";

import { useState } from "react";
import axiosInstance from "@/helper/axiosInstance";
import { toast } from "react-hot-toast";

const INITIAL_CHILD = {
  name: "",
  gender: "",
  birth_date: "",
  birth_place: "",
  nationality_id: "",
  passport_no: "",
  copy_id_passport: null,
  photo: null,
  pre_schools_certificate: null,
  health_certificate: null,
  signature: null,
};

const INITIAL_STATE = {
  // Child Info
  child: [{ ...INITIAL_CHILD }],

  // Family Info
  fathers_name: "",
  mothers_name: "",
  guardians_name: "",
  occupation_parents: "",
  contact_parents_guardian: "",
  profession: "",
  family_nationality: "",
  phone_no: "",
  emergency_no: "",
  home_address: "",
  email: "",

  // Correspondence
  residential_address: "",
  corr_email: "",
  corr_fathers_name: "",
  corr_mothers_name: "",
  cell_phone: "",
};

export default function AdmissionForm() {
  const [form, setForm] = useState(INITIAL_STATE);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleChildChange = (index, e) => {
    const { name, value, files, type } = e.target;
    const updatedChildren = [...form.child];
    updatedChildren[index] = {
      ...updatedChildren[index],
      [name]: type === "file" ? files[0] : value
    };
    setForm((prev) => ({
      ...prev,
      child: updatedChildren,
    }));
  };

  const addChild = () => {
    setForm((prev) => ({
      ...prev,
      child: [...prev.child, { ...INITIAL_CHILD }],
    }));
  };

  const removeChild = (index) => {
    if (form.child.length > 1) {
      const updatedChildren = form.child.filter((_, i) => i !== index);
      setForm((prev) => ({
        ...prev,
        child: updatedChildren,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();

      // Child Information
      form.child.forEach((c, index) => {
        formData.append(`child[${index}][name]`, c.name);
        formData.append(`child[${index}][gender]`, c.gender);
        formData.append(`child[${index}][birth_date]`, c.birth_date);
        formData.append(`child[${index}][birth_place]`, c.birth_place);
        formData.append(`child[${index}][nationality_id]`, c.nationality_id);
        formData.append(`child[${index}][passport_no]`, c.passport_no);

        // Documents per child
        if (c.copy_id_passport) formData.append(`child[${index}][copy_id_passport]`, c.copy_id_passport);
        if (c.photo) formData.append(`child[${index}][photo]`, c.photo);
        if (c.pre_schools_certificate) formData.append(`child[${index}][pre_schools_certificate]`, c.pre_schools_certificate);
        if (c.health_certificate) formData.append(`child[${index}][health_certificate]`, c.health_certificate);
        if (c.signature) formData.append(`child[${index}][signature]`, c.signature);
      });

      // Family Info
      formData.append("fathers_name", form.fathers_name);
      formData.append("mothers_name", form.mothers_name);
      formData.append("guardians_name", form.guardians_name);
      formData.append("occupation_parents", form.occupation_parents);
      formData.append("contact_parents_guardian", form.contact_parents_guardian);
      formData.append("profession", form.profession);
      formData.append("family_nationality", form.family_nationality);
      formData.append("phone_no", form.phone_no);
      formData.append("emergency_no", form.emergency_no);
      formData.append("home_address", form.home_address);
      formData.append("email", form.email);

      // Correspondence (informations)
      formData.append("informations[correspondence][residential_address]", form.residential_address);
      formData.append("informations[correspondence][email]", form.corr_email);
      formData.append("informations[correspondence][fathers_name]", form.corr_fathers_name);
      formData.append("informations[correspondence][mothers_name]", form.corr_mothers_name);
      formData.append("informations[correspondence][cell_phone]", form.cell_phone);


      // Documents (informations) need to delete just for test api
      // if (form.copy_id_passport) formData.append("informations[documents][copy_id_passport]", form.copy_id_passport);
      // if (form.photo) formData.append("informations[documents][photo]", form.photo);
      // if (form.pre_schools_certificate) formData.append("informations[documents][pre_schools_certificate]", form.pre_schools_certificate);
      // if (form.health_certificate) formData.append("informations[documents][health_certificate]", form.health_certificate);
      // if (form.signature) formData.append("informations[documents][signature]", form.signature);


      const response = await axiosInstance.post("/admissions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (response.data) {
        toast.success("Admission Form Submitted Successfully!");
        setForm(INITIAL_STATE);
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="borderDonationHome rounded-[20px] px-4 md:px-8 py-8 bg-white shadow-sm">
      <h2 className="text-center text-2xl md:text-3xl font-bold mb-8 border-b border-gray-200 pb-4 text-[#00401A]">
        Admission Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">

        {/* Children Information Section */}
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <SectionTitle title="Child’s Information" />
            <button
              type="button"
              onClick={addChild}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors"
            >
              + Add More Child
            </button>
          </div>

          {form.child.map((child, index) => (
            <div key={index} className="p-4 border border-gray-200 rounded-xl relative bg-gray-50/50">
              {form.child.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeChild(index)}
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold p-2"
                  title="Remove Child"
                >
                  ✕
                </button>
              )}
              <h4 className="font-medium text-green-700 mb-4">Child #{index + 1}</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Input label="Full Name" name="name" value={child.name} onChange={(e) => handleChildChange(index, e)} required />
                <Select
                  label="Gender"
                  name="gender"
                  value={child.gender}
                  onChange={(e) => handleChildChange(index, e)}
                  required
                  options={[
                    { value: "", label: "Select" },
                    { value: "0", label: "Male" },
                    { value: "1", label: "Female" },
                  ]}
                />
                <Input label="Date of Birth" type="date" name="birth_date" value={child.birth_date} onChange={(e) => handleChildChange(index, e)} required />
                <Input label="Place of Birth" name="birth_place" value={child.birth_place} onChange={(e) => handleChildChange(index, e)} />
                <Input label="Nationality ID" name="nationality_id" value={child.nationality_id} onChange={(e) => handleChildChange(index, e)} />
                <Input label="Passport / ID No" name="passport_no" value={child.passport_no} onChange={(e) => handleChildChange(index, e)} />
              </div>

              {/* Documents for this child */}
              <div className="mt-6 space-y-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-bold text-green-700">Documents for {child.name || "Child #" + (index + 1)}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <FileInput label="Passport Copy" name="copy_id_passport" onChange={(e) => handleChildChange(index, e)} required />
                  <FileInput label="Photograph" name="photo" onChange={(e) => handleChildChange(index, e)} required />
                  <FileInput label="Pre-School Cert" name="pre_schools_certificate" onChange={(e) => handleChildChange(index, e)} required />
                  <FileInput label="Health Cert" name="health_certificate" onChange={(e) => handleChildChange(index, e)} required />
                  <FileInput label="Signature" name="signature" onChange={(e) => handleChildChange(index, e)} required />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Family Information */}
        <div className="space-y-6">
          <SectionTitle title="Family Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input label="Father’s Name" name="fathers_name" value={form.fathers_name} onChange={handleChange} required />
            <Input label="Mother’s Name" name="mothers_name" value={form.mothers_name} onChange={handleChange} required />
            <Input label="Guardian’s Name" name="guardians_name" value={form.guardians_name} onChange={handleChange} />
            <Input label="Occupation of Parents" name="occupation_parents" value={form.occupation_parents} onChange={handleChange} />
            <Input label="Contact Parents/Guardian" name="contact_parents_guardian" value={form.contact_parents_guardian} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input label="Profession" name="profession" value={form.profession} onChange={handleChange} />
            <Input label="Family Nationality" name="family_nationality" value={form.family_nationality} onChange={handleChange} />
            <Input label="Phone Number" name="phone_no" value={form.phone_no} onChange={handleChange} required />
            <Input label="Emergency Contact No" name="emergency_no" value={form.emergency_no} onChange={handleChange} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Home Address" name="home_address" value={form.home_address} onChange={handleChange} />
            <Input label="E-mail" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
        </div>

        {/* Correspondence */}
        <div className="space-y-6">
          <SectionTitle title="Correspondence" />
          <Input label="Residential Address" name="residential_address" value={form.residential_address} onChange={handleChange} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input label="Correspondence Email" name="corr_email" type="email" value={form.corr_email} onChange={handleChange} />
            <Input label="Father's Name" name="corr_fathers_name" value={form.corr_fathers_name} onChange={handleChange} />
            <Input label="Mother's Name" name="corr_mothers_name" value={form.corr_mothers_name} onChange={handleChange} />
            <Input label="Cell Phone" name="cell_phone" value={form.cell_phone} onChange={handleChange} />
          </div>
        </div>

        {/* Declaration */}
        <div className="space-y-6">
          <SectionTitle title="Final Declaration" />
          <div className="flex items-center gap-2 pb-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" required className="w-5 h-5 accent-green-600" />
              <span className="text-sm font-medium">I/We hereby declare that the information provided is true and correct for all students.</span>
            </label>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-100">
          <button
            type="button"
            onClick={() => setForm(INITIAL_STATE)}
            className="border border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#00401A] hover:bg-[#00602A] text-white px-10 py-3 rounded-xl shadow-lg transition-all duration-300 ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
          >
            {loading ? "Submitting..." : "Submit Application"}
          </button>
        </div>

      </form>
    </div>
  );
}

/* Reusable Components */

const SectionTitle = ({ title }) => (
  <h3 className="font-bold text-xl text-[#00401A] flex items-center gap-2">
    <span className="w-2 h-6 bg-[#B98C20] rounded-full inline-block"></span>
    {title}
  </h3>
);

const Input = ({ label, name, value, onChange, type = "text", required = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none focus:border-green-600 transition-colors bg-white"
    />
  </div>
);

const FileInput = ({ label, name, onChange, required = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
    <div className="relative">
      <input
        type="file"
        name={name}
        onChange={onChange}
        required={required}
        className="w-full h-12 rounded-xl border border-gray-300 px-4 py-2 bg-gray-50 text-sm file:mr-4 file:py-1 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
      />
    </div>
  </div>
);

const Select = ({ label, name, value, onChange, options, required = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">{label} {required && <span className="text-red-500">*</span>}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white focus:outline-none focus:border-green-600 transition-colors"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

