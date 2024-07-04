import { cardsManager } from '@server/services';
import { handleServiceResponse } from '@server/utils/httpHandlers';
import { ResponseStatus, ServiceResponse } from '@server/utils/serviceResponse';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export async function getCards(req: Request, res: Response) {
	const cards: CardEssential<string>[] = await cardsManager.Connection;
	const serviceResponse = new ServiceResponse(
		ResponseStatus.Success,
		'Cards loaded successfully',
		cards,
		StatusCodes.OK
	);

	handleServiceResponse(serviceResponse, res);
}
