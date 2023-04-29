import { defineConfig } from 'vite'
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import EnvironmentPlugin from 'vite-plugin-environment';

import react from '@vitejs/plugin-react'

const pwaOptions: Partial<VitePWAOptions> = {
  base: "/",
  manifest: {
    name: "Dom que shot: Jogo de beber!",
    short_name: "Dom que shot",
    theme_color: "#170C32",
    icons: [
      {
        src: "logo-icon.png",
        sizes: "256x256",
        type: "image/png"
      }
    ],
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({...pwaOptions, registerType: 'autoUpdate', srcDir:"src/serviceWorkers" , filename: "core.js" }), EnvironmentPlugin('all')],
  base: "/"
})
