// Importera better-sqlite3
const Database = require('better-sqlite3');

// Skapa en databasinstans som kopplar till din SQLite-databasfil
const db = new Database('./db/freakyfashion.db', { verbose: console.log });

// Exportera db-instansen så den kan användas i andra filer
module.exports = db;
