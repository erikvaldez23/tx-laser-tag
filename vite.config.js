import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],

  build: {
    // Small assets inlined as base64 (avoids tiny HTTP requests)
    assetsInlineLimit: 4096,

    rollupOptions: {
      output: {
        // Manual chunk splitting for long-term browser caching
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
          'mui': ['@mui/material', '@emotion/react', '@emotion/styled'],
          'mui-icons': ['@mui/icons-material'],
          'motion': ['framer-motion'],
          'three': ['three', '@react-three/fiber', '@react-three/drei'],
          'helmet': ['react-helmet-async'],
        },
      },
    },

    sourcemap: false,
    target: 'es2020',
    chunkSizeWarningLimit: 600,
  },

  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'react-helmet-async'],
  },
})
