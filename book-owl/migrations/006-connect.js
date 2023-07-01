exports.up = async function (sql) {
    await sql`
        CREATE TABLE IF NOT EXISTS blogComment (
            id_blog INT references blogs(id),
            id_comment INT references comments(id),
            PRIMARY KEY (id_blog, id_comment)
        )
      `;
    await sql`
      CREATE TABLE IF NOT EXISTS bookComment (
          id_book INT references books(id),
          id_comment INT references comments(id),
          PRIMARY KEY (id_book, id_comment)
      )
    `;  
  
    await sql`
        CREATE TABLE IF NOT EXISTS userComment (
            id_user INT references users(id),
            id_comment INT references comments(id),
            PRIMARY KEY (id_user, id_comment)
        )
      `;
  };
  
  exports.down = async function (sql) {
    await sql`
        DROP TABLE IF EXISTS blogComment
      `;
    await sql`
      DROP TABLE IF EXISTS bookComment
    `;
    await sql`
        DROP TABLE IF EXISTS userComment
      `;
  };