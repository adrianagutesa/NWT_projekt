exports.up = async function (sql) {
    await sql`
      INSERT INTO comments (text, productslug, useremail)
      VALUES 
      (
        'I totally agree with the list. "The Notebook" always gets me in the Valentine''s mood.', 
        'the-perfect-book-list-for-valentines-day', 
        'admin@test.com'
      ),
      (
        'I am glad to see "Pride and Prejudice" on this list. It''s a timeless classic that fits the Valentine''s Day spirit.', 
        'the-perfect-book-list-for-valentines-day', 
        'test@test.com'
      ),
      (
        '"Me Before You" is indeed an emotional rollercoaster. Great suggestion for those who prefer a more dramatic love story.', 
        'the-perfect-book-list-for-valentines-day', 
        'admin@test.com'
      ),
      (
        'I love "The Time Traveler''s Wife"! It''s a unique love story that will definitely intrigue any reader.', 
        'the-perfect-book-list-for-valentines-day', 
        'test@test.com'
      ),
      (
        '"To All the Boys I''ve Loved Before" is a great suggestion for younger readers or anyone young at heart. It''s a charming and lighthearted love story.', 
        'the-perfect-book-list-for-valentines-day', 
        'admin@test.com'
      ),
      (
        'I found "Eleanor and Park" to be a poignant and moving love story. It''s a great addition to this list.', 
        'the-perfect-book-list-for-valentines-day', 
        'test@test.com'
      )
      `;
  };
  
  exports.down = async function (sql) {
    await sql`
        DELETE FROM comments
        WHERE productslug = 'the-perfect-book-list-for-valentines-day'
        `;
  };
  