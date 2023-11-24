import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const response = await fetch('https://api.lawmatics.com/v1/prospects', {
		method: 'POST',
		headers: {
			Authorization: 'Bearer fltZZ1DoC44K2s2wSXVcU_nOf-XjGadcfv52OgUYgs0',
			Accepts: 'application/json',
			ContentType: 'application/json',
			Connection: 'keep-alive'
		},
		body: await request.text(),
		redirect: 'follow'
	});

	return new Response(await response.text(), {
		headers: {
			'content-type': 'application/json'
		}
	});
};
