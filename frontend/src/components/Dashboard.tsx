import { useState } from 'react';
import Sidebar from './Sidebar';
import Home from './Home';
import Credits from './Credits';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Home />;
      case 'credits':
        return <Credits />;
      default:
        return <Home />;
    }
  };

  return (
    <div style={{ display: 'flex' }}>
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      {renderContent()}
    </div>
  );
};

export default Dashboard;
