import { useState, useCallback } from "react";
import "./App.css";
import "./index.css";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import MyPlan from "./pages/MyPlan";
import Claims from "./pages/Claims";
import RiskAssessment from "./pages/RiskAssessment";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  
  const [coverage, setCoverage] = useState(70);
  const [currentPlan, setCurrentPlan] = useState(null); 
  const [previousPlan, setPreviousPlan] = useState({
    activationDate: "10 Mar 2026",
    expiryDate: "17 Mar 2026",
    status: "Completed"
  });
  
  const [claims, setClaims] = useState([
    {
      id: 2,
      title: "Warehouse Failure",
      date: "15 Mar 2026",
      lostHours: 4,
      payout: 280,
      status: "Paid",
    }
  ]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  const handleLogin = (user, pass) => {
    if (user === "user1" && pass === "user") {
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setActiveTab("dashboard");
  };

  const activatePlan = () => {
    const today = new Date();
    const expiry = new Date();
    expiry.setDate(today.getDate() + 7);
    
    const options = { day: '2-digit', month: 'short', year: 'numeric' };
    
    setCurrentPlan({
      activationDate: today.toLocaleDateString('en-GB', options),
      expiryDate: expiry.toLocaleDateString('en-GB', options),
      status: "Active"
    });
  };

  const processPayout = useCallback((amount, reason) => {
    setCurrentPlan(prev => prev ? { ...prev, status: "Claimed" } : prev);
    
    const today = new Date();
    const newClaim = {
      id: Date.now(),
      title: reason,
      date: today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      lostHours: 5, 
      payout: amount,
      status: "Paid",
    };
    
    setClaims(prev => [newClaim, ...prev]);
    setUnreadNotifications(prev => prev + 1);
  }, []);

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === "claims") {
      setUnreadNotifications(0); 
    }
  };

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return (
          <Dashboard 
            coverage={coverage} 
            currentPlan={currentPlan}
            previousPlan={previousPlan}
            activatePlan={activatePlan}
            processPayout={processPayout}
          />
        );
      case "myplan":
        return <MyPlan coverage={coverage} setCoverage={setCoverage} currentPlan={currentPlan} activatePlan={activatePlan} />;
      case "claims":
        return <Claims claims={claims} />;
      case "risk":
        return <RiskAssessment />;
      default:
        return <Dashboard coverage={coverage} currentPlan={currentPlan} previousPlan={previousPlan} activatePlan={activatePlan} processPayout={processPayout}/>;
    }
  };

  return (
    <div className="app-container">
      <Navbar activeTab={activeTab} setActiveTab={handleTabChange} onLogout={handleLogout} unreadNotifications={unreadNotifications} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;