import { Pool } from "pg";

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "wedding_db",
  password: "admin",
  port: 5432,
});

export default pool;