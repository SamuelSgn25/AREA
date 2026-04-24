import { Service } from '../../models';

/**
 * Twitter/X Service Integration
 * Post tweets, track mentions, likes
 */

export const twitterService: Service = {
  id: 'twitter',
  name: 'Twitter/X',
  description: 'Post tweets, track mentions, and monitor engagement',
  icon: 'https://twitter.com/favicon.ico',
  category: 'social',
  isActive: true,
  authentication: 'oauth2',
  actions: [
    {
      id: 'tweet-posted',
      serviceId: 'twitter',
      name: 'Tweet Posted',
      description: 'Trigger when you post a tweet',
      trigger: 'twitter.tweetPosted',
      parameters: []
    },
    {
      id: 'mention-received',
      serviceId: 'twitter',
      name: 'Mention Received',
      description: 'Trigger when someone mentions you',
      trigger: 'twitter.mentionReceived',
      parameters: [
        {
          name: 'keyword',
          type: 'string',
          required: false,
          description: 'Filter by keyword',
          placeholder: 'AREA'
        }
      ]
    },
    {
      id: 'like-received',
      serviceId: 'twitter',
      name: 'Like Received',
      description: 'Trigger when someone likes your tweet',
      trigger: 'twitter.likeReceived',
      parameters: []
    },
    {
      id: 'retweet-received',
      serviceId: 'twitter',
      name: 'Retweet Received',
      description: 'Trigger when someone retweets you',
      trigger: 'twitter.retweetReceived',
      parameters: []
    },
    {
      id: 'hashtag-posted',
      serviceId: 'twitter',
      name: 'Hashtag Posted',
      description: 'Trigger when tweet with hashtag is posted',
      trigger: 'twitter.hashtagPosted',
      parameters: [
        {
          name: 'hashtag',
          type: 'string',
          required: true,
          description: 'Hashtag to monitor',
          placeholder: '#area'
        }
      ]
    }
  ],
  reactions: [
    {
      id: 'post-tweet',
      serviceId: 'twitter',
      name: 'Post Tweet',
      description: 'Post a new tweet',
      action: 'twitter.postTweet',
      parameters: [
        {
          name: 'text',
          type: 'textarea',
          required: true,
          description: 'Tweet content (max 280 chars)',
          placeholder: 'Your tweet here...'
        }
      ]
    },
    {
      id: 'like-tweet',
      serviceId: 'twitter',
      name: 'Like Tweet',
      description: 'Like a tweet',
      action: 'twitter.likeTweet',
      parameters: [
        {
          name: 'tweetId',
          type: 'string',
          required: true,
          description: 'Tweet ID to like'
        }
      ]
    },
    {
      id: 'retweet',
      serviceId: 'twitter',
      name: 'Retweet',
      description: 'Retweet a tweet',
      action: 'twitter.retweet',
      parameters: [
        {
          name: 'tweetId',
          type: 'string',
          required: true,
          description: 'Tweet ID to retweet'
        }
      ]
    }
  ]
};
