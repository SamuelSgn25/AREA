import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useNotification } from '../components/Notification';
import { workflowsAPI } from '../services/api';

const initialForm = {
  name: '',
  description: '',
  trigger: 'github.newStar',
  reactions: 'discord.sendMessage'
};

function Workflows() {
  const notify = useNotification();
  const [workflows, setWorkflows] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [previewOpen, setPreviewOpen] = useState(false);

  const loadWorkflows = () => {
    workflowsAPI.list().then((response) => {
      setWorkflows(response.data.data || []);
    });
  };

  useEffect(() => {
    loadWorkflows();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    workflowsAPI
      .create({
        ...form,
        reactions: form.reactions.split(',').map((value) => value.trim())
      })
      .then(() => {
        setForm(initialForm);
        notify.success('Workflow cree', 'Votre automatisation est maintenant enregistree.');
        loadWorkflows();
      })
      .catch(() => notify.error('Creation impossible', 'Verifiez les informations du workflow.'));
  };

  const toggleWorkflow = (workflow) => {
    workflowsAPI
      .update(workflow.id, { isActive: !workflow.isActive })
      .then(() => {
        notify.info(
          workflow.isActive ? 'Workflow en pause' : 'Workflow active',
          `${workflow.name} a ete ${workflow.isActive ? 'desactive' : 'reactive'}.`
        );
        loadWorkflows();
      });
  };

  const removeWorkflow = (workflow) => {
    workflowsAPI.delete(workflow.id).then(() => {
      notify.warning('Workflow supprime', `${workflow.name} a ete retire.`);
      loadWorkflows();
    });
  };

  return (
    <section className="page">
      <div className="split-layout">
        <article className="glass-card composer-card">
          <div className="section-head">
            <div>
              <p className="eyebrow">Composer</p>
              <h2>Creer un nouveau workflow</h2>
            </div>
            <button type="button" className="ghost-button" onClick={() => setPreviewOpen(true)}>
              Popup preview
            </button>
          </div>

          <form className="workflow-form" onSubmit={handleSubmit}>
            <label>
              Nom
              <input
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                placeholder="Veille GitHub vers Discord"
              />
            </label>
            <label>
              Description
              <textarea
                rows="4"
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                placeholder="Des qu'une etoile apparait sur un repo, envoyer un message."
              />
            </label>
            <label>
              Trigger
              <input
                value={form.trigger}
                onChange={(event) => setForm((current) => ({ ...current, trigger: event.target.value }))}
              />
            </label>
            <label>
              Reactions
              <input
                value={form.reactions}
                onChange={(event) => setForm((current) => ({ ...current, reactions: event.target.value }))}
                placeholder="discord.sendMessage, slack.sendMessage"
              />
            </label>
            <button type="submit" className="primary-button">
              Enregistrer le workflow
            </button>
          </form>
        </article>

        <article className="glass-card">
          <div className="section-head">
            <div>
              <p className="eyebrow">Automation board</p>
              <h2>Workflows existants</h2>
            </div>
          </div>
          <div className="stack-list">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="workflow-row">
                <div>
                  <strong>{workflow.name}</strong>
                  <p>{workflow.description || 'Sans description.'}</p>
                  <small>
                    {workflow.trigger} → {Array.isArray(workflow.reactions) ? workflow.reactions.join(', ') : workflow.reactions}
                  </small>
                </div>
                <div className="workflow-actions">
                  <button type="button" className="ghost-button" onClick={() => toggleWorkflow(workflow)}>
                    {workflow.isActive ? 'Pause' : 'Activer'}
                  </button>
                  <button type="button" className="danger-button" onClick={() => removeWorkflow(workflow)}>
                    Supprimer
                  </button>
                </div>
              </div>
            ))}
            {workflows.length === 0 ? <p>Aucun workflow cree pour l'instant.</p> : null}
          </div>
        </article>
      </div>

      <Modal open={previewOpen} onClose={() => setPreviewOpen(false)} title="Popup originale" accent="midnight">
        <div className="popup-preview">
          <div className="popup-badge">Live event</div>
          <h3>Nouvelle reaction disponible</h3>
          <p>
            Le service Discord peut maintenant relayer vos alertes GitHub dans un canal dedie.
          </p>
          <button type="button" className="primary-button" onClick={() => setPreviewOpen(false)}>
            Compris
          </button>
        </div>
      </Modal>
    </section>
  );
}

export default Workflows;
