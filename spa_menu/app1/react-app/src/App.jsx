import { useState } from "react";

// ===== 1. KOMPONENS: Tipp visszajelzés =====
function Visszajelzes({ uzenet, tipus }) {
  const szinek = {
    info:     { bg: '#E6F1FB', color: '#0C447C', label: 'Infó' },
    siker:    { bg: '#EAF3DE', color: '#3B6D11', label: 'Siker' },
    tul_nagy: { bg: '#FCEBEB', color: '#A32D2D', label: 'Túl nagy' },
    tul_kis:  { bg: '#FAEEDA', color: '#854F0B', label: 'Túl kicsi' },
  };
  const { bg, color, label } = szinek[tipus] || szinek.info;

  return (
    <div style={{ background: bg, borderRadius: 10, padding: '12px 16px', marginTop: 12 }}>
      <div style={{ fontSize: 11, fontWeight: 500, color, marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: 15, color, fontWeight: 500 }}>{uzenet}</div>
    </div>
  );
}

// ===== 2. KOMPONENS: Tippelések listája =====
function TippLista({ tippek }) {
  if (tippek.length === 0) return null;

  return (
    <div style={{ marginTop: 16 }}>
      <div style={{ fontSize: 12, color: '#888', marginBottom: 8 }}>Korábbi tippek:</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {tippek.map((t, i) => (
          <span key={i} style={{
            padding: '3px 10px',
            borderRadius: 20,
            fontSize: 13,
            background: t.irany === 'siker' ? '#EAF3DE' : t.irany === 'nagy' ? '#FCEBEB' : '#FAEEDA',
            color:      t.irany === 'siker' ? '#3B6D11' : t.irany === 'nagy' ? '#A32D2D' : '#854F0B',
          }}>
            {t.szam} {t.irany === 'siker' ? '✓' : t.irany === 'nagy' ? '↓' : '↑'}
          </span>
        ))}
      </div>
    </div>
  );
}

// ===== 3. KOMPONENS: Statisztika kártya =====
function StatKartya({ cimke, ertek }) {
  return (
    <div style={{ background: '#f5f5f5', borderRadius: 8, padding: '10px 14px', textAlign: 'center', flex: 1 }}>
      <div style={{ fontSize: 11, color: '#888', marginBottom: 4 }}>{cimke}</div>
      <div style={{ fontSize: 22, fontWeight: 500 }}>{ertek}</div>
    </div>
  );
}

// ===== FŐ KOMPONENS =====
export default function SzamKitaloJatek() {
  const [titkosszam] = useState(() => Math.floor(Math.random() * 100) + 1);
  const [tipp, setTipp] = useState('');
  const [uzenet, setUzenet] = useState('Gondoltam egy számra 1 és 100 között. Találd ki!');
  const [uzenetTipus, setUzenetTipus] = useState('info');
  const [kiserletSzam, setKiserletSzam] = useState(0);
  const [nyert, setNyert] = useState(false);
  const [tippek, setTippek] = useState([]);
  const [rekord, setRekord] = useState(null);

  const tippeles = () => {
    const szam = parseInt(tipp);
    if (isNaN(szam) || szam < 1 || szam > 100) {
      setUzenet('Kérlek adj meg egy számot 1 és 100 között!');
      setUzenetTipus('info');
      return;
    }

    const ujKiserletek = kiserletSzam + 1;
    setKiserletSzam(ujKiserletek);

    let irany;
    if (szam === titkosszam) {
      irany = 'siker';
      setNyert(true);
      setUzenet(`Gratulálok! ${ujKiserletek} próba alatt kitaláltad a ${titkosszam} számot!`);
      setUzenetTipus('siker');
      if (!rekord || ujKiserletek < rekord) {
        setRekord(ujKiserletek);
      }
    } else if (szam > titkosszam) {
      irany = 'nagy';
      setUzenet(`${szam} – Túl nagy! Próbálj kisebbet.`);
      setUzenetTipus('tul_nagy');
    } else {
      irany = 'kis';
      setUzenet(`${szam} – Túl kicsi! Próbálj nagyobbat.`);
      setUzenetTipus('tul_kis');
    }

    setTippek(prev => [...prev, { szam, irany }]);
    setTipp('');
  };

  const ujJatek = () => {
    window.location.reload();
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 420, margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h2 style={{ marginBottom: 4 }}>Számkitaláló</h2>
      <p style={{ color: '#888', fontSize: 14, marginBottom: 20 }}>Vajon melyik számra gondoltam?</p>

      {/* StatKartya komponensek */}
      <div style={{ display: 'flex', gap: 10, marginBottom: 20 }}>
        <StatKartya cimke="Próbák száma" ertek={kiserletSzam} />
        <StatKartya cimke="Rekord" ertek={rekord ? rekord + ' db' : '–'} />
        <StatKartya cimke="Tippek" ertek={tippek.length} />
      </div>

      {/* Visszajelzés komponens */}
      <Visszajelzes uzenet={uzenet} tipus={uzenetTipus} />

      {/* TippLista komponens */}
      <TippLista tippek={tippek} />

      {/* Bevitel és gomb */}
      {!nyert ? (
        <div style={{ marginTop: 20, display: 'flex', gap: 10 }}>
          <input
            type="number"
            placeholder="1–100"
            value={tipp}
            onChange={e => setTipp(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && tippeles()}
            min={1}
            max={100}
            style={{ flex: 1, padding: '10px 14px', fontSize: 18, borderRadius: 8, border: '1px solid #ccc', textAlign: 'center' }}
          />
          <button
            onClick={tippeles}
            style={{ padding: '10px 20px', background: '#378ADD', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 500, cursor: 'pointer' }}
          >
            Tippelés
          </button>
        </div>
      ) : (
        <button
          onClick={ujJatek}
          style={{ marginTop: 20, width: '100%', padding: '12px', background: '#378ADD', color: '#fff', border: 'none', borderRadius: 8, fontSize: 15, fontWeight: 500, cursor: 'pointer' }}
        >
          Új játék
        </button>
      )}
    </div>
  );
}