import Observable from './../framework/observable';
import { UpdateType } from './../helpers/const';

export default class PointsModel extends Observable {
  #pointApiService = null;
  #points = [];
  #isLoading = true;
  #isLoadingFailed = false;

  constructor({ pointApiService }) {
    super();
    this.#pointApiService = pointApiService;
  }

  get points() {
    return this.#points;
  }

  get isLoading() {
    return this.#isLoading;
  }

  get isLoadingFailed() {
    return this.#isLoadingFailed;
  }

  async init() {
    try {
      const points = await this.#pointApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#isLoadingFailed = false;
    } catch(err) {
      this.#isLoadingFailed = true;
    } finally {
      this.#isLoading = false;
    }

    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateAction, pointToUpdate) {
    const index = this.#points.findIndex((point) => point.id === pointToUpdate.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    try {
      const response = await this.#pointApiService.updatePoint(pointToUpdate);
      const updatedPoint = this.#adaptToClient(response);

      this.#points = [
        ...this.#points.slice(0, index),
        pointToUpdate,
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateAction, updatedPoint);
    } catch(err) {
      throw new Error('Can\'t update point');
    }
  }

  async addPoint(updateAction, pointToAdd) {
    try {
      const response = await this.#pointApiService.addPoint(pointToAdd);
      const addedPoint = this.#adaptToClient(response);

      this.#points = [
        addedPoint,
        ...this.#points,
      ];

      this._notify(updateAction, addedPoint);
    } catch(err) {
      throw new Error('Can\'t add a new point');
    }
  }

  async deletePoint(updateAction, pointToDelete) {
    const index = this.#points.findIndex((point) => point.id === pointToDelete.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    try {
      await this.#pointApiService.deletePoint(pointToDelete);

      this.#points = [
        ...this.#points.slice(0, index),
        ...this.#points.slice(index + 1),
      ];

      this._notify(updateAction);
    } catch(err) {
      throw new Error('Can\'t delete the point');
    }
  }

  #adaptToClient(point) {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'] !== null ? new Date(point['date_from']) : point['date_from'],
      dateTo: point['date_to'] !== null ? new Date(point['date_to']) : point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  }
}
