import type { lawmaticsRegisterRequest, webinarRegisterRequest } from '$lib/shared';

export const registerWebinar = async (registerRequest: webinarRegisterRequest): Promise<any> => {
	const response = await fetch('/api/webinars', {
		method: 'POST',
		body: JSON.stringify(registerRequest)
	});
	return await response.json();
};

export const registerLawmatics = async (
	registerRequest: lawmaticsRegisterRequest
): Promise<any> => {
	const response = await fetch('/api/lawmatics', {
		method: 'POST',
		headers: {
			'content-type': 'application/json',
			Accepts: 'application/json'
		},
		body: JSON.stringify(registerRequest)
	});
	return await response.json();
};
