import { defineConfig } from 'cypress';
const cypressReplay = require('@replayio/cypress');
const fs = require('fs');

export const cypress = defineConfig({
  video: false,
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      cypressReplay.default(on, config);
      on('after:run', (afterRun: any) => {
        const data = JSON.stringify(afterRun.totalDuration);
        const filename = 'duration.json';
        fs.writeFileSync(filename, data);
        console.log('cypress-json-results: wrote results to %s', filename);
      });
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      return config;
    },
    baseUrl: 'http://localhost:3000/',
  },
});
