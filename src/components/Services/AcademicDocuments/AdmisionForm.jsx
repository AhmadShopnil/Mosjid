"use client";

import { useState, useEffect } from "react";
import axiosInstance from "@/helper/axiosInstance";
import { toast } from "react-hot-toast";
import Image from "next/image";

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
  // Page state
  const [countries, setCountries] = useState([]);
  const [parentInfo, setParentInfo] = useState(null);
  const [students, setStudents] = useState([]);
  const [fetchLoading, setFetchLoading] = useState(true);

  // Form states
  const [form, setForm] = useState(INITIAL_STATE);
  const [newChild, setNewChild] = useState({ ...INITIAL_CHILD });
  const [loading, setLoading] = useState(false);
  const [showAddChildForm, setShowAddChildForm] = useState(false);

  // Fetch parent info and students on load
  const fetchAdmissionsData = async () => {
    try {
      setFetchLoading(true);
      const response = await axiosInstance.get("/admissions");
      if (response.data) {
        setCountries(response.data.countries || []);
        setParentInfo(response.data.parent_info || null);
        setStudents(response.data.students || []);
      }
    } catch (error) {
      console.error("Error fetching admissions:", error);
    } finally {
      setFetchLoading(false);
    }
  };

  useEffect(() => {
    fetchAdmissionsData();
  }, []);

  // Main Form Handlers
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
      [name]: type === "file" ? files[0] : value,
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

  // Submit initial full form
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

      const response = await axiosInstance.post("/admissions", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        toast.success("Admission Form Submitted Successfully!");
        setForm(INITIAL_STATE);
        fetchAdmissionsData();
      }
    } catch (error) {
      console.error("Submission Error:", error);
      toast.error(error?.response?.data?.message || "Failed to submit form. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Add More Child Form Handlers (Existing Parent Profile)
  const handleNewChildChange = (e) => {
    const { name, value, files, type } = e.target;
    setNewChild((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleAddMoreChildSubmit = async (e) => {
    e.preventDefault();
    if (!parentInfo?.id) return;
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("parent_id", parentInfo.id);
      formData.append("name", newChild.name);
      formData.append("gender", newChild.gender);
      formData.append("birth_date", newChild.birth_date);
      formData.append("birth_place", newChild.birth_place);
      formData.append("nationality_id", newChild.nationality_id);
      formData.append("passport_no", newChild.passport_no);

      // Attach child documents
      if (newChild.copy_id_passport) formData.append("copy_id_passport", newChild.copy_id_passport);
      if (newChild.photo) formData.append("photo", newChild.photo);
      if (newChild.pre_schools_certificate) formData.append("pre_schools_certificate", newChild.pre_schools_certificate);
      if (newChild.health_certificate) formData.append("health_certificate", newChild.health_certificate);
      if (newChild.signature) formData.append("signature", newChild.signature);

      const response = await axiosInstance.post(`/add_more_child/${parentInfo.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data) {
        toast.success("Child Registered Successfully!");
        setNewChild({ ...INITIAL_CHILD });
        setShowAddChildForm(false);
        fetchAdmissionsData();
      }
    } catch (error) {
      console.error("Add Child Error:", error);
      toast.error(error?.response?.data?.message || "Failed to add child. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Loading Screen
  if (fetchLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-2xl border border-gray-100 p-8 shadow-sm">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00401A]"></div>
        <p className="text-gray-500 mt-4 font-medium animate-pulse">Loading Admission Details...</p>
      </div>
    );
  }

  // ----------------------------------------------------
  // CASE B: Parent Profile Already Exists
  // ----------------------------------------------------
  if (parentInfo) {
    return (
      <div className="space-y-8">
        {/* Parent Summary Header Card */}
        <div className="border border-green-200 rounded-[20px] p-6 bg-gradient-to-br from-green-50/50 to-emerald-50/30 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-green-100/30 rounded-full blur-2xl transform translate-x-10 -translate-y-10"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-green-200 pb-4 mb-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-[#B98C20]">Osaka Masjid Madrasha</p>
              <h2 className="text-2xl md:text-3xl font-extrabold text-[#00401A] mt-1">Parent Dashboard</h2>
            </div>
            <div className="bg-[#00401A] text-white px-4 py-2 rounded-xl text-sm font-bold shadow-md flex items-center gap-2">
              <span className="text-green-300">Parent ID:</span>
              <span>{parentInfo.unique_id || parentInfo.id}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Fathers Name</p>
              <p className="font-semibold text-gray-800 mt-1">{parentInfo.fathers_name || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Mothers Name</p>
              <p className="font-semibold text-gray-800 mt-1">{parentInfo.mothers_name || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Contact Number</p>
              <p className="font-semibold text-gray-800 mt-1">{parentInfo.phone_no || "N/A"}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-500 uppercase">Registered Email</p>
              <p className="font-semibold text-gray-800 mt-1 truncate">{parentInfo.email || "N/A"}</p>
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-green-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <p><strong>Home Address:</strong> {parentInfo.home_address || "N/A"}</p>
            <p className="md:text-right"><strong>Guardian Name:</strong> {parentInfo.guardians_name || parentInfo.fathers_name}</p>
          </div>
        </div>

        {/* Registered Children List */}
        <div className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-[#00401A] flex items-center gap-2">
              <span className="w-2.5 h-6 bg-[#B98C20] rounded-full"></span>
              Registered Students ({students.length})
            </h3>
            {!showAddChildForm && (
              <button
                type="button"
                onClick={() => setShowAddChildForm(true)}
                className="bg-[#00401A] hover:bg-[#00602A] text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow transition-all duration-300 flex items-center gap-2 cursor-pointer"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
                </svg>
                Register New Student
              </button>
            )}
          </div>

          {students.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <p className="text-gray-500 font-medium">No students registered yet under this parent.</p>
              <button
                type="button"
                onClick={() => setShowAddChildForm(true)}
                className="text-[#00401A] underline font-bold mt-2"
              >
                Register a Child Now
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {students.map((student) => {
                // Find nationality name
                const nationalityName = countries.find(
                  (c) => String(c.id) === String(student.nationality_id)
                )?.nationality || student.nationality_id || "N/A";

                const isApproved = student.status === "1";

                return (
                  <div key={student.id} className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-all duration-300 bg-white relative overflow-hidden flex flex-col md:flex-row gap-5">
                    {/* Status Badge */}
                    <div className="absolute top-4 right-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                        isApproved ? "bg-green-100 text-green-800 border border-green-200" : "bg-amber-100 text-amber-800 border border-amber-200"
                      }`}>
                        <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${isApproved ? "bg-green-600" : "bg-amber-600"}`}></span>
                        {isApproved ? "Admitted" : "Pending Verification"}
                      </span>
                    </div>

                    {/* Child Profile Photo */}
                    <div className="w-24 h-28 bg-gray-50 border border-gray-200 rounded-xl overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                      {student.attached?.photo ? (
                        <img
                          src={`https://admin.osakamasjid.org/public/${student.attached.photo}`}
                          alt={student.name}
                          className="object-cover w-full h-full"
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = "/images/offerServices/IslamicName/3.svg";
                          }}
                        />
                      ) : (
                        <div className="text-gray-300">
                          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </div>

                    {/* Child Details */}
                    <div className="flex-grow space-y-3">
                      <div>
                        <h4 className="text-lg font-bold text-gray-800 truncate pr-20">{student.name}</h4>
                        <p className="text-xs font-bold text-gray-400 mt-0.5">Student ID: {student.student_id || "N/A"}</p>
                      </div>

                      <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-600">
                        <p><strong>Gender:</strong> {student.gender === "0" ? "Male" : "Female"}</p>
                        <p><strong>Birth Date:</strong> {student.birth_date || "N/A"}</p>
                        <p><strong>Passport/ID:</strong> {student.passport_no || "N/A"}</p>
                        <p className="truncate"><strong>Nationality:</strong> {nationalityName}</p>
                      </div>

                      {/* Documents Download Links */}
                      <div className="pt-2 border-t border-gray-50">
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Attached Documents</p>
                        <div className="flex flex-wrap gap-2">
                          {student.attached && Object.entries(student.attached).map(([key, file]) => {
                            if (!file) return null;
                            const cleanKey = key.replace(/_/g, " ");
                            return (
                              <a
                                key={key}
                                href={`https://admin.osakamasjid.org/public/${file}`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-1 text-[10px] font-semibold text-green-700 bg-green-50 hover:bg-green-100 border border-green-150 rounded-lg px-2 py-1 transition-colors capitalize"
                              >
                                <svg className="w-2.5 h-2.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                </svg>
                                {cleanKey}
                              </a>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Register Another Child Panel (Conditional) */}
        {showAddChildForm && (
          <div className="bg-white border border-gray-100 rounded-[20px] p-6 shadow-sm">
            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
              <h3 className="text-xl font-bold text-[#00401A] flex items-center gap-2">
                <span className="w-2.5 h-6 bg-[#B98C20] rounded-full"></span>
                Add New Child / Student
              </h3>
              <button
                type="button"
                onClick={() => {
                  setNewChild({ ...INITIAL_CHILD });
                  setShowAddChildForm(false);
                }}
                className="text-red-500 hover:text-red-700 font-bold p-2 text-sm transition-colors"
              >
                ✕ Cancel
              </button>
            </div>

            <form onSubmit={handleAddMoreChildSubmit} className="space-y-6">
              {/* Child Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
                <Input label="Full Name" name="name" value={newChild.name} onChange={handleNewChildChange} required />
                <Select
                  label="Gender"
                  name="gender"
                  value={newChild.gender}
                  onChange={handleNewChildChange}
                  required
                  options={[
                    { value: "", label: "Select" },
                    { value: "0", label: "Male" },
                    { value: "1", label: "Female" },
                  ]}
                />
                <Input label="Date of Birth" type="date" name="birth_date" value={newChild.birth_date} onChange={handleNewChildChange} required />
                
                {/* Birth Place selector */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Birth Place <span className="text-red-500">*</span></label>
                  <select
                    name="birth_place"
                    value={newChild.birth_place}
                    onChange={handleNewChildChange}
                    required
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white focus:outline-none focus:border-green-600 transition-colors"
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Nationality selector */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Nationality <span className="text-red-500">*</span></label>
                  <select
                    name="nationality_id"
                    value={newChild.nationality_id}
                    onChange={handleNewChildChange}
                    required
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white focus:outline-none focus:border-green-600 transition-colors"
                  >
                    <option value="">Select Nationality</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>{c.nationality || c.name}</option>
                    ))}
                  </select>
                </div>

                <Input label="Passport / ID No" name="passport_no" value={newChild.passport_no} onChange={handleNewChildChange} required />
              </div>

              {/* Child Documents section */}
              <div className="border-t border-gray-100 pt-6">
                <p className="text-sm font-bold text-green-700 mb-4">Required Attachments for Child</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <FileInputWithPreview label="Passport Copy" name="copy_id_passport" onChange={handleNewChildChange} required value={newChild.copy_id_passport} />
                  <FileInputWithPreview label="Photograph" name="photo" onChange={handleNewChildChange} required value={newChild.photo} />
                  <FileInputWithPreview label="Pre-School Cert" name="pre_schools_certificate" onChange={handleNewChildChange} required value={newChild.pre_schools_certificate} />
                  <FileInputWithPreview label="Health Cert" name="health_certificate" onChange={handleNewChildChange} required value={newChild.health_certificate} />
                  <FileInputWithPreview label="Signature" name="signature" onChange={handleNewChildChange} required value={newChild.signature} />
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-gray-150">
                <button
                  type="button"
                  onClick={() => {
                    setNewChild({ ...INITIAL_CHILD });
                    setShowAddChildForm(false);
                  }}
                  className="border border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-xl transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`bg-[#00401A] hover:bg-[#00602A] text-white px-10 py-3 rounded-xl shadow-lg transition-all duration-300 font-bold ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {loading ? "Submitting..." : "Submit Application"}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // CASE A: Standard Full Admission Form (No Parent Profile)
  // ----------------------------------------------------
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
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer"
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
                  className="absolute top-2 right-2 text-red-500 hover:text-red-700 font-bold p-2 cursor-pointer"
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
                
                {/* Birth Place */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Birth Place</label>
                  <select
                    name="birth_place"
                    value={child.birth_place}
                    onChange={(e) => handleChildChange(index, e)}
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white focus:outline-none focus:border-green-600 transition-colors text-sm"
                  >
                    <option value="">Select Country</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>

                {/* Nationality */}
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-gray-700">Nationality <span className="text-red-500">*</span></label>
                  <select
                    name="nationality_id"
                    value={child.nationality_id}
                    onChange={(e) => handleChildChange(index, e)}
                    required
                    className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white focus:outline-none focus:border-green-600 transition-colors text-sm"
                  >
                    <option value="">Select Nationality</option>
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>{c.nationality || c.name}</option>
                    ))}
                  </select>
                </div>

                <Input label="Passport / ID No" name="passport_no" value={child.passport_no} onChange={(e) => handleChildChange(index, e)} required />
              </div>

              {/* Documents for this child */}
              <div className="mt-6 space-y-4 pt-4 border-t border-gray-100">
                <p className="text-sm font-bold text-green-700">Documents for {child.name || "Child #" + (index + 1)}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
                  <FileInputWithPreview label="Passport Copy" name="copy_id_passport" onChange={(e) => handleChildChange(index, e)} required value={child.copy_id_passport} />
                  <FileInputWithPreview label="Photograph" name="photo" onChange={(e) => handleChildChange(index, e)} required value={child.photo} />
                  <FileInputWithPreview label="Pre-School Cert" name="pre_schools_certificate" onChange={(e) => handleChildChange(index, e)} required value={child.pre_schools_certificate} />
                  <FileInputWithPreview label="Health Cert" name="health_certificate" onChange={(e) => handleChildChange(index, e)} required value={child.health_certificate} />
                  <FileInputWithPreview label="Signature" name="signature" onChange={(e) => handleChildChange(index, e)} required value={child.signature} />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Family Information */}
        <div className="space-y-6">
          <SectionTitle title="Family Information" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <Input label="Father’s Name" name="fathers_name" value={form.fathers_name} onChange={handleChange} required />
            <Input label="Mother’s Name" name="mothers_name" value={form.mothers_name} onChange={handleChange} required />
            <Input label="Guardian’s Name" name="guardians_name" value={form.guardians_name} onChange={handleChange} />
            <Input label="Occupation of Parents" name="occupation_parents" value={form.occupation_parents} onChange={handleChange} />
            <Input label="Contact Parents/Guardian" name="contact_parents_guardian" value={form.contact_parents_guardian} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Input label="Profession" name="profession" value={form.profession} onChange={handleChange} />
            
            {/* Family Nationality country dropdown */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-semibold text-gray-700">Family Nationality</label>
              <select
                name="family_nationality"
                value={form.family_nationality}
                onChange={handleChange}
                className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white focus:outline-none focus:border-green-600 transition-colors text-sm"
              >
                <option value="">Select Nationality</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.nationality || c.name}>{c.nationality || c.name}</option>
                ))}
              </select>
            </div>

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
            className="border border-red-500 text-red-500 hover:bg-red-50 px-8 py-3 rounded-xl transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#00401A] hover:bg-[#00602A] text-white px-10 py-3 rounded-xl shadow-lg transition-all duration-300 cursor-pointer ${
              loading ? "opacity-50 cursor-not-allowed" : ""
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
    <label className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      className="w-full h-12 rounded-xl border border-gray-300 px-4 focus:outline-none focus:border-green-600 transition-colors bg-white text-sm"
    />
  </div>
);

const Select = ({ label, name, value, onChange, options, required = false }) => (
  <div className="flex flex-col gap-1">
    <label className="text-sm font-semibold text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value || ""}
      onChange={onChange}
      required={required}
      className="w-full h-12 rounded-xl border border-gray-300 px-4 bg-white focus:outline-none focus:border-green-600 transition-colors text-sm"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

// File input with dynamic visual preview
const FileInputWithPreview = ({ label, name, onChange, required = false, value }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (!value) {
      setPreview(null);
      return;
    }
    if (typeof value === "string") {
      setPreview(value.startsWith("http") ? value : `https://admin.osakamasjid.org/public/${value}`);
    } else if (value instanceof File) {
      const objectUrl = URL.createObjectURL(value);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [value]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className="text-xs font-bold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-xl p-3 bg-gray-50 flex flex-col items-center justify-center min-h-[140px] hover:border-green-600 transition-colors relative cursor-pointer group">
        {preview ? (
          <div className="relative w-full h-[110px] rounded-lg overflow-hidden flex items-center justify-center bg-white">
            <img src={preview} alt={label} className="object-contain h-full max-w-full rounded-lg" />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
              <span className="text-white text-[10px] font-semibold bg-green-600/95 px-2.5 py-1 rounded-full">Change</span>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-2 text-center text-gray-400">
            <svg className="w-6 h-6 mb-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <span className="text-[10px] font-bold">Upload File</span>
            <span className="text-[8px] text-gray-400 mt-0.5">PNG, JPG, JPEG</span>
          </div>
        )}
        <input
          type="file"
          name={name}
          onChange={onChange}
          required={required && !preview}
          className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
          accept="image/*"
        />
      </div>
    </div>
  );
};
