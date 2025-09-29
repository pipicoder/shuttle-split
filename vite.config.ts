import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const defaultConfig = defineConfig({
  plugins: [react()],
})

export default defaultConfig;
