import React, { useState } from 'react';
import { useNotification } from '../components/Notification';
import { authAPI } from '../services/api';
import { useAuthStore } from '../store/store';

function Profile() {
  const notify = useNotification();
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [form, setForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    username: user?.username || '',
    email: user?.email || ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    authAPI
      .updateProfile(form)
      .then((response) => {
        setUser(response.data.data);
        notify.success('Profil mis a jour', 'Vos informations ont ete sauvegardees.');
      })
      .catch(() => notify.error('Mise a jour impossible', 'Le profil n a pas pu etre sauvegarde.'));
  };

  return (
    <section className="page">
      <div className="split-layout">
        <article className="glass-card">
          <p className="eyebrow">Identity</p>
          <h2>Votre profil AREA</h2>
          <div className="profile-hero">
            <div className="avatar-ring">{form.firstName?.[0] || form.username?.[0] || 'A'}</div>
            <div>
              <strong>{form.firstName} {form.lastName}</strong>
              <p>{form.email}</p>
            </div>
          </div>
        </article>

        <article className="glass-card">
          <p className="eyebrow">Settings</p>
          <h2>Coordonnees utilisateur</h2>
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
            <button type="submit" className="primary-button">
              Sauvegarder
            </button>
          </form>
        </article>
      </div>
    </section>
  );
}

export default Profile;
