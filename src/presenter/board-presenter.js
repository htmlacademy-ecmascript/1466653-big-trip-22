import SortFormView from '../view/sort-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import EventListEmptyView from '../view/event-list-empty.js';
import { render } from '../framework/render.js';

export default class BoardPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventsListComponent = new EventsListView();
  #points = [];

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.#mainContainer = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  #renderEvent(point) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
    });

    eventPresenter.init(point);
  }

  #renderSortForm() {
    render(new SortFormView(), this.#mainContainer);
  }

  // отрисовывает список точек маршрута
  #renderEventsList() {
    render(this.#eventsListComponent, this.#mainContainer);

    if (this.#points.length > 0) {
      for (let i = 1; i < this.#points.length; i++) {
        this.#renderEvent(this.#points[i]);
      }
    } else {
      render(new EventListEmptyView(), this.#mainContainer);
    }
  }

  #renderBoard() {
    this.#renderSortForm();
    this.#renderEventsList();
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    this.#renderBoard();
  }
}
