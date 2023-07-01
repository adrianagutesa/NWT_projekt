exports.up = async function (sql) {
    await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;

    await sql`
        CREATE TABLE comments (
            id SERIAL PRIMARY KEY NOT NULL,
            text TEXT NOT NULL,
            created_at TIMESTAMPTZ DEFAULT NOW(),
            updatedAt TIMESTAMPTZ DEFAULT NOW(),
            productslug CHARACTER VARYING(255),
            useremail CHARACTER VARYING(255)
        );
    `;
};

exports.down = async function (sql) {
    await sql`
        DROP TABLE comments;
    `;

    await sql`
        DROP EXTENSION "uuid-ossp";
    `;
};
