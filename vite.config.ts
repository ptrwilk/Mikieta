import path from "path";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import fs from "fs";

const isProduction = process.env.NODE_ENV === "production";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  ...(!isProduction
    ? {
        server: {
          port: 5100,
          host: "0.0.0.0",
        },
      }
    : {
        server: {
          https: {
            key: fs.readFileSync(
              path.resolve(
                __dirname,
                "/etc/letsencrypt/live/ptrwilk.pl/privkey.pem"
              )
            ),
            cert: fs.readFileSync(
              path.resolve(
                __dirname,
                "/etc/letsencrypt/live/ptrwilk.pl/fullchain.pem"
              )
            ),
          },
          port: 5100,
          host: "0.0.0.0",
          hmr: {
            protocol: "wss",
          },
        },
      }),
});
