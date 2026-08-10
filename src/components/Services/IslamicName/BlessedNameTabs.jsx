"use client";

import SectionTitleSmall from "@/components/SectionTitleRow/SectionTitleSmall";

export default function BlessedNameTabs({
  categories = [],
  activeCategory,
  onChange,
}) {
  return (
    <div className="px-4 md:px-6 py-6 md:py-10">
      {/* Header */}
      <div className="mb-8">
        <SectionTitleSmall
          leftTitle="Blessed Name"
          rightTitle="祝福された御名"
        />
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;

          return (
            <button
              key={cat.id}
              onClick={() => onChange(cat)}
              className={`
                group
                relative
                overflow-hidden
                min-w-[170px]
                rounded-2xl
                border
                px-6
                py-4
                transition-all
                duration-300
                cursor-pointer
                transform
                hover:-translate-y-1
                hover:shadow-xl
                ${
                  isActive
                    ? "bg-gradient-to-br from-[#0B4D2B] to-[#1B6A3D] border-[#0B4D2B] shadow-xl scale-105"
                    : "bg-white border-[#D9E5DD] hover:border-[#0B4D2B]/40"
                }
              `}
            >
              {/* Glow */}
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent" />
              )}

              {/* Active Dot */}
              {isActive && (
                <span className="absolute top-3 right-3 h-2.5 w-2.5 rounded-full bg-[#F7BA2A] animate-pulse" />
              )}

              <div className="relative z-10">
                <h3
                  className={`text-[13px] lg:text-[16px] font-semibold tracking-wide transition-colors
                    ${
                      isActive
                        ? "text-white"
                        : "text-[#0B4D2B] group-hover:text-[#06391F]"
                    }
                  `}
                >
                  {cat.name}
                </h3>

                <div className="mt-2 h-[1px] w-10 mx-auto bg-[#F7BA2A]/60 rounded-full" />

                <p
                  className={`mt-2 text-[11px] lg:text-[14px] font-medium transition-colors
                    ${
                      isActive
                        ? "text-[#FFD86B]"
                        : "text-[#C88A00]"
                    }
                  `}
                >
                  {cat.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}