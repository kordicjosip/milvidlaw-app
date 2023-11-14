import { pool } from '$lib/db';
import type { webinarData } from '$lib/shared';

export async function GET() {
	const response = await pool
		.request()
		.query(
			`
        SELECT *
        FROM webinars
		`
		)
		.then((result) => {
			return result.recordset;
		});

	const webinars: webinarData[] = [];

	for (let row of response) {
		webinars.push({
			id: row.id,
			scheduleId: row.schedule,
			time: row.date_time,
			name: row.name,
			lastUpdated: row.updated
		});
	}

	return new Response(JSON.stringify(webinars));
}
