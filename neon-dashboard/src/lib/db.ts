import postgres from "postgres";
import "./env";

let sqlInstance: ReturnType<typeof postgres> | null = null;

type SqlTag = (strings: TemplateStringsArray, ...values: unknown[]) => unknown;

function getSql() {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL Vercel veya yerel ortam değişkenlerinde tanımlı değil.");
  }

  if (!sqlInstance) {
    sqlInstance = postgres(process.env.DATABASE_URL, {
      ssl: "require",
      max: 5,
      idle_timeout: 20,
      connect_timeout: 10,
    });
  }

  return sqlInstance;
}

export const sql: SqlTag = (strings, ...values) => {
  const client = getSql();
  return client(strings as never, ...values as never[]);
};
