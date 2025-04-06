export const getCurrentUrl = async () => {
    return new Promise((resolve) => {
      try {
        if (chrome.tabs) {
          chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            resolve(tabs[0]?.url || '');
          });
        } else {
          // Fallback for development environment
          resolve(window.location.href);
        }
      } catch (error) {
        console.error('Error getting current URL:', error);
        resolve('');
      }
    });
  };
  
  // Check if the current page is a coding platform
  export const isCodingPlatform = async () => {
    const url = await getCurrentUrl();
    return url.includes('leetcode.com') || 
           url.includes('geeksforgeeks.org') ||
           url.includes('hackerrank.com') ||
           url.includes('codechef.com');
  };