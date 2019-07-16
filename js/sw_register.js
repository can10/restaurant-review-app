/**
 * Register the service worker for caching
 */
registerServiceWorker = () => {
    if(!navigator.serviceWorker) return; // If browser supports service workers
  
    navigator.serviceWorker.register('/sw.js')
    .then(function() {
      console.log('Registration done!');
    })
    .catch(function() {
      console.log('Registration failed!');
    });
  }

  registerServiceWorker();