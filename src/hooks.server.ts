import type { Handle } from '@sveltejs/kit';
import { init as initDB } from '$lib/db';

initDB();

export const handle: Handle = async ({ event, resolve }) => {
	if (event.cookies.get('user')) {
		event.locals.user = Number(event.cookies.get('user'));
	}
	// TODO cookie auth
	return await resolve(event);
};
