exports.up = async function (sql) {
    await sql`CREATE EXTENSION pgcrypto`;

    await sql`
            INSERT INTO users (username, email, password)
            VALUES ('admin', 'admin@test.com', crypt('password', gen_salt('md5'))),
            ('test', 'test@test.com', crypt('1234test', gen_salt('md5')))
          `;
};

exports.down = async function (sql) {
await sql`
        DELETE FROM users
        `;

await sql`
        DROP EXTENSION pgcrypto
    `;
};