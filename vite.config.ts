import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    minify: 'terser', 
    terserOptions: {
      compress: {
        drop_console: true, // To remove all console logs
      },
    },
  },
})
 