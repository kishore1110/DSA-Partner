export const getCurrentUrl = async () => {
    return new Promise((resolve) => {
      try {
        if (chrome.tabs) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0]?.url || '');
          });
        } else {
          resolve(window.location.href);
        }
      } catch (error) {
        console.error('Error getting current URL:', error);
        resolve('');
      }
    });
  };