import Observable from './../framework/observable';

export default class PointsModel extends Observable {
  #pointApiService = null;
  #points = [];

  constructor({ pointApiService }) {
    super();
    this.#pointApiService = pointApiService;

    this.#pointApiService.points.then((point) => {
      console.log(point);
      // Есть проблема: cтруктура объекта похожа, но некоторые ключи называются иначе,
      // а ещё на сервере используется snake_case, а у нас camelCase.
      // Можно, конечно, переписать часть нашего клиентского приложения, но зачем?
      // Есть вариант получше - паттерн "Адаптер"
    });
  }

  get points() {
    return this.#points;
  }

  updatePoint(updateAction, pointToUpdate) {
    const index = this.#points.findIndex((point) => point.id === pointToUpdate.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting point');
    }

    this.#points = [
      ...this.#points.slice(0, index),
      pointToUpdate,
      ...this.#points.slice(index + 1),
    ];

    this._notify(updateAction, pointToUpdate);
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
}
