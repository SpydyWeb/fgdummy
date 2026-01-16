import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   server: {
    port: 3000,   // <--- change to any port you want
  },
   build: {
    outDir: 'build', //  this is the folder name you want
  },
})
