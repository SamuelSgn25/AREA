import { Service } from '../../models';

/**
 * Slack Service Integration
 * Send messages, files, and notifications
 */

export const slackService: Service = {
  id: 'slack',
  name: 'Slack',
  description: 'Send messages and notifications to Slack channels',
  icon: 'https://slack.com/favicon.ico',
  category: 'communication',
  isActive: true,
  authentication: 'oauth2',
  actions: [
    {
      id: 'message-received',
      serviceId: 'slack',
      name: 'Message in Channel',
      description: 'Trigger when a message is posted in a channel',
      trigger: 'slack.messageReceived',
      parameters: [
        {
          name: 'channel',
          type: 'string',
          required: true,
          description: 'Channel name or ID',
          placeholder: '#general'
        }
      ]
    },
    {
      id: 'reaction-added',
      serviceId: 'slack',
      name: 'Reaction Added',
      description: 'Trigger when someone adds a reaction',
      trigger: 'slack.reactionAdded',
      parameters: [
        {
          name: 'emoji',
          type: 'string',
          required: false,
          description: 'Filter by emoji',
          placeholder: '+1'
        }
      ]
    }
  ],
  reactions: [
    {
      id: 'send-message',
      serviceId: 'slack',
      name: 'Send Message',
      description: 'Send a message to a Slack channel',
      action: 'slack.sendMessage',
      parameters: [
        {
          name: 'channel',
          type: 'string',
          required: true,
          description: 'Target channel',
          placeholder: '#notifications'
        },
        {
          name: 'message',
          type: 'textarea',
          required: true,
          description: 'Message content'
        }
      ]
    },
    {
      id: 'upload-file',
      serviceId: 'slack',
      name: 'Upload File',
      description: 'Upload a file to a channel',
      action: 'slack.uploadFile',
      parameters: [
        {
          name: 'channel',
          type: 'string',
          required: true,
          description: 'Target channel'
        },
        {
          name: 'fileUrl',
          type: 'string',
          required: true,
          description: 'File URL to upload',
          placeholder: 'https://example.com/file.pdf'
        },
        {
          name: 'title',
          type: 'string',
          required: false,
          description: 'File title'
        }
      ]
    }
  ]
};
