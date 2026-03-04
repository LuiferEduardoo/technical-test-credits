import { useState, useEffect } from 'react';
import { authUtils } from '../utils/auth';
import './Home.css';

interface Credit {
  id: number;
  clientName: string;
  identificationId: string;
  loanAmount: string;
  interestRate: string;
  termMonths: number;
}

interface CreditsResponse {
  success: boolean;
  data: {
    credits: Credit[];
    total: number;
  };
}

const Home = () => {
  const [credits, setCredits] = useState<Credit[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCredits();
  }, []);

  const fetchCredits = async () => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/credits`, {
        headers: authUtils.getAuthHeaders(),
      });

      if (!response.ok) {
        throw new Error('Error al obtener los créditos');
      }

      const data: CreditsResponse = await response.json();

      if (data.success && data.data.credits) {
        setCredits(data.data.credits);
      } else {
        throw new Error('No se pudieron cargar los créditos');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  const totalLoans = credits.reduce((sum, credit) => sum + parseFloat(credit.loanAmount), 0);
  const avgInterestRate = credits.length > 0
    ? credits.reduce((sum, credit) => sum + parseFloat(credit.interestRate), 0) / credits.length
    : 0;
  const avgTerm = credits.length > 0
    ? credits.reduce((sum, credit) => sum + credit.termMonths, 0) / credits.length
    : 0;

  if (loading) {
    return (
      <div className="homeContainer">
        <div className="loadingContainer">
          <div className="spinnerLarge"></div>
          <p className="loadingText">Cargando estadísticas...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="homeContainer">
        <div className="errorContainer">
          <p className="errorText">{error}</p>
          <button onClick={fetchCredits} className="retryButton">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="homeContainer">
      <div className="homeContent">
        <h1 className="homeTitle">Estadísticas de Créditos</h1>
        <p className="homeSubtitle">
          Resumen general del sistema de gestión de créditos
        </p>

        <div className="statsGrid">
          <div className="statCard">
            <div className="statIcon">📊</div>
            <div className="statInfo">
              <h3 className="statTitle">Total Créditos</h3>
              <p className="statValue">{credits.length}</p>
            </div>
          </div>

          <div className="statCard">
            <div className="statIcon">💰</div>
            <div className="statInfo">
              <h3 className="statTitle">Monto Total</h3>
              <p className="statValue">${totalLoans.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
          </div>

          <div className="statCard">
            <div className="statIcon">📈</div>
            <div className="statInfo">
              <h3 className="statTitle">Tasa Promedio</h3>
              <p className="statValue">{avgInterestRate.toFixed(2)}%</p>
            </div>
          </div>

          <div className="statCard">
            <div className="statIcon">📅</div>
            <div className="statInfo">
              <h3 className="statTitle">Plazo Promedio</h3>
              <p className="statValue">{avgTerm.toFixed(0)} meses</p>
            </div>
          </div>
        </div>

        <div className="infoSection">
          <h2 className="infoSectionTitle">Información del Sistema</h2>
          <div className="infoCards">
            <div className="infoCardHome">
              <h3 className="infoCardTitle">Gestión de Créditos</h3>
              <p className="infoCardText">
                Visualiza y gestiona todos los créditos del sistema mediante gráficos interactivos y tablas detalladas.
              </p>
            </div>

            <div className="infoCardHome">
              <h3 className="infoCardTitle">Análisis de Datos</h3>
              <p className="infoCardText">
                Accede a estadísticas en tiempo real sobre montos de préstamos, tasas de interés y plazos.
              </p>
            </div>

            <div className="infoCardHome">
              <h3 className="infoCardTitle">Detalle Completo</h3>
              <p className="infoCardText">
                Explora la sección de Créditos para ver gráficos detallados y tablas con información completa.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
