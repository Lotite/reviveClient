import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: '0.0.0.0',
   allowedHosts: [
      'revivestreem.site',
      'api.revivestreem.site', 
      '.revivestreem.site' 
    ],
  },
});