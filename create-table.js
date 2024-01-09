import { sql } from "./db.js";

// sql`DROP TABLE IF EXISTS books;`.then(() => {
//     console.log("Tabela Apagada!")
// })

sql`
    CREATE TABLE books (
        id          TEXT PRIMARY KEY,
        title       TEXT,
        description TEXT,
        pages       INTEGER
    );
`.then(() => {
    console.log("Table created!")
})