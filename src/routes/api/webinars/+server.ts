import { mysqlconnPool } from '$lib/db/mysql';
import type { RequestHandler } from '@sveltejs/kit';

export async function GET() {
	let mysqlconn = await mysqlconnPool();

	let results = await mysqlconn
		.query(
			'SELECT * FROM webinars UNION ALL SELECT * FROM webinars_htapg UNION ALL SELECT * FROM webinars_mps'
		)
		.then(function ([rows, fields]) {
			console.log(rows);
			return rows;
		});
	return new Response(JSON.stringify(results));
}

export const POST: RequestHandler = async ({ request }) => {
	const req = await request.json();

	const response = await fetch('https://api.webinarjam.com/everwebinar/register', {
		method: 'POST',
		body: JSON.stringify({
			api_key: '902faaf6-2cfc-4a3f-85c4-87851b3e7b50',
			...req
		}),
		headers: {
			'content-type': 'application/json',
			Accepts: 'application/json'
		}
	});

	return new Response(await response.text(), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
