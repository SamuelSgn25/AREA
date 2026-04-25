import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { notificationsAPI, servicesAPI, workflowsAPI } from '../services/api';

function Dashboard() {
  const [services, setServices] = useState([]);
  const [workflows, setWorkflows] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([servicesAPI.list(), workflowsAPI.list(), notificationsAPI.list()])
      .then(([servicesResponse, workflowsResponse, notificationsResponse]) => {
        setServices(servicesResponse.data.data || []);
        setWorkflows(workflowsResponse.data.data || []);
        setNotifications(notificationsResponse.data.data || []);
      })
      .finally(() => setLoading(false));
  }, []);

  const connectedCount = services.filter((service) => service.connected).length;
  const activeWorkflows = workflows.filter((workflow) => workflow.isActive).length;
  const unreadNotifications = notifications.filter((notification) => !notification.read).length;

  return (
    <section className="page">
      <div className="hero-panel">
        <div>
          <p className="eyebrow">Vue d'ensemble</p>
          <h2>Coordonnez vos services et laissez AREA agir a votre place.</h2>
          <p className="hero-copy">
            Le tableau de bord rassemble vos integrations, vos automatisations et les notifications
            importantes dans une interface claire, rapide et mobile.
          </p>
          <div className="hero-actions">
            <Link to="/services" className="primary-button">
              Explorer les services
            </Link>
            <Link to="/workflows" className="ghost-button primary-ghost">
              Gerer les workflows
            </Link>
          </div>
        </div>
        <div className="hero-orbit">
          <span>OAuth2</span>
          <span>Notifications</span>
          <span>Actions</span>
          <span>Reactions</span>
        </div>
      </div>

      <div className="stats-grid">
        <article className="stat-card accent-teal">
          <p>Services connectes</p>
          <strong>{loading ? '...' : connectedCount}</strong>
          <span>Liens actifs avec vos outils.</span>
        </article>
        <article className="stat-card accent-amber">
          <p>Workflows actifs</p>
          <strong>{loading ? '...' : activeWorkflows}</strong>
          <span>Automatisations en cours d'execution.</span>
        </article>
        <article className="stat-card accent-coral">
          <p>Notifications non lues</p>
          <strong>{loading ? '...' : unreadNotifications}</strong>
          <span>Evenements a traiter rapidement.</span>
        </article>
      </div>

      <div className="content-grid">
        <article className="glass-card">
          <div className="section-head">
            <div>
              <p className="eyebrow">Services</p>
              <h3>Vos connectors</h3>
            </div>
            <Link to="/services">Voir tout</Link>
          </div>
          <div className="stack-list">
            {services.slice(0, 4).map((service) => (
              <div key={service.id} className="list-row">
                <div>
                  <strong>{service.icon} {service.name}</strong>
                  <p>{service.description}</p>
                </div>
                <span className={`pill ${service.connected ? 'pill-live' : 'pill-idle'}`}>
                  {service.connected ? 'Connecte' : 'Disponible'}
                </span>
              </div>
            ))}
            {!loading && services.length === 0 ? <p>Aucun service disponible pour le moment.</p> : null}
          </div>
        </article>

        <article className="glass-card">
          <div className="section-head">
            <div>
              <p className="eyebrow">Workflows</p>
              <h3>Scenarios recents</h3>
            </div>
            <Link to="/workflows">Ouvrir</Link>
          </div>
          <div className="timeline">
            {workflows.slice(0, 4).map((workflow) => (
              <div key={workflow.id} className="timeline-item">
                <div className="timeline-marker" />
                <div>
                  <strong>{workflow.name}</strong>
                  <p>{workflow.description || 'Scenario automatise personnalise.'}</p>
                </div>
              </div>
            ))}
            {!loading && workflows.length === 0 ? <p>Créez votre premier workflow pour commencer.</p> : null}
          </div>
        </article>

        <article className="glass-card full-span">
          <div className="section-head">
            <div>
              <p className="eyebrow">Signals</p>
              <h3>Flux de notifications</h3>
            </div>
          </div>
          <div className="notification-stream">
            {notifications.slice(0, 5).map((notification) => (
              <div key={notification.id} className={`stream-card stream-${notification.type || 'info'}`}>
                <strong>{notification.title}</strong>
                <p>{notification.message}</p>
                <span>{notification.read ? 'Lue' : 'Nouvelle'}</span>
              </div>
            ))}
            {!loading && notifications.length === 0 ? <p>Aucune notification pour l'instant.</p> : null}
          </div>
        </article>
      </div>
    </section>
  );
}

export default Dashboard;
