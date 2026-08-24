export default function FormCheckbox({ name, label, checked, onChange }) {
  return (
    <label
      className={`group flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition-all duration-200 ${
        checked
          ? "border-[#3198A0] bg-[#3198A0]/5 shadow-sm shadow-[#3198A0]/10"
          : "border-gray-200 bg-white hover:border-[#3198A0]/40 hover:bg-gray-50/50"
      }`}
    >
      <div className="relative flex h-5 w-5 shrink-0 items-center justify-center">
        <input
          type="checkbox"
          id={name}
          name={name}
          checked={checked}
          onChange={onChange}
          className="peer h-5 w-5 cursor-pointer appearance-none rounded-md border-2 border-gray-300 bg-white transition-all checked:border-[#3198A0] checked:bg-[#3198A0] focus:outline-none focus:ring-4 focus:ring-[#3198A0]/20"
        />
        {/* Custom Checkmark Icon */}
        <svg
          className="pointer-events-none absolute left-1/2 top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>
      <span
        className={`text-sm font-medium leading-snug transition-colors ${
          checked ? "text-[#00401A]" : "text-gray-700"
        }`}
      >
        {label}
      </span>
    </label>
  );
}
