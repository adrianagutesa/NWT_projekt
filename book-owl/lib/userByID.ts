import sql from "./db";

export interface Valid {
  validation: String;
}

export async function list(id: number) {
  return await sql<Valid[]>`
    SELECT * FROM users
    WHERE id = ${id}
  `;
}
