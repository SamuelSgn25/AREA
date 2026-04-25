import { Express } from 'express';
type NotificationKind = 'success' | 'error' | 'warning' | 'info';
type UserRecord = {
    id: string;
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    avatar: string | null;
    role: 'user';
    isVerified: boolean;
    isActive: boolean;
    token: string;
    createdAt: string;
};
type ServiceDefinition = {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: string;
    authentication: 'oauth2' | 'none';
    actions: Array<{
        id: string;
        name: string;
        trigger: string;
    }>;
    reactions: Array<{
        id: string;
        name: string;
        action: string;
    }>;
};
type ConnectedServiceRecord = {
    id: string;
    userId: string;
    serviceId: string;
    accountName: string;
    accessToken: string;
    isActive: boolean;
    connectedAt: string;
};
type WorkflowRecord = {
    id: string;
    userId: string;
    name: string;
    description: string;
    trigger: string;
    reactions: string[];
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};
type NotificationRecord = {
    id: string;
    userId: string;
    title: string;
    message: string;
    type: NotificationKind;
    actionUrl?: string;
    read: boolean;
    createdAt: string;
};
declare global {
    namespace Express {
        interface Request {
            user?: UserRecord;
        }
    }
}
declare const app: Express;
declare const availableServices: ServiceDefinition[];
declare const demoUser: UserRecord;
declare const database: {
    users: UserRecord[];
    connectedServices: ConnectedServiceRecord[];
    workflows: WorkflowRecord[];
    notifications: NotificationRecord[];
};
export { app, availableServices, database, demoUser };
export default app;
//# sourceMappingURL=app.d.ts.map