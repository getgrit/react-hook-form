import reactPlugin from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export const vite = defineConfig({
  plugins: [reactPlugin()],
});
