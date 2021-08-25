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
                guild INTEGER,
                guildId INTEGER,
                welcome INTEGER,
                warns2ban INTEGER,
                roleMute INTEGER,
                roleInit INTEGER
            )`);

        await db.close();
    }
}

initDb.init();