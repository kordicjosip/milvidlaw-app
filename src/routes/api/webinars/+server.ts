import { mysqlconnFn, mysqlconnPool } from '$lib/db/mysql';

export async function GET() {
	let mysqlconn = await mysqlconnPool();

	let results = await mysqlconn.query('SELECT * FROM webinars').then(function ([rows, fields]) {
		console.log(rows);
		return rows;
	});
	return new Response(JSON.stringify(results));
}
