// playwright.config.js
import { defineConfig } from '@playwright/test';

export default defineConfig({
  webServer: {
    command: 'npm run dev',  // Comando para ejecutar Vite
    port: 5173,  // Asegúrate de que el puerto sea correcto
    reuseExistingServer: !process.env.CI,  // Reutilizar el servidor si ya está corriendo
  },
  use: {
    baseURL: 'http://localhost:5173',  // Base URL para las pruebas
  },
  reporter: [
    ['list'],  // Para ver el progreso de las pruebas en la consola
    ['html', { outputFolder: 'test-reports/html-report' }]  // Guardar el reporte HTML en test-reports
  ],
});
