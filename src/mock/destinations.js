import { CITIES, CITY_DESCRIPTIONS, IMG_URL, IMG_DESCRIPTIONS } from './const';
import { getRandomInteger, getRandomArrayElement } from '../helpers/utils';

const PICTURES_COUNT = 10;

function createRandomDestination () {
  return {
    id: crypto.randomUUID(),
    description: getRandomArrayElement(CITY_DESCRIPTIONS),
    name: getRandomArrayElement(CITIES),
    pictures: Array.from(
      {
        length: getRandomInteger(0, PICTURES_COUNT)
      }, () => ({
        src: `${IMG_URL}${getRandomInteger(0, PICTURES_COUNT)}`,
        description: getRandomArrayElement(IMG_DESCRIPTIONS),
      })
    )
  };
}

export { createRandomDestination };
