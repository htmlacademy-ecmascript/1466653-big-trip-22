import SortFormView from '../view/sort-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import EventListEmptyView from '../view/event-list-empty.js';
import { render } from '../framework/render.js';
import { updateItem } from '../helpers/utils.js';
import { SortType } from '../mock/const';
import { sortEventsByTime, sortEventsByPrice } from '../helpers/utils.js';

export default class BoardPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventsListComponent = new EventsListView();
  #points = [];
  #localPoints = [];
  #eventPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.#mainContainer = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  get points() {
    return this.#pointsModel.points;
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #changeEvent = (updatedPoint) => {
    this.#points = updateItem(this.#points, updatedPoint);
    this.#localPoints = updateItem(this.#points, updatedPoint);
    this.#eventPresenters.get(updatedPoint.id).init(updatedPoint);
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortEvents(sortType) {
    switch (sortType) {
      case SortType.PRICE:
        this.#localPoints.sort(sortEventsByPrice);
        break;
      case SortType.TIME:
        this.#localPoints.sort(sortEventsByTime);
        break;
      default:
        this.#localPoints = [...this.#points];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEventsList();
  };

  #renderEvent(point) {
    const eventPresenter = new EventPresenter({
      container: this.#eventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#changeEvent,
      onModeChange: this.#handleModeChange,
    });

    eventPresenter.init(point);
    this.#eventPresenters.set(point.id, eventPresenter);
  }

  #renderSortForm() {
    this.#sortComponent = new SortFormView({
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#mainContainer);
  }

  // отрисовывает список точек маршрута
  #renderEventsList() {
    render(this.#eventsListComponent, this.#mainContainer);

    if (this.#localPoints.length > 0) {
      for (let i = 1; i < this.#localPoints.length; i++) {
        this.#renderEvent(this.#localPoints[i]);
      }
    } else {
      render(new EventListEmptyView(), this.#mainContainer);
    }
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #renderBoard() {
    this.#renderSortForm();
    this.#renderEventsList();
  }

  init() {
    this.#points = [...this.#pointsModel.points];
    this.#localPoints = [...this.#pointsModel.points];

    this.#renderBoard();
  }
}
