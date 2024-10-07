import { ConnectionPool, IResult, config } from "mssql";

const sqlConfig: config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  server: process.env.DB_SERVER!,
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000,
  },
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

export async function executeQuery(
  query: string,
  params: Record<string, any> = {}
): Promise<any[]> {
  const pool = await new ConnectionPool(sqlConfig).connect();
  try {
    const request = pool.request();
    for (const key in params) {
      request.input(key, params[key]);
    }
    const result: IResult<any> = await request.query(query);
    return result.recordset;
  } finally {
    await pool.close();
  }
}
