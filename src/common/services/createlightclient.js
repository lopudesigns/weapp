import { Client } from 'welitejs';

function createlightclient() {
  const client = new Client('wss://api.WeYouMe.io');

  client.sendAsync = (message, params) =>
    new Promise((resolve, reject) => {
      client.call(message, params, (err, result) => {
        if (err !== null) return reject(err);
        return resolve(result);
      });
    });

  return client;
}

export default createlightclient;
