import type { PageServerLoad } from './$types';
import type { webinarData } from '$lib/shared';

export const load: PageServerLoad = async (e) => {
	const webinarsResponse = await e.fetch('/api/webinars');
	const webinars: webinarData[] = await webinarsResponse.json();

	// Unless you throw, always return { form } in load and form actions.
	return { webinars };
};
