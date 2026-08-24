export default function FormTextarea({ name, label, value, onChange, required = false, rows = 4 }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-semibold text-[#00401A]">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <textarea
        id={name}
        name={name}
        value={value || ""}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full resize-y rounded-xl border border-gray-200 bg-gray-50/50 px-4 py-3 text-sm text-gray-900 transition-all placeholder:text-gray-400 focus:border-[#3198A0] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#3198A0]/10 hover:border-gray-300"
      />
    </div>
  );
}
