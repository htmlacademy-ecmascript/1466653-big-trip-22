import Observable from './../framework/observable';
import { UpdateType } from './../helpers/const';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #destinationsApiService = null;

  constructor ({ destinationsApiService }) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  getById(id) {
    return this.#destinations.find((destination) => destination.id === id);
  }

  getDestinationNames(ids) {
    const names = [];

    ids.forEach((id) => names.push(this.getById(id).name));

    return names;
  }

  async init() {
    try {
      this.#destinations = await this.#destinationsApiService.destinations;
    } catch(err) {
      this.#destinations = [];
    }

    this._notify(UpdateType.INIT);
  }
}
