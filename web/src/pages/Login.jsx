import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../components/Notification';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/store';

function Login() {
  const navigate = useNavigate();
  const notify = useNotification();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({ email: 'demo@area.local', password: 'demo1234' });
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    authAPI.oauthProviders().then((response) => {
      setProviders(response.data.data || []);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    authAPI
      .login(form)
      .then((response) => {
        login(response.data.data.user, response.data.data.accessToken);
        notify.success('Connexion reussie', 'Bienvenue dans votre tableau de bord AREA.');
        navigate('/');
      })
      .catch(() => notify.error('Connexion echouee', 'Email ou mot de passe invalide.'));
  };

  const handleOAuthPreview = (providerId) => {
    authAPI.oauthStart(providerId).then((response) => {
      notify.info(`OAuth2 ${providerId}`, `Simulation prete: ${response.data.data.authorizeUrl}`);
    });
  };

  return (
    <section className="auth-layout">
      <article className="auth-panel feature-panel">
        <p className="eyebrow">Access</p>
        <h2>Un cockpit unique pour piloter vos integrations.</h2>
        <p>
          Connectez GitHub, Discord, Google, RSS et plus encore, puis composez des reactions
          visuelles et des notifications intelligentes.
        </p>
      </article>
      <article className="auth-panel form-panel">
        <h2>Connexion</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              value={form.password}
              onChange={(event) => setForm((current) => ({ ...current, password: event.target.value }))}
            />
          </label>
          <button type="submit" className="primary-button">
            Se connecter
          </button>
        </form>
        <div className="oauth-block">
          <p className="eyebrow">OAuth2 simule</p>
          <div className="service-actions">
            {providers.map((provider) => (
              <button
                key={provider.id}
                type="button"
                className="ghost-button"
                onClick={() => handleOAuthPreview(provider.id)}
              >
                {provider.name}
              </button>
            ))}
          </div>
        </div>
        <p className="auth-hint">
          Aucun compte ? <Link to="/register">Creer un compte</Link>
        </p>
      </article>
    </section>
  );
}

export default Login;
