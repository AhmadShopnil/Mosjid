import React, { useState } from "react";

export default function CardCurriculum({ curriculum }) {
  const [modalState, setModalState] = useState({ isOpen: false, language: 'en' });

  const openModal = (lang) => setModalState({ isOpen: true, language: lang });
  const closeModal = () => setModalState({ isOpen: false, language: 'en' });

  const academicFocus = curriculum?.academicFocus || ["Basic literacy", "Numeracy", "General knowledge", "Early social skills"];
  const religiousFocus = curriculum?.religiousFocus || ["Qaida Nooraniyah", "Nazirah al-Qur'an", "Akhlaq (manners)", "Seerah stories"];
  const outcomes = curriculum?.outcomes || ["Islamic Etiquette", "Child ready for schooling", "Qur'an recitation fluency", "Spiritual Maturity"];

  const displayTitle = modalState.language === 'ja' ? (curriculum?.titleJapanese || curriculum?.title) : curriculum?.title;
  const displayAgeGroup = modalState.language === 'ja' ? (curriculum?.ageGroupJapanese || curriculum?.ageGroup) : curriculum?.ageGroup;

  return (
    <div className="w-full">

      {/*  LARGE SCREEN */}
      <div className="hidden lg:block h-[500px]">
        <div className="relative bg-[#EEF8E9] w-full h-[350px] border-8 border-[#FFCE4D] rounded-[110px]">

          {/* Header */}
          <div className="absolute left-20 right-20 top-6 flex justify-between">
            <div className="flex gap-8">
              <span className="text-[60px] font-bold text-[#B98C20]">
                {curriculum?.no}
              </span>

              <div className="space-y-1 pt-4">
                <p className="text-[20px] font-semibold text-[#B98C20]">
                  {curriculum?.title}
                </p>
                <p className="text-[20px] font-semibold text-[#B98C20]">
                  {curriculum?.ageGroup}
                </p>
              </div>
            </div>

            <div className="space-y-1 pt-4 text-right">
              <p className="text-[20px] font-semibold text-[#B98C20]">
                {curriculum?.titleJapanese}
              </p>
              <p className="text-[20px] font-semibold text-[#B98C20]">
                {curriculum?.ageGroupJapanese}
              </p>
            </div>
          </div>

          {/* Bottom Panel */}
          <div className="absolute bg-white rounded-tl-[60px] w-[90%] h-[220px] -right-2 -bottom-2">
            <div className="w-full h-[221px] flex justify-end relative border-8 border-l-[#FFCE4D] border-t-[#FFCE4D] border-b-white border-r-white rounded-tl-[60px]">
              <div className="absolute w-[98%] top-8">
                <div className="grid grid-cols-3 gap-2">
                  <Card title="Academic Focus" items={academicFocus} onViewDetails={() => openModal('en')} onViewJapanese={() => openModal('ja')} />
                  <Card title="Religious Focus" items={religiousFocus} onViewDetails={() => openModal('en')} onViewJapanese={() => openModal('ja')} />
                  <Card title="Outcomes" items={outcomes} onViewDetails={() => openModal('en')} onViewJapanese={() => openModal('ja')} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/*  Mobile / small screen  */}
      <div className="lg:hidden bg-[#EEF8E9] border-4 border-[#FFCE4D] rounded-[30px] p-4 space-y-4">

        {/* Header */}
        <div className="flex justify-between items-start">
          <div className="flex gap-3 mb-6">
            <span className="text-[36px] font-bold text-[#B98C20]">
              {curriculum?.no}
            </span>

            <div>
              <p className="text-[16px] font-semibold text-[#B98C20]">
                {curriculum?.title}
              </p>
              <p className="text-[14px] text-[#B98C20]">
                {curriculum?.ageGroup}
              </p>
            </div>
          </div>

          <div className="text-right">
            <p className="text-[15px] font-semibold text-[#B98C20]">
              {curriculum?.titleJapanese}
            </p>
            <p className="text-[13px] text-[#B98C20]">
              {curriculum?.ageGroupJapanese}
            </p>
          </div>
        </div>

        {/* Cards  */}
        <div className="space-y-6 ">
          <Card title="Academic Focus" items={academicFocus} onViewDetails={() => openModal('en')} onViewJapanese={() => openModal('ja')} />
          <Card title="Religious Focus" items={religiousFocus} onViewDetails={() => openModal('en')} onViewJapanese={() => openModal('ja')} />
          <Card title="Outcomes" items={outcomes} onViewDetails={() => openModal('en')} onViewJapanese={() => openModal('ja')} />
        </div>
      </div>

      {/* Modal */}
      {modalState.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="bg-white rounded-[30px] p-6 md:p-10 w-full max-w-3xl max-h-[90vh] overflow-y-auto relative shadow-2xl border-4 border-[#FFCE4D]">
            <button
              onClick={closeModal}
              className="cursor-pointer absolute top-4 right-4 w-10 h-10 bg-red-50 text-red-500 hover:bg-red-500
               hover:text-white rounded-full flex items-center justify-center font-bold text-2xl transition-all shadow"
            >
              &times;
            </button>

            <div className="text-center mb-8 border-b-2 border-gray-100 pb-8">
              <span className="text-[50px] font-bold text-[#B98C20] block mb-2">{curriculum?.no}</span>
              <h2 className="text-[32px] font-bold text-[#005312] leading-tight mb-2">{displayTitle}</h2>
              <p className="text-[20px] font-medium text-[#B98C20]">{displayAgeGroup}</p>
            </div>

            <div className="px-2 md:px-8 space-y-6">
              <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
                {modalState.language === 'ja' ? (
                  curriculum?.descriptionJapanese ? (
                    <div>

                      <p>{curriculum.descriptionJapanese}</p>
                    </div>

                  ) : (
                    <p>
                      {displayTitle}は、{displayAgeGroup}を対象とした包括的なカリキュラムです。
                      このプログラムは、<span className="font-semibold text-[#005312]">{academicFocus.join('、')}</span>といった基礎的な学力の向上を目指すとともに、
                      イスラームの教えに基づき、<span className="font-semibold text-[#B98C20]">{religiousFocus.join('、')}</span>などを通じて豊かな宗教性を育みます。
                      修了時には、{outcomes.join('、')}といった成果が期待されます。
                    </p>
                  )
                ) : (
                  curriculum?.description ? (
                    <p>{curriculum.description}</p>
                  ) : (
                    <p>
                      The <strong>{displayTitle}</strong> is a comprehensive curriculum designed for <strong>{displayAgeGroup}</strong>.
                      This program academically focuses on core foundational skills including <span className="font-semibold text-[#005312]">{academicFocus.join(', ')}</span>.
                      Alongside secular education, we provide strong religious instruction emphasizing <span className="font-semibold text-[#B98C20]">{religiousFocus.join(', ')}</span>.
                      Upon completion of this level, students are expected to achieve key outcomes such as {outcomes.slice(0, -1).join(', ')} and {outcomes[outcomes.length - 1]}.
                    </p>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function Card({ title, items, showButtons = true, onViewDetails, onViewJapanese }) {
  return (
    <div className="h-full flex flex-col">

      <div
        className={`w-full bg-white relative pt-5 border-x-2 border-t-2 border-[#005312] rounded-tl-[20px] rounded-tr-[20px] flex-grow ${!showButtons ? 'border-b-2 rounded-bl-[20px] rounded-br-[20px] shadow-sm pb-4' : ''}`}
      >
        <div
          className="absolute left-1/2 -translate-x-1/2 px-3 py-1.5 text-white text-[13px] font-medium whitespace-nowrap bg-[#52B920] rounded-[10px]"
          style={{
            top: "-18px",
          }}
        >
          <span className='text-[15px] lg:text-[18px]'> {title}</span>
        </div>

        {/* List Items */}
        <div className="px-4 pt-5 pb-4">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-3 border-b border-b-[#E0E0E0] pb-3 last:border-b-0 ">
                <span className="w-4 h-4 rounded-full flex-shrink-0 bg-[#52B920]" />
                <span className="text-[#333333] text-[15px] lg:text-[18px] leading-snug">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>


      {/* Buttons */}
      {showButtons && (
        <div className="flex gap-2 bg-white p-3 border-t-2 border-[#C9E9BA] shadow-xl rounded-bl-[20px] rounded-br-[20px]">
          {/* View in Details button */}
          <div className="relative flex-1">
            <button
              type="button"
              aria-label="view details"
              onClick={onViewDetails}
              className="w-full px-2 py-2 text-[12px] lg:text-[14px] xl:text-[16px] text-[#3E8B18] font-bold rounded-[10px]
               bg-[#C9E9BA] hover:bg-[#b8dfa7] transition-colors cursor-pointer"
            >
              View in Details
            </button>
          </div>

          {/* View in Japanese button */}
          <div className="relative flex-1">
            <button
              type="button"
              aria-label="view in japanese"
              onClick={onViewJapanese}
              className="w-full px-2 py-2 text-[12px] lg:text-[14px] xl:text-[16px] font-bold text-white rounded-[10px] bg-[#52B920]
               hover:bg-[#439c19] transition-colors cursor-pointer"
            >
              View in Japanese
            </button>
          </div>
        </div>
      )}
    </div>
  )
}