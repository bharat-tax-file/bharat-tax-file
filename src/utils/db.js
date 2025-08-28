import mysql from 'mysql2/promise';

export async function getConnection() {
  return await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'mydb',
  });
}