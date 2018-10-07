import http from 'http';
import app from './app';
require('dotenv').config()

const server = http.createServer(app);

let currentApp = app;

server.listen(process.env.SSR_PORT, () => console.log('SSR started'));

if (module.hot) {
  console.log('✅  Server-side HMR Enabled!');

  module.hot.accept('./app', () => {
    console.log('🔁  HMR Reloading `./app`...');
    server.removeListener('request', currentApp);
    const newApp = require('./app').default;
    server.on('request', newApp);
    currentApp = newApp;
  });
}
