import React from 'react';

const FieldBlock = ({ labelJp, labelEn, value }) => (
  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '4px', fontFamily: '"Merriweather", "Georgia", "Times New Roman", serif' }}>
    <p style={{ fontSize: '12px', color: '#828282', lineHeight: '1.2', margin: '0 0 2px 0' }}>{labelJp}</p>
    <p style={{ fontSize: '14px', fontWeight: 'bold', color: '#B98C20', margin: 0 }}>{labelEn}</p>
    <p style={{ fontSize: '14px', color: '#3E8B18', lineHeight: '1.2', margin: '2px 0 0 0', wordBreak: 'break-word' }}>{value || "—"}</p>
  </div>
);

export default function BurialCertificate({ data = {} }) {
  const { details = {}, deceased = {} } = data;

  const verticalEnglish = ["B", "U", "R", "I", "A", "L", "", "C", "E", "R", "T", "I", "F", "I", "C", "A", "T", "E"];
  const verticalJapanese = ["埋", "葬", "証", "明", "書"];

  return (
    <div
      style={{
        width: '1123px',
        height: '794px',
        maxWidth: '100%',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        fontFamily: '"Merriweather", "Georgia", "Times New Roman", serif',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxSizing: 'border-box'
      }}
    >
      {/* SVG Decorative Border Overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
        <img
          src="/images/offerServices/burialBooking/certificate_border.svg"
          alt="Border"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* Main Content Area - padded inside the SVG inner frame */}
      <div style={{
        zIndex: 10, position: 'relative', flex: 1, display: 'flex',
        flexDirection: 'row', padding: '75px 90px', alignItems: 'stretch', justifyContent: 'space-between'
      }}>

        {/* ════════════ LEFT SECTION ════════════ */}
        <div style={{ width: '44%', display: 'flex', flexDirection: 'column', justifyContent: 'space-around', paddingRight: '16px' }}>
          {/* Top: Obituary */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', color: '#64A445', lineHeight: '1.2', margin: '0 0 2px 0' }}>計報</p>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#B98C20', letterSpacing: '0.05em', lineHeight: '1.2', margin: '0 0 8px 0' }}>
              OBITUARY
            </h2>
            <p style={{ fontSize: '13px', color: '#333333', marginTop: '16px', lineHeight: '1.5' }}>
              May Allah grant the departed peace and mercy, forgive their sins, and grant them a place among the blessed. May He reward all who remember them with sincere prayers, compassion, and good deeds, and may their remembrance be a source of ongoing blessings.
            </p>
          </div>

          {/* Middle: Photo Row with Divider Lines */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '16px 0', width: '100%' }}>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#999999' }} />
            <div style={{
              margin: '0 16px', width: '150px', height: '150px', borderRadius: '50%', border: '2px solid #ffffff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.15)', overflow: 'hidden', flexShrink: 0, backgroundColor: '#e5e7eb'
            }}>
              {deceased.photoUrl ? (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundImage: `url(${deceased.photoUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    backgroundColor: '#e5e7eb',
                    backgroundImage: 'url(/images/offerServices/burial.svg)',
                    backgroundSize: 'contain',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat'
                  }}
                />
              )}
            </div>
            <div style={{ flex: 1, height: '1px', backgroundColor: '#999999' }} />
          </div>

          {/* Bottom: Acknowledgement */}
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '20px', color: '#64A445', lineHeight: '1.2', margin: '0 0 2px 0' }}>計報の確認</p>
            <h3 style={{ fontSize: '23px', fontWeight: 'bold', color: '#B98C20', letterSpacing: '0.05em', lineHeight: '1.2', margin: '0 0 8px 0' }}>
              ACKNOWLEDGEMENT
            </h3>
            <p style={{ fontSize: '13px', color: '#333333', marginTop: '16px', lineHeight: '1.5' }}>
              "This serves as an acknowledgement of the passing of the deceased, honoring their life and remembering them with dignity and respect."
            </p>
          </div>
        </div>

        {/* ════════════ MIDDLE DIVIDER (VERTICAL TEXT) ════════════ */}
        <div style={{ width: '8%', display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: '12px', borderLeft: '1px solid #f3f4f6', borderRight: '1px solid #f3f4f6', padding: '8px 0' }}>
          {/* Vertical English */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {verticalEnglish.map((char, index) => (
              <span
                key={index}
                style={{ fontSize: '12px', fontWeight: 'bold', color: '#828282', lineHeight: '14px', textAlign: 'center' }}
              >
                {char === "" ? "\u00A0" : char}
              </span>
            ))}
          </div>

          {/* Vertical Japanese */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            {verticalJapanese.map((char, index) => (
              <span
                key={index}
                style={{ fontSize: '15px', fontWeight: 'bold', color: '#828282', lineHeight: '22px', textAlign: 'center' }}
              >
                {char}
              </span>
            ))}
          </div>
        </div>

        {/* ════════════ RIGHT SECTION (DECEASED INFORMATION) ════════════ */}
        <div style={{ width: '48%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: '16px' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4px' }}>
            <p style={{ fontSize: '20px', color: '#64A445', lineHeight: '1.2', margin: '0 0 2px 0' }}>
              死亡者情報
            </p>
            <h2 style={{ fontSize: '22px', fontWeight: 'bold', color: '#B98C20', letterSpacing: '0.05em', lineHeight: '1.2', margin: '0 0 8px 0' }}>
              DECEASED PERSON INFORMATION
            </h2>
          </div>

          {/* Certificate No */}
          <div style={{ marginBottom: '12px' }}>
            <p style={{ fontSize: '12px', color: '#828282', lineHeight: '1.2', margin: 0 }}>
              証明書番号
            </p>
            <div style={{ display: 'flex', alignItems: 'baseline', fontSize: '13px', color: '#333333' }}>
              <span>Certificate No</span>
              <span style={{ flex: 1, borderBottom: '1px dotted #999999', paddingLeft: '4px', fontWeight: 'bold', color: '#3E8B18' }}>
                {details.certificateNo ? `: ${details.certificateNo}` : "..........................................................."}
              </span>
            </div>
          </div>

          {/* Grid of 2 Columns */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '16px', rowGap: '6px', flex: 1 }}>
            <FieldBlock
              labelJp="故人氏名"
              labelEn="Deceased Person Name"
              value={deceased.name}
            />
            <FieldBlock
              labelJp="父親の氏名"
              labelEn="Father Name"
              value={deceased.fatherName}
            />

            <FieldBlock
              labelJp="性別"
              labelEn="Gender"
              value={deceased.gender}
            />
            <FieldBlock
              labelJp="住所"
              labelEn="Address"
              value={deceased.address}
            />

            <FieldBlock
              labelJp="生年月日"
              labelEn="Date of Birth"
              value={deceased.dateOfBirth}
            />
            <FieldBlock
              labelJp="ジャナザの祈りの場所"
              labelEn="Janazah Prayer location"
              value={deceased.janazahLocation}
            />

            <FieldBlock
              labelJp="死亡日"
              labelEn="Date of Death"
              value={deceased.dateOfDeath}
            />
            <FieldBlock
              labelJp="ジャナザ礼拝日"
              labelEn="Janazah Prayer Date"
              value={deceased.janazahDate}
            />

            <FieldBlock
              labelJp="死亡場所"
              labelEn="Place of Death"
              value={deceased.placeOfDeath}
            />
            <FieldBlock
              labelJp="埋葬日"
              labelEn="Burial Date"
              value={deceased.burialDate}
            />

            <FieldBlock
              labelJp="国籍"
              labelEn="Nationality"
              value={deceased.nationality}
            />
            <FieldBlock
              labelJp="墓番号"
              labelEn="Grave Number"
              value={deceased.graveNumber}
            />

            <FieldBlock
              labelJp="パスポート"
              labelEn="Passport"
              value={deceased.passportNo}
            />
            <FieldBlock
              labelJp="身分証番号"
              labelEn="Id Number"
              value={deceased.idCard}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
