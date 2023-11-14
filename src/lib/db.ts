import sql from 'mssql';
import { env } from '$lib/env';

const sqlConfig = {
	user: env.DB_USERNAME,
	password: env.DB_PASSWORD,
	database: env.DB,
	server: env.DB_HOST,
	port: Number(env.DB_PORT),
	connectionTimeout: 60000,
	requestTimeout: 180000,
	pool: {
		max: 100,
		min: 2,
		idleTimeoutMillis: 30000
	},
	options: {
		encrypt: false,
		trustServerCertificate: true
	}
};

export let pool: sql.ConnectionPool;

export async function init() {
	pool = await sql.connect(sqlConfig);
}
