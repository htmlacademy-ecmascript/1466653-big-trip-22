import { createRandomDestination } from '../mock/destinations';

const DESTINATIONS_COUNT = 7;

export default class OffersModel {
  destinations = Array.from({ length: DESTINATIONS_COUNT }, createRandomDestination());

  getDestinations() {
    return this.destinations;
  }
}
