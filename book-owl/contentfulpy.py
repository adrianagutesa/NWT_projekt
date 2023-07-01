import contentful
import psycopg2

# Setup Contentful client
client = contentful.Client('kaj0wvql49mw', 'Kv_pc_jkBR8wH97DUfA7EpAjLQQ6-AmajGhn1mD87MI')

# Fetch entries of a specific content type (e.g., blog)
entries = client.entries({'content_type': 'blogs'})

# Setup PostgreSQL connection
conn = psycopg2.connect(
    host="localhost",
    dbname="postgres",
    user="postgres",
    password="password"
)

# Create a cursor object
cur = conn.cursor()

# Iterate over entries to get the slugs and insert them into PostgreSQL
for entry in entries:
    slug = entry.fields().get('slug')
    if slug is not None:
        # Insert the slug into a table in your PostgreSQL database
        # Assume the table is named 'blogs' and has a column 'slug'
        cur.execute("INSERT INTO blogs (slug) VALUES (%s)", (slug,))

# Commit the changes
conn.commit()

# Close the cursor and connection
cur.close()
conn.close()
