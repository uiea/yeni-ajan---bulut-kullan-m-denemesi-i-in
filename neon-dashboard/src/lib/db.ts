import postgres from "postgres";
import "./env";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL Vercel veya yerel ortam değişkenlerinde tanımlı değil.");
}

export const sql = postgres(connectionString, {
  ssl: "require",
  max: 5,
  idle_timeout: 20,
  connect_timeout: 10,
});
