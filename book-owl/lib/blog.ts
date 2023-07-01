
import sql from "./db";

export interface Blog {
  id: number;
  slug: String;
}

export async function list() {
  return await sql<Blog[]>`
    SELECT id, slug FROM blog
    ORDER BY id
  `;
}