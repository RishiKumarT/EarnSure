import { AlertTriangle, MapPin, CloudRain, CarFront, Lightbulb, Activity } from "lucide-react";

export default function RiskAssessment() {
  return (
    <div>
      <h2 style={{ fontSize: "1.75rem", marginBottom: "2rem", display: "flex", alignItems: "center", gap: "10px" }}>
        <Activity className="text-primary" /> Risk Intelligence
      </h2>

      <div className="risk-grid">
        <div className="glass-panel risk-card">
          <h3 className="text-muted" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <Activity size={20} /> Current Risk Profile
          </h3>
          
          <div className="risk-score text-warning">
            Medium ⚠️
          </div>
          
          <div className="text-muted" style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontSize: "1.1rem" }}>
            <MapPin size={18} className="text-primary" /> Active Zone: <span className="text-main" style={{ color: "var(--text-main)", fontWeight: "500" }}>Vijayawada</span>
          </div>
        </div>

        <div className="glass-panel risk-card">
          <h3 className="text-muted" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <AlertTriangle size={20} /> Upcoming Risks
          </h3>
          
          <div className="risk-items">
            <div className="risk-item">
              <CloudRain className="text-danger" size={24} />
              <div>
                <div style={{ fontWeight: "600" }}>Rain Tomorrow</div>
                <div className="text-muted" style={{ fontSize: "0.9rem" }}>High risk of disruption detected</div>
              </div>
            </div>
            
            <div className="risk-item">
              <CarFront className="text-warning" size={24} />
              <div>
                <div style={{ fontWeight: "600" }}>Traffic Congestion</div>
                <div className="text-muted" style={{ fontSize: "0.9rem" }}>Minor delays expected in your route</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="glass-panel risk-card" style={{ marginTop: "2rem" }}>
        <h3 className="text-muted" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <Lightbulb size={20} className="text-warning" /> AI Recommendations
        </h3>
        
        <ul className="rec-list">
          <li>
            <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "0.5rem", borderRadius: "50%" }}>💡</div>
            <div>
              <div style={{ fontWeight: "500" }}>Consider upgrading coverage this week</div>
              <div className="text-muted" style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>Based on the high probability of rain, increased coverage is recommended to maximize earning protection.</div>
            </div>
          </li>
          <li>
            <div style={{ background: "rgba(255, 255, 255, 0.05)", padding: "0.5rem", borderRadius: "50%" }}>⚠️</div>
            <div>
              <div style={{ fontWeight: "500" }}>High disruption probability detected</div>
              <div className="text-muted" style={{ fontSize: "0.9rem", marginTop: "0.25rem" }}>Our weather patterns indicate severe showers around 4:00 PM. Plan your shifts accordingly.</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
}
