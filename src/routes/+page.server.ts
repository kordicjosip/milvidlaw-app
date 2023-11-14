import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';
import type { webinarData } from '$lib/shared';

const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);

const schema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	email: z.string().email(),
	phone: z.string().regex(phoneRegex, 'Invalid Number!')
});

export const load: PageServerLoad = async (e) => {
	// Server API:
	const form = await superValidate(schema);
	const webinarsResponse = await e.fetch('/api/webinars');
	const webinars: webinarData[] = await webinarsResponse.json();

	// Unless you throw, always return { form } in load and form actions.
	return { form, webinars };
};
