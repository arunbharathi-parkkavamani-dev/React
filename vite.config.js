import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc' // Ensure you keep this if using React

// https://vite.dev/config/
export default defineConfig({
  root: './frontend', // Set the root to where your index.html is
  plugins: [react()], // Add the React plugin
  build: {
    outDir: '../dist', // Customize this to your output directory
  },
})
