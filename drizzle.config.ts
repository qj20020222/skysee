import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";
dotenv.config({ path: ".env" });

export default {
  dialect: 'postgresql',
  schema: ".libs/db/schema.ts",
  dbCredentials: {
    connectionString: "postgres://qj20020222:qjissb_2002@mydb-instance.rds.amazonaws.com:5432/mydatabase"
  },
} satisfies Config;