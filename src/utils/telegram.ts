import { WebApp } from '@twa-dev/sdk';

export const isTelegramWebApp = () => {
  return window.Telegram?.WebApp !== undefined;
};

export const getTelegramWebApp = () => {
  if (isTelegramWebApp()) {
    return window.Telegram.WebApp;
  }
  return null;
};

export const initializeTelegramWebApp = () => {
  const webApp = getTelegramWebApp();
  if (webApp) {
    try {
      webApp.ready();
      return {
        userId: webApp.initDataUnsafe?.user?.id?.toString(),
        userName: webApp.initDataUnsafe?.user?.first_name,
      };
    } catch (error) {
      console.error('Error initializing Telegram WebApp:', error);
      return {
        userId: 'demo-user',
        userName: 'Demo User',
      };
    }
  }
  return {
    userId: 'demo-user',
    userName: 'Demo User',
  };
};