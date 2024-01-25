import SortFormView from '../view/sort-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import EventListEmptyView from '../view/event-list-empty.js';
import { render, remove } from '../framework/render.js';
// import { updateItem } from '../helpers/utils.js';
import { SortType, UpdateType, UserAction } from '../mock/const';
import { sortEventsByTime, sortEventsByPrice } from '../helpers/utils.js';

export default class BoardPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventsListComponent = new EventsListView();
  #eventPresenters = new Map();
  #sortComponent = null;
  #currentSortType = SortType.DEFAULT;

  constructor({container, pointsModel, destinationsModel, offersModel}) {
    this.#mainContainer = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;

    this.#pointsModel.addObserver(this.#handlePointsModelEvent);
  }

  get points() {
    switch (this.#currentSortType) {
      case SortType.PRICE:
        return [...this.#pointsModel.points].sort(sortEventsByPrice);
      case SortType.TIME:
        return [...this.#pointsModel.points].sort(sortEventsByTime);
      default:
        return [...this.#pointsModel.points];
    }
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  #handleViewAction = (actionType, updateType, dataToUpdate) => {
    // actionType - действие пользователя, нужно чтобы понять, какой метод модели вызвать
    // updateType - тип изменений, нужно чтобы понять, что после нужно обновить
    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#pointsModel.updatePoint(updateType, dataToUpdate);
        break;
      case UserAction.ADD_EVENT:
        this.#pointsModel.addPoint(updateType, dataToUpdate);
        break;
      case UserAction.DELETE_EVENT:
        this.#pointsModel.deletePoint(updateType, dataToUpdate);
        break;
    }
  };

  #handlePointsModelEvent = (updateType, pointToUpdate) => {
    switch (updateType) {
      // - обновить часть списка (например, когда поменялось описание)
      case UpdateType.PATCH:
        this.#eventPresenters.get(pointToUpdate.id).init(pointToUpdate);
        break;
      // - обновить список (например, когда задача ушла в архив)
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderEventsList();
        break;
      // - обновить всю доску (например, при переключении фильтра)
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
  };

  #sortEvents(sortType) {
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
      // что передавать - модельки или массивы?
      // если модельки, то можно использовать функции для фильтрации, объявленные там
      container: this.#eventsListComponent.element,
      destinationsModel: this.#destinationsModel,
      offersModel: this.#offersModel,
      onDataChange: this.#handleViewAction,
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

    if (this.points.length > 0) {
      for (let i = 1; i < this.points.length; i++) {
        this.#renderEvent(this.points[i]);
      }
    } else {
      render(new EventListEmptyView(), this.#mainContainer);
    }
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #clearBoard() {
    remove(this.#sortComponent);
    remove(this.#eventPresenters);
  }

  #renderBoard() {
    this.#renderSortForm();
    this.#renderEventsList();
  }

  init() {
    this.#renderBoard();
  }
}
