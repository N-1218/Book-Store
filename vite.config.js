<<<<<<< HEAD
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
   base: "/Book-Store/"
})


=======
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
  },
});
>>>>>>> 69952499ab6155c0a3bd356a14ed86b3feb3b924
