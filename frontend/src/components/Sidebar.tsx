import { NavLink, useNavigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';
import './Sidebar.css';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar = ({ activeTab, onTabChange }: SidebarProps) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authUtils.removeToken();
    navigate('/');
  };

  const menuItems = [
    { id: 'home', label: 'Inicio', icon: '🏠' },
    { id: 'credits', label: 'Créditos', icon: '💳' }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebarHeader">
        <h2 className="sidebarTitle">Dashboard</h2>
      </div>

      <nav className="sidebarNav">
        <ul className="sidebarMenu">
          {menuItems.map((item) => (
            <li key={item.id} className="sidebarMenuItem">
              <button
                onClick={() => onTabChange(item.id)}
                className={`sidebarButton ${activeTab === item.id ? 'active' : ''}`}
              >
                <span className="sidebarIcon">{item.icon}</span>
                <span className="sidebarLabel">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebarFooter">
        <button onClick={handleLogout} className="logoutButtonSidebar">
          <span className="sidebarIcon">🚪</span>
          <span className="sidebarLabel">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
