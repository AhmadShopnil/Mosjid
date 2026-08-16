import React from 'react';

const MERRIWEATHER_IMPORT = `@import url('https://fonts.googleapis.com/css2?family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700&display=swap');`;

/*
 * HalalCertificate – 100% inline CSS for pixel-perfect html2canvas PDF rendering.
 * A4 Portrait: 790 × 1115 px  (≈ 210 × 297 mm at 96 dpi)
 * No Tailwind classes anywhere – prevents oklch parse errors & preview ↔ PDF drift.
 */

export default function HalalCertificate({ data = {} }) {
  const { details = {}, business = {}, entity = {}, product = {} } = data;

  /* ─── shared micro-components (pure inline) ─── */
  const Label = ({ jp, en }) => (
    <div
     style={{ marginBottom: '2px' }}
     >
      <span style={{ fontSize: '10px', color: '#999999', display: 'block', lineHeight: 1.2 }}>{jp}</span>
      <span style={{ fontSize: '12px', fontWeight: 700, color: '#1B5E20', lineHeight: 1.2 }}>{en} :</span>
    </div>
  );

  const Value = ({ children, color = '#212121' }) => (
    <p style={{ fontSize: '12px', fontWeight: 600, color, margin: '2px 0 0 0', lineHeight: 1.3, wordBreak: 'break-word' }}>
      {children || '—'}
    </p>
  );

  const SectionTitle = ({ text, accent = '#1B5E20' }) => (
    <div style={{
      display: 'block',
      // backgroundColor: accent,
      padding: '0px 10px 12px 0px',
      borderRadius: '3px',
      marginBottom: '10px',
      width: 'fit-content'
    }}>
      <span style={{
        fontSize: '13px',
        fontWeight: 800,
         color: accent,
        // color: '#ffffff',
        letterSpacing: '0.06em',
        display: 'block',
        lineHeight: '1.4',
        // WebkitTextFillColor: '#ffffff'
      }}>{text}</span>
    </div>
  );

  return (
    <>
      {/* Inject Merriweather font so html2canvas captures it correctly */}
      <style dangerouslySetInnerHTML={{ __html: MERRIWEATHER_IMPORT }} />
      <div style={{
        width: '790px', height: '1115px', margin: '0 auto', backgroundColor: '#ffffff',
        position: 'relative', overflow: 'hidden', boxSizing: 'border-box',
        fontFamily: '"Merriweather", "Georgia", serif',
        border: '8px solid #1B5E20',
        padding: '42px 48px'
      }}>

        {/* ── CSS Border System ── */}
        <div style={{ position: 'absolute', top: '6px', left: '6px', right: '6px', bottom: '6px', border: '2px solid #C5943A', pointerEvents: 'none', zIndex: 5 }} />
        <div style={{ position: 'absolute', top: '12px', left: '12px', right: '12px', bottom: '12px', border: '0.5px solid #1B5E20', opacity: 0.25, pointerEvents: 'none', zIndex: 5 }} />
        {/* Corner brackets */}
        {[
          { top: '4px', left: '4px', bT: true, bL: true },
          { top: '4px', right: '4px', bT: true, bR: true },
          { bottom: '4px', left: '4px', bB: true, bL: true },
          { bottom: '4px', right: '4px', bB: true, bR: true },
        ].map((c, i) => (
          <div key={i} style={{
            position: 'absolute', width: '20px', height: '20px', zIndex: 6,
            ...(c.top !== undefined && { top: c.top }),
            ...(c.bottom !== undefined && { bottom: c.bottom }),
            ...(c.left !== undefined && { left: c.left }),
            ...(c.right !== undefined && { right: c.right }),
            ...(c.bT && { borderTop: '3px solid #C5943A' }),
            ...(c.bB && { borderBottom: '3px solid #C5943A' }),
            ...(c.bL && { borderLeft: '3px solid #C5943A' }),
            ...(c.bR && { borderRight: '3px solid #C5943A' }),
          }} />
        ))}

        {/* ── Watermark ── */}
        <div style={{ position: 'absolute', bottom: '120px', left: '50%', transform: 'translateX(-50%)', pointerEvents: 'none', zIndex: 0 }}>
          <img src="/images/offerServices/halal_certificate/water_mark.png" alt="" style={{ width: '260px', height: 'auto', objectFit: 'contain', display: 'block' }} />
        </div>

        {/* ── Content ── */}
        <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>

          {/* ═══ TOP HEADER ═══ */}
          <div>
            {/* JP subtitle */}
            <p style={{ textAlign: 'center', fontSize: '24px', fontWeight: 500, color: '#000000', 
               margin: '0 0 4px 0', 
               fontFamily: '"Merriweather", sans-serif' }}>ハラール認証</p>

            {/* Title row */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              {/* Left: accent bar + text */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{
                    width: "30px",
                    height: "90px",
                    background: "linear-gradient(to bottom, #00BD4E, #001C0B)",
                    borderRadius: "2px",
                    marginRight: "12px",
                    flexShrink: 0,
                  }}
                />
                {/* <div style={{ width: '30px', height: '90px', backgroundColor: '#1B5E20', borderRadius: '2px',
                 marginRight: '12px', flexShrink: 0 }} /> */}


                <div className=''

                  style={{
                    fontSize: '50px', fontWeight: 900, color: '#1D410B',
                    lineHeight: 1, letterSpacing: '0.03em', fontFamily: '"Merriweather", serif'
                  }}
                >
                  <div
                  //  style={{ fontSize: '34px', fontWeight: 900, color: '#1D410B',
                  //   lineHeight: 1, letterSpacing: '0.03em', fontFamily: '"Merriweather", serif' }}

                  >HALAL</div>
                  <div
                  //  style={{ fontSize: '34px', fontWeight: 900, color: '#1D410B',
                  //   lineHeight: 1, letterSpacing: '0.03em', fontFamily: '"Merriweather", serif' }}

                  >CERTIFICATE</div>
                </div>
              </div>
              {/* Right: badge */}
              <img src="/images/offerServices/halal_certificate/certified_badge.svg" alt="Halal Certified" style={{ width: '105px', height: '105px', objectFit: 'contain', flexShrink: 0, display: 'block' }} />
            </div>

            {/* Certificate No */}
            <div style={{ borderBottom: '1.5px solid #E0E0E0', paddingBottom: '7px', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', color: '#BDBDBD', display: 'block', marginBottom: '1px',
                 fontFamily: '"Merriweather", sans-serif' }}>証明書番号</span>
              <span style={{ fontSize: '20px', fontWeight: 500, color: '#000000', fontFamily: '"Merriweather", serif' }}>Certificate No: </span>
              <span style={{ fontSize: '20px', fontWeight: 600, color: '#1B5E20', fontFamily: '"Merriweather", serif' }}>{details.certificateNo || '—'}</span>
            </div>
          </div>

          {/* ═══ BODY SECTIONS ═══ */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px',  }}>

        <div
        
        style={{ display: 'flex', flexDirection: 'row', gap: '10px', flex: 1 }}
        >
              {/* Section 1 – Enterprise */}
            <div style={{ backgroundColor: '#F6F9F5', border: '1px solid #C8E6C9', borderRadius: '6px', padding: '12px 16px' }}>
              <SectionTitle text="CERTIFIED ENTERPRISE & REPRESENTATIVE ／ 認定企業および代表者" />
              <div
               style={{ display: 'flex', flexDirection: 'column', gap: '15px',  }}
              // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: '20px', rowGap: '8px' }}
              >
                <div><Label jp="企業名" en="Company Name" /><Value>{business.companyName}</Value></div>
                <div><Label jp="代表者名" en="Representative" /><Value>{business.representative}</Value></div>
                <div style={{ gridColumn: '1 / -1' }}><Label jp="会社住所" en="Business Address" /><Value color="#555555">{business.companyAddress}</Value></div>
                <div><Label jp="認証対象組織" en="Certified Entity" /><Value>{entity.certificateName || business.companyName}</Value></div>
                <div><Label jp="対象組織住所" en="Entity Address" /><Value color="#555555">{entity.certificateAddress || business.companyAddress}</Value></div>
              </div>
            </div>

            {/* Section 2 – Standards */}
            <div 
            style={{ backgroundColor: '#FFFBF0', border: '1px solid #F5E6B8', borderRadius: '6px', padding: '12px 16px' }}
            // style={{ backgroundColor: '#FFFBF0', border: '1px solid #F5E6B8', borderRadius: '6px', padding: '12px 16px' }}
            
            >
              <SectionTitle text="CERTIFICATION & STANDARD DETAILS ／ 認証および標準の詳細" accent="#C5943A" />
              <div 
               style={{ display: 'flex', flexDirection: 'column', gap: '12px',  }}
              // style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', columnGap: '16px', rowGap: '8px' }}
              >
                <div><Label jp="対象製品・サービス" en="Product / Service" /><Value color="#C5943A">{product.productName}</Value></div>
                <div><Label jp="製品カテゴリー" en="Category" /><Value>{product.category}</Value></div>
                {/* <div><Label jp="認証範囲" en="Scope" /><Value color="#555555">{product.scope}</Value></div> */}
                <div><Label jp="適用ハラール基準" en="Halal Standard" /><Value>{product.halalUse || 'Osaka Masjid Standard'}</Value></div>
                <div><Label jp="発行日" en="Issued On" /><Value color="#1B5E20">{details.issueDate}</Value></div>
                <div><Label jp="有効期限" en="Valid Until" /><Value color="#C62828">{details.expiryDate}</Value></div>
              </div>
            </div>

        </div>
            {/* Declaration */}
            <div style={{ textAlign: 'center', padding: '4px 6px' }}>
              <p style={{ fontSize: '12px', fontWeight: 600, color: '#333333', margin: '0 0 3px 0' }}>
                This Halal Certificate has been issued to the business organization named above, which has compiled with all the rules and guidelines set by the Islamic council of Japan.
              </p>
              <p style={{ fontSize: '11px', color: '#616161', margin: 0, fontStyle: 'italic' }}>
                Note: All products are 100% halal including hand slaughtered chicken.
              </p>
            </div>

            {/* Conditions */}
            <div style={{ backgroundColor: '#FAFAF8', border: '1px solid #EEECE6', borderRadius: '4px', padding: '7px 12px' }}>
              <p style={{ fontSize: '14px', fontWeight: 700, color: '#424242', margin: '0 0 3px 0' }}>Conditions:</p>
              {[
                'This certificate is valid only for the named above, located at the above address.',
                'The ORIGINAL certificate must be displayed at the above premises at the place visible to the customer.',
                'The certificate is not to be displayed by another organization or location.',
                'Osaka Masjid reserves the right to inspect the above mentioned premises without prior notice.',
                'Breach of any of this condition will invalidate the certification.'
              ].map((t, i) => (
                <p key={i} style={{ fontSize: '12px', color: '#757575', margin: '0 0 1px 0', lineHeight: 1.4, paddingLeft: '4px' }}>{i + 1}. {t}</p>
              ))}
            </div>
          </div>

          {/* ═══ FOOTER ═══ */}
          <div style={{ borderTop: '1.5px solid #E0E0E0', paddingTop: '8px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '6px' }}>
              {/* Left: signatory */}
              <div style={{ fontSize: '11px', color: '#424242', lineHeight: 1.6 }}>
                <p style={{ margin: 0 }}><span style={{ fontWeight: 700, color: '#1B5E20' }}>Name:</span> Authorized Officer</p>
                <p style={{ margin: 0 }}><span style={{ fontWeight: 700, color: '#1B5E20' }}>Designation:</span> Director of Halal Certification</p>
                <p style={{ margin: 0 }}><span style={{ fontWeight: 700, color: '#1B5E20' }}>Date:</span> {details.issueDate || '—'}</p>
                <p style={{ margin: 0 }}><span style={{ fontWeight: 700, color: '#1B5E20' }}>On Behalf Of:</span> Osaka Masjid Halal Board</p>
              </div>
              {/* Right: signature */}
              <div style={{ width: '210px', textAlign: 'center' }}>
                <div style={{ borderBottom: '1.5px dotted #BDBDBD', height: '30px', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', paddingBottom: '2px' }}>
                  <span style={{ fontStyle: 'italic', fontSize: '14px', color: '#1B5E20', fontWeight: 700 }}>Osaka Masjid Halal Board</span>
                </div>
                <p style={{ fontSize: '10px', color: '#9E9E9E', fontWeight: 700, textTransform: 'uppercase', margin: '3px 0 0 0' }}>Authorized Signature</p>
              </div>
            </div>
            {/* Organization bar */}
            {/* <div style={{ textAlign: 'center', fontSize: '8px', color: '#757575', borderTop: '1px solid #F5F5F5', paddingTop: '5px' }}>
              <span style={{ fontWeight: 700 }}>Organization Name</span> &nbsp;|&nbsp;
              <span>Tel: 06-4862-6396</span> &nbsp;|&nbsp;
              <span>Email: info@osakamasjid.org</span> &nbsp;|&nbsp;
              <span>Address: 4-12-16, Owada, Nishi Yodogawa ku, Osaka, Japan</span>
            </div> */}
          </div>

        </div>
      </div>
    </>
  );
}
