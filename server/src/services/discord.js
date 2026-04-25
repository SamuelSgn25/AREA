import axios from 'axios';

export const discordActions = [
  {
    id: 'discord-message-received',
    name: 'Message Received',
    description: 'Triggered when a message is sent in a specific channel',
    trigger: async (user, params) => {
      const { channelId } = params;
      const response = await axios.get(`https://discord.com/api/v10/channels/${channelId}/messages?limit=1`, {
        headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` }
      });
      return response.data[0]?.id;
    }
  },
  {
    id: 'discord-user-join',
    name: 'User Joined',
    description: 'Triggered when a new user joins a guild',
    trigger: async (user, params) => {
      // Typically needs webhooks for efficiency, but polling guilds for now
      return null; 
    }
  },
  {
    id: 'discord-reaction-added',
    name: 'Reaction Added',
    description: 'Triggered when a reaction is added to a message',
    trigger: async (user, params) => {
      return null;
    }
  }
];

export const discordReactions = [
  {
    id: 'discord-send-message',
    name: 'Send Message',
    description: 'Sends a message to a Discord channel',
    execute: async (user, params, data) => {
      const { channelId, content } = params;
      await axios.post(`https://discord.com/api/v10/channels/${channelId}/messages`, 
        { content },
        { headers: { Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}` } }
      );
    }
  }
];
