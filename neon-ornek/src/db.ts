import dotenv from "dotenv";
import postgres from "postgres";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

// Önce bu klasördeki, sonra çalışma alanı kökündeki gizli ayarları dene.
for (const path of [resolve(".env.local"), resolve("..", ".env.local")]) {
  if (existsSync(path)) dotenv.config({ path, override: false });
}

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL bulunamadı. .env.local dosyasına ekleyin.");
}

export const sql = postgres(connectionString, {
  ssl: "require",
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});
