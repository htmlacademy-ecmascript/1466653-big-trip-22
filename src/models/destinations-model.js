import Observable from './../framework/observable';

export default class DestinationsModel extends Observable {
  #destinations = [];

  constructor (service) {
    super();
    this.#destinations = service.destinations;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }
}
