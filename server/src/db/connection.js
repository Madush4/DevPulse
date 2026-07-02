import Database from "better-sqlite3";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filenmae)  
const schemaPath = path.join(__dirname, "schema.sql");
const db = new Database(path.join(__dirname, "../../..", "devpulse.sqlite"));
const schema = fs.readFileSync(schemaPath, "utf-8");

db.exec(schema);
console.log("Database connected and tables created!");

export default db;
