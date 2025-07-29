import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: '/static/',
  build: {
	  outDir: resolve('../static'),
	  emptyOutDir: true,
	  manifest: 'manifest.json',
	  rollupOptions: {
		  input: {
			  main: resolve('./src/main.jsx'),
			  styles: resolve('./src/styles.css'),
		  },
		  output: {
			  chunkFileNames: undefined,
		  }
	  }
  }
})
