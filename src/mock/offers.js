import { OFFER_TITLES } from './const';
import { getRandomInteger, getRandomArrayElement } from '../helpers/utils';

const Price = {
  MIN: 50,
  MAX: 200,
};

function createOffer() {
  return {
    id: crypto.randomUUID(),
    title: getRandomArrayElement(OFFER_TITLES),
    price: getRandomInteger(Price.MIN, Price.MAX),
  };
}

export { createOffer };
