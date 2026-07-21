import dotenv from "dotenv";
import { existsSync } from "node:fs";
import { resolve } from "node:path";

// Yerelde kök .env.local dosyasını kullanır; Vercel'de ortam değişkenleri zaten sağlanır.
const parentEnv = resolve(process.cwd(), "..", ".env.local");
if (existsSync(parentEnv)) dotenv.config({ path: parentEnv, override: false });
