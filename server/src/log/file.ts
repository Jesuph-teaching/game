import { pino } from 'pino';

import { GAME_LOGS_DIR } from '&server/env';

export const fLogger = pino(
	{ name: 'game-file' },
	pino.destination({
		dest: `${GAME_LOGS_DIR}/game.log`,
		append: true,
		sync: true,
	})
);
