'use strict';

// const errors = require('loopback-common-errors');
const CDP = require('chrome-remote-interface');
const fs = require('fs');
const path = require('path');
const cp = require('child_process');
const detect = require('detect-port');
const CHROME_PORT = 9222;

module.exports = function(Youtube) {
  Youtube.watchVideo = function(ctx, youtubeVideoId) {
    return (async () => {
      if (await detect(CHROME_PORT) === CHROME_PORT) {
        cp.exec(`C:/dev/chrlauncher-win64-stable-codecs-sync/bin/chrome.exe --remote-debugging-port=${CHROME_PORT}`);
      }

      CDP(async (client) => {
        const { Page } = client;
        try {
          await Page.enable();
          await Page.navigate({ url: 'https://youtube.com' });
          await Page.loadEventFired();
          await new Promise(res => setTimeout(res, 2000));
          const { data } = await Page.captureScreenshot();
          fs.writeFileSync(path.join(__dirname, '../../../../screenshots', 'scrot.png'), Buffer.from(data, 'base64'));
        } catch (err) {
          console.error(err);
        } finally {
          await client.close();
        }
      }).on('error', (err) => {
        console.error(err);
      });

      return 'OK';
    })();
  };

  Youtube.remoteMethod('watchVideo', {
    description: 'watch Youtube Video in Chrome',
    accepts: [
      { arg: 'ctx', type: 'object', http: { source: 'context' } },
      { arg: 'youtubeVideoId', type: 'string', http: { source: 'path' }, required: true },
    ],
    returns: {
      arg: 'result',
      type: 'object',
      root: true,
    },
    http: { verb: 'get', path: '/watchVideo/:youtubeVideoId' },
  });
};

