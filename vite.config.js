import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        popup: resolve(__dirname, 'popup.html'),
        fullpage: resolve(__dirname, 'fullpage.html'),
      },
    },
  },
});
