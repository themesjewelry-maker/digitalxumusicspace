const Database = require("better-sqlite3");
const path = require("path");
const fs = require("fs");

const dataDir = path.join(__dirname, "data");

try {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
    console.log("[DB] Created data directory:", dataDir);
  }
} catch (err) {
  console.error("[DB] Failed to create data directory:", err.message);
  throw err;
}

const dbPath = path.join(dataDir, "bookings.db");
console.log("[DB] Database path:", dbPath);

let db;
try {
  db = new Database(dbPath);
  console.log("[DB] Database connected successfully");
} catch (err) {
  console.error("[DB] Failed to open database:", err.message);
  throw err;
}

try {
  db.exec(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT NOT NULL,
      course TEXT NOT NULL,
      note TEXT,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log("[DB] Table 'bookings' ready");
} catch (err) {
  console.error("[DB] Failed to create table:", err.message);
  throw err;
}

module.exports = db;
