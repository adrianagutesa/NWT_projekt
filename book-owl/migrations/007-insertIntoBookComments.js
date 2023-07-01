exports.up = async function (sql) {
    await sql`
      INSERT INTO comments (text, productslug, useremail)
      VALUES 
      (
        'The Secret History is a deeply unsettling and haunting book, but I loved every minute of it.', 
        'the-secret-history', 
        'admin@test.com'
      ),
      (
        'Donna Tartt is an amazing author, and The Secret History is one of her best works.', 
        'the-secret-history', 
        'test@test.com'
      ),
      (
        'The characters in The Secret History are so well developed. You feel like you know them personally.', 
        'the-secret-history', 
        'admin@test.com'
      ),
      (
        'The Secret History is an engrossing story that you won''t be able to put down.', 
        'the-secret-history', 
        'test@test.com'
      ),
      (
        'The Secret History is a masterful exploration of the dark side of human nature.', 
        'the-secret-history', 
        'admin@test.com'
      ),
      (
        'The Secret History is a book that stays with you long after you''ve finished it.', 
        'the-secret-history', 
        'test@test.com'
      )
      `;
  };
  
  exports.down = async function (sql) {
    await sql`
      DELETE FROM comments
      WHERE productslug = 'the-secret-history'
      `;
  };
  