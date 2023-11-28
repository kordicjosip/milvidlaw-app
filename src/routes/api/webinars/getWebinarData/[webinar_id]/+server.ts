import { mysqlconnPool } from '$lib/db/mysql';
import type { RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ params }) => {
	let mysqlconn = await mysqlconnPool();
	let webinar_id = params.webinar_id; // assuming the id is passed as a URL parameter

	let results = await mysqlconn
		.query(
			`SELECT * FROM (
        SELECT * FROM webinars
        UNION ALL
        SELECT * FROM webinars_htapg
        UNION ALL
        SELECT * FROM webinars_mps
      ) AS combined_table WHERE id = ?`,
			[webinar_id]
		)
		.then(function ([rows, fields]) {
			console.log(rows);
			return rows;
		});
	return new Response(JSON.stringify(results));
};
