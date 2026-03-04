import { useNavigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    authUtils.removeToken();
    navigate('/');
  };

  return (
    <div className="dashboardContainer">
      <nav className="dashboardNavbar">
        <div className="navbarContent">
          <h1 className="navbarTitle">Dashboard</h1>
          <button onClick={handleLogout} className="logoutButton">
            Cerrar Sesión
          </button>
        </div>
      </nav>

      <main className="dashboardMain">
        <div className="dashboardContent">
          <h2 className="welcomeTitle">Bienvenido al Dashboard</h2>
          <p className="welcomeText">
            Has iniciado sesión exitosamente. Este es un área protegida que solo es accesible con un token válido.
          </p>

          <div className="infoCards">
            <div className="infoCard">
              <h3 className="cardTitle">Estado de Autenticación</h3>
              <p className="cardText">Autenticado</p>
            </div>

            <div className="infoCard">
              <h3 className="cardTitle">Token</h3>
              <p className="cardText">
                {authUtils.getToken()?.substring(0, 20)}...
              </p>
            </div>

            <div className="infoCard">
              <h3 className="cardTitle">Rol</h3>
              <p className="cardText">Usuario</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
