
import { useState, useCallback } from 'react';
import { Notification } from '@/components/notifications/NotificationCenter';

export const useNotifications = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = useCallback((
    type: Notification['type'],
    title: string,
    message: string,
    persistent = false
  ) => {
    const notification: Notification = {
      id: `notification_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      title,
      message,
      timestamp: Date.now(),
      read: false,
      persistent
    };

    setNotifications(prev => [notification, ...prev]);
    return notification.id;
  }, []);

  const markAsRead = useCallback((id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  }, []);

  const clearAll = useCallback(() => {
    setNotifications([]);
  }, []);

  const addSuccess = useCallback((title: string, message: string) => 
    addNotification('success', title, message), [addNotification]);

  const addError = useCallback((title: string, message: string) => 
    addNotification('error', title, message, true), [addNotification]);

  const addWarning = useCallback((title: string, message: string) => 
    addNotification('warning', title, message), [addNotification]);

  const addInfo = useCallback((title: string, message: string) => 
    addNotification('info', title, message), [addNotification]);

  return {
    notifications,
    addNotification,
    addSuccess,
    addError,
    addWarning,
    addInfo,
    markAsRead,
    dismiss,
    clearAll
  };
};
