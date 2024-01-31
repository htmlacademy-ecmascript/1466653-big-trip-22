import Observable from './../framework/observable';
import { UpdateType } from './../mock/const';

export default class PointsModel extends Observable {
  #pointApiService = null;
  #points = [];

  constructor({ pointApiService }) {
    super();
    this.#pointApiService = pointApiService;

    // this.#pointApiService.points.then((points) => {
    //   console.log(points.map(this.#adaptToClient));
    // });
  }

  get points() {
    return this.#points;
  }

  async init() {
    try {
      const points = await this.#pointApiService.points;
      this.#points = points.map(this.#adaptToClient);
      console.log("PointsModel - init - this.#points", this.#points);
    } catch(err) {
      this.#points = [];
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
      throw new Error('Can\'t update task');
    }
  }

  addPoint(updateAction, pointToUpdate) {
    this.#points = [
      pointToUpdate,
      ...this.#points,
    ];

    this._notify(updateAction, pointToUpdate);
  }

  deletePoint(updateAction, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateAction);
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
