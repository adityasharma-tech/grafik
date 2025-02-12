import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    allowedHosts: ['grafik.adityasharma.live']
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if(id.includes("node_modules")){
            return "vendor"
          }
          if(id.includes("components")){
            return "components"
          }
        }
      }
    }
  },
  optimizeDeps: {
    include: ["lodash", "moment", "echarts", "zustand"]
  }
})
