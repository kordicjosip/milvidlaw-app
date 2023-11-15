import mysql from 'mysql2/promise';
import { env } from '$lib/env';

let mysqlconn: Promise<mysql.Connection> | null = null;

export function mysqlconnFn() {
	if (!mysqlconn) {
		mysqlconn = mysql.createConnection({
			host: env.DB_HOST,
			user: env.DB_USERNAME,
			password: env.DB_PASSWORD,
			database: env.DB
		});
	}

	return mysqlconn;
}

const pool = mysql.createPool({
	host: env.DB_HOST,
	user: env.DB_USERNAME,
	password: env.DB_PASSWORD,
	database: env.DB,
	waitForConnections: true,
	connectionLimit: 10,
	maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
	idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
	queueLimit: 0,
	enableKeepAlive: true,
	keepAliveInitialDelay: 0
});

export async function mysqlconnPool() {
	return await pool.getConnection();
}
