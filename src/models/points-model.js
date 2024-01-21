import Observable from './../framework/observable';

export default class PointsModel extends Observable {
  #points = [];

  constructor (mockService) {
    super();
    this.#points = mockService.points;
  }

  get points() {
    return this.#points;
  }
}
