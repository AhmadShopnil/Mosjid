// "use client";
// import React, { useState } from "react";
// import axiosInstance from "@/helper/axiosInstance";
// import toast from "react-hot-toast";



// const postForm = async (endpoint, formData) => {
//     try {
//         const res = await axiosInstance.post(endpoint, formData);
//         return {
//             success: true,
//             message: res.data.message || "Submitted successfully",
//         };
//     } catch (error) {
//         const message = error.response?.data?.message || "Submission failed";
//         return { success: false, message };
//     }
// };






// export default function AskQuestionPage() {
//     const [formData, setFormData] = useState({
//         name: "",
//         email: "",
//         contact: "",
//         subject: "",
//         question: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleReset = () => {
//         setFormData({
//             name: "",
//             email: "",
//             contact: "",
//             subject: "",
//             question: "",
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true)
//         const payload = {
//             name: formData?.name,
//             email: formData?.email,
//             phone: formData?.contact,
//             subject: formData?.subject || "No Subject",
//             comment: formData?.question,
//         };

//         const result = await postForm("/contacts/create", payload);

//         if (result.success) {
//             toast.success("Your message was sent successfully!");
//             handleReset();
//         } else {
//             toast.error(`Error: ${result.message}`);
//         }
//     };

//     return (
//         <div className="bg-white border border-[#DDEEDC] rounded-[10px]  shadow-lg">
//             {/* Header */}
//             <div className="bg-[#E5F5DE] h-[76px] flex items-center justify-center ">
//                 <h2 className="text-center text-xl md:text-2xl font-bold text-[#00401A] my-auto">
//                     Fatwah Form / <span className="">ファトワフォーム</span>
//                 </h2>
//             </div>

//             <div className="p-4 md:p-6 lg:p-8">
//                 {/* text Section */}
//                 <div className="bg-white border border-gray-200 rounded-[20px] p-4 text-sm md:text-base leading-8 text-[#595959] mb-6">
//                     尊敬するムフティ・サヒブ様！教会前に二度目の結婚をしました。二度目の妻には二人の子供がいます。最近、最初の妻がこのことを知り、
//                     「私に言ってもしれもの他に妻がいたら、この妻は離婚するわ」と言いました。そこで私は、「もし私の他に妻がいたら、私はあなたを離婚する。
//                     離婚、離婚、離婚」と答えました。
//                     <br />
//                     こうして「離婚」という言葉を3回繰り返しました。
//                     <br />
//                     注：ここで言いたいのは、私は他に伴侶を持っているという具体的な意図を持っていなかったわけではありません。さて、ムフティ・サヒブから知っておいていただきたいのは、次の点です：
//                     <br />
//                     1. この件で三度の離婚は宣言されたか？
//                     <br />
//                     2. もしそうでなければ、またはどうするべきか？
//                     <br />

//                     <p className="mt-4 text-[#595959]">
//                         حُدُودَ اللَّهِ ۗ وَتِلْكَ حُدُودُ اللَّهِ يُبَيِّنُهَا لِقَوْمٍ يَعْلَمُونَ. (سورة البقرة، الآية:-230)-
//                         وفي سنن ابن ماجة : عن ابن عمر ـ رضي الله عنهما ـ قال: قال رسول الله صلى الله عليه وسلم: أبغض الحلال إلى الله الطلاق. (كتاب الطلاق ، ج:١، ص:٦٥٠، ط:دار إحياء الكتب العربية)-
//                         و في الهداية : وإذا أضافه إلى الشرط وقع عقيب الشرط اتفاقا مثل أن يقول لامرأته: إن دخلت الدار فأنت طالق ولا تصح إضافة الطلاق إلا أن يكون الحالف مالكا أو يضيفه إلى ملك والإضافة إلى سبب الملك كالتزوج كالإضافة إلى الملك فإن قال لأجنبية: إن دخلت الدار فأنت طالق ثم نكحها فدخلت الدار لم تطلق كذا في الكافي". (کتاب الطلاق، الباب الرابع فی الطلاق بالشرط، ج:1، ص:420، دارالفکر)-
//                         وفيها أيضا : ولا يفتقر إلى النية؛ لأنه صريح فيه لغلبة الاستعمال. (كتاب الطلاق،باب إيقاع الطلاق، ج:٢، ص:٣٥٩، ط:أشرفي)-
//                     </p>
//                 </div>

//                 {/* Form */}
//                 <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-4 md:gap-6">
//                     {/* Name */}
//                     <div className="flex flex-col text-sm">
//                         <label className="text-sm mb-1 text-[#000000]">あなたの名前</label>
//                         <input
//                             name="name"
//                             value={formData.name}
//                             onChange={handleChange}
//                             placeholder="Your Name"
//                             className="border text-[#00401A] border-[#B0C4B8] rounded-[10px] py-3 px-2 text-sm focus:ring-2 focus:ring-green-500 focus:outline-none"
//                             required
//                         />
//                     </div>

//                     {/* Email */}
//                     <div className="flex flex-col">
//                         <label className="text-sm mb-1 text-[#000000]">電子メールアドレス</label>
//                         <input
//                             name="email"
//                             type="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Email Address"
//                             className="border border-[#B0C4B8] rounded-[10px] py-3 px-2 text-sm
//                              focus:ring-2 focus:ring-green-500 focus:outline-none"
//                             required
//                         />
//                     </div>

//                     {/* Whatsapp / Contact */}
//                     <div className="flex flex-col">
//                         <label className="text-sm mb-1 text-[#000000]">または連絡先</label>
//                         <input
//                             name="contact"
//                             value={formData.contact}
//                             onChange={handleChange}
//                             placeholder="Whatsapp Or Contact"
//                             className="border border-[#B0C4B8] rounded-[10px] py-3 px-2 text-sm
//                              focus:ring-2 focus:ring-green-500 focus:outline-none"
//                             required
//                         />
//                     </div>



//                     {/* Home address */}
//                     <div className="flex flex-col ">
//                         <label className="text-sm mb-1 text-[#000000]">主題</label>
//                         <input
//                             name="subject"
//                             value={formData.subject}
//                             onChange={handleChange}
//                             placeholder="Subject"
//                             className="border border-[#B0C4B8] rounded-[10px] py-3 px-2 text-sm 
//                             focus:ring-2 focus:ring-green-500 focus:outline-none"
//                             required
//                         />
//                     </div>

//                     {/* Question */}
//                     <div className="flex flex-col md:col-span-2">
//                         <label className="text-sm mb-1 text-[#000000]">質問の要約</label>
//                         <textarea
//                             name="question"
//                             value={formData.question}
//                             onChange={handleChange}
//                             placeholder="Your Question in Short"
//                             rows={8}
//                             className="border border-[#B0C4B8] rounded-[10px] py-3 px-2 text-sm
//                              focus:ring-2 focus:ring-green-500 focus:outline-none"
//                             required
//                         />
//                     </div>

//                     {/* Buttons */}
//                     <div className="flex justify-end gap-3 md:col-span-2 mt-3">
//                         <button

//                             aria-label="reset"
//                             type="button"
//                             onClick={handleReset}
//                             className="h-[56px] text-lg border border-green-500 text-green-700 bg-white hover:bg-green-50 font-medium py-2 px-32
//                              rounded-[10px] transition-all cursor-pointer"
//                         >
//                             Reset
//                         </button>
//                         <button

//                             aria-label="submit"
//                             type="submit"
//                             disabled={loading}
//                             className="h-[56px] text-lg bg-[#F7BA2A] hover:bg-[#e4a819] text-white font-medium py-2 px-18 rounded-[10px]
//                              transition-all flex items-center gap-2  cursor-pointer"
//                         >
//                             {loading ? "Submitting..." : "Submit Your Question"}
//                         </button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// }
