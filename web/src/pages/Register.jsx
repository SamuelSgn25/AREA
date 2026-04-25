import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useNotification } from '../components/Notification';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/store';

function Register() {
  const navigate = useNavigate();
  const notify = useNotification();
  const login = useAuthStore((state) => state.login);
  const [form, setForm] = useState({
    firstName: 'Demo',
    lastName: 'User',
    username: 'demouser',
    email: 'demo@area.local',
    password: 'demo1234'
  });
  const [providers, setProviders] = useState([]);

  useEffect(() => {
    authAPI.oauthProviders().then((response) => {
      setProviders(response.data.data || []);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    authAPI
      .register(form)
      .then((response) => {
        login(response.data.data.user, response.data.data.accessToken);
        notify.success('Compte cree', 'Votre espace AREA est pret.');
        navigate('/');
      })
      .catch(() => notify.error('Inscription impossible', 'Verifiez vos informations ou utilisez un autre email.'));
  };

  return (
    <section className="auth-layout">
      <article className="auth-panel feature-panel feature-panel-alt">
        <p className="eyebrow">Launch</p>
        <h2>Activez vos premieres automatisations en quelques minutes.</h2>
        <p>
          Le backend cree aussi un jeu de notifications de demarrage pour vous aider a valider le flux.
        </p>
      </article>
      <article className="auth-panel form-panel">
        <h2>Inscription</h2>
        <form className="auth-form" onSubmit={handleSubmit}>
          <label>
            Prenom
            <input
              value={form.firstName}
              onChange={(event) => setForm((current) => ({ ...current, firstName: event.target.value }))}
            />
          </label>
          <label>
            Nom
            <input
              value={form.lastName}
              onChange={(event) => setForm((current) => ({ ...current, lastName: event.target.value }))}
            />
          </label>
          <label>
            Pseudo
            <input
              value={form.username}
              onChange={(event) => setForm((current) => ({ ...current, username: event.target.value }))}
            />
          </label>
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
            Creer le compte
          </button>
        </form>
        <div className="oauth-block">
          <p className="eyebrow">Providers disponibles</p>
          <div className="service-actions">
            {providers.map((provider) => (
              <span key={provider.id} className="pill pill-idle">
                {provider.name}
              </span>
            ))}
          </div>
        </div>
        <p className="auth-hint">
          Deja inscrit ? <Link to="/login">Se connecter</Link>
        </p>
      </article>
    </section>
  );
}

export default Register;
