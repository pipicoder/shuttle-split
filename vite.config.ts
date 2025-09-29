import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const defaultConfig = defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://nno3q5ecp6.execute-api.us-west-2.amazonaws.com/Stage/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
})

export default defaultConfig;
