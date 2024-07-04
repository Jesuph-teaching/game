import { Request } from 'express';

import { GAME_MOBILE_AGENT } from '&server/env';

const MobileRegex = new RegExp(GAME_MOBILE_AGENT, 'i');
export function isMobileRequest(req: Request) {
	return MobileRegex.test(req.headers['user-agent'] || '');
}
