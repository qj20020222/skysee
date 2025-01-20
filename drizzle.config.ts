import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  dialect: 'postgresql',
  schema: ".libs/db/schema.ts",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
} satisfies Config;