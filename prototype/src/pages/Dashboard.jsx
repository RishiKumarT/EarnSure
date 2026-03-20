import { useState, useEffect, useRef } from "react";
import { ShieldCheck, IndianRupee, Zap, Activity, Calendar, ServerCrash, AlertTriangle, CloudRain } from "lucide-react";

// trigger rainfall
const LIVE_RAINFALL = 10; 
const TRIGGER_THRESHOLD = 50;

export default function Dashboard({ coverage, currentPlan, previousPlan, activatePlan, processPayout }) {
  const weeklyPremium = coverage === 50 ? 20 : coverage === 70 ? 30 : 50;
  const maxPayout = coverage === 50 ? 500 : coverage === 70 ? 850 : 1200;

  const [simStatus, setSimStatus] = useState("Waiting"); 
  const timerRef = useRef(null);

  useEffect(() => {
    if (currentPlan?.status === "Claimed") {
      setSimStatus("Waiting");
      if (timerRef.current) clearTimeout(timerRef.current);
      return;
    }

    if (LIVE_RAINFALL >= TRIGGER_THRESHOLD) {
      if (simStatus === "Waiting") {
        setSimStatus("Rainfall Detected");
        
        setTimeout(() => {
          setSimStatus(prev => prev === "Rainfall Detected" ? "Monitoring" : prev);
        }, 800);
        
        timerRef.current = setTimeout(() => {
          setSimStatus("Payout Triggered");
          processPayout(maxPayout, "Rain Disruption");
        }, 4000);
      }
    } else {
      if (simStatus !== "Waiting") {
        setSimStatus("Waiting");
        if (timerRef.current) clearTimeout(timerRef.current);
      }
    }
  }, [LIVE_RAINFALL, TRIGGER_THRESHOLD, currentPlan, simStatus, maxPayout, processPayout]);

  return (
    <div>
      <div className="hero-card glass-panel" style={{ borderRadius: "20px" }}>
        <h2 style={{ fontSize: "2rem", display: "flex", alignItems: "center", gap: "10px" }}>
          You are Protected <ShieldCheck className="text-success" size={32} />
        </h2>
        
        <div className="hero-stats">
          <div className="hero-stat-item">
            <span className="text-muted">Coverage</span>
            <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>{coverage}%</span>
          </div>
          <div className="hero-stat-item">
            <span className="text-muted">Weekly Premium</span>
            <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>₹{weeklyPremium}</span>
          </div>
          <div className="hero-stat-item">
            <span className="text-muted">Active Zone</span>
            <span className="text-gradient" style={{ fontSize: "1.25rem", fontWeight: "600" }}>Auto-detected</span>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card glass-panel">
          <IndianRupee className="stat-icon" size={28} />
          <span className="text-muted">Earnings Protected This Week</span>
          <span style={{ fontSize: "2rem", fontWeight: "700" }}>₹850</span>
        </div>
        
        <div className="stat-card glass-panel">
          <Zap className="stat-icon text-warning" size={28} />
          <span className="text-muted">Disruptions Detected</span>
          <span style={{ fontSize: "2rem", fontWeight: "700" }}>2</span>
        </div>

        <div className="stat-card glass-panel">
          <Activity className="stat-icon text-danger" size={28} />
          <span className="text-muted">Risk Level</span>
          <span style={{ fontSize: "2rem", fontWeight: "700", display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Medium <span style={{ fontSize: "1.5rem" }}>⚠️</span>
          </span>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: "1.5rem", marginBottom: "2rem" }}>
        <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
           <CloudRain className="text-primary" size={24} /> 
           Live Weather Monitoring
        </h3>

        <div style={{ display: "flex", gap: "2rem", marginBottom: "1rem" }}>
           <div>
             <span className="text-muted">Current Rainfall:</span> <span className="text-main" style={{ fontWeight: "600" }}>{LIVE_RAINFALL} mm/hr</span>
           </div>
           <div>
             <span className="text-muted">Threshold Trigger:</span> <span className="text-main" style={{ fontWeight: "600" }}>{TRIGGER_THRESHOLD} mm/hr</span>
           </div>
        </div>

        <div className={`sim-status ${simStatus.toLowerCase().replace(' ', '-')}`}>
          <div>Status: <span style={{ marginLeft: "0.5rem" }}>{simStatus}</span></div>
          {simStatus === "Waiting" && <span className="text-muted">Monitoring conditions...</span>}
          {simStatus === "Rainfall Detected" && <span className="text-warning">Threshold breached!</span>}
          {simStatus === "Monitoring" && <span className="text-warning">Validating duration (4s)...</span>}
          {simStatus === "Payout Triggered" && <span className="text-success">Payout Executed!</span>}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="glass-panel plan-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <ShieldCheck className="text-success" /> Current Plan
          </h3>
          {currentPlan ? (
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              <div className="flex-between">
                <span className="text-muted">Activation Date</span>
                <span style={{ fontWeight: "500" }}>{currentPlan.activationDate}</span>
              </div>
              <div className="flex-between">
                <span className="text-muted">Expiry Date</span>
                <span style={{ fontWeight: "500" }}>{currentPlan.expiryDate}</span>
              </div>
              <div className="flex-between">
                <span className="text-muted">Duration</span>
                <span style={{ fontWeight: "500" }}>7 Days (Weekly)</span>
              </div>
              <div className="flex-between">
                <span className="text-muted">Status</span>
                <span className={currentPlan.status === "Claimed" ? "text-warning" : "text-success"} style={{ fontWeight: "600" }}>
                  {currentPlan.status}
                </span>
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "1rem 0" }}>
              <p className="text-muted" style={{ marginBottom: "1rem" }}>No active plan currently.</p>
              <button className="btn btn-primary" onClick={activatePlan}>Activate Plan</button>
            </div>
          )}
        </div>

        <div className="glass-panel plan-card" style={{ padding: "1.5rem" }}>
          <h3 style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "1rem" }}>
            <Calendar className="text-primary" /> Previous Plan History
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
            <div className="flex-between">
              <span className="text-muted">Activation Date</span>
              <span style={{ fontWeight: "500" }}>{previousPlan.activationDate}</span>
            </div>
            <div className="flex-between">
              <span className="text-muted">Expiry Date</span>
              <span style={{ fontWeight: "500" }}>{previousPlan.expiryDate}</span>
            </div>
            <div className="flex-between">
              <span className="text-muted">Status</span>
              <span className="text-muted" style={{ fontWeight: "600" }}>{previousPlan.status}</span>
            </div>
          </div>
        </div>
      </div>

      <h3 style={{ marginBottom: "1rem", color: "var(--text-muted)" }}>Coverage Comparison</h3>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>
        <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: currentPlan ? "4px solid var(--accent-success)" : "4px solid var(--border-glass)" }}>
          <h4 style={{ color: "var(--accent-success)", marginBottom: "1rem" }}>If Plan is Active</h4>
          <span className="text-muted">Maximum Coverage Amount</span>
          <div style={{ fontSize: "2rem", fontWeight: "700", marginTop: "0.5rem" }}>₹{maxPayout}</div>
          <div className="text-muted" style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>Full protection against specified disruptions.</div>
        </div>
        
        <div className="glass-panel" style={{ padding: "1.5rem", borderLeft: !currentPlan ? "4px solid var(--accent-danger)" : "4px solid var(--border-glass)" }}>
          <h4 style={{ color: "var(--accent-danger)", marginBottom: "1rem" }}>If No Plan Selected</h4>
          <span className="text-muted">Coverage Amount</span>
          <div style={{ fontSize: "2rem", fontWeight: "700", marginTop: "0.5rem", color: "var(--accent-danger)" }}>₹0</div>
          <div className="text-muted" style={{ fontSize: "0.9rem", marginTop: "0.5rem" }}>No protection. You bear all disruption costs.</div>
        </div>
      </div>
    </div>
  );
}
