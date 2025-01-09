import dotenv from "dotenv";
import zod from "zod";

dotenv.config();

const envSchema = zod.object({
  PORT: zod.string().default("3000"),
  DATABASE_URL: zod.string().default("data/db.json"),
  NODE_ENV: zod.string().default("development"),
});

export const env = envSchema.parse(process.env);
