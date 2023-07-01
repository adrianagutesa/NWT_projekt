exports.up = async function (sql) {
    await sql`
            CREATE TABLE IF NOT EXISTS books (
                id SERIAL PRIMARY KEY NOT NULL,
                slug VARCHAR(256) NOT NULL
            )
          `;
};
  
exports.down = async function (sql) {
await sql`
        DROP TABLE IF EXISTS books
        `;
};