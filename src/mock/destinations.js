import { CITIES, DESCRIPTIONS, IMG_URLS, IMG_DESCRIPTIONS } from './const';
import { getRandomArrayElement } from '../helpers/utils';

function createRandomDestination () {
  return {
    id: Crypto.randomUUID(),
    description: getRandomArrayElement(DESCRIPTIONS),
    name: getRandomArrayElement(CITIES),
    pictures: [
      {
        src: getRandomArrayElement(IMG_URLS),
        description: getRandomArrayElement(IMG_DESCRIPTIONS),
      },
      {
        src: getRandomArrayElement(IMG_URLS),
        description: getRandomArrayElement(IMG_DESCRIPTIONS),
      }
    ]
  };
}

export { createRandomDestination };
