import { useState } from "react";
import { Shield, Sparkles, RefreshCw, ChevronLeft } from "lucide-react";

export default function MyPlan({ coverage, setCoverage, currentPlan, activatePlan }) {
  const [isUpgrading, setIsUpgrading] = useState(false);

  const getPremium = (pct) => {
    if (pct === 50) return 20;
    if (pct === 70) return 30;
    if (pct === 90) return 50;
    return 30;
  };

  const handleSliderChange = (e) => {
    const val = parseInt(e.target.value);
    setCoverage(val);
  };

  const handleConfirmUpgrade = () => {
    setIsUpgrading(false);
  };

  return (
    <div className="plan-container">
      <h2 style={{ fontSize: "1.75rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "10px" }}>
        <Shield className="text-primary" /> Plan Hub
      </h2>

      {currentPlan ? (
        <>
          <div className="glass-panel plan-card">
            <div className="plan-row">
              <span className="text-muted">Coverage Level</span>
              <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>{coverage}%</span>
            </div>
            <div className="plan-row">
              <span className="text-muted">Weekly Premium</span>
              <span className="text-gradient" style={{ fontSize: "1.25rem", fontWeight: "700" }}>
                ₹{getPremium(coverage)}
              </span>
            </div>
            <div className="plan-row">
              <span className="text-muted">Plan Status</span>
              {currentPlan.status === "Claimed" ? (
                <span className="text-warning" style={{ fontSize: "1.1rem", fontWeight: "600", display: "flex", gap: "0.25rem", alignItems: "center" }}>
                  Claimed 
                </span>
              ) : (
                <span className="text-success" style={{ fontSize: "1.1rem", fontWeight: "600", display: "flex", gap: "0.25rem", alignItems: "center" }}>
                  Active 
                </span>
              )}
            </div>
            <div className="plan-row">
              <span className="text-muted">Activation Date</span>
              <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>{currentPlan.activationDate}</span>
            </div>
            <div className="plan-row">
              <span className="text-muted">Expiration Date</span>
              <span style={{ fontSize: "1.1rem", fontWeight: "500" }}>{currentPlan.expiryDate}</span>
            </div>
          </div>

          <div className="glass-panel plan-card">
            {!isUpgrading ? (
              <div>
                <h3 style={{ marginBottom: "1rem" }}>Manage Plan</h3>
                <p className="text-muted" style={{ marginBottom: "1.5rem" }}>
                  Your plan is active. You can enable auto-renew or upgrade your coverage.
                </p>
                <div className="flex-center" style={{ gap: "1rem" }}>
                  <button className="btn btn-primary" onClick={() => setIsUpgrading(true)} style={{ flex: 1, justifyContent: "center" }}>
                    <Sparkles size={18} /> Upgrade Plan
                  </button>
                  <button className="btn" style={{ flex: 1, justifyContent: "center" }}>
                    <RefreshCw size={18} /> Auto-Renew ON
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 style={{ marginBottom: "1rem" }}>Upgrade Coverage</h3>
                <p className="text-muted">Modify your coverage level to increase or decrease your weekly premium cost.</p>

                <div className="slider-container">
                  <input
                    type="range"
                    min="50"
                    max="90"
                    step="20"
                    value={coverage}
                    onChange={handleSliderChange}
                    className="slider"
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", color: "var(--text-muted)" }}>
                    <span style={{ fontWeight: coverage === 50 ? "bold" : "normal", color: coverage === 50 ? "var(--text-main)" : "" }}>50%</span>
                    <span style={{ fontWeight: coverage === 70 ? "bold" : "normal", color: coverage === 70 ? "var(--text-main)" : "" }}>70%</span>
                    <span style={{ fontWeight: coverage === 90 ? "bold" : "normal", color: coverage === 90 ? "var(--text-main)" : "" }}>90%</span>
                  </div>
                </div>

                <div className="flex-center" style={{ gap: "1rem", marginTop: "2rem" }}>
                  <button className="btn btn-primary" onClick={handleConfirmUpgrade} style={{ flex: 1, justifyContent: "center" }}>
                    <Sparkles size={18} /> Confirm Upgrade
                  </button>
                  <button className="btn" onClick={() => setIsUpgrading(false)} style={{ flex: 1, justifyContent: "center" }}>
                    <ChevronLeft size={18} /> Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="glass-panel plan-card">
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <Shield size={48} className="text-muted" style={{ marginBottom: "1rem" }} />
            <h3>No Active Plan</h3>
            <p className="text-muted" style={{ marginBottom: "1.5rem", textAlign: "center" }}>
              Select your desired coverage level and activate your plan.
            </p>
          </div>

          <div className="slider-container text-center">
            <h4 style={{ marginBottom: '1rem', color: "var(--text-main)" }}>Adjust Coverage</h4>
            <input
              type="range"
              min="50"
              max="90"
              step="20"
              value={coverage}
              onChange={handleSliderChange}
              className="slider"
            />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", color: "var(--text-muted)" }}>
              <span style={{ fontWeight: coverage === 50 ? "bold" : "normal", color: coverage === 50 ? "var(--text-main)" : "" }}>50%</span>
              <span style={{ fontWeight: coverage === 70 ? "bold" : "normal", color: coverage === 70 ? "var(--text-main)" : "" }}>70%</span>
              <span style={{ fontWeight: coverage === 90 ? "bold" : "normal", color: coverage === 90 ? "var(--text-main)" : "" }}>90%</span>
            </div>
            <div style={{ marginTop: "1rem", textAlign: "center", fontSize: "1.2rem", fontWeight: "600", color: "var(--accent-primary)" }}>
              Premium: ₹{getPremium(coverage)}
            </div>
          </div>

          <div className="flex-center" style={{ gap: "1rem", marginTop: "2rem" }}>
            <button className="btn btn-primary" onClick={activatePlan} style={{ width: "100%", justifyContent: "center" }}>
              Activate Weekly Plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
