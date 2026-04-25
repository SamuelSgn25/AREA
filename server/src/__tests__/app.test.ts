import request from 'supertest';
import app, { demoUser } from '../app';

describe('AREA in-memory API', () => {
  it('returns health information', async () => {
    const response = await request(app).get('/api/health');

    expect(response.status).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  it('authenticates the demo user', async () => {
    const response = await request(app).post('/api/auth/login').send({
      email: 'demo@area.local',
      password: 'demo1234'
    });

    expect(response.status).toBe(200);
    expect(response.body.data.user.email).toBe('demo@area.local');
    expect(response.body.data.accessToken).toBeTruthy();
  });

  it('lists services for an authenticated user', async () => {
    const response = await request(app)
      .get('/api/services')
      .set('Authorization', `Bearer ${demoUser.token}`);

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
    expect(response.body.data.length).toBeGreaterThan(0);
  });

  it('creates a workflow and a notification', async () => {
    const workflowResponse = await request(app)
      .post('/api/workflows')
      .set('Authorization', `Bearer ${demoUser.token}`)
      .send({
        name: 'RSS vers Slack',
        description: 'Notifier Slack quand un article apparait.',
        trigger: 'rss.newArticle',
        reactions: ['slack.sendMessage']
      });

    expect(workflowResponse.status).toBe(201);
    expect(workflowResponse.body.data.name).toBe('RSS vers Slack');

    const notificationsResponse = await request(app)
      .get('/api/notifications')
      .set('Authorization', `Bearer ${demoUser.token}`);

    expect(notificationsResponse.status).toBe(200);
    expect(notificationsResponse.body.data.length).toBeGreaterThan(0);
  });
});
