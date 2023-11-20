import type { webinarRegisterRequest } from '$lib/shared';

export const registerWebinar = async (registerRequest: webinarRegisterRequest): Promise<any> => {
	const response = await fetch('/api/webinars', {
		method: 'POST',
		body: JSON.stringify(registerRequest)
	});
	return await response.json();
};
