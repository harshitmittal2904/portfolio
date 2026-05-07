import { useState } from "react";
import SimulatedMap from "./SimulatedMap";

const RIDE_OPTIONS = [
  { type: "Bike", price: 74, icon: "🏍️", eta: "3 min" },
  { type: "Auto", price: 110, icon: "🛺", eta: "5 min" },
  { type: "Mini Cab", price: 182, icon: "🚗", eta: "7 min" },
];

function MobilePrototype() {
  const [screen, setScreen] = useState("home");
  const [selectedRide, setSelectedRide] = useState(0);
  const [showModal, setShowModal] = useState(false);

  const handleBook = () => {
    setScreen("loading");
    setTimeout(() => setScreen("assigned"), 2200);
  };
  const handleCancel = () => { setScreen("home"); setSelectedRide(0); setShowModal(false); };
  const ride = RIDE_OPTIONS[selectedRide];

  return (
    <div style={{ width: 280, maxWidth: "90vw", height: 560, borderRadius: 32, overflow: "hidden", background: "#111", position: "relative", boxShadow: "0 25px 80px rgba(0,0,0,0.5), 0 0 0 2px rgba(255,255,255,0.08)", flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 100, height: 22, background: "#111", borderRadius: "0 0 16px 16px", zIndex: 50 }} />
      <div style={{ height: 40, background: "#111", display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "0 20px 4px", fontSize: 10, color: "#fff", fontWeight: 600 }}>
        <span>8:45</span><span style={{ fontSize: 9, letterSpacing: 1 }}>●●●</span>
      </div>
      <div style={{ height: "calc(100% - 40px)", overflow: "hidden", position: "relative" }}>

        {/* HOME */}
        {screen === "home" && (
          <div style={{ height: "100%", background: "linear-gradient(180deg, #1a1a1a, #0d0d0d)", padding: 16, display: "flex", flexDirection: "column", gap: 12, animation: "fadeIn 0.3s ease" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ color: "#FFD400", fontWeight: 800, fontSize: 16, letterSpacing: -0.5 }}>RAPIDO</div>
                <div style={{ color: "#888", fontSize: 9, marginTop: 1 }}>📍 Home • Sector 56, Gurgaon</div>
              </div>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#FFD400", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>H</div>
            </div>
            <div style={{ background: "#1e1e1e", borderRadius: 16, padding: 16, border: "1px solid rgba(255,212,0,0.15)", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 3, background: "linear-gradient(90deg, #FFD400, #FF8C00)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                <span style={{ background: "rgba(255,212,0,0.15)", color: "#FFD400", fontSize: 8, fontWeight: 700, padding: "2px 6px", borderRadius: 4, letterSpacing: 0.5 }}>SMART PREDICTION</span>
                <span style={{ color: "#666", fontSize: 8 }}>95% match</span>
              </div>
              <div style={{ color: "#fff", fontWeight: 700, fontSize: 14, marginBottom: 2 }}>🚇 Huda City Centre Metro</div>
              <div style={{ color: "#aaa", fontSize: 10, marginBottom: 12 }}>{ride.eta} away • {ride.icon} {ride.type} (Preferred)</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <div style={{ color: "#FFD400", fontSize: 22, fontWeight: 800 }}>₹{ride.price}</div>
                <div style={{ color: "#666", fontSize: 9, background: "rgba(255,255,255,0.05)", padding: "3px 8px", borderRadius: 8 }}>💰 Lowest today</div>
              </div>
              <button onClick={handleBook} style={{ width: "100%", padding: "12px 0", background: "#FFD400", color: "#111", fontWeight: 800, fontSize: 13, border: "none", borderRadius: 12, cursor: "pointer", transition: "transform 0.1s" }} onMouseDown={e => e.currentTarget.style.transform = "scale(0.97)"} onMouseUp={e => e.currentTarget.style.transform = "scale(1)"}>Book Ride →</button>
              <div onClick={() => setShowModal(true)} style={{ textAlign: "center", color: "#888", fontSize: 10, marginTop: 8, cursor: "pointer", textDecoration: "underline", textUnderlineOffset: 2 }}>See other ride options</div>
            </div>
            <div style={{ background: "#1e1e1e", borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 8, border: "1px solid rgba(255,255,255,0.06)" }}>
              <span style={{ color: "#666", fontSize: 12 }}>🔍</span>
              <span style={{ color: "#555", fontSize: 11 }}>Where to?</span>
            </div>
            <div style={{ color: "#555", fontSize: 9, fontWeight: 600, marginTop: 4, letterSpacing: 0.5 }}>RECENT</div>
            {["Cyber Hub, DLF Phase 2", "MG Road Metro Station"].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
                <span style={{ color: "#555", fontSize: 10 }}>⏱️</span>
                <span style={{ color: "#aaa", fontSize: 10 }}>{p}</span>
              </div>
            ))}
            {showModal && (
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "#1a1a1a", borderRadius: "20px 20px 0 0", padding: 20, border: "1px solid rgba(255,255,255,0.08)", animation: "slideUp 0.25s ease", zIndex: 10 }}>
                <div style={{ width: 32, height: 3, background: "#444", borderRadius: 2, margin: "0 auto 14px" }} />
                <div style={{ color: "#fff", fontWeight: 700, fontSize: 13, marginBottom: 12 }}>Choose ride type</div>
                {RIDE_OPTIONS.map((r, i) => (
                  <div key={i} onClick={() => { setSelectedRide(i); setShowModal(false); }} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 12px", borderRadius: 12, marginBottom: 6, cursor: "pointer", background: selectedRide === i ? "rgba(255,212,0,0.1)" : "rgba(255,255,255,0.03)", border: selectedRide === i ? "1px solid rgba(255,212,0,0.3)" : "1px solid transparent", transition: "all 0.15s" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ fontSize: 18 }}>{r.icon}</span>
                      <div><div style={{ color: "#fff", fontWeight: 600, fontSize: 12 }}>{r.type}</div><div style={{ color: "#888", fontSize: 9 }}>{r.eta}</div></div>
                    </div>
                    <div style={{ color: "#FFD400", fontWeight: 800, fontSize: 14 }}>₹{r.price}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* LOADING WITH MAP */}
        {screen === "loading" && (
          <div style={{ height: "100%", background: "#111", display: "flex", flexDirection: "column", animation: "fadeIn 0.3s ease" }}>
            <div style={{ flex: 1, position: "relative", background: "#0d0d0d" }}>
              <SimulatedMap driverMoving={false} />
              <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "rgba(0,0,0,0.35)", gap: 10 }}>
                <div style={{ width: 40, height: 40, border: "3px solid #333", borderTopColor: "#FFD400", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
                <div style={{ color: "#fff", fontWeight: 600, fontSize: 12 }}>Finding your ride...</div>
              </div>
            </div>
            <div style={{ padding: "14px 16px", background: "#1a1a1a", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div>
                  <div style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>🚇 Huda City Centre Metro</div>
                  <div style={{ color: "#888", fontSize: 9, marginTop: 2 }}>{ride.icon} {ride.type} • {ride.eta}</div>
                </div>
                <div style={{ color: "#FFD400", fontWeight: 800, fontSize: 16 }}>₹{ride.price}</div>
              </div>
            </div>
          </div>
        )}

        {/* DRIVER ASSIGNED WITH MAP */}
        {screen === "assigned" && (
          <div style={{ height: "100%", background: "#111", display: "flex", flexDirection: "column", animation: "fadeIn 0.4s ease" }}>
            <div style={{ flex: 1, position: "relative", background: "#0d0d0d" }}>
              <SimulatedMap driverMoving={true} />
              <div style={{ position: "absolute", top: 10, left: "50%", transform: "translateX(-50%)", background: "rgba(0,0,0,0.7)", backdropFilter: "blur(8px)", padding: "5px 14px", borderRadius: 20, border: "1px solid rgba(255,212,0,0.2)" }}>
                <span style={{ color: "#FFD400", fontSize: 10, fontWeight: 700 }}>Driver arriving in 2 min</span>
              </div>
            </div>
            <div style={{ padding: "14px 16px", background: "#1a1a1a", borderTop: "1px solid rgba(255,212,0,0.1)" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#FFD400", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700 }}>R</div>
                  <div>
                    <div style={{ color: "#fff", fontWeight: 700, fontSize: 12 }}>Rajesh K.</div>
                    <div style={{ color: "#888", fontSize: 9 }}>⭐ 4.8 • DL 4S AB 1234</div>
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ color: "#FFD400", fontWeight: 800, fontSize: 15 }}>₹{ride.price}</div>
                  <div style={{ color: "#888", fontSize: 8 }}>{ride.icon} {ride.type}</div>
                </div>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={handleCancel} style={{ flex: 1, padding: "9px 0", background: "transparent", color: "#ff4444", border: "1px solid rgba(255,68,68,0.25)", borderRadius: 10, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>Cancel</button>
                <button style={{ flex: 2, padding: "9px 0", background: "rgba(255,255,255,0.06)", color: "#fff", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, fontSize: 10, fontWeight: 600, cursor: "pointer" }}>📞 Call Driver</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MobilePrototype;
