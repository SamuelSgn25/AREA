import React, { useEffect, useMemo, useState } from 'react';
import Modal from '../components/Modal';
import { useNotification } from '../components/Notification';
import { servicesAPI } from '../services/api';

function Services() {
  const notify = useNotification();
  const [services, setServices] = useState([]);
  const [connectedServices, setConnectedServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [loading, setLoading] = useState(true);

  const connectedMap = useMemo(
    () => new Map(connectedServices.map((service) => [service.serviceId, service])),
    [connectedServices]
  );

  const loadData = () => {
    setLoading(true);
    Promise.all([servicesAPI.list(), servicesAPI.listConnected()])
      .then(([servicesResponse, connectedResponse]) => {
        setServices(servicesResponse.data.data || []);
        setConnectedServices(connectedResponse.data.data || []);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleConnect = (service) => {
    servicesAPI
      .connect(service.id, { accountName: `${service.name} Workspace` })
      .then(() => {
        notify.success('Service connecte', `${service.name} est maintenant pret a etre utilise.`);
        loadData();
      })
      .catch(() => notify.error('Connexion impossible', `Le service ${service.name} n'a pas pu etre connecte.`));
  };

  const handleDisconnect = (service) => {
    servicesAPI
      .disconnect(service.id)
      .then(() => {
        notify.warning('Service deconnecte', `${service.name} a ete retire de vos integrations.`);
        loadData();
      })
      .catch(() => notify.error('Deconnexion impossible', `Le service ${service.name} n'a pas pu etre retire.`));
  };

  return (
    <section className="page">
      <div className="section-banner">
        <div>
          <p className="eyebrow">Catalogue</p>
          <h2>Connectez vos services sans perdre le fil.</h2>
        </div>
        <p>
          Chaque connecteur expose des triggers, des reactions et un mode d'authentification
          prepare pour OAuth2 ou liaison locale.
        </p>
      </div>

      <div className="service-grid">
        {services.map((service) => {
          const connected = connectedMap.has(service.id);
          return (
            <article key={service.id} className="service-card">
              <div className="service-card-head">
                <div>
                  <span className="service-icon">{service.icon}</span>
                  <div>
                    <h3>{service.name}</h3>
                    <p>{service.description}</p>
                  </div>
                </div>
                <span className={`pill ${connected ? 'pill-live' : 'pill-idle'}`}>
                  {connected ? 'Connecte' : service.authentication.toUpperCase()}
                </span>
              </div>
              <div className="service-meta">
                <span>{service.category}</span>
                <span>{service.actions.length} triggers</span>
                <span>{service.reactions.length} reactions</span>
              </div>
              <div className="service-actions">
                <button type="button" className="ghost-button" onClick={() => setSelectedService(service)}>
                  Details
                </button>
                {connected ? (
                  <button type="button" className="danger-button" onClick={() => handleDisconnect(service)}>
                    Deconnecter
                  </button>
                ) : (
                  <button type="button" className="primary-button" onClick={() => handleConnect(service)}>
                    Connecter
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>

      {!loading && services.length === 0 ? <p>Aucun service n'est expose par l'API.</p> : null}

      <Modal
        open={Boolean(selectedService)}
        onClose={() => setSelectedService(null)}
        title={selectedService ? selectedService.name : 'Service'}
        accent="aurora"
      >
        {selectedService ? (
          <div className="detail-columns">
            <div>
              <p className="eyebrow">Triggers</p>
              {selectedService.actions.map((action) => (
                <div key={action.id} className="detail-item">
                  <strong>{action.name}</strong>
                  <p>{action.trigger}</p>
                </div>
              ))}
            </div>
            <div>
              <p className="eyebrow">Reactions</p>
              {selectedService.reactions.map((reaction) => (
                <div key={reaction.id} className="detail-item">
                  <strong>{reaction.name}</strong>
                  <p>{reaction.action}</p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Modal>
    </section>
  );
}

export default Services;
