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

  updateDestination(updateAction, destinationToUpdate) {
    const index = this.#destinations.findIndex((destination) => destination.id === destinationToUpdate.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting destination');
    }

    this.#destinations = [
      ...this.#destinations.slice(0, index),
      destinationToUpdate,
      ...this.#destinations.slice(index + 1),
    ];

    this._notify(updateAction, destinationToUpdate);
  }

  addDestination(updateAction, destinationToUpdate) {
    this.#destinations = [
      destinationToUpdate,
      ...this.#destinations,
    ];

    this._notify(updateAction, destinationToUpdate);
  }

  deleteDestination(updateAction, update) {
    const index = this.#destinations.findIndex((destination) => destination.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#destinations = [
      ...this.#destinations.slice(0, index),
      ...this.#destinations.slice(index + 1),
    ];

    this._notify(updateAction);
  }
}
