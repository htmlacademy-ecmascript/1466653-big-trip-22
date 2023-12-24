export default class PointsModel {
  constructor (service) {
    this.points = service.getPoints();
  }

  getPoints() {
    return this.points;
  }
}
