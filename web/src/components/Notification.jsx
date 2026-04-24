import React, { useEffect } from 'react';
import { useNotificationStore } from '../store/store';
import './Notification.css';

export const Notification = ({ notification, onClose }) => {
  const typeColors = {
    success: '#10b981',
    error: '#ef4444',
    warning: '#f59e0b',
    info: '#3b82f6'
  };

  useEffect(() => {
    const timer = setTimeout(onClose, notification.duration || 5000);
    return () => clearTimeout(timer);
  }, [notification.duration, onClose]);

  return (
    <div
      className={`notification notification-${notification.type || 'info'}`}
      style={{
        '--color': typeColors[notification.type || 'info']
      }}
    >
      <div className="notification-header">
        <div className="notification-icon">
          {notification.type === 'success' && '✓'}
          {notification.type === 'error' && '✕'}
          {notification.type === 'warning' && '!'}
          {notification.type === 'info' && 'ℹ'}
        </div>
        <div className="notification-content">
          <h3>{notification.title}</h3>
          {notification.message && <p>{notification.message}</p>}
        </div>
        <button className="notification-close" onClick={onClose}>×</button>
      </div>
      <div className="notification-progress"></div>
    </div>
  );
};

export const NotificationCenter = () => {
  const { notifications, removeNotification } = useNotificationStore();

  return (
    <div className="notification-center">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
          onClose={() => removeNotification(notification.id)}
        />
      ))}
    </div>
  );
};

export const useNotification = () => {
  const addNotification = useNotificationStore((state) => state.addNotification);

  return {
    success: (title, message) => addNotification({ type: 'success', title, message }),
    error: (title, message) => addNotification({ type: 'error', title, message }),
    warning: (title, message) => addNotification({ type: 'warning', title, message }),
    info: (title, message) => addNotification({ type: 'info', title, message })
  };
};
