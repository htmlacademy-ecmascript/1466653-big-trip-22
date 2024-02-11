import Observable from './../framework/observable';
import { UpdateType } from './../helpers/const';

export default class DestinationsModel extends Observable {
  #destinations = [];
  #destinationsApiService = null;
  #isLoading = true;
  #isLoadingFailed = false;

  constructor ({ destinationsApiService }) {
    super();
    this.#destinationsApiService = destinationsApiService;
  }

  get destinations() {
    return this.#destinations;
  }

  get isLoading() {
    return this.#isLoading;
  }

  get isLoadingFailed() {
    return this.#isLoadingFailed;
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
      this.#isLoadingFailed = false;
    } catch(err) {
      this.#isLoadingFailed = true;
    } finally {
      this.#isLoading = false;
    }

    this._notify(UpdateType.INIT);
  }
}
