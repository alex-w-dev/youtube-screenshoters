'use strict';

// const errors = require('loopback-common-errors');
const CDP = require('chrome-remote-interface');
const fs = require('fs');
console.log(1, '1');
module.exports = function(Youtube) {
  Youtube.watchVideo = function(ctx, youtubeVideoId) {
    return (async () => {
      console.log(4444, '4444');
      // CDP(async (client) => {
      //   const { Page } = client;
      //   try {
      //     await Page.enable();
      //     await Page.navigate({ url: 'https://youtube.com' });
      //     await Page.loadEventFired();
      //     const { data } = await Page.captureScreenshot();
      //     fs.writeFileSync('scrot.png', Buffer.from(data, 'base64'));
      //   } catch (err) {
      //     console.error(err);
      //   } finally {
      //     await client.close();
      //   }
      // }).on('error', (err) => {
      //   console.error(err);
      // });
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

