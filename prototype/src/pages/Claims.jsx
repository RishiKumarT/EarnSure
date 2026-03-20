import { History, CloudRain, Zap, CheckCircle } from "lucide-react";

export default function Claims({ claims }) {
  const getIcon = (title) => {
    if (title.toLowerCase().includes("rain")) {
      return <CloudRain className="text-primary" size={24} />;
    }
    return <Zap className="text-warning" size={24} />;
  };

  return (
    <div style={{ maxWidth: "800px", margin: "0 auto" }}>
      <h2 style={{ fontSize: "1.75rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "10px" }}>
        <History className="text-primary" /> Past Payouts
      </h2>

      <div className="claims-list">
        {claims.length === 0 ? (
          <div className="glass-panel claim-item text-muted" style={{ justifyContent: "center" }}>
            No claims history available.
          </div>
        ) : (
          claims.map((claim) => (
            <div key={claim.id} className="glass-panel claim-item">
              <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
                <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "1rem", borderRadius: "12px" }}>
                  {getIcon(claim.title)}
                </div>
                <div className="claim-info">
                  <span style={{ fontSize: "1.25rem", fontWeight: "600" }}>{claim.title}</span>
                  <span className="text-muted" style={{ display: "flex", gap: "1rem" }}>
                    <span>Date: {claim.date}</span>
                    <span>Lost Hours: {claim.lostHours}</span>
                  </span>
                </div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "0.5rem" }}>
                <span className="claim-amount">₹{claim.payout}</span>
                <span className="text-success" style={{ display: "flex", alignItems: "center", gap: "0.25rem", fontWeight: "500" }}>
                  <CheckCircle size={16} /> {claim.status}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
