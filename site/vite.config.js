import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// When deployed to GitHub Pages at https://ilyann0810.github.io/portfolio-lidl/,
// every asset URL needs the /portfolio-lidl/ prefix. In dev (vite dev) we keep "/".
export default defineConfig(({ command }) => ({
  plugins: [react()],
  base: command === 'build' ? '/portfolio-lidl/' : '/',
}))
