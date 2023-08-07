import mysql from "mysql2/promise";

export async function query({ query, values = [] }) {
  //Digital ocean ubuntu
  const dbconnection = await mysql.createConnection({
    host: process.env.DB_HOST,
    database: process.env.DB,
    user: process.env.DB_UNAME,
    password: process.env.DB_PWORD,
  });

  try {
    const [results] = await dbconnection.execute(query, values);
    dbconnection.end();
    return results;
  } catch (error) {
    return { error };
  }
}
