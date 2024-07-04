import { GAME_CORS_ORIGIN } from '&server/env';
import cors from 'cors';
export const corsOptions = { origin: new RegExp(GAME_CORS_ORIGIN), credentials: true };
const defaultCors = cors(corsOptions);
export default defaultCors;
