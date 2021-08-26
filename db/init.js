const Database = require('./config');

const initDb = {
    async init() {
        const db = await Database();

        await db.exec(`
            CREATE TABLE users(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user TEXT,
                userId INTEGER
            )`);
        
        await db.exec(`
            CREATE TABLE warns(
                user TEXT,
                userID INTEGER,
                warns INTEGER,
                guild TEXT,
                guildId INTEGER
            )`);

        await db.exec(`
            CREATE TABLE guildManager(
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                guild TEXT,
                guildId TEXT,
                welcome TEXT,
                warns2ban INTEGER,
                roleMute TEXT,
                roleInit TEXT
            )`);

        await db.close();
    }
}

initDb.init();