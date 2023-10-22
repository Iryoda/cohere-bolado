import { Client } from "pg";

const db = new Client({
  database: "cohere",
  user: "postgres",
  host: "localhost",
  password: "docker",
  port: 5432,
});

db.connect();

export default db;
