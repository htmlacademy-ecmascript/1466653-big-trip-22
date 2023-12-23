import { OFFER_TYPES, OFFER_TITLES } from './const';
import { getRandomInteger, getRandomArrayElement } from '../helpers/utils';

function getOffers() {
  return OFFER_TYPES.map((item) => ({
    type: item,
    offers: [
      {
        id: Crypto.randomUUID(),
        title: getRandomArrayElement(OFFER_TITLES),
        price: getRandomInteger(50, 200)
      },
      {
        id: Crypto.randomUUID(),
        title: getRandomArrayElement(OFFER_TITLES),
        price: getRandomInteger(50, 200)
      },
      {
        id: Crypto.randomUUID(),
        title: getRandomArrayElement(OFFER_TITLES),
        price: getRandomInteger(50, 200)
      }
    ]})
  );
}

export { getOffers };
