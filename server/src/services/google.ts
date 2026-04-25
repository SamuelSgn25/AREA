import { Service } from '../models';

/**
 * Google Service Integration
 * Provides actions and reactions for:
 * - Gmail (receive emails, send emails)
 * - Google Calendar (create events, updates)
 * - Google Sheets (add rows, update cells)
 */

export const googleService: Service = {
  id: 'google',
  name: 'Google',
  description: 'Connect your Google account to automate Gmail, Calendar, and Sheets',
  icon: 'https://www.google.com/favicon.ico',
  category: 'productivity',
  isActive: true,
  authentication: 'oauth2',
  actions: [
    {
      id: 'gmail-new-email',
      serviceId: 'google',
      name: 'New Email Received',
      description: 'Trigger when you receive a new email',
      trigger: 'gmail.newEmail',
      parameters: [
        {
          name: 'from',
          type: 'string',
          required: false,
          description: 'Filter by sender email',
          placeholder: 'sender@example.com'
        },
        {
          name: 'subject',
          type: 'string',
          required: false,
          description: 'Filter by subject contains',
          placeholder: 'Important subject'
        }
      ],
      webhook: true,
      pollingInterval: 60000
    },
    {
      id: 'gmail-email-with-label',
      serviceId: 'google',
      name: 'Email with Label',
      description: 'Trigger when email arrives with specific label',
      trigger: 'gmail.emailWithLabel',
      parameters: [
        {
          name: 'label',
          type: 'select',
          required: true,
          description: 'Select label to monitor',
          options: [
            { label: 'INBOX', value: 'INBOX' },
            { label: 'STARRED', value: 'STARRED' },
            { label: 'IMPORTANT', value: 'IMPORTANT' }
          ]
        }
      ]
    },
    {
      id: 'calendar-event-created',
      serviceId: 'google',
      name: 'Event Created',
      description: 'Trigger when a new calendar event is created',
      trigger: 'calendar.eventCreated',
      parameters: [
        {
          name: 'calendar',
          type: 'string',
          required: false,
          description: 'Specific calendar',
          placeholder: 'Primary calendar'
        }
      ]
    }
  ],
  reactions: [
    {
      id: 'send-email',
      serviceId: 'google',
      name: 'Send Email',
      description: 'Send an email via Gmail',
      action: 'gmail.sendEmail',
      parameters: [
        {
          name: 'to',
          type: 'string',
          required: true,
          description: 'Email recipient',
          placeholder: 'recipient@example.com',
          mapFromTrigger: 'from'
        },
        {
          name: 'subject',
          type: 'string',
          required: true,
          description: 'Email subject',
          mapFromTrigger: 'subject'
        },
        {
          name: 'body',
          type: 'textarea',
          required: true,
          description: 'Email body content'
        }
      ]
    },
    {
      id: 'create-event',
      serviceId: 'google',
      name: 'Create Calendar Event',
      description: 'Create a new calendar event',
      action: 'calendar.createEvent',
      parameters: [
        {
          name: 'title',
          type: 'string',
          required: true,
          description: 'Event title'
        },
        {
          name: 'description',
          type: 'textarea',
          required: false,
          description: 'Event description'
        },
        {
          name: 'startTime',
          type: 'date',
          required: true,
          description: 'Event start time'
        },
        {
          name: 'endTime',
          type: 'date',
          required: true,
          description: 'Event end time'
        }
      ]
    },
    {
      id: 'add-sheet-row',
      serviceId: 'google',
      name: 'Add Google Sheets Row',
      description: 'Add a row to a Google Sheet',
      action: 'sheets.addRow',
      parameters: [
        {
          name: 'spreadsheetId',
          type: 'string',
          required: true,
          description: 'Google Sheet ID'
        },
        {
          name: 'values',
          type: 'textarea',
          required: true,
          description: 'Values to add (comma-separated)'
        }
      ]
    }
  ]
};
