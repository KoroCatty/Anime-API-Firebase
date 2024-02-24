// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'


// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })



import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// To use Dotenv
import { config } from 'dotenv'
config()

// vite標準のURLを localhost5173に変更し、firebase認証を使えるように設定
import dns from 'dns';
dns.setDefaultResultOrder('verbatim');


export default defineConfig({
  plugins: [react()],
  
})
