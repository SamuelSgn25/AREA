import axios from 'axios';

export const githubActions = [
  {
    id: 'github-new-commit',
    name: 'New Commit',
    description: 'Triggered when a new commit is pushed to a repository',
    trigger: async (user, params) => {
      // Polling implementation for demonstration
      const { repo } = params;
      const response = await axios.get(`https://api.github.com/repos/${repo}/commits`, {
        headers: { Authorization: `token ${user.github_token}` }
      });
      return response.data[0].sha;
    }
  },
  {
    id: 'github-new-issue',
    name: 'New Issue',
    description: 'Triggered when a new issue is opened',
    trigger: async (user, params) => {
      const { repo } = params;
      const response = await axios.get(`https://api.github.com/repos/${repo}/issues`, {
        headers: { Authorization: `token ${user.github_token}` }
      });
      return response.data[0]?.id;
    }
  },
  {
    id: 'github-new-pr',
    name: 'New Pull Request',
    description: 'Triggered when a new PR is created',
    trigger: async (user, params) => {
      const { repo } = params;
      const response = await axios.get(`https://api.github.com/repos/${repo}/pulls`, {
        headers: { Authorization: `token ${user.github_token}` }
      });
      return response.data[0]?.id;
    }
  }
];

export const githubReactions = [
  {
    id: 'github-create-issue',
    name: 'Create Issue',
    description: 'Creates a new issue in a repository',
    execute: async (user, params, data) => {
      const { repo, title, body } = params;
      await axios.post(`https://api.github.com/repos/${repo}/issues`, 
        { title, body },
        { headers: { Authorization: `token ${user.github_token}` } }
      );
    }
  }
];
