import { Service } from '../models';

/**
 * RSS Feed Service Integration
 * Monitor RSS feeds for new articles
 */

export const rssService: Service = {
  id: 'rss',
  name: 'RSS Feed',
  description: 'Monitor RSS feeds for new articles',
  icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23FF9500"><circle cx="4" cy="19" r="2"/><path d="M2 6h14v2H4v12h14V8h2v14H2V6z"/><path d="M4 12h8v2H4z"/></svg>',
  category: 'content',
  isActive: true,
  authentication: 'none',
  actions: [
    {
      id: 'new-article',
      serviceId: 'rss',
      name: 'New Article',
      description: 'Trigger when a new article is published',
      trigger: 'rss.newArticle',
      parameters: [
        {
          name: 'feedUrl',
          type: 'string',
          required: true,
          description: 'RSS Feed URL',
          placeholder: 'https://example.com/feed.xml'
        },
        {
          name: 'keyword',
          type: 'string',
          required: false,
          description: 'Filter by keyword in title/content'
        }
      ],
      pollingInterval: 300000 // 5 minutes
    }
  ],
  reactions: [
    {
      id: 'send-notification',
      serviceId: 'rss',
      name: 'Send Notification',
      description: 'Send a notification when article is found',
      action: 'rss.sendNotification',
      parameters: [
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'Notification title',
          mapFromTrigger: 'title'
        },
        {
          name: 'body',
          type: 'textarea',
          required: false,
          description: 'Notification body',
          mapFromTrigger: 'description'
        }
      ]
    }
  ]
};
