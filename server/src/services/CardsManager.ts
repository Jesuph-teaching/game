import { CardsCollection } from '#server/Cards';

import Service from './Service';

/* service details */
const id = 'CardsManager';

export default class CardsManagerService extends Service<CardEssential<string>[]> {
	name = 'CardsManager';
	category = 'manager';
	description = 'Cards manager service to load all the cards needed for the game';

	constructor(cards: string[]) {
		super(id, CardsManagerService.connect(cards));
	}

	public static async connect(cards: string[]): Promise<CardEssential<string>[]> {
		return Promise.all(cards.map((card) => CardsCollection.loadCardsFromJson(card)));
	}

	public async stop(): Promise<void> {
		return Promise.resolve();
	}
}
