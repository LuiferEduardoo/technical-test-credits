import { useState, useEffect } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line
} from 'recharts';
import { authUtils } from '../utils/auth';
import './Credits.css';

interface Credit {
  id: number;
  clientName: string;
  identificationId: string;
  loanAmount: string;
  interestRate: string;
  termMonths: number;
  userId: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}

interface CreditsResponse {
  success: boolean;
  data: {
    credits: Credit[];
    total: number;
  };
}

const COLORS = ['#667eea', '#764ba2', '#f59e0b', '#10b981', '#ef4444', '#8b5cf6', '#ec4899', '#14b8a6', '#f97316', '#06b6d4'];

const Credits = () => {
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

  // Prepare data for charts
  const loanAmountsData = credits.map((credit) => ({
    name: credit.clientName.split(' ')[0],
    monto: parseFloat(credit.loanAmount),
    plazo: credit.termMonths,
  }));

  const termDistribution = credits.reduce((acc, credit) => {
    const range = credit.termMonths <= 12 ? '0-12 meses' :
                  credit.termMonths <= 24 ? '13-24 meses' :
                  credit.termMonths <= 36 ? '25-36 meses' : '+36 meses';
    const existing = acc.find(item => item.name === range);
    if (existing) {
      existing.value += 1;
    } else {
      acc.push({ name: range, value: 1 });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  const interestRateData = credits.map((credit) => ({
    name: credit.clientName.split(' ')[0],
    tasa: parseFloat(credit.interestRate),
    monto: parseFloat(credit.loanAmount),
  }));

  const totalLoans = credits.reduce((sum, credit) => sum + parseFloat(credit.loanAmount), 0);
  const avgInterestRate = credits.length > 0
    ? credits.reduce((sum, credit) => sum + parseFloat(credit.interestRate), 0) / credits.length
    : 0;
  const avgTerm = credits.length > 0
    ? credits.reduce((sum, credit) => sum + credit.termMonths, 0) / credits.length
    : 0;

  if (loading) {
    return (
      <div className="creditsContainer">
        <div className="loadingContainer">
          <div className="spinnerLarge"></div>
          <p className="loadingText">Cargando créditos...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="creditsContainer">
        <div className="errorContainer">
          <p className="errorText">{error}</p>
          <button onClick={fetchCredits} className="retryButton">Reintentar</button>
        </div>
      </div>
    );
  }

  return (
    <div className="creditsContainer">
      <div className="creditsContent">
        <h1 className="creditsTitle">Gestión de Créditos</h1>
        <p className="creditsSubtitle">Visualización y análisis de créditos</p>

        {/* Summary Cards */}
        <div className="summaryCards">
          <div className="summaryCard">
            <div className="summaryIcon">📊</div>
            <div className="summaryInfo">
              <h3 className="summaryTitle">Total Créditos</h3>
              <p className="summaryValue">{credits.length}</p>
            </div>
          </div>

          <div className="summaryCard">
            <div className="summaryIcon">💰</div>
            <div className="summaryInfo">
              <h3 className="summaryTitle">Monto Total</h3>
              <p className="summaryValue">${totalLoans.toLocaleString('es-CO', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}</p>
            </div>
          </div>

          <div className="summaryCard">
            <div className="summaryIcon">📈</div>
            <div className="summaryInfo">
              <h3 className="summaryTitle">Tasa Promedio</h3>
              <p className="summaryValue">{avgInterestRate.toFixed(2)}%</p>
            </div>
          </div>

          <div className="summaryCard">
            <div className="summaryIcon">📅</div>
            <div className="summaryInfo">
              <h3 className="summaryTitle">Plazo Promedio</h3>
              <p className="summaryValue">{avgTerm.toFixed(0)} meses</p>
            </div>
          </div>
        </div>

        {/* Charts Grid */}
        <div className="chartsGrid">
          {/* Bar Chart - Loan Amounts */}
          <div className="chartCard">
            <h3 className="chartTitle">Montos de Préstamos por Cliente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={loanAmountsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => `$${Number(value).toLocaleString('es-CO')}`} />
                <Legend />
                <Bar dataKey="monto" fill="#667eea" name="Monto del Préstamo" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart - Term Distribution */}
          <div className="chartCard">
            <h3 className="chartTitle">Distribución por Plazos</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={termDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {termDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart - Interest Rates */}
          <div className="chartCard full">
            <h3 className="chartTitle">Tasas de Interés por Cliente</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={interestRateData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={100} />
                <YAxis />
                <Tooltip formatter={(value) => `${value}%`} />
                <Legend />
                <Line type="monotone" dataKey="tasa" stroke="#764ba2" name="Tasa de Interés" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Credits Table */}
        <div className="tableCard">
          <h3 className="tableTitle">Detalle de Créditos</h3>
          <div className="tableContainer">
            <table className="creditsTable">
              <thead>
                <tr>
                  <th>Cliente</th>
                  <th>Identificación</th>
                  <th>Monto</th>
                  <th>Tasa de Interés</th>
                  <th>Plazo</th>
                </tr>
              </thead>
              <tbody>
                {credits.map((credit) => (
                  <tr key={credit.id}>
                    <td>{credit.clientName}</td>
                    <td>{credit.identificationId}</td>
                    <td>${parseFloat(credit.loanAmount).toLocaleString('es-CO')}</td>
                    <td>{credit.interestRate}%</td>
                    <td>{credit.termMonths} meses</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Credits;
