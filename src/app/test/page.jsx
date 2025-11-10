import { GripVertical, Plus, Pencil, Trash } from "lucide-react";

export default function MenuList() {
  const menus = [
    {
      id: 1,
      title: "Home",
      children: [
        { id: 11, title: "About Us" },
        { id: 12, title: "Contact" },
      ],
    },
    {
      id: 2,
      title: "Services",
      children: [
        { id: 21, title: "Web Design" },
        { id: 22, title: "SEO" },
      ],
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold text-gray-800">Menus</h2>
        <button className="flex items-center gap-1 px-3 py-1.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition">
          <Plus size={18} /> Add Menu
        </button>
      </div>

      <div className="space-y-3 max-h-[520px] overflow-y-auto pr-2 custom-scrollbar">
        {menus.map((menu) => (
          <div
            key={menu.id}
            className="border border-gray-200 rounded-xl bg-gray-50 hover:bg-gray-100 transition p-3"
          >
            {/* Parent Menu */}
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2">
                <GripVertical size={18} className="text-gray-400 cursor-grab" />
                <span className="font-medium text-gray-800">{menu.title}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <button className="hover:text-blue-600" title="Add Submenu">
                  <Plus size={16} />
                </button>
                <button className="hover:text-teal-600" title="Edit">
                  <Pencil size={16} />
                </button>
                <button className="hover:text-red-600" title="Delete">
                  <Trash size={16} />
                </button>
              </div>
            </div>

            {/* Submenus */}
            {menu.children?.length > 0 && (
              <div className="mt-3 ml-5 space-y-2">
                {menu.children.map((sub) => (
                  <div
                    key={sub.id}
                    className="flex justify-between items-center bg-white border border-gray-200 rounded-lg px-3 py-2 hover:shadow-sm transition"
                  >
                    <div className="flex items-center gap-2">
                      <GripVertical
                        size={16}
                        className="text-gray-400 cursor-grab"
                      />
                      <span className="text-gray-700 text-sm">{sub.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                      <button className="hover:text-teal-600" title="Edit">
                        <Pencil size={15} />
                      </button>
                      <button className="hover:text-red-600" title="Delete">
                        <Trash size={15} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
