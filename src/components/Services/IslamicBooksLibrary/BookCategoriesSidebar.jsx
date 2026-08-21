"use client";

export default function BookCategoriesSidebar({ categories = [], selectedCategoryId, onCategorySelect }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
      {/* Header */}
      <div className="mb-4">
        <h2 className="text-lg font-bold text-gray-800">Books Categories</h2>
        <p className="text-sm text-[#00401A] font-medium">書籍カテゴリ</p>
        <div className="mt-2 h-[2px] w-full bg-gradient-to-r from-[#3198A0] to-[#51F909] rounded-full" />
      </div>

      {/* Category List */}
      <ul className="space-y-2">
        {categories.map((cat) => {
          const isActive = selectedCategoryId === cat.id;
          return (
            <li key={cat.id}>
              <button
                onClick={() => onCategorySelect(isActive ? null : cat.id)}
                className={`w-full text-left px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer
                  ${isActive
                    ? "bg-gradient-to-r from-[#3198A0]/10 to-[#51F909]/10 border-l-4 border-[#3198A0] text-[#00401A] font-semibold pl-3"
                    : "bg-gray-100 hover:bg-gray-200 text-gray-700 border-l-4 border-transparent"
                  }`}
              >
                {cat.name}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
