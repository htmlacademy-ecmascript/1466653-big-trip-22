export default class PointsModel {
  #points = [];

  constructor (mockService) {
    this.#points = mockService.points;
  }

  get points() {
    return this.#points;
  }
}
