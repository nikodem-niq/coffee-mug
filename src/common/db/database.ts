import { JSONFile } from "lowdb/node";
import { Low } from "lowdb";
import type { Product } from "@/api/products/products.model.js";
import type { Order } from "@/api/orders/orders.model.js";
import { env } from "../config/config.js";

export type Database = Low<DatabaseSchema>;

export type DatabaseSchema = {
  products: Product[];
  orders: Order[];
};

const initialData: DatabaseSchema = {
  products: [],
  orders: [],
};

const adapter = new JSONFile<DatabaseSchema>(env.DATABASE_URL);
const db = new Low(adapter, initialData);

export const initializeDb = async () => {
  await db.read();
  db.data = db.data || initialData;
  await db.write();

  return db;
};
