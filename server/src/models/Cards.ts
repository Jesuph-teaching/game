import { MyZodType } from '@server/utils/defaultZod';
import { readFile } from 'fs/promises';
import { z } from 'zod';

const CardValidator = z.object<MyZodType<CardEssential>>({
	id: z.number(),
	name: z.string(),
	image: z.string().url(),
});
const CardsValidator = z.object<MyZodType<CardsJSON>>({
	id: z.string(),
	name: z.string(),
	image: z.string().url(),
	cards: z.array(CardValidator),
});

export class CardsCollection implements CardsJSON {
	static cardCollectionMap: Map<string, CardsCollection> = new Map<string, CardsCollection>();
	static defaultCollection: CardsCollection;

	cards: CardEssential[];
	name: string;
	id: string;
	image: string;
	constructor(id: string, name: string, image: string, cards: CardEssential[]) {
		this.id = id;
		this.name = name;
		this.image = image;
		this.cards = cards;
	}
	static async loadCardsFromJson(fileName: string): Promise<CardEssential<string>> {
		const cardsJson = await readFile(fileName, 'utf-8');
		const cards = CardsValidator.parse(JSON.parse(cardsJson)); // catch an error that is instanceof z.ZodError
		console.log(`cards collection ${cards.name} loaded with ${cards.cards.length} cards`);
		const cardsCollection = new CardsCollection(cards.id, cards.name, cards.image, cards.cards);
		CardsCollection.cardCollectionMap.set(cards.id, cardsCollection);
		if (!CardsCollection.defaultCollection) CardsCollection.defaultCollection = cardsCollection;
		return {
			id: cardsCollection.id,
			name: cardsCollection.name,
			image: cardsCollection.image,
		};
	}
	static getCardsCollection(id: string): CardsCollection | null {
		const cardsCollection = CardsCollection.cardCollectionMap.get(id);
		if (!cardsCollection) return null;
		return cardsCollection;
	}
	getRandomN(n: number): CardsCollection {
		const randomCards: CardEssential[] = [];
		for (let i = 0; i < n; i++) {
			const randomIndex = Math.floor(Math.random() * this.cards.length);
			if (randomCards.includes(this.cards[randomIndex])) i--;
			else randomCards.push(this.cards[randomIndex]);
		}
		return new CardsCollection(this.id, this.name, randomCards[0].image, randomCards);
	}
}
