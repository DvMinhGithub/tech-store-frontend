import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'url'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return

          const modulePath = id.split('node_modules/')[1]
          if (!modulePath) return

          const parts = modulePath.split('/')
          const packageName = parts[0]?.startsWith('@') ? `${parts[0]}/${parts[1]}` : parts[0]

          if (['react', 'react-dom', 'react-router-dom'].includes(packageName)) {
            return 'react-vendor'
          }

          if (packageName === 'antd' || packageName.startsWith('@ant-design') || packageName.startsWith('rc-')) {
            return 'antd-vendor'
          }

          if (packageName === 'swiper') {
            return 'swiper-vendor'
          }

          return `vendor-${packageName.replace('@', '').replace('/', '-')}`
        }
      }
    }
  },
  server: {
    host: 'localhost',
    watch: {
      usePolling: true
    }
  }
})
