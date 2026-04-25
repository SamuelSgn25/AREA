"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.githubService = void 0;
/**
 * GitHub Service Integration
 * Track repositories, pull requests, issues, and releases
 */
exports.githubService = {
    id: 'github',
    name: 'GitHub',
    description: 'Monitor repositories, PRs, issues, and releases',
    icon: 'https://github.com/favicon.ico',
    category: 'development',
    isActive: true,
    authentication: 'oauth2',
    actions: [
        {
            id: 'new-repository-star',
            serviceId: 'github',
            name: 'New Star',
            description: 'Trigger when your repository receives a new star',
            trigger: 'github.newStar',
            parameters: [
                {
                    name: 'repository',
                    type: 'string',
                    required: true,
                    description: 'Repository (owner/repo)',
                    placeholder: 'samuelsgn/AREA'
                }
            ]
        },
        {
            id: 'pr-opened',
            serviceId: 'github',
            name: 'PR Opened',
            description: 'Trigger when a pull request is opened',
            trigger: 'github.prOpened',
            parameters: [
                {
                    name: 'repository',
                    type: 'string',
                    required: true,
                    description: 'Repository'
                }
            ]
        },
        {
            id: 'issue-created',
            serviceId: 'github',
            name: 'Issue Created',
            description: 'Trigger when an issue is created',
            trigger: 'github.issueCreated',
            parameters: [
                {
                    name: 'repository',
                    type: 'string',
                    required: true,
                    description: 'Repository'
                }
            ]
        },
        {
            id: 'release-published',
            serviceId: 'github',
            name: 'Release Published',
            description: 'Trigger when a new release is published',
            trigger: 'github.releasePublished',
            parameters: [
                {
                    name: 'repository',
                    type: 'string',
                    required: true,
                    description: 'Repository'
                }
            ]
        }
    ],
    reactions: [
        {
            id: 'create-issue',
            serviceId: 'github',
            name: 'Create Issue',
            description: 'Create a new issue in a repository',
            action: 'github.createIssue',
            parameters: [
                {
                    name: 'repository',
                    type: 'string',
                    required: true,
                    description: 'Repository'
                },
                {
                    name: 'title',
                    type: 'string',
                    required: true,
                    description: 'Issue title'
                },
                {
                    name: 'body',
                    type: 'textarea',
                    required: false,
                    description: 'Issue description'
                },
                {
                    name: 'labels',
                    type: 'string',
                    required: false,
                    description: 'Labels (comma-separated)',
                    placeholder: 'bug,feature'
                }
            ]
        }
    ]
};
//# sourceMappingURL=github.js.map