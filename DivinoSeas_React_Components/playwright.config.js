// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',  // Este comando ejecutará Vite en modo desarrollo
    port: 5173,  // Asegúrate de que el puerto sea el correcto
    reuseExistingServer: !process.env.CI,  // Reutilizar el servidor si ya está corriendo
  },
  use: {
    baseURL: 'http://localhost:5173',  // Base URL para las pruebas
  },
});
