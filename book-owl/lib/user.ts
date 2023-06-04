import sql from "./db";

export interface Valid {
  validation: String;
}

export interface User {
  id: number;
  username: String;
  email: String;
  password: String;
}

export async function list(username: string, password: string) {
  return await sql<Valid[]>`
    SELECT *, (password = crypt(${password}, password)) AS password FROM users
    WHERE username =${username}
  `;
}

export async function listID(id: number) {
  return await sql<Valid[]>`
    SELECT * FROM users
    WHERE id = ${id}
  `;
}

export async function add(username: string, email: string, password: string) {
  return await sql`
    INSERT INTO users (username, email, password)
    VALUES (${username}, ${email}, crypt(${password}, gen_salt('md5')))
  `;
}

export async function editUsername(id:number, username: string) {
  return await sql`
    UPDATE users SET username=${username} 
    WHERE id=${id} AND NOT EXISTS (
      SELECT 1
      FROM users
      WHERE username = ${username}
    )
    RETURNING *;
  `;
}

export async function editPassword(id:number, oldPassword: string, newPassword: string) {
  return await sql`
    UPDATE users SET password=crypt(${newPassword}, gen_salt('md5')) 
    WHERE id=${id} AND password = crypt(${oldPassword}, password) 
    RETURNING *;
  `;
}

export async function remove(id:number, password: string) {
  return await sql<User[]>`
    DELETE FROM users 
    WHERE id = ${id} AND password = crypt(${password}, password)
    RETURNING *;
  `;
}