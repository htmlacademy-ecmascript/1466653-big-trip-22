import { createPoints } from '../mock/points';

export default class PointsModel {
  points = createPoints();

  getPoints() {
    return this.tasks;
  }
}
