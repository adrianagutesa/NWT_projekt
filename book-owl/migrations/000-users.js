exports.up = async function (sql) {
    await sql`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY NOT NULL,
                username CHARACTER VARYING(50) NOT NULL,
                email CHARACTER VARYING(50) NOT NULL UNIQUE,
                password TEXT NOT NULL
            )
          `;
};
  
exports.down = async function (sql) {
await sql`
        DROP TABLE IF EXISTS users
        `;
};