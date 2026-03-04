import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authUtils } from '../utils/auth';
import './LoginForm.css';

interface LoginFormData {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.email) {
      newErrors.email = 'El email es requerido';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Por favor ingresa un email válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
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
      const response = await fetch(`${apiUrl}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }
      // Save token to cookie
      if (data.data.token) {
        authUtils.setToken(data.data.token);
        navigate('/dashboard');
      } else {
        throw new Error('No se recibió el token de autenticación');
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
    <div className="loginContainer">
      <div className="loginCard">
        <div className="loginHeader">
          <h1 className="loginTitle">Iniciar Sesión</h1>
          <p className="loginSubtitle">Ingresa tus credenciales para acceder</p>
        </div>

        <form onSubmit={handleSubmit}>
          {errors.general && (
            <div className="generalError">
              {errors.general}
            </div>
          )}

          <div className="formGroup">
            <label htmlFor="email" className="label">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              value={formData.email}
              onChange={handleChange}
              className={`input ${errors.email ? 'error' : ''}`}
              placeholder="tu@email.com"
            />
            {errors.email && (
              <p className="errorMessage">{errors.email}</p>
            )}
          </div>

          <div className="formGroup">
            <label htmlFor="password" className="label">
              Contraseña
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              value={formData.password}
              onChange={handleChange}
              className={`input ${errors.password ? 'error' : ''}`}
              placeholder="••••••••"
            />
            {errors.password && (
              <p className="errorMessage">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="submitButton"
          >
            {isLoading ? (
              <>
                <div className="spinner"></div>
                Procesando...
              </>
            ) : (
              'Iniciar Sesión'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
