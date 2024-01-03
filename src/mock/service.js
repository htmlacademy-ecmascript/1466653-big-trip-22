import { OFFER_TYPES } from './const';
import { getRandomArrayElement, getRandomInteger } from '../helpers/utils';
import { createDestinations } from './destinations';
import { createOffer } from './offers';
import { createPoint } from './points';

const OFFERS_COUNT = 7;
const POINTS_COUNT = 10;

export default class MockService {
  #destinations = [];
  #offers = [];
  #points = [];

  constructor () {
    this.#destinations = this.generateDestinations();
    this.#offers = this.generateOffers();
    this.#points = this.generatePoints();
  }

  generateDestinations() {
    return createDestinations();
  }

  generateOffers() {
    return OFFER_TYPES.map((type) => ({
      type: type,
      offers: Array.from({ length: getRandomInteger(0, OFFERS_COUNT)}, () => createOffer()),
    }));
  }

  generatePoints() {
    return Array.from({ length: POINTS_COUNT}, () => {
      const type = getRandomArrayElement(OFFER_TYPES);
      const destination = getRandomArrayElement(this.#destinations);
      const hasOffers = !!getRandomInteger(0, 1);
      const offersOfPointType = this.#offers.find((offer) => offer.type === type);
      const offerIds = hasOffers ? offersOfPointType.offers.map((offer) => offer.id).slice(0, (offersOfPointType.offers.length - 1)) : [];

      return createPoint(destination.id, type, offerIds);
    });
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  get points() {
    return this.#points;
  }
}
