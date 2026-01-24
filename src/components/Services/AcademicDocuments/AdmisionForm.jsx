"use client";

import { useState } from "react";

const INITIAL_STATE = {
  // Child Info
  fullName: "",
  gender: "",
  dob: "",
  placeOfBirth: "",
  nationality: "",
  passportOrId: "",
  studentPhoto: null,

  // Family Info
  fatherName: "",
  motherName: "",
  guardianName: "",
  parentsOccupation: "",
  profession: "",
  parentNationality: "",
  homeAddress: "",
  phone: "",
  email: "",
  emergencyPhone: "",

  // Correspondence
  residentialAddress: "",
  correspondenceEmail: "",
  fatherPhone: "",
  motherPhone: "",

  // Documents
  idCopy: null,
  photograph: null,
  previousCertificate: null,
  healthCertificate: null,

  // Declaration
  signature: null,
  submissionDate: "",
  agreement: "",
};

export default function AdmissionForm() {
  const [form, setForm] = useState(INITIAL_STATE);

  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admission Data:", form);
  };

  return (
    <div className="borderDonationHome rounded-[20px] px-8 py-8 bg-white">
      <h2 className="text-center text-3xl font-bold mb-8 border-b border-gray-400 pb-2">
        Admission Form
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Child Information */}
        <SectionTitle title="Child’s Information" />

        <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Input label="Full Name" name="fullName" value={form.fullName} onChange={handleChange} />
          <Select label="Gender" name="gender" value={form.gender} onChange={handleChange}
            options={[
              { value: "", label: "Select" },
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
          />
          <Input label="Date of Birth" type="date" name="dob" value={form.dob} onChange={handleChange} />
          <Input label="Place of Birth" name="placeOfBirth" value={form.placeOfBirth} onChange={handleChange} />
          <Input label="Nationality" name="nationality" value={form.nationality} onChange={handleChange} />
          <Input label="Passport / ID No" name="passportOrId" value={form.passportOrId} onChange={handleChange} />
        </div>

        <FileInput label="Student Photograph" name="studentPhoto" onChange={handleChange} />

        {/* Family Information */}
        <SectionTitle title="Family Information" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input label="Father’s Name" name="fatherName" value={form.fatherName} onChange={handleChange} />
          <Input label="Mother’s Name" name="motherName" value={form.motherName} onChange={handleChange} />
          <Input label="Guardian’s Name (if different)" name="guardianName" value={form.guardianName} onChange={handleChange} />
          <Input label="Occupation of Parents" name="parentsOccupation" value={form.parentsOccupation} onChange={handleChange} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Input label="Profession" name="profession" value={form.profession} onChange={handleChange} />
          <Input label="Nationality" name="parentNationality" value={form.parentNationality} onChange={handleChange} />
          <Input label="Phone Number" name="phone" value={form.phone} onChange={handleChange} />
          <Input label="Emergency Contact Number" name="emergencyPhone" value={form.emergencyPhone} onChange={handleChange} />
        </div>

        <Input label="Home Address" name="homeAddress" value={form.homeAddress} onChange={handleChange} />

        {/* Correspondence */}
        <SectionTitle title="Correspondence" />

        <Input label="Residential Address" name="residentialAddress" value={form.residentialAddress} onChange={handleChange} />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input label="E-mail" name="correspondenceEmail" value={form.correspondenceEmail} onChange={handleChange} />
          <Input label="Father Cell Phone" name="fatherPhone" value={form.fatherPhone} onChange={handleChange} />
          <Input label="Mother Cell Phone" name="motherPhone" value={form.motherPhone} onChange={handleChange} />
        </div>

        {/* Documents */}
        <SectionTitle title="Documents To Attach" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <FileInput label="Copy of ID or Passport" name="idCopy" onChange={handleChange} />
          <FileInput label="Recent Photograph" name="photograph" onChange={handleChange} />
          <FileInput label="Previous School Certificate" name="previousCertificate" onChange={handleChange} />
          <FileInput label="Health Certificate (if required)" name="healthCertificate" onChange={handleChange} />
        </div>

        {/* Declaration */}
        <SectionTitle title="Declaration & Consent" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FileInput label="Signature of Parent / Guardian" name="signature" onChange={handleChange} />
          <Input label="Date of Submission" type="date" name="submissionDate" value={form.submissionDate} onChange={handleChange} />
          <Select
            label="Agreement to School Policies"
            name="agreement"
            value={form.agreement}
            onChange={handleChange}
            options={[
              { value: "", label: "Select" },
              { value: "yes", label: "I Agree" },
            ]}
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6">
          <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded-lg">
            Submit
          </button>
          <button
            type="button"
            onClick={() => setForm(INITIAL_STATE)}
            className="border border-red-500 text-red-500 px-6 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>

      </form>
    </div>
  );
}

/* Reusable Components */

const SectionTitle = ({ title }) => (
  <h3 className="font-semibold text-lg mt-8">{title}</h3>
);

const Input = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="text-sm mb-1 block">{label}</label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-12 rounded-xl border border-green-700 px-4"
    />
  </div>
);

const FileInput = ({ label, name, onChange }) => (
  <div>
    <label className="text-sm mb-1 block">{label}</label>
    <input
      type="file"
      name={name}
      onChange={onChange}
      className="w-full h-12 rounded-xl border border-green-700 px-4 py-2 bg-white"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="text-sm mb-1 block">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="w-full h-12 rounded-xl border border-green-700 px-4 bg-white"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);
