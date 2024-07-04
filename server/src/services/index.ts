import { RoomsManager } from '#server/Rooms';
import cardsToBeLoaded from '&server/cards';
import CardsManagerService from './CardsManager';

export const cardsManager = new CardsManagerService(cardsToBeLoaded);
export const roomsManager = new RoomsManager();

const services = [cardsManager];

export default services;
