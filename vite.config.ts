import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { string } from "rollup-plugin-string";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    string({
      include: "entry/*.md",
    }),
  ],
});
