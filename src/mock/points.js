import { getRandomInteger, getRandomStartDate, getRandomEndDate } from '../helpers/utils';

const Price = {
  MIN: 1000,
  MAX: 2000,
};

const defaultPoint = {
  id: null,
  basePrice: 0,
  dateFrom: null,
  dateTo: null,
  destination: '',
  isFavorite: false,
  offers: [],
  type: 'Flight',
};

function createPoint (destinationId, type, offerIds) {
  return {
    id: crypto.randomUUID(),
    basePrice: getRandomInteger(Price.MIN, Price.MAX),
    dateFrom: getRandomStartDate(),
    dateTo: getRandomEndDate(),
    destination: destinationId,
    isFavorite: !!getRandomInteger(0, 1),
    offers: offerIds,
    type: type,
  };
}

export { defaultPoint, createPoint };
