import { Database } from 'sqlite3';

const db = new Database('./database.db');

db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS users (name TEXT, city TEXT, country TEXT, favorite_sport TEXT)");
});

export default db;

