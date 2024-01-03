import SortFormView from '../view/sort-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render } from '../framework/render.js';
import { defaultPoint } from '../mock/points.js';

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

  init() {
    this.#points = [...this.#pointsModel.points];

    render(new SortFormView(), this.#mainContainer);
    render(this.#eventsListComponent, this.#mainContainer);

    // создает новую точку маршрута
    render(new EventEditView({
      point: defaultPoint,
      selectedDestination: this.#destinationsModel.getById(defaultPoint.destination),
      destinations: this.#destinationsModel.destinations,
      availableOffers: this.#offersModel.getByType(defaultPoint.type).offers,
    }), this.#eventsListComponent.element);

    // редактирует существующую точку маршрута
    render(
      new EventEditView({
        point: this.#points[0],
        selectedDestination: this.#destinationsModel.getById(this.#points[0].destination),
        destinations: this.#destinationsModel.destinations,
        availableOffers: this.#offersModel.getByType(this.#points[0].type).offers,
        selectedOffers: this.#offersModel.getByTypeAndIds(this.#points[0].type, this.#points[0].offers),
      }),
      this.#eventsListComponent.element
    );

    for (let i = 1; i < this.#points.length; i++) {
      this.#renderEvent(this.#points[i]);
    }
  }

  #renderEvent(point) {
    const pointOffers = this.#offersModel.getByTypeAndIds(point.type, point.offers);

    render(new EventView({
      point: point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: pointOffers,
    }), this.#eventsListComponent.element);
  }
}
