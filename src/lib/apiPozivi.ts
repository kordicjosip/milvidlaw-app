import type { webinarRegisterRequest } from '$lib/shared';

export const registerWebinar = async (registerRequest: webinarRegisterRequest): Promise<any> => {
	const response = await fetch('https://api.webinarjam.com/everwebinar/register', {
		method: 'POST',
		body: JSON.stringify(registerRequest)
	});
	return await response.json();
};
