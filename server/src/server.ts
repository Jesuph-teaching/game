import BoxConsole from 'box-console';
import * as http from 'http';

import { GAME_HOST, isDev, isTest, NODE_ENV, PORT } from '&server/env';

import app from './app';
import services from './services';

class Server {
	private static manager: Promise<any[]> | null = null;
	public static serverListener: http.Server | null = null;

	public static async start() {
		if (Server.manager == null) Server.manager = Promise.all(services.map((service) => service.Connection));
		await Server.manager.then(Server.listen);
		//await userModel.createUser(generateRandomUser());
	}
	public static async listen() {
		Server.serverListener = app.listen(PORT, () => {
			/* istanbul ignore next */
			if (!isTest)
				BoxConsole([
					`🌐 Server (${NODE_ENV}) running`,
					`⌛ Server was up in ${process.uptime()} seconds`,
					`🚪 PORT: ${PORT}`,
					isDev ? `🖥️  HOST: http://${GAME_HOST}:${PORT}/` : '',
				]);
		});

		/* istanbul ignore next */
	}
	public static async close() {
		Server.serverListener!.close();
		await Promise.all(services.map((service) => service.stop()));
	}
}

export { app };
export default Server;
