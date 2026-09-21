import React from 'react';

/**
 * Premium one-page Islamic Marriage Certificate
 * ------------------------------------------------
 * - Keeps the existing data shape:
 *   groom, bride, details, witnesses, solemnizedBy
 * - Designed for a single A4-like portrait page.
 * - No external border/image asset is required.
 * - Works with the existing photo/sign URLs.
 */

const COLORS = {
  ink: '#17352B',
  emerald: '#0B5D43',
  deepEmerald: '#083F31',
  gold: '#B28A3B',
  softGold: '#D8BD7A',
  ivory: '#FBF8F0',
  paper: '#FFFDF8',
  line: '#D8D0BF',
  muted: '#77766F',
};

const Field = ({ label, labelAlt, value, compact = false }) => (
  <div style={{
    display: 'grid',
    gridTemplateColumns: compact ? '82px 12px 1fr' : '92px 12px 1fr',
    alignItems: 'end',
    minHeight: compact ? '25px' : '28px',
  }}>
    <div>
      <div style={{
        fontSize: '7px',
        color: COLORS.muted,
        lineHeight: 1.05,
        marginBottom: '2px',
        fontFamily: '"Noto Sans", Arial, sans-serif',
      }}>
        {labelAlt}
      </div>
      <div style={{
        fontSize: compact ? '8.5px' : '9px',
        color: COLORS.ink,
        fontWeight: 700,
        lineHeight: 1.05,
        fontFamily: '"Cormorant Garamond", Georgia, serif',
      }}>
        {label}
      </div>
    </div>

    <div style={{
      color: COLORS.gold,
      fontSize: '9px',
      fontWeight: 700,
      textAlign: 'center',
    }}>
      :
    </div>

    <div style={{
      borderBottom: `1px solid ${COLORS.line}`,
      minHeight: '18px',
      padding: '0 3px 2px',
      textAlign: 'center',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      fontSize: compact ? '9px' : '9.5px',
      color: COLORS.ink,
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      fontWeight: 600,
    }}>
      {value || '\u00A0'}
    </div>
  </div>
);

const SignatureBox = ({ title, signUrl }) => (
  <div style={{
    marginTop: '7px',
    border: `1px solid ${COLORS.line}`,
    background: '#FCFAF4',
    padding: '6px 8px 5px',
    minHeight: '43px',
  }}>
    <div style={{
      fontSize: '6.5px',
      color: COLORS.muted,
      marginBottom: '2px',
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      fontFamily: '"Noto Sans", Arial, sans-serif',
    }}>
      {title}
    </div>

    <div style={{
      height: '26px',
      borderBottom: `1px solid ${COLORS.gold}`,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    }}>
      {signUrl && (
        <div style={{
          position: 'absolute',
          bottom: '0px',
          width: '110px',
          height: '28px',
          backgroundImage: `url(${signUrl})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
        }}
        />
      )}
    </div>
  </div>
);

const PersonCard = ({ person, type }) => {
  const isGroom = type === 'Groom';

  return (
    <section style={{
      border: `1px solid ${COLORS.line}`,
      background: COLORS.paper,
      padding: '10px 11px 9px',
      position: 'relative',
    }}>
      <div style={{
        position: 'absolute',
        top: '-1px',
        left: '-1px',
        right: '-1px',
        height: '3px',
        background: COLORS.emerald,
      }} />

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '9px',
        marginBottom: '7px',
      }}>
        <div style={{
          width: '47px',
          height: '55px',
          border: `1px solid ${COLORS.softGold}`,
          background: '#F7F3E8',
          flexShrink: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}>
          {person?.photoUrl ? (
            <div style={{
              width: '100%',
              height: '100%',
              backgroundImage: `url(${person.photoUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }} />
          ) : (
            <div style={{
              fontSize: '17px',
              color: COLORS.softGold,
              fontFamily: 'Georgia, serif',
            }}>
              {isGroom ? 'G' : 'B'}
            </div>
          )}
        </div>

        <div>
          <div style={{
            fontSize: '7px',
            color: COLORS.gold,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            fontFamily: '"Noto Sans", Arial, sans-serif',
            marginBottom: '1px',
          }}>
            Particulars of
          </div>

          <div style={{
            fontSize: '19px',
            lineHeight: 1,
            color: COLORS.deepEmerald,
            fontWeight: 700,
            fontFamily: '"Cormorant Garamond", Georgia, serif',
          }}>
            {type}
          </div>

          <div style={{
            marginTop: '3px',
            fontSize: '7px',
            color: COLORS.muted,
            fontFamily: '"Noto Sans", Arial, sans-serif',
          }}>
            {isGroom ? 'বরের পরিচয়' : 'কনের পরিচয়'}
          </div>
        </div>
      </div>

      <div style={{
        background: '#F4EFE1',
        borderTop: `1px solid ${COLORS.softGold}`,
        borderBottom: `1px solid ${COLORS.softGold}`,
        padding: '5px 7px',
        marginBottom: '6px',
      }}>
        <div style={{
          fontSize: '6.5px',
          color: COLORS.muted,
          marginBottom: '1px',
          fontFamily: '"Noto Sans", Arial, sans-serif',
        }}>
          Muslim Name
        </div>
        <div style={{
          color: COLORS.deepEmerald,
          fontSize: '14px',
          lineHeight: 1.05,
          fontWeight: 700,
          fontFamily: '"Cormorant Garamond", Georgia, serif',
        }}>
          {person?.muslimName || '\u00A0'}
        </div>
      </div>

      <Field label="Name" labelAlt="名前" value={person?.name} compact />
      <Field label="Father's Name" labelAlt="父親の名前" value={person?.fatherName} compact />
      <Field label="Age" labelAlt="年齢" value={person?.age} compact />
      <Field label="Religion" labelAlt="宗教" value={person?.religion} compact />
      <Field label="Nationality" labelAlt="国籍" value={person?.nationality} compact />
      <Field label="Passport No." labelAlt="パスポート番号" value={person?.passportNo} compact />
      <Field label="Address" labelAlt="住所" value={person?.addressLine1} compact />
      <Field label="" labelAlt="" value={person?.addressLine2} compact />

      <SignatureBox title="Signature / 署名" signUrl={person?.signUrl} />
    </section>
  );
};

const WitnessCard = ({ witness, index }) => (
  <div style={{
    borderTop: `1px solid ${COLORS.line}`,
    paddingTop: '5px',
  }}>
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      marginBottom: '3px',
    }}>
      <span style={{
        width: '17px',
        height: '17px',
        border: `1px solid ${COLORS.gold}`,
        borderRadius: '50%',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: COLORS.gold,
        fontSize: '7px',
        fontWeight: 700,
        fontFamily: '"Noto Sans", Arial, sans-serif',
      }}>
        {index + 1}
      </span>

      <div>
        <div style={{
          fontSize: '8.5px',
          fontWeight: 700,
          color: COLORS.ink,
          fontFamily: '"Cormorant Garamond", Georgia, serif',
        }}>
          Witness {index + 1}
        </div>
        <div style={{
          fontSize: '6.5px',
          color: COLORS.muted,
          fontFamily: '"Noto Sans", Arial, sans-serif',
        }}>
          証人{index + 1}
        </div>
      </div>
    </div>

    <Field label="Name" labelAlt="氏名" value={witness?.name} compact />
    <Field label="Address" labelAlt="住所" value={witness?.address} compact />
    <SignatureBox title="Witness Signature / 署名" signUrl={witness?.signUrl} />
  </div>
);

const MarriageCertificate = ({ data = {} }) => {
  const {
    groom = {},
    bride = {},
    details = {},
    witnesses = [],
    solemnizedBy = {},
  } = data;

  return (
    <div style={{
      width: '794px',
      height: '1123px',
      maxWidth: '100%',
      margin: '0 auto',
      boxSizing: 'border-box',
      position: 'relative',
      overflow: 'hidden',
      background: COLORS.ivory,
      color: COLORS.ink,
      fontFamily: '"Cormorant Garamond", Georgia, serif',
      WebkitPrintColorAdjust: 'exact',
      printColorAdjust: 'exact',
    }}>
      {/* Outer ornamental frame */}
      <div style={{
        position: 'absolute',
        inset: '13px',
        border: `1.5px solid ${COLORS.gold}`,
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute',
        inset: '19px',
        border: `1px solid ${COLORS.emerald}`,
        pointerEvents: 'none',
      }} />

      {/* Corner ornaments */}
      {[
        { top: '7px', left: '7px', borderTop: 1, borderLeft: 1 },
        { top: '7px', right: '7px', borderTop: 1, borderRight: 1 },
        { bottom: '7px', left: '7px', borderBottom: 1, borderLeft: 1 },
        { bottom: '7px', right: '7px', borderBottom: 1, borderRight: 1 },
      ].map((corner, i) => (
        <div key={i} style={{
          position: 'absolute',
          width: '27px',
          height: '27px',
          borderColor: COLORS.gold,
          borderStyle: 'solid',
          boxSizing: 'border-box',
          ...corner,
        }} />
      ))}

      {/* Subtle center watermark */}
      <div style={{
        position: 'absolute',
        left: '50%',
        top: '53%',
        transform: 'translate(-50%, -50%)',
        opacity: 0.035,
        color: COLORS.emerald,
        fontSize: '220px',
        lineHeight: 1,
        fontFamily: 'serif',
        pointerEvents: 'none',
      }}>
        ۞
      </div>

      <main style={{
        position: 'relative',
        zIndex: 2,
        height: '100%',
        boxSizing: 'border-box',
        padding: '43px 54px 36px',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <header style={{ textAlign: 'center' }}>
          <div style={{
            fontSize: '20px',
            color: COLORS.deepEmerald,
            lineHeight: 1,
            marginBottom: '7px',
            fontFamily: 'serif',
          }}>
            بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ
          </div>

          <div style={{
            fontSize: '6.5px',
            letterSpacing: '0.22em',
            color: COLORS.gold,
            textTransform: 'uppercase',
            fontFamily: '"Noto Sans", Arial, sans-serif',
          }}>
            In the Name of Allah, the Most Gracious, the Most Merciful
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            margin: '11px 0 5px',
          }}>
            <div style={{ width: '75px', height: '1px', background: COLORS.softGold }} />
            <div style={{
              width: '7px',
              height: '7px',
              transform: 'rotate(45deg)',
              border: `1px solid ${COLORS.gold}`,
              background: COLORS.ivory,
            }} />
            <div style={{ width: '75px', height: '1px', background: COLORS.softGold }} />
          </div>

          <div style={{
            fontSize: '8px',
            letterSpacing: '0.28em',
            color: COLORS.muted,
            textTransform: 'uppercase',
            fontFamily: '"Noto Sans", Arial, sans-serif',
          }}>
            Islamic Marriage Certificate
          </div>

          <h1 style={{
            margin: '2px 0 1px',
            fontSize: '31px',
            lineHeight: 1,
            color: COLORS.deepEmerald,
            fontWeight: 700,
            letterSpacing: '0.025em',
            fontFamily: '"Cormorant Garamond", Georgia, serif',
          }}>
            MARRIAGE CERTIFICATE
          </h1>

          <div style={{
            fontSize: '8px',
            color: COLORS.gold,
            fontFamily: '"Noto Sans", Arial, sans-serif',
          }}>
            結婚証明書
          </div>

          <div style={{
            marginTop: '6px',
            display: 'flex',
            justifyContent: 'center',
          }}>
            <div style={{
              border: `1px solid ${COLORS.softGold}`,
              padding: '3px 12px',
              background: '#FCF8EC',
              fontSize: '7px',
              color: COLORS.muted,
              fontFamily: '"Noto Sans", Arial, sans-serif',
            }}>
              Certificate No. <strong style={{ color: COLORS.ink }}>{details.certificateNo || '—'}</strong>
            </div>
          </div>
        </header>

        {/* Couple */}
        <section style={{
          marginTop: '15px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '12px',
        }}>
          <PersonCard person={groom} type="Groom" />
          <PersonCard person={bride} type="Bride" />
        </section>

        {/* Marriage facts */}
        <section style={{
          marginTop: '11px',
          border: `1px solid ${COLORS.softGold}`,
          background: '#F7F1E2',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
        }}>
          {[
            ['Date of Marriage', '結婚の日', details.date],
            ['Place of Marriage', '結婚の場', details.place],
            ['Amount of Dower (Mahar)', '結納金の量と内容', details.mahar],
          ].map(([label, alt, value], i) => (
            <div key={label} style={{
              textAlign: 'center',
              padding: '7px 8px 8px',
              borderRight: i < 2 ? `1px solid ${COLORS.softGold}` : 'none',
            }}>
              <div style={{
                fontSize: '6.5px',
                color: COLORS.muted,
                fontFamily: '"Noto Sans", Arial, sans-serif',
              }}>
                {alt}
              </div>
              <div style={{
                marginTop: '1px',
                fontSize: '8.5px',
                color: COLORS.deepEmerald,
                fontWeight: 700,
                fontFamily: '"Noto Sans", Arial, sans-serif',
              }}>
                {label}
              </div>
              <div style={{
                marginTop: '2px',
                fontSize: '13px',
                color: COLORS.gold,
                fontWeight: 700,
              }}>
                {value || '—'}
              </div>
            </div>
          ))}
        </section>

        {/* Certification statement */}
        <section style={{
          marginTop: '10px',
          padding: '8px 15px',
          borderLeft: `3px solid ${COLORS.gold}`,
          borderRight: `3px solid ${COLORS.gold}`,
          background: '#FCFAF4',
          textAlign: 'center',
        }}>
          <div style={{
            fontSize: '7px',
            color: COLORS.muted,
            lineHeight: 1.25,
            fontFamily: '"Noto Sans", Arial, sans-serif',
          }}>
            信仰告白、売春花嫁がイスラム法に従って結婚金の受け入れ（イジャブとクブル）
          </div>
          <div style={{
            marginTop: '2px',
            fontSize: '10.5px',
            color: COLORS.deepEmerald,
            fontWeight: 700,
            lineHeight: 1.15,
          }}>
            I certify that Bride &amp; Groom have exchanged the offering and acceptance (Ijab and Qubul)
          </div>
          <div style={{
            marginTop: '2px',
            fontSize: '7px',
            color: COLORS.muted,
            lineHeight: 1.25,
            fontFamily: '"Noto Sans", Arial, sans-serif',
          }}>
            の承認を証明する。従って、夫婦になることを宣言する。
          </div>
          <div style={{
            marginTop: '2px',
            fontSize: '10.5px',
            color: COLORS.deepEmerald,
            fontWeight: 700,
            lineHeight: 1.15,
          }}>
            according to Islamic Law and are declared Husband and Wife.
          </div>
        </section>

        {/* Witnesses */}
        <section style={{ marginTop: '11px' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '7px',
            marginBottom: '6px',
          }}>
            <div style={{ width: '22px', height: '1px', background: COLORS.gold }} />
            <div style={{
              fontSize: '10px',
              color: COLORS.deepEmerald,
              fontWeight: 700,
              letterSpacing: '0.04em',
            }}>
              WITNESSES
            </div>
            <div style={{
              fontSize: '6.5px',
              color: COLORS.muted,
              fontFamily: '"Noto Sans", Arial, sans-serif',
            }}>
              / সাক্ষীগণ
            </div>
            <div style={{ flex: 1, height: '1px', background: COLORS.line }} />
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
          }}>
            {[0, 1].map((idx) => (
              <WitnessCard
                key={idx}
                witness={witnesses[idx] || {}}
                index={idx}
              />
            ))}
          </div>
        </section>

        {/* Solemnized by */}
        <section style={{
          marginTop: '10px',
          borderTop: `1px solid ${COLORS.line}`,
          paddingTop: '7px',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 205px',
            gap: '15px',
            alignItems: 'end',
          }}>
            <div>
              <div style={{
                fontSize: '7px',
                color: COLORS.muted,
                fontFamily: '"Noto Sans", Arial, sans-serif',
              }}>
                名前で厳粛に結婚
              </div>
              <div style={{
                fontSize: '10px',
                color: COLORS.deepEmerald,
                fontWeight: 700,
              }}>
                Marriage Solemnized By
              </div>

              <div style={{ marginTop: '4px' }}>
                <Field label="Name" labelAlt="氏名" value={solemnizedBy.name} compact />
                <Field label="Address" labelAlt="住所" value={solemnizedBy.address} compact />
              </div>
            </div>

            <SignatureBox
              title="Solemnizer Signature / 署名"
              signUrl={solemnizedBy?.signUrl}
            />
          </div>
        </section>

        {/* Footer */}
        <footer style={{
          marginTop: 'auto',
          paddingTop: '9px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: `1px solid ${COLORS.line}`,
        }}>
          <div style={{
            fontSize: '6.5px',
            color: COLORS.muted,
            lineHeight: 1.3,
            fontFamily: '"Noto Sans", Arial, sans-serif',
          }}>
            This certificate records the solemnization of marriage according to Islamic Law.
          </div>

          <div style={{
            textAlign: 'right',
            fontSize: '6.5px',
            color: COLORS.muted,
            fontFamily: '"Noto Sans", Arial, sans-serif',
          }}>
            <div>Official Marriage Record</div>
            <div style={{ color: COLORS.gold, marginTop: '1px' }}>結婚記録</div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default MarriageCertificate;
