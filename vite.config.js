import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Determine base dynamically based on environment
//const base =
//process.env.NODE_ENV === "production"
// ? "/hypochlorite-dosing-calculator/"
// : "/";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/hypochlorite-dosing-calculator/",
});
