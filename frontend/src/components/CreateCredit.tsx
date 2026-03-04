import { useState, useEffect } from 'react';
import { authUtils } from '../utils/auth';
import './CreateCredit.css';

interface FormData {
  clientName: string;
  identificationId: string;
  loanAmount: string;
  interestRate: string;
  termMonths: string;
}

interface FormErrors {
  clientName?: string;
  identificationId?: string;
  loanAmount?: string;
  interestRate?: string;
  termMonths?: string;
  general?: string;
}

interface CreateCreditResponse {
  success: boolean;
  message: string;
  data: {
    credit: any;
    emailSent: boolean;
  };
}

const CreateCredit = ({ onSuccess }: { onSuccess: () => void }) => {
  const [formData, setFormData] = useState<FormData>({
    clientName: '',
    identificationId: '',
    loanAmount: '',
    interestRate: '',
    termMonths: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.clientName.trim()) {
      newErrors.clientName = 'El nombre del cliente es requerido';
    } else if (formData.clientName.trim().length < 3) {
      newErrors.clientName = 'El nombre debe tener al menos 3 caracteres';
    }

    if (!formData.identificationId.trim()) {
      newErrors.identificationId = 'La identificación es requerida';
    } else if (!/^\d{6,15}$/.test(formData.identificationId.trim())) {
      newErrors.identificationId = 'La identificación debe tener entre 6 y 15 dígitos';
    }

    if (!formData.loanAmount) {
      newErrors.loanAmount = 'El monto del préstamo es requerido';
    } else {
      const amount = parseFloat(formData.loanAmount);
      if (isNaN(amount) || amount <= 0) {
        newErrors.loanAmount = 'El monto debe ser un número positivo';
      } else if (amount < 100000) {
        newErrors.loanAmount = 'El monto mínimo es $100,000';
      }
    }

    if (!formData.interestRate) {
      newErrors.interestRate = 'La tasa de interés es requerida';
    } else {
      const rate = parseFloat(formData.interestRate);
      if (isNaN(rate) || rate <= 0) {
        newErrors.interestRate = 'La tasa debe ser un número positivo';
      } else if (rate > 100) {
        newErrors.interestRate = 'La tasa no puede exceder el 100%';
      }
    }

    if (!formData.termMonths) {
      newErrors.termMonths = 'El plazo es requerido';
    } else {
      const months = parseInt(formData.termMonths);
      if (isNaN(months) || months <= 0) {
        newErrors.termMonths = 'El plazo debe ser un número positivo';
      } else if (months > 120) {
        newErrors.termMonths = 'El plazo máximo es 120 meses (10 años)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '';
      const response = await fetch(`${apiUrl}/api/credits`, {
        method: 'POST',
        headers: authUtils.getAuthHeaders(),
        body: JSON.stringify({
          clientName: formData.clientName.trim(),
          identificationId: formData.identificationId.trim(),
          loanAmount: parseFloat(formData.loanAmount),
          interestRate: parseFloat(formData.interestRate),
          termMonths: parseInt(formData.termMonths)
        })
      });

      const data: CreateCreditResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al crear el crédito');
      }

      if (data.success) {
        // Show success message and redirect
        alert(`✅ ${data.message}\n\nEmail enviado: ${data.data.emailSent ? 'Sí' : 'No'}`);
        onSuccess();
      } else {
        throw new Error('No se pudo crear el crédito');
      }
    } catch (error) {
      setErrors({
        general: error instanceof Error ? error.message : 'Error al conectar con el servidor'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="createCreditContainer">
      <div className="createCreditCard">
        <div className="createCreditHeader">
          <h1 className="createCreditTitle">Crear Nuevo Crédito</h1>
          <p className="createCreditSubtitle">
            Completa el formulario para registrar un nuevo crédito
          </p>
        </div>

        <form onSubmit={handleSubmit} className="createCreditForm">
          {errors.general && (
            <div className="errorAlert">
              <span className="errorIcon">⚠️</span>
              {errors.general}
            </div>
          )}

          <div className="formGrid">
            <div className="formGroup">
              <label htmlFor="clientName" className="formLabel">
                Nombre del Cliente *
              </label>
              <input
                id="clientName"
                name="clientName"
                type="text"
                value={formData.clientName}
                onChange={handleChange}
                className={`formInput ${errors.clientName ? 'inputError' : ''}`}
                placeholder="Ej: Juan Pérez"
                disabled={isLoading}
              />
              {errors.clientName && (
                <span className="fieldError">{errors.clientName}</span>
              )}
            </div>

            <div className="formGroup">
              <label htmlFor="identificationId" className="formLabel">
                Identificación *
              </label>
              <input
                id="identificationId"
                name="identificationId"
                type="text"
                value={formData.identificationId}
                onChange={handleChange}
                className={`formInput ${errors.identificationId ? 'inputError' : ''}`}
                placeholder="Ej: 123456789"
                disabled={isLoading}
              />
              {errors.identificationId && (
                <span className="fieldError">{errors.identificationId}</span>
              )}
            </div>

            <div className="formGroup">
              <label htmlFor="loanAmount" className="formLabel">
                Monto del Préstamo (COP) *
              </label>
              <div className="inputWithPrefix">
                <span className="inputPrefix">$</span>
                <input
                  id="loanAmount"
                  name="loanAmount"
                  type="number"
                  step="0.01"
                  value={formData.loanAmount}
                  onChange={handleChange}
                  className={`formInput ${errors.loanAmount ? 'inputError' : ''}`}
                  placeholder="Ej: 12500000"
                  disabled={isLoading}
                />
              </div>
              {errors.loanAmount && (
                <span className="fieldError">{errors.loanAmount}</span>
              )}
            </div>

            <div className="formGroup">
              <label htmlFor="interestRate" className="formLabel">
                Tasa de Interés (%) *
              </label>
              <div className="inputWithSuffix">
                <input
                  id="interestRate"
                  name="interestRate"
                  type="number"
                  step="0.01"
                  value={formData.interestRate}
                  onChange={handleChange}
                  className={`formInput ${errors.interestRate ? 'inputError' : ''}`}
                  placeholder="Ej: 10"
                  disabled={isLoading}
                />
                <span className="inputSuffix">%</span>
              </div>
              {errors.interestRate && (
                <span className="fieldError">{errors.interestRate}</span>
              )}
            </div>

            <div className="formGroup full">
              <label htmlFor="termMonths" className="formLabel">
                Plazo (meses) *
              </label>
              <div className="inputWithSuffix">
                <input
                  id="termMonths"
                  name="termMonths"
                  type="number"
                  value={formData.termMonths}
                  onChange={handleChange}
                  className={`formInput ${errors.termMonths ? 'inputError' : ''}`}
                  placeholder="Ej: 28"
                  disabled={isLoading}
                />
                <span className="inputSuffix">meses</span>
              </div>
              {errors.termMonths && (
                <span className="fieldError">{errors.termMonths}</span>
              )}
            </div>
          </div>

          <div className="formActions">
            <button
              type="button"
              onClick={onSuccess}
              className="btnSecondary"
              disabled={isLoading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="btnPrimary"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <span className="btnSpinner"></span>
                  Creando crédito...
                </>
              ) : (
                <>
                  <span className="btnIcon">💳</span>
                  Crear Crédito
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCredit;
