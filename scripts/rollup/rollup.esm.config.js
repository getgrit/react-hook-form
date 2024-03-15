import pkg from '../../package.json';

import { createRollupConfig } from './createRollupConfig';

export const rollup = createRollupConfig({
  name: 'index',
  format: 'esm',
  input: pkg.source,
});
