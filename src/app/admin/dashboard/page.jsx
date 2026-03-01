"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const MEAL_LABELS = {
  vegetarian    : "Vegetarian",
  non_vegetarian: "Non-Vegetarian",
  vegan         : "Vegan",
  ""            : "—",
};

export default function AdminPage() {
  const router = useRouter();

  const [rsvps,          setRsvps]          = useState([]);
  const [loading,        setLoading]        = useState(true);
  const [search,         setSearch]         = useState("");
  const [filter,         setFilter]         = useState("all"); // all | attending | declined
  const [expandedId,     setExpandedId]     = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    attending: 0,
    declined: 0,
    guests: 0,
    meals: {
      vegetarian: 0,
      non_vegetarian: 0,
      vegan: 0,
    }
  });

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/");
  };

  const recalc = (data) => {
    const attending = data.filter(r => r.attendance === "joyfully_accepts");
  
    const meals = {
      vegetarian: 0,
      non_vegetarian: 0,
      vegan: 0,
    };
  
    attending.forEach(r => {
      if (meals[r.meal] !== undefined) {
        meals[r.meal] += Number(r.guests || 1);
      }
    });
  
    setStats({
      total: data.length,
      attending: attending.length,
      declined: data.filter(r => r.attendance === "declines").length,
      guests: attending.reduce((s, r) => s + Number(r.guests || 0), 0),
      meals
    });
  };

  useEffect(() => {
    fetch("/api/rsvp")
      .then(r => r.json())
      .then(data => { setRsvps(data); recalc(data); setLoading(false); });
  }, []);

  const deleteRSVP = async (id) => {
    if (!confirm("Remove this RSVP? This cannot be undone.")) return;
    await fetch(`/api/rsvp?id=${id}`, { method: "DELETE" });
    const updated = rsvps.filter(r => r.id !== id);
    setRsvps(updated); recalc(updated);
    if (expandedId === id) setExpandedId(null);
  };

  const exportCSV = () => {
    const rows = [
      ["Name","Email","Phone","Attendance","Guests","Meal","Message"],
      ...rsvps.map(r => [
        r.name, r.email, r.phone,
        r.attendance === "joyfully_accepts" ? "Attending" : "Declined",
        r.guests, MEAL_LABELS[r.meal] || r.meal, `"${(r.message||"").replace(/"/g,'""')}"`,
      ]),
    ].map(row => row.join(",")).join("\n");
    const a = Object.assign(document.createElement("a"), {
      href    : URL.createObjectURL(new Blob([rows], { type:"text/csv" })),
      download: "betty-athul-rsvp.csv",
    });
    a.click();
  };

  const filtered = rsvps.filter(r => {
    const matchSearch = r.name?.toLowerCase().includes(search.toLowerCase()) ||
                        r.email?.toLowerCase().includes(search.toLowerCase()) ||
                        r.phone?.includes(search);
    const matchFilter = filter === "all"
      ? true
      : filter === "attending"
      ? r.attendance === "joyfully_accepts"
      : r.attendance === "declines";
    return matchSearch && matchFilter;
  });

  if (loading) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Cinzel:wght@400;500&display=swap');
      `}</style>
      <div style={{minHeight:"100vh",background:"radial-gradient(ellipse at 50% 0%,#F7F0DC,#FDFAF3 50%,#F0E8D0)",display:"flex",alignItems:"center",justifyContent:"center",flexDirection:"column",gap:"16px"}}>
        <div style={{width:"40px",height:"40px",border:"2px solid rgba(201,168,76,0.3)",borderTop:"2px solid #C9A84C",borderRadius:"50%",animation:"spin 0.9s linear infinite"}}/>
        <p style={{fontFamily:"'Cinzel',serif",fontSize:"0.68rem",letterSpacing:"0.35em",color:"#8B6914",textTransform:"uppercase"}}>Loading</p>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    </>
  );

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Great+Vibes&family=Cinzel:wght@400;500&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        .adm-root {
          min-height: 100vh;
          background: radial-gradient(ellipse at 50% 0%, #F7F0DC 0%, #FDFAF3 50%, #F0E8D0 100%);
          font-family: 'Cormorant Garamond', serif;
          position: relative;
          padding-top: 90px;
        }
        .adm-root::before {
          content: '';
          position: fixed;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none'%3E%3Cg fill='%23C9A84C' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
          pointer-events: none;
          z-index: 0;
        }

        /* ── Header ── */
        .adm-header {
          position: sticky;
          top: 0;
          z-index: 20;
          background: rgba(253,250,243,0.92);
          backdrop-filter: blur(12px);
          border-bottom: 1px solid rgba(201,168,76,0.25);
          box-shadow: 0 2px 20px rgba(139,105,20,0.08);
        }
        .adm-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 20px 28px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          flex-wrap: wrap;
        }
        .adm-brand {}
        .adm-brand-title {
          font-family: 'Great Vibes', cursive;
          font-size: 2rem;
          background: linear-gradient(135deg,#8B6914,#C9A84C,#F5E6B8,#C9A84C,#8B6914);
          background-size: 200% 100%;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          animation: shimmer 4s ease-in-out infinite;
          line-height: 1;
        }
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        .adm-brand-sub {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.4em;
          color: rgba(139,105,20,0.6);
          text-transform: uppercase;
          margin-top: 4px;
        }
        .adm-export-btn {
          font-family: 'Cinzel', serif;
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #1a0e00;
          background: linear-gradient(135deg,#8B6914,#C9A84C,#F0D478,#C9A84C,#8B6914);
          background-size: 200% 100%;
          border: none;
          padding: 10px 24px;
          cursor: pointer;
          box-shadow: 0 3px 16px rgba(139,105,20,0.35);
          transition: background-position 0.5s, transform 0.2s, box-shadow 0.2s;
          white-space: nowrap;
        }
        .adm-export-btn:hover {
          background-position: 100% 0;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(139,105,20,0.45);
        }

        /* ── Stat cards ── */
        .adm-stats {
          max-width: 1200px;
          margin: 32px auto 0;
          padding: 0 28px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
          gap: 16px;
        }
        .adm-stat {
          background: linear-gradient(160deg, #FEFCF5, #FAF3E0 60%, #FDF8ED);
          border: 1px solid rgba(201,168,76,0.28);
          outline: 1px solid rgba(201,168,76,0.1);
          outline-offset: -8px;
          padding: 22px 20px 18px;
          text-align: center;
          position: relative;
          box-shadow: 0 4px 20px rgba(139,105,20,0.08), inset 0 1px 0 rgba(255,255,255,0.9);
          transition: transform 0.3s, box-shadow 0.3s;
        }
        .adm-stat:hover { transform: translateY(-3px); box-shadow: 0 10px 32px rgba(139,105,20,0.14); }
        .adm-stat::before,.adm-stat::after { content:'';position:absolute;width:14px;height:14px; }
        .adm-stat::before { top:7px;left:7px;border-top:1.5px solid rgba(201,168,76,0.5);border-left:1.5px solid rgba(201,168,76,0.5); }
        .adm-stat::after  { bottom:7px;right:7px;border-bottom:1.5px solid rgba(201,168,76,0.5);border-right:1.5px solid rgba(201,168,76,0.5); }
        .adm-stat-value {
          font-size: 2.6rem;
          font-weight: 300;
          background: linear-gradient(180deg,#8B6914,#C9A84C 40%,#F0D478 55%,#C9A84C 75%,#8B6914);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
          line-height: 1;
          margin-bottom: 8px;
        }
        .adm-stat-divider { width:32px;height:1px;background:linear-gradient(90deg,transparent,rgba(201,168,76,0.7),transparent);margin:0 auto 8px; }
        .adm-stat-label {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.28em;
          color: rgba(139,105,20,0.7);
          text-transform: uppercase;
        }

        /* ── Controls ── */
        .adm-controls {
          max-width: 1200px;
          margin: 28px auto 0;
          padding: 0 28px;
          display: flex;
          gap: 12px;
          align-items: center;
          flex-wrap: wrap;
        }
        .adm-search-wrap {
          flex: 1;
          min-width: 200px;
          position: relative;
        }
        .adm-search-icon {
          position: absolute;
          left: 12px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(139,105,20,0.5);
          pointer-events: none;
        }
        .adm-search {
          width: 100%;
          font-family: 'Cormorant Garamond', serif;
          font-size: 1rem;
          color: #3D2B0E;
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(201,168,76,0.3);
          outline: none;
          padding: 10px 12px 10px 36px;
          transition: border-color 0.25s, background 0.25s;
        }
        .adm-search::placeholder { color: rgba(139,105,20,0.35); font-style: italic; }
        .adm-search:focus { border-color: #C9A84C; background: rgba(245,230,184,0.15); }
        .adm-filter-group { display: flex; gap: 8px; }
        .adm-filter-btn {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          padding: 9px 16px;
          border: 1px solid rgba(201,168,76,0.35);
          background: transparent;
          color: rgba(139,105,20,0.65);
          cursor: pointer;
          transition: all 0.22s;
          white-space: nowrap;
        }
        .adm-filter-btn:hover { border-color: rgba(201,168,76,0.7); color: #8B6914; }
        .adm-filter-btn.active {
          background: linear-gradient(135deg,#8B6914,#C9A84C,#F0D478,#C9A84C,#8B6914);
          background-size: 200% 100%;
          color: #1a0e00;
          border-color: transparent;
          box-shadow: 0 2px 10px rgba(139,105,20,0.25);
          animation: shimmer 3s ease-in-out infinite;
        }

        /* ── Count bar ── */
        .adm-count-bar {
          max-width: 1200px;
          margin: 16px auto 0;
          padding: 0 28px;
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .adm-count-text {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          color: rgba(139,105,20,0.55);
          text-transform: uppercase;
          white-space: nowrap;
        }
        .adm-count-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, rgba(201,168,76,0.4), transparent);
        }

        /* ── Table ── */
        .adm-table-wrap {
          max-width: 1200px;
          margin: 12px auto 0;
          padding: 0 28px 60px;
        }
        .adm-table {
          width: 100%;
          border-collapse: collapse;
          background: linear-gradient(160deg, #FEFCF5, #FAF3E0 60%, #FDF8ED);
          border: 1px solid rgba(201,168,76,0.28);
          box-shadow: 0 6px 32px rgba(139,105,20,0.1), inset 0 1px 0 rgba(255,255,255,0.9);
        }
        .adm-thead th {
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.3em;
          text-transform: uppercase;
          color: rgba(139,105,20,0.7);
          padding: 16px 18px;
          text-align: left;
          background: rgba(201,168,76,0.06);
          border-bottom: 1px solid rgba(201,168,76,0.25);
          white-space: nowrap;
        }
        .adm-row {
          border-bottom: 1px solid rgba(201,168,76,0.1);
          transition: background 0.2s;
          cursor: pointer;
        }
        .adm-row:hover { background: rgba(201,168,76,0.05); }
        .adm-row.expanded { background: rgba(201,168,76,0.07); }
        .adm-row:last-child { border-bottom: none; }
        .adm-td {
          padding: 16px 18px;
          font-size: 1rem;
          color: #3D2B0E;
          vertical-align: middle;
        }
        .adm-name {
          font-size: 1.05rem;
          font-weight: 400;
          color: #3D2B0E;
        }
        .adm-email {
          font-size: 0.85rem;
          color: rgba(61,43,14,0.55);
          font-style: italic;
          margin-top: 2px;
        }
        .adm-badge {
          display: inline-block;
          font-family: 'Cinzel', serif;
          font-size: 0.58rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          padding: 4px 10px;
        }
        .adm-badge.yes {
          background: rgba(201,168,76,0.12);
          color: #6B4F10;
          border: 1px solid rgba(201,168,76,0.4);
        }
        .adm-badge.no {
          background: rgba(0,0,0,0.04);
          color: rgba(61,43,14,0.45);
          border: 1px solid rgba(61,43,14,0.12);
        }
        .adm-chevron {
          transition: transform 0.25s ease;
          color: rgba(139,105,20,0.5);
        }
        .adm-chevron.open { transform: rotate(180deg); }

        /* Expanded detail row */
        .adm-detail-row td {
          padding: 0;
          border-bottom: 1px solid rgba(201,168,76,0.15);
        }
        .adm-detail-inner {
          padding: 20px 28px 24px;
          background: rgba(245,230,184,0.12);
          border-top: 1px solid rgba(201,168,76,0.15);
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px 32px;
        }
        .adm-detail-group {}
        .adm-detail-label {
          font-family: 'Cinzel', serif;
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(139,105,20,0.55);
          margin-bottom: 5px;
        }
        .adm-detail-value {
          font-size: 0.98rem;
          color: #3D2B0E;
          font-style: italic;
          line-height: 1.5;
        }
        .adm-detail-actions {
          display: flex;
          gap: 10px;
          align-items: center;
          grid-column: 1 / -1;
          padding-top: 12px;
          border-top: 1px solid rgba(201,168,76,0.15);
          margin-top: 4px;
        }
        .adm-delete-btn {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: #9B3A3A;
          background: rgba(155,58,58,0.06);
          border: 1px solid rgba(155,58,58,0.25);
          padding: 8px 18px;
          cursor: pointer;
          transition: all 0.22s;
        }
        .adm-delete-btn:hover {
          background: rgba(155,58,58,0.1);
          border-color: rgba(155,58,58,0.4);
        }

        /* Empty state */
        .adm-empty {
          padding: 72px 20px;
          text-align: center;
        }
        .adm-empty-icon {
          width: 52px; height: 52px;
          margin: 0 auto 20px;
          color: rgba(201,168,76,0.4);
        }
        .adm-empty-title {
          font-family: 'Great Vibes', cursive;
          font-size: 2rem;
          color: rgba(139,105,20,0.5);
          margin-bottom: 8px;
        }
        .adm-empty-sub {
          font-family: 'Cinzel', serif;
          font-size: 0.6rem;
          letter-spacing: 0.3em;
          color: rgba(139,105,20,0.35);
          text-transform: uppercase;
        }

        /* Mobile cards */
        .adm-cards { display: none; }

        @media (max-width: 768px) {
          .adm-stats { grid-template-columns: repeat(2,1fr); }
          .adm-table-wrap { display: none; }
          .adm-cards {
            display: flex;
            flex-direction: column;
            gap: 12px;
            max-width: 1200px;
            margin: 12px auto 0;
            padding: 0 16px 60px;
          }
          .adm-card {
            background: linear-gradient(160deg,#FEFCF5,#FAF3E0 60%,#FDF8ED);
            border: 1px solid rgba(201,168,76,0.28);
            outline: 1px solid rgba(201,168,76,0.1);
            outline-offset: -7px;
            padding: 20px;
            box-shadow: 0 4px 18px rgba(139,105,20,0.08);
            cursor: pointer;
          }
          .adm-card-top { display:flex;justify-content:space-between;align-items:flex-start;gap:10px;margin-bottom:12px; }
          .adm-card-meta { display:flex;justify-content:space-between;align-items:center;padding-top:12px;border-top:1px solid rgba(201,168,76,0.15); }
          .adm-card-detail {
            margin-top: 12px;
            padding-top: 12px;
            border-top: 1px solid rgba(201,168,76,0.15);
            display: flex;
            flex-direction: column;
            gap: 10px;
          }
          .adm-controls { padding: 0 16px; }
          .adm-stats { padding: 0 16px; }
          .adm-count-bar { padding: 0 16px; }
          .adm-header-inner { padding: 16px; }
        }
        @media (max-width: 480px) {
          .adm-stats { grid-template-columns: repeat(2,1fr); gap:10px; }
          .adm-stat-value { font-size: 2rem; }
          .adm-filter-group { flex-wrap: wrap; }
        }
      `}</style>

      <div className="adm-root">

        {/* ── Header ── */}
        <header className="adm-header">
          <div className="adm-header-inner">
            <div className="adm-brand">
              {/* <div className="adm-brand-title">Betty &amp; Athul</div> */}
              <div className="adm-brand-sub">RSVP Dashboard</div>
            </div>
            {rsvps.length > 0 && (
              <button className="adm-export-btn" onClick={exportCSV}>
                Export CSV ↓
              </button>   
            )}
            <button
        onClick={handleLogout}
        className="adm-export-btn"
      >
        Logout
      </button>
          </div>
        </header>

        {/* ── Stat Cards ── */}
        <div className="adm-stats">
  {[
    { value: stats.total, label: "Responses" },
    { value: stats.attending, label: "Attending" },
    { value: stats.declined, label: "Declined" },
    { value: stats.guests, label: "Total Guests" },
    { value: stats.meals.vegetarian, label: "Veg Meals" },
    { value: stats.meals.non_vegetarian, label: "Non-Veg Meals" },
    { value: stats.meals.vegan, label: "Vegan Meals" },
  ].map(({ value, label }) => (
    <div className="adm-stat" key={label}>
      <div className="adm-stat-value">{value}</div>
      <div className="adm-stat-divider" />
      <div className="adm-stat-label">{label}</div>
    </div>
  ))}
</div>

        {/* ── Controls ── */}
        <div className="adm-controls">
          <div className="adm-search-wrap">
            <svg className="adm-search-icon" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="adm-search"
              placeholder="Search by name, email or phone…"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
          <div className="adm-filter-group">
            {[["all","All"],["attending","Attending"],["declined","Declined"]].map(([val, label]) => (
              <button
                key={val}
                className={`adm-filter-btn ${filter === val ? "active" : ""}`}
                onClick={() => setFilter(val)}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Count bar */}
        <div className="adm-count-bar">
          <span className="adm-count-text">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</span>
          <div className="adm-count-line" />
        </div>

        {/* ── Desktop Table ── */}
        <div className="adm-table-wrap">
          <table className="adm-table">
            <thead className="adm-thead">
              <tr>
                <th>Guest</th>
                <th>Phone</th>
                <th>Status</th>
                <th>Guests</th>
                <th>Meal</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan="6">
                  <div className="adm-empty">
                    <svg className="adm-empty-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    <div className="adm-empty-title">No responses yet</div>
                    <div className="adm-empty-sub">RSVPs will appear here</div>
                  </div>
                </td></tr>
              ) : filtered.map(r => (
                <React.Fragment key={r.id}>
                  <tr
                    className={`adm-row ${expandedId === r.id ? "expanded" : ""}`}
                    onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}
                  >
                    <td className="adm-td">
                      <div className="adm-name">{r.name}</div>
                      {r.email && <div className="adm-email">{r.email}</div>}
                    </td>
                    <td className="adm-td" style={{fontSize:"0.92rem",color:"rgba(61,43,14,0.65)"}}>{r.phone || "—"}</td>
                    <td className="adm-td">
                      <span className={`adm-badge ${r.attendance === "joyfully_accepts" ? "yes" : "no"}`}>
                        {r.attendance === "joyfully_accepts" ? "✦ Attending" : "Declined"}
                      </span>
                    </td>
                    <td className="adm-td" style={{color:"rgba(61,43,14,0.7)"}}>
                      {r.attendance === "joyfully_accepts" ? r.guests : "—"}
                    </td>
                    <td className="adm-td" style={{fontSize:"0.9rem",color:"rgba(61,43,14,0.65)"}}>
                      {MEAL_LABELS[r.meal] || "—"}
                    </td>
                    <td className="adm-td" style={{textAlign:"right"}}>
                      <svg className={`adm-chevron ${expandedId === r.id ? "open" : ""}`} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <polyline points="6 9 12 15 18 9"/>
                      </svg>
                    </td>
                  </tr>

                  {expandedId === r.id && (
                    <tr key={`${r.id}-detail`} className="adm-detail-row">
                      <td colSpan="6">
                        <div className="adm-detail-inner">
                          {r.email && (
                            <div className="adm-detail-group">
                              <div className="adm-detail-label">Email</div>
                              <div className="adm-detail-value">{r.email}</div>
                            </div>
                          )}
                          {r.message && (
                            <div className="adm-detail-group" style={{gridColumn:"1/-1"}}>
                              <div className="adm-detail-label">Message</div>
                              <div className="adm-detail-value" style={{fontStyle:"italic",color:"rgba(61,43,14,0.75)"}}>{r.message}</div>
                            </div>
                          )}
                          <div className="adm-detail-actions">
                            <button className="adm-delete-btn" onClick={e => { e.stopPropagation(); deleteRSVP(r.id); }}>
                              Remove RSVP
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
               </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile Cards ── */}
        <div className="adm-cards">
          {filtered.length === 0 ? (
            <div style={{textAlign:"center",padding:"48px 20px"}}>
              <div className="adm-empty-title">No responses yet</div>
              <div className="adm-empty-sub" style={{marginTop:"8px"}}>RSVPs will appear here</div>
            </div>
          ) : filtered.map(r => (
            <div key={r.id} className="adm-card" onClick={() => setExpandedId(expandedId === r.id ? null : r.id)}>
              <div className="adm-card-top">
                <div>
                  <div className="adm-name">{r.name}</div>
                  {r.email && <div className="adm-email">{r.email}</div>}
                </div>
                <span className={`adm-badge ${r.attendance === "joyfully_accepts" ? "yes" : "no"}`}>
                  {r.attendance === "joyfully_accepts" ? "✦ Attending" : "Declined"}
                </span>
              </div>
              <div className="adm-card-meta">
                <span style={{fontSize:"0.85rem",color:"rgba(61,43,14,0.55)"}}>
                  {r.phone || "No phone"}
                </span>
                {r.attendance === "joyfully_accepts" && (
                  <span style={{fontFamily:"'Cinzel',serif",fontSize:"0.58rem",letterSpacing:"0.2em",color:"rgba(139,105,20,0.65)",textTransform:"uppercase"}}>
                    {r.guests} guest{r.guests > 1 ? "s" : ""}
                  </span>
                )}
              </div>
              {expandedId === r.id && (
                <div className="adm-card-detail" onClick={e => e.stopPropagation()}>
                  {r.meal && (
                    <div>
                      <div className="adm-detail-label">Meal Preference</div>
                      <div className="adm-detail-value">{MEAL_LABELS[r.meal] || r.meal}</div>
                    </div>
                  )}
                  {r.message && (
                    <div>
                      <div className="adm-detail-label">Message</div>
                      <div className="adm-detail-value" style={{fontStyle:"italic"}}>{r.message}</div>
                    </div>
                  )}
                  <button className="adm-delete-btn" style={{alignSelf:"flex-start"}} onClick={() => deleteRSVP(r.id)}>
                    Remove RSVP
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </>
  );
}