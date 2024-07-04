import { z } from 'zod';
// Math.random().toString(36).substring(2, 9)
export const roomValidator = z
	.string()
	.regex(/^[a-z0-9]{7}$/, {
		message: 'Room ID must be 7 characters long and contain only lowercase letters and numbers',
	});
