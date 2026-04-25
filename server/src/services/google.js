import axios from 'axios';

export const googleActions = [
  {
    id: 'google-new-email',
    name: 'New Email',
    description: 'Triggered when a new email is received in Gmail',
    trigger: async (user, params) => {
      const response = await axios.get('https://gmail.googleapis.com/gmail/v1/users/me/messages', {
        headers: { Authorization: `Bearer ${user.google_token}` }
      });
      return response.data.messages?.[0]?.id;
    }
  },
  {
    id: 'google-new-file',
    name: 'New Drive File',
    description: 'Triggered when a new file is uploaded to Google Drive',
    trigger: async (user, params) => {
      const response = await axios.get('https://www.googleapis.com/drive/v3/files', {
        headers: { Authorization: `Bearer ${user.google_token}` }
      });
      return response.data.files?.[0]?.id;
    }
  },
  {
    id: 'google-new-event',
    name: 'New Calendar Event',
    description: 'Triggered when a new event is added to your calendar',
    trigger: async (user, params) => {
      const response = await axios.get('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        headers: { Authorization: `Bearer ${user.google_token}` }
      });
      return response.data.items?.[0]?.id;
    }
  }
];

export const googleReactions = [
  {
    id: 'google-send-email',
    name: 'Send Email',
    description: 'Sends an email via Gmail',
    execute: async (user, params, data) => {
      const { to, subject, body } = params;
      // Gmail API requires base64 encoded raw email
      const message = [
        `To: ${to}`,
        `Subject: ${subject}`,
        '',
        body
      ].join('\n');
      const encodedMessage = Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
      await axios.post('https://gmail.googleapis.com/gmail/v1/users/me/messages/send', 
        { raw: encodedMessage },
        { headers: { Authorization: `Bearer ${user.google_token}` } }
      );
    }
  }
];
