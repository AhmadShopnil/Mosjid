// "use client";

// import { useEffect, useState, useCallback } from "react";
// import IslamicNameTableRow from "./IslamicNameTableRow";
// import IslamicNameSearch from "./IslamicNameSearch";
// import BlessedNameTabs from "./BlessedNameTabs";
// import SocialShare from "@/components/Shared/SocialShare";
// import { TableSkeleton } from "../Skeletons/TableSkeleton";
// import axiosInstance from "@/helper/axiosInstance";
// import GradientBorderWrapper1 from "@/components/Shared/GradientBorderWrapper1";

// /* ---------------- gender category map ---------------- */
// const GENDER_CATEGORY_MAP = {
//   boy: "104",
//   girl: "105",
// };

// export default function IslamicNameSection({ categories }) {
//   const [names, setNames] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [activeBlessedCategory, setActiveBlessedCategory] = useState(null);

//   const [searchState, setSearchState] = useState({
//     gender: "",
//     keyword: "",
//   });

//   /* ---------------- helper: build category_id ---------------- */
//   const buildCategoryId = ({ gender, blessedCategory }) => {
//     const ids = [];

//     if (gender && GENDER_CATEGORY_MAP[gender]) {
//       ids.push(GENDER_CATEGORY_MAP[gender]);
//     }

//     if (blessedCategory) {
//       ids.push(blessedCategory.toString());
//     }

//     return ids.length ? ids.join(",") : "";
//   };

//   /* ---------------- fetch ---------------- */
//   const fetchNames = useCallback(async ({ gender = "", blessedCategory = "", keyword = "" } = {}) => {
//     try {
//       setLoading(true);

//       const category_id = buildCategoryId({ gender, blessedCategory });

//       const query = new URLSearchParams({
//         term_type: "islamic-name",
//         ...(category_id && { category_id }),
//         ...(keyword && { s: keyword }),
//       }).toString();

//       const res = await axiosInstance.get(`/posts?${query}&strict=true`);
//       setNames(res?.data?.data || []);
//     } catch (error) {
//       console.error("Fetch failed", error);
//       setNames([]);
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   /* ---------------- initial load ---------------- */
//   useEffect(() => {
//     fetchNames();
//   }, [fetchNames]);

//   /* ---------------- search ---------------- */
//   const handleSearch = ({ gender, keyword }) => {
//     setSearchState({ gender, keyword });

//     fetchNames({
//       gender,
//       keyword,
//       blessedCategory: activeBlessedCategory,
//     });
//   };

//   /* ---------------- tab click ---------------- */
//   const handleCategoryChange = (category) => {
//     setActiveBlessedCategory(category.id);

//     fetchNames({
//       gender: searchState.gender,
//       keyword: searchState.keyword,
//       blessedCategory: category.id,
//     });
//   };

//   return (
//     <div className="space-y-6">
//       {/* Search */}


//       <GradientBorderWrapper1>
//         <IslamicNameSearch button_text="Search" onSearch={handleSearch} />
//       </GradientBorderWrapper1>
//       {/* Blessed Name Tabs */}
//       <GradientBorderWrapper1>
//         <BlessedNameTabs
//           categories={categories}
//           activeCategory={activeBlessedCategory}
//           onChange={handleCategoryChange}
//         />
//       </GradientBorderWrapper1>


//       {/* Table */}
//       <div>
//         <div className="bg-[#52B920] h-[50px] text-white flex items-center justify-between px-3 md:px-6 rounded-t-[10px]">
//           <h2 className="text-lg font-bold">Name List</h2>
//           <h2 className="text-lg font-bold">名前リスト</h2>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full table-fixed min-w-[800px] border-collapse">
//             <TableHeader />

//             {loading ? (
//               <TableSkeleton />
//             ) : names.length > 0 ? (
//               <TableBody data={names} />
//             ) : (
//               <EmptyState />
//             )}
//           </table>
//         </div>
//       </div>

//       {/* Share */}
//       <div className="py-4 flex justify-center sm:justify-end">
//         <SocialShare />
//       </div>
//     </div>
//   );
// }

// /* ---------------- table helpers ---------------- */

// const TableHeader = () => (
//   <thead>
//     <tr className="bg-[#D9E2DD]">
//       <th className="w-[60px] py-2 text-center text-sm">SL</th>
//       <th className="w-[200px] py-2 text-center text-sm">Arabic</th>
//       <th className="w-[200px] py-2 text-center text-sm">Japanese</th>
//       <th className="w-[200px] py-2 text-center text-sm">English</th>
//       <th className="w-auto py-2 text-center text-sm">Meaning</th>
//     </tr>
//   </thead>
// );

// const TableBody = ({ data }) => (
//   <tbody>
//     {data.map((item, i) => (
//       <IslamicNameTableRow key={item.id} islamicName={item} i={i} />
//     ))}
//   </tbody>
// );

// const EmptyState = () => (
//   <tbody>
//     <tr>
//       <td colSpan={5} className="text-center py-10 text-gray-500">
//         No Names found
//       </td>
//     </tr>
//   </tbody>
// );
