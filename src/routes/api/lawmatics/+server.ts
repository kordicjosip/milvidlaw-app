import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const req = await request.json();

	const response = await fetch('https://api.lawmatics.com/v1/prospects', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer fltZZ1DoC44K2s2wSXVcU_nOf-XjGadcfv52OgUYgs0',
			Accepts: 'application/json'
		},
		body: JSON.stringify({
			req
		})
	});

	return new Response(await response.text(), {
		headers: {
			'content-type': 'application/json',
			Accepts: 'application/json'
		}
	});
};
