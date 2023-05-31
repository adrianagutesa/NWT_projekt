import sql from "./db";

export interface Valid {
  validation: String;
}

export async function list(username: string, password: string) {
  return await sql<Valid[]>`
    SELECT *, (password = crypt(${password}, password)) AS password FROM users
    WHERE username =${username}
  `;
}
