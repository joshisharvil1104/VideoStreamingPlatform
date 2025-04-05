const Database = require('better-sqlite3');
const db = new Database('videos.db');

// Create table
db.prepare(`
  CREATE TABLE IF NOT EXISTS videos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    thumbnail TEXT,
    youtubeUrl TEXT
)`).run();

module.exports = db;
