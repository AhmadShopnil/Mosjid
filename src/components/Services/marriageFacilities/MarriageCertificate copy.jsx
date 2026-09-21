import React from 'react';

const FieldRow = ({ labelEn, labelJp, value }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '3px' }}>
    <div style={{ width: '100px', flexShrink: 0 }}>
      <p style={{ fontSize: '8.5px', color: '#828282', lineHeight: '1.1', margin: 0 }}>{labelJp}</p>
      <p style={{ fontSize: '11px', fontWeight: 'bold', color: '#085F2C', lineHeight: '1.1', margin: 0 }}>{labelEn}</p>
    </div>
    <div style={{ margin: '0 4px', color: '#085F2C', fontWeight: 'bold', fontSize: '11px' }}>:</div>
    <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, fontSize: '12px', textAlign: 'center', fontFamily: 'Merriweather', color: '#B58B2E', minHeight: '14px', padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
      {value || ""}
    </div>
  </div>
);

const EmptyRow = ({ value }) => (
  <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '3px' }}>
    <div style={{ width: '100px', flexShrink: 0 }}></div>
    <div style={{ margin: '0 4px', opacity: 0 }}>:</div>
    <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, fontSize: '12px', textAlign: 'center', fontFamily: 'Merriweather', color: '#B58B2E', minHeight: '14px', padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
      {value || ""}
    </div>
  </div>
);

const MarriageCertificate = ({ data = {} }) => {
  const { groom = {}, bride = {}, details = {}, witnesses = [], solemnizedBy = {} } = data;

  return (
    <div
      style={{
        width: '790px',
        height: '1115px',
        maxWidth: '100%',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        padding: '90px 90px',
        fontFamily: 'sans-serif',
        position: 'relative',
        textAlign: 'left',
        overflow: 'hidden',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
        , fontFamily: 'Merriweather'
      }}
      
    >
      {/* SVG Decorative Border Overlay */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 50 }}>
        <img
          src="/images/offerServices/marriageFacilities/marriage-certificate-border.svg"
          alt="Border"
          style={{ width: '100%', height: '100%', display: 'block' }}
        />
      </div>

      {/* Watermark Background */}
      <div style={{ position: 'absolute', bottom: '220px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0, opacity: 0.12 }}>
        <img
          src="/images/offerServices/marriageFacilities/bg2.png"
          alt="Watermark"
          style={{ width: '400px', height: '400px', objectFit: 'contain' }}
        />
      </div>

      {/* Main Container Layer */}
      <div 
      className=''
      
      style={{ zIndex: 10, position: 'relative', display: 'flex', flexDirection: 'column', height: '100%',
         justifyContent: 'space-between' }}
         
         >
        
        {/* ── Header ── */}
        <div 
        className=''
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', position: 'relative'
          , height: '48px' }}>
          <div style={{ zIndex: 10, position: 'relative' }}>
            <p style={{ color: '#9ca3af', fontSize: '10px', margin: '0 0 1px 0' }}>証明書番号</p>
            <h2 style={{ fontSize: '13px', fontWeight: '600', display: 'flex', alignItems: 'flex-end', color: '#000000', margin: 0 }}>
              Certificate No:
              <span style={{ width: '110px', marginLeft: '6px', display: 'inline-block', color: '#B58B2E', fontSize: '12px', fontWeight: 'bold' }}>
                {details.certificateNo || ""}
              </span>
            </h2>
          </div>

          <div style={{ textAlign: 'center', position: 'absolute', width: '100%', left: 0, top: 10, pointerEvents: 'none' }}>
            <p style={{ color: '#00401A', fontWeight: 'bold', marginBottom: '1px', letterSpacing: '0.1em', fontSize: '12px', 
              marginLeft: '24px' }}>結婚証明書</p>
            <h1 
            style={{ fontSize: '25px', fontWeight: 'bold', color: '#00401A', fontFamily: '"Merriweather", Times, serif',
               margin: 0 }}>
              MARRIAGE CERTIFICATE
            </h1>
          </div>
        </div>

        {/* ── Particulars Top Header (Photos) & Yellow Name Banner ── */}
        <div className=''>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',
             marginBottom: '6px' }}>
            {/* Groom Photo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', border: '1.5px solid #8CC63F', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#ffffff', flexShrink: 0 }}>
                {groom?.photoUrl ? (
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url(${groom.photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                ) : null}
              </div>
              <div>
                <h3 style={{ color: '#085F2C', fontWeight: 'bold', fontSize: '14px', lineHeight: '1.2', fontFamily: '"Times New Roman", Times, serif', margin: 0 }}>Particulars of<br />Groom</h3>
              </div>
            </div>
            {/* Bride Photo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '42px', height: '42px', border: '1.5px solid #8CC63F', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', backgroundColor: '#ffffff', flexShrink: 0 }}>
                {bride?.photoUrl ? (
                  <div style={{ width: '100%', height: '100%', backgroundImage: `url(${bride.photoUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                ) : null}
              </div>
              <div>
                <h3 style={{ color: '#085F2C', fontWeight: 'bold', fontSize: '14px', lineHeight: '1.2', fontFamily: '"Times New Roman", Times, serif', margin: 0 }}>Particulars of<br />Bride</h3>
              </div>
            </div>
          </div>

          {/* Yellow Name Banner */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',
             background: 'linear-gradient(to right, #F0C041, #FAD463, #F0C041)', padding: '5px 10px', borderRadius: '2px' }}>
            <div
            style={{padding:' 5px 0' }}
            >
              <p style={{ fontSize: '8.5px', color: '#6b7280', fontWeight: 'bold', margin: '0 0 0 0' }}>イスラム教徒の名前</p>
              <h4 style={{ fontSize: '18px', color: '#333333', letterSpacing: '0.02em', fontFamily: '"Times New Roman", Times, serif', margin: 0 }}>{groom.muslimName || "Muslim Name"}</h4>
            </div>
            <div
            style={{padding:' 5px 0' }}
            
            >
              <p style={{ fontSize: '8.5px', color: '#6b7280', fontWeight: 'bold', margin: '0 0 0 0' }}>イスラム教徒の名前</p>
              <h4 style={{ fontSize: '18px', color: '#333333', letterSpacing: '0.02em', fontFamily: '"Times New Roman", Times, serif', margin: 0 }}>{bride.muslimName || "Muslim Name"}</h4>
            </div>
          </div>
        </div>

        {/* ── Particulars Section (Groom & Bride details) ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          {/* Groom */}
          <div>
            <div 
            style={{ paddingRight: '2px' ,display: 'flex', flexDirection: 'column', gap: '6px' }}
            >
              <FieldRow labelEn="Name" labelJp="名前" value={groom.name} />
              <FieldRow labelEn="Father Name" labelJp="父親の名前" value={groom.fatherName} />
              <FieldRow labelEn="Age" labelJp="年齢" value={groom.age} />
              <FieldRow labelEn="Religion" labelJp="宗教" value={groom.religion} />
              <FieldRow labelEn="Nationality" labelJp="国籍" value={groom.nationality} />
              <FieldRow labelEn="Passport No." labelJp="パスポートナンバー" value={groom.passportNo} />
              <FieldRow labelEn="Address" labelJp="住所" value={groom.addressLine1} />
              <EmptyRow value={groom.addressLine2} />
            </div>
            <div style={{ backgroundColor: '#EEF8E9', padding: '5px 8px', marginTop: '3px', borderRadius: '2px', border: '1px solid #E0F2E3' }}>
              <p style={{ fontSize: '8.5px', color: '#6b7280', margin: '0 0 1px 0' }}>サイン</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '20px' }}>
                <span style={{ fontWeight: 'bold', color: '#085F2C', fontSize: '11px', width: '40px', paddingBottom: '1px' }}>Sign :</span>
                <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, marginLeft: '4px', position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {groom?.signUrl && (
                    <div style={{ position: 'absolute', bottom: '1px', width: '120px', height: '24px', backgroundImage: `url(${groom.signUrl})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bride */}
          <div>
            <div 
            style={{ paddingRight: '2px' ,display: 'flex', flexDirection: 'column', gap: '6px' }
          }
            >
              <FieldRow labelEn="Name" labelJp="名前" value={bride.name} />
              <FieldRow labelEn="Father Name" labelJp="父親の名前" value={bride.fatherName} />
              <FieldRow labelEn="Age" labelJp="年齢" value={bride.age} />
              <FieldRow labelEn="Religion" labelJp="宗教" value={bride.religion} />
              <FieldRow labelEn="Nationality" labelJp="国籍" value={bride.nationality} />
              <FieldRow labelEn="Passport No." labelJp="パスポートナンバー" value={bride.passportNo} />
              <FieldRow labelEn="Address" labelJp="住所" value={bride.addressLine1} />
              <EmptyRow value={bride.addressLine2} />
            </div>
            <div style={{ backgroundColor: '#EEF8E9', padding: '5px 8px', marginTop: '3px', borderRadius: '2px', border: '1px solid #E0F2E3' }}>
              <p style={{ fontSize: '8.5px', color: '#6b7280', margin: '0 0 1px 0' }}>サイン</p>
              <div style={{ display: 'flex', alignItems: 'flex-end', height: '20px' }}>
                <span style={{ fontWeight: 'bold', color: '#085F2C', fontSize: '11px', width: '40px', paddingBottom: '1px' }}>Sign :</span>
                <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, marginLeft: '4px', position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  {bride?.signUrl && (
                    <div style={{ position: 'absolute', bottom: '1px', width: '120px', height: '24px', backgroundImage: `url(${bride.signUrl})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── Marriage Details Section ── */}
        <div 
        className=''
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 0, padding: '2px 0' }}>
          <div style={{ textAlign: 'center', borderRight: '1px solid #A5D071' }}>
            <p style={{ fontSize: '10px', color: '#828282', margin: '0 0 1px 0' }}>結婚の日</p>
            <p style={{ color: '#005312', fontSize: '13px', margin: 0 }}>Date Of Marriage</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#B98C20', fontFamily: '"Times New Roman", Times, serif', margin: 0 }}>{details.date || "—"}</p>
          </div>
          <div style={{ textAlign: 'center', borderRight: '1px solid #A5D071' }}>
            <p style={{ fontSize: '10px', color: '#828282', margin: '0 0 1px 0' }}>結婚の場</p>
            <p style={{ color: '#005312', fontSize: '13px', margin: 0 }}>Place of Marriage</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#B98C20', fontFamily: '"Times New Roman", Times, serif', margin: 0 }}>{details.place || "Osaka Masjid"}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '10px', color: '#828282', margin: '0 0 1px 0' }}>結納金の量と内容</p>
            <p style={{ color: '#005312', fontSize: '13px', margin: 0 }}>Amount of Dower (Mahar)</p>
            <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#B98C20', fontFamily: '"Times New Roman", Times, serif', margin: 0 }}>{details.mahar || "—"}</p>
          </div>
        </div>

      
      <div>
          {/* ── Witnesses Section ── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px',marginBottom:'10px' }}>
          {[0, 1].map((idx) => {
            const w = witnesses[idx] || {};
            return (
              <div key={idx} style={{ paddingRight: '2px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2px' }}>
                  <div style={{ width: '100px', flexShrink: 0 }}>
                    <p style={{ fontSize: '8.5px', color: '#808080', lineHeight: '1.1', margin: 0 }}>証人{idx + 1}の氏名</p>
                    <p style={{ fontWeight: 'bold', color: '#085F2C', fontSize: '11px', lineHeight: '1.1', margin: 0 }}>{idx + 1}. Witness Name</p>
                  </div>
                  <div style={{ margin: '0 4px', color: '#085F2C', fontWeight: 'bold', fontSize: '11px' }}>:</div>
                  <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, textAlign: 'center', fontFamily: 'Merriweather', color: '#B58B2E', fontSize: '12px', minHeight: '14px', padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {w.name || ""}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '10px' }}>
                  <div style={{ width: '100px', flexShrink: 0 }}>
                    <p style={{ fontSize: '8.5px', color: '#808080', lineHeight: '1.1', margin: 0 }}>住所</p>
                    <p style={{ fontWeight: 'bold', color: '#085F2C', fontSize: '11px', lineHeight: '1.1', margin: 0 }}>Address</p>
                  </div>
                  <div style={{ margin: '0 4px', color: '#085F2C', fontWeight: 'bold', fontSize: '11px' }}>:</div>
                  <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, textAlign: 'center', fontFamily: 'Merriweather', color: '#B58B2E', fontSize: '12px', minHeight: '14px', padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                    {w.address || ""}
                  </div>
                </div>
                <div style={{ backgroundColor: '#EEF8E9', padding: '5px 8px', borderRadius: '2px',
                   border: '1px solid #E0F2E3', marginTop: '2px' }}>
                  <p style={{ fontSize: '8.5px', color: '#6b7280', margin: '0 0 1px 0' }}>サイン</p>
                  <div style={{ display: 'flex', alignItems: 'flex-end', height: '18px' }}>
                    <span style={{ fontWeight: 'bold', color: '#085F2C', fontSize: '11px', width: '40px', paddingBottom: '1px' }}>Sign :</span>
                    <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, marginLeft: '4px', position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                      {w?.signUrl && (
                        <div style={{ position: 'absolute', bottom: '1px', width: '120px', height: '22px', backgroundImage: `url(${w.signUrl})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

          {/* ── Certification Text ── */}
        <div 
         style={{marginBottom: '5px' }}
        >
          <p style={{ fontSize: '8.5px', color: '#9ca3af', margin: '0 0 1px 0' }}>信仰告白、売春花嫁がイスラム法に従って結婚金の受け入れ（イジャブとクブル）</p>
          <p style={{ fontWeight: 'bold', color: '#222222', fontSize: '11px', letterSpacing: '0.01em', margin: 0 }}>I certify that Bride & Groom have exchange the offering and acceptance (Ijab and Qubul)</p>
          <p style={{ fontSize: '8.5px', color: '#9ca3af', margin: '2px 0 1px 0' }}>の承認を証明する。従って、夫婦になることを宣言する。</p>
          <p style={{ fontWeight: 'bold', color: '#222222', fontSize: '11px', letterSpacing: '0.01em', margin: 0 }}>according to Islamic Law and are declared Husband and Wife</p>
        </div>

        {/* ── Solemnized By Section ── */}
        <div
         style={{ display: 'grid', gridTemplateColumns: '1fr ', gap: '10px', alignItems: 'flex-end', 
          fontFamily: 'Merriweather',  }}
         >
          <div
          style={{display: 'flex', flexDirection: 'column', gap: '8px',  }}
          >
            <div 
            style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2px' ,gap:'4px' }}
            >
              <div style={{ width: '150px', flexShrink: 0 }}>
                <p style={{ fontSize: '8.5px', color: '#808080', lineHeight: '1.1', margin: 0 }}>名前で厳粛に結婚</p>
                <p style={{ fontWeight: 'bold', color: '#222222', fontSize: '10.5px', lineHeight: '1.1', margin: 0 }}>Marriage Solemnized By Name</p>
              </div>
              <div style={{ margin: '0 4px', color: '#222222', fontWeight: 'bold', fontSize: '11px' }}>:</div>
              <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, textAlign: 'center', fontFamily: 'Merriweather', color: '#B58B2E', fontSize: '11.5px', minHeight: '13px', padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {solemnizedBy.name || ""}
              </div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', marginBottom: '2px' }}>
              <div style={{ width: '150px', flexShrink: 0 }}>
                <p style={{ fontSize: '8.5px', color: '#808080', lineHeight: '1.1', margin: 0 }}>住所</p>
                <p style={{ fontWeight: 'bold', color: '#222222', fontSize: '10.5px', lineHeight: '1.1', margin: 0 }}>Address</p>
              </div>
              <div style={{ margin: '0 4px', color: '#222222', fontWeight: 'bold', fontSize: '11px' }}>:</div>
              <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, textAlign: 'center', fontFamily: 'Merriweather', color: '#B58B2E', fontSize: '11.5px', minHeight: '13px', padding: '0 4px', whiteSpace: 'nowrap', overflow: 'hidden' }}>
                {solemnizedBy.address || ""}
              </div>
            </div>
          </div>

          <div style={{ backgroundColor: '#EEF8E9', padding: '5px 8px', borderRadius: '2px', border: '1px solid #E0F2E3' }}>
            <p style={{ fontSize: '8.5px', color: '#6b7280', margin: '0 0 1px 0' }}>サイン</p>
            <div style={{ display: 'flex', alignItems: 'flex-end', height: '18px' }}>
              <span style={{ fontWeight: 'bold', color: '#085F2C', fontSize: '11px', width: '40px', paddingBottom: '1px' }}>Sign :</span>
              <div style={{ borderBottom: '1px dotted #9ca3af', flex: 1, marginLeft: '4px', position: 'relative', height: '100%', display: 'flex', alignItems: 'flex-end', justify: 'center' }}>
                {solemnizedBy?.signUrl && (
                  <div style={{ position: 'absolute', bottom: '1px', width: '120px', height: '22px', backgroundImage: `url(${solemnizedBy.signUrl})`, backgroundSize: 'contain', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }} />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      </div>
    </div>
  );
};

export default MarriageCertificate;
