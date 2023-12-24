import { CITIES, IMG_URL, IMG_DESCRIPTIONS } from './const';
import { getRandomInteger, getRandomArrayElement } from '../helpers/utils';

const PICTURES_COUNT = 10;

function createDestinations () {
  const destinations = [];

  for (const [cityName, cityDescription] of CITIES) {
    destinations.push({
      id: crypto.randomUUID(),
      description: cityDescription,
      name: cityName,
      pictures: Array.from(
        {
          length: getRandomInteger(0, PICTURES_COUNT)
        }, () => ({
          src: `${IMG_URL}${getRandomInteger(0, PICTURES_COUNT)}`,
          description: getRandomArrayElement(IMG_DESCRIPTIONS),
        })
      )
    });
  }

  return destinations;
}

export { createDestinations };
