import dotenv from 'dotenv';
import { bool, cleanEnv, email, host, num, port, str, url } from 'envalid';

import { cleanOptions, displayEnvironments } from '../utils/env';

dotenv.config();
const env = cleanEnv(
	process.env,
	{
		// Node Configuration
		NODE_ENV: str({
			default: 'production',
			devDefault: 'development',
			choices: ['development', 'test', 'production'],
		}),
		GAME_SHUTDOWN_TIMEOUT: num({
			default: 10000,
			devDefault: 10000,
			desc: 'The maximum time in milliseconds to wait for the server to close all connections before it is forcefully shutdown.',
			docs: 'https://nodejs.org/api/http.html#http_server_close_callback',
			example: '10000',
		}),
		GAME_COOKIES_EXPIRE_IN: num({
			default: 1000 * 60 * 60 * 24 * 15, // 15 days
			devDefault: 1000 * 60 * 60 * 24 * 15, // 15 days
			desc: 'The time in milliseconds for the cookies to expire.',
			docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
			example: '2592000000',
		}),
		// Server Configuration
		GAME_HOST: host({
			default: 'localhost',
			devDefault: 'localhost',
			desc: 'The host to bind the server to.',
			docs: 'https://nodejs.org/api/http.html#http_server_listen',
			example: 'localhost',
		}),
		PORT: port({
			devDefault: process.env.NODE_ENV === 'test' ? 3110 : /* istanbul ignore next */ 49544,
			desc: 'The port to bind the server to.',
			docs: 'https://nodejs.org/api/http.html#http_server_listen',
			example: '3000',
		}),
		GAME_CORS_ORIGIN: str({
			devDefault: 'http://localhost:*',
			desc: 'The origin to allow CORS requests.',
			docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS',
			example: 'http://localhost:*',
		}),
		// Models settings
		GAME_EXPIRE_IN_SECONDS: num({
			default: 300, // 5 minutes
			devDefault: 900, // 15 minutes
			desc: 'The time in seconds for the token to expire.',
			docs: 'https://jwt.io/',
		}),

		// Rate limit
		GAME_COMMON_RATE_LIMIT_MAX_REQUESTS: num({
			default: 20,
			devDefault: 100,
			desc: 'The maximum number of requests to allow in the window.',
			docs: 'https://www.npmjs.com/package/express-rate-limit',
			example: '20',
		}),
		GAME_COMMON_RATE_LIMIT_WINDOW_MS: num({
			default: 15 * 60 * 1000,
			devDefault: 15 * 60 * 1000,
			desc: 'The time in milliseconds for the window.',
			docs: 'https://www.npmjs.com/package/express-rate-limit',
			example: '900000',
		}),

		// MongoDB Configuration
		/* GAME_MONGODB_DB_URI_WITHOUT_CREDENTIALS: str({
			devDefault: 'mongodb://localhost:27017',
			desc: 'The URI of the MongoDB database without credentials.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'mongodb://localhost:27017',
		}),
		GAME_MONGODB_DB_HOST: host({
			devDefault: 'localhost',
			desc: 'The host of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'localhost',
		}),
		GAME_MONGODB_DB_PORT: port({
			devDefault: 27017,
			desc: 'The port of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: '27017',
		}), */
		/* GAME_MONGODB_DB_DATABASE: str({
			devDefault: process.env.NODE_ENV === 'test' ? 'test-game' :'game',
			desc: 'The name of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'a9ra',
		}),
		GAME_MONGODB_DB_USERNAME: str({
			default: undefined,
			devDefault: undefined,
			desc: 'The username of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'root',
		}),
		GAME_MONGODB_DB_PASSWORD: str({
			default: undefined,
			devDefault: undefined,
			desc: 'The password of the MongoDB database.',
			docs: 'https://www.npmjs.com/package/mongoose',
			example: 'root',
		}), */
		// Security config
		/* GAME_JWT_SECRET: str({
			desc: 'The secret to sign the JWT.',
			docs: 'https://jwt.io/',
			example: 'my-secret-key',
		}), */
		GAME_MOBILE_AGENT: str({
			default: 'Dart.+',
			devDefault: 'Dart.+|PostmanRuntime.+',
			desc: 'The regular expression to identify mobile agents.',
			docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent',
			example: 'Dart.+',
		}),

		// public Files and logs
		GAME_LOGS_DIR: str({
			default: 'logs',
			devDefault: 'logs',
			desc: 'The directory to store the logs.',
			docs: 'https://www.npmjs.com/package/pino',
			example: 'logs',
		}),
		GAME_PUBLIC_DIR: str({
			default: 'public',
			devDefault: 'public',
			desc: 'The directory to store the public files.',
			docs: 'https://expressjs.com/en/starter/static-files.html',
			example: 'public',
		}),
		GAME_PUBLIC_CASH_AGE: num({
			default: 31536000,
			devDefault: 0,
			desc: 'The maximum age in seconds for the public files.',
			docs: 'https://expressjs.com/en/starter/static-files.html',
			example: '31536000',
		}),
		GAME_TOKEN_NAME: str({
			default: 'a9ra-token',
			devDefault: 'a9ra-token',
			desc: 'The name of the token.',
			docs: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies',
			example: 'a9ra-token',
		}),
		// domains and subdomains
		GAME_DOMAIN: url({
			desc: 'The domain of the a9ra landing.',
			docs: 'https://en.wikipedia.org/wiki/Domain_name',
			example: 'https://a9ra.net',
		}),
		GAME_BACK_DOMAIN: url({
			desc: 'The domain of the SSO client.',
			docs: 'https://en.wikipedia.org/wiki/Subdomain',
			example: 'https://accounts.a9ra.net',
		}),
		GAME_ENABLE_ONLINE: bool({
			default: true,
			devDefault: true,
			desc: 'Enable online mode',
			docs: 'https://a9ra.net',
			example: 'true',
		}),
	},
	cleanOptions()
);
export default env;

export const {
	NODE_ENV,
	GAME_SHUTDOWN_TIMEOUT,
	GAME_COOKIES_EXPIRE_IN,
	GAME_HOST,
	PORT,
	GAME_CORS_ORIGIN,
	GAME_EXPIRE_IN_SECONDS,
	GAME_COMMON_RATE_LIMIT_MAX_REQUESTS,
	GAME_COMMON_RATE_LIMIT_WINDOW_MS,
	/* GAME_MONGODB_DB_URI_WITHOUT_CREDENTIALS, */
	/* GAME_MONGODB_DB_HOST,
	GAME_MONGODB_DB_PORT, */
	/* 	GAME_MONGODB_DB_DATABASE,
	GAME_MONGODB_DB_USERNAME,
	GAME_MONGODB_DB_PASSWORD, */

	/* 	GAME_JWT_SECRET, */
	GAME_MOBILE_AGENT,
	GAME_LOGS_DIR,
	GAME_PUBLIC_DIR,
	GAME_PUBLIC_CASH_AGE,
	GAME_TOKEN_NAME,
	GAME_BACK_DOMAIN,
	GAME_ENABLE_ONLINE,
	// env-valid other properties
	isDev,
	isProd,
	isTest,
} = env;
// display the environments in the console

displayEnvironments(env);
