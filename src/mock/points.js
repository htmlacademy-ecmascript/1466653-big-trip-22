import { getRandomInteger, getRandomArrayElement } from '../helpers/utils';
import { OFFER_TYPES } from './const';

const points = [
  {
    id: Crypto.randomUUID(),
    basePrice: getRandomInteger(1000, 1500),
    dateFrom: '2023-09-10T22:55:56.845Z',
    dateTo: '2023-09-24T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: getRandomArrayElement(OFFER_TYPES),
  },
  {
    id: Crypto.randomUUID(),
    basePrice: getRandomInteger(1000, 1500),
    dateFrom: '2023-09-20T22:55:56.845Z',
    dateTo: '2023-09-24T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: getRandomArrayElement(OFFER_TYPES),
  },
  {
    id: Crypto.randomUUID(),
    basePrice: getRandomInteger(1000, 1500),
    dateFrom: '2023-10-20T22:55:56.845Z',
    dateTo: '2023-10-30T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: getRandomArrayElement(OFFER_TYPES),
  },
  {
    id: Crypto.randomUUID(),
    basePrice: getRandomInteger(1000, 1500),
    dateFrom: '2023-09-25T22:55:56.845Z',
    dateTo: '2023-10-14T11:22:13.375Z',
    destination: 'bfa5cb75-a1fe-4b77-a83c-0e528e910e04',
    isFavorite: false,
    offers: [
      'b4c3e4e6-9053-42ce-b747-e281314baa31'
    ],
    type: getRandomArrayElement(OFFER_TYPES),
  }
];

function createPoints () {
  return points;
}

export { createPoints };
