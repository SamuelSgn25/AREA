// Services definitions
export const services = {
  google: {
    name: 'Google',
    actions: [
      { id: 'gmail-new-email', name: 'New Email Received', description: 'Trigger when you receive a new email' },
      { id: 'gmail-email-label', name: 'Email with Label', description: 'Trigger when email arrives with label' },
      { id: 'calendar-event', name: 'Calendar Event', description: 'Trigger on calendar events' }
    ],
    reactions: [
      { id: 'send-email', name: 'Send Email', description: 'Send an email via Gmail' },
      { id: 'create-event', name: 'Create Calendar Event', description: 'Create a new calendar event' },
      { id: 'add-sheet-row', name: 'Add Google Sheets Row', description: 'Add a row to a spreadsheet' }
    ]
  },
  github: {
    name: 'GitHub',
    actions: [
      { id: 'new-star', name: 'New Repository Star', description: 'Trigger when your repo gets a star' },
      { id: 'pr-opened', name: 'PR Opened', description: 'Trigger when a pull request is opened' },
      { id: 'issue-created', name: 'Issue Created', description: 'Trigger when an issue is created' }
    ],
    reactions: [
      { id: 'create-issue', name: 'Create Issue', description: 'Create a new issue' },
      { id: 'create-pr', name: 'Create PR', description: 'Create a pull request' }
    ]
  },
  twitter: {
    name: 'Twitter/X',
    actions: [
      { id: 'tweet-posted', name: 'Tweet Posted', description: 'Trigger when you post a tweet' },
      { id: 'mention-received', name: 'Mention Received', description: 'Trigger when someone mentions you' },
      { id: 'like-received', name: 'Like Received', description: 'Trigger when someone likes your tweet' }
    ],
    reactions: [
      { id: 'post-tweet', name: 'Post Tweet', description: 'Post a new tweet' },
      { id: 'like-tweet', name: 'Like Tweet', description: 'Like a tweet' }
    ]
  },
  discord: {
    name: 'Discord',
    actions: [
      { id: 'message-received', name: 'Message Received', description: 'Trigger on new message' },
      { id: 'reaction-added', name: 'Reaction Added', description: 'Trigger on reaction' }
    ],
    reactions: [
      { id: 'send-message', name: 'Send Message', description: 'Send a Discord message' },
      { id: 'send-embed', name: 'Send Embed', description: 'Send a rich embed' }
    ]
  },
  slack: {
    name: 'Slack',
    actions: [
      { id: 'message-received', name: 'Message in Channel', description: 'Trigger on message' },
      { id: 'reaction-added', name: 'Reaction Added', description: 'Trigger on reaction' }
    ],
    reactions: [
      { id: 'send-message', name: 'Send Message', description: 'Send a Slack message' },
      { id: 'upload-file', name: 'Upload File', description: 'Upload a file' }
    ]
  },
  rss: {
    name: 'RSS Feed',
    actions: [
      { id: 'new-article', name: 'New Article', description: 'Trigger on new article' }
    ],
    reactions: [
      { id: 'send-notification', name: 'Send Notification', description: 'Send a notification' }
    ]
  }
};
