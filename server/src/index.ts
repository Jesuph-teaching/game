import { cLogger } from '$server/console';
import { fLogger } from '$server/file';

import Server from '@server/server';
import { ExitCodes } from '&server/errors';

Server.start();
async function onClose(exitCode: number) {
	try {
		await Server.close();
	} catch (e) {
		cLogger.error(e, 'Error in closing server');
		fLogger.error(e, 'Error in closing server');
	} finally {
		cLogger.error('🔻 Server is down');
		fLogger.info('🔻 Server is down');
		process.exit(exitCode);
	}
}
function onCloseSignal(signal: string) {
	return async () => {
		cLogger.error(`${signal} received, shutting down`);
		await onClose(ExitCodes.SIGNAL_EXIT_CALL.code);
	};
}

process.on('SIGINT', onCloseSignal('SIGINT'));
process.on('SIGTERM', onCloseSignal('SIGTERM'));
process.on('SIGQUIT', onCloseSignal('SIGQUIT'));
process.on('SIGHUP', onCloseSignal('SIGHUP'));
process.on('uncaughtException', async (error) => {
	cLogger.error(`Uncaught Exception: ${error}`);
	fLogger.error(`Uncaught Exception: ${error}`);
	await onClose(ExitCodes.ERROR_GENERIC.code);
});
