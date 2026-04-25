"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.discordService = void 0;
/**
 * Discord Service Integration
 * Send messages, create channels, post embeds
 */
exports.discordService = {
    id: 'discord',
    name: 'Discord',
    description: 'Send messages and notifications to Discord channels',
    icon: 'https://discord.com/favicon.ico',
    category: 'communication',
    isActive: true,
    authentication: 'oauth2',
    actions: [
        {
            id: 'message-received',
            serviceId: 'discord',
            name: 'Message Received',
            description: 'Trigger when a message is received in a channel',
            trigger: 'discord.messageReceived',
            parameters: [
                {
                    name: 'channel',
                    type: 'string',
                    required: true,
                    description: 'Channel ID or name',
                    placeholder: '#general'
                }
            ]
        }
    ],
    reactions: [
        {
            id: 'send-message',
            serviceId: 'discord',
            name: 'Send Message',
            description: 'Send a message to a Discord channel',
            action: 'discord.sendMessage',
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
            id: 'send-embed',
            serviceId: 'discord',
            name: 'Send Embed',
            description: 'Send a rich embed message',
            action: 'discord.sendEmbed',
            parameters: [
                {
                    name: 'channel',
                    type: 'string',
                    required: true,
                    description: 'Target channel'
                },
                {
                    name: 'title',
                    type: 'string',
                    required: true,
                    description: 'Embed title'
                },
                {
                    name: 'description',
                    type: 'textarea',
                    required: false,
                    description: 'Embed description'
                },
                {
                    name: 'color',
                    type: 'string',
                    required: false,
                    description: 'Embed color (hex code)',
                    placeholder: '#FF0000'
                }
            ]
        }
    ]
};
//# sourceMappingURL=discord.js.map