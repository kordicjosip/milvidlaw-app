import { mysqlconnPool } from '$lib/db/mysql';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const req = await request.json();
	let mysqlconn = await mysqlconnPool();

	let results = await mysqlconn
		.query(
			'INSERT INTO webinar_registrants_temp (first_name, last_name, email, phone, webinar, ew_live, ew_replay) VALUES (?, ?, ?, ?, ?, ?, ?)',
			[req.first_name, req.last_name, req.email, req.phone, req.webinar, req.ew_live, req.ew_replay]
		)
		.then(function ([rows, fields]) {
			console.log(rows);
			return rows;
		});
	return new Response(JSON.stringify(results));
};
