import SortFormView from '../view/sort-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventPresenter from './event-presenter.js';
import NewEventPresenter from './new-event-presenter.js';
import EventListEmptyView from '../view/event-list-empty-view.js';
import LoadingMessageView from '../view/loading-message-view.js';
import FailedLoadingMessageView from '../view/failed-loading-message-view.js';
import { render, remove } from '../framework/render.js';
import { filter } from '../helpers/utils.js';
import { FilterType, SortType, UpdateType, UserAction, TimeLimit } from './../helpers/const.js';
import { sortEventsByTime, sortEventsByPrice, sortEventsByDate } from '../helpers/utils.js';
import UiBlocker from '../framework/ui-blocker/ui-blocker.js';

export default class BoardPresenter {
  #mainContainer = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #filterModel = null;
  #eventsListComponent = new EventsListView();
  #eventPresenters = new Map();
  #newEventPresenter = null;
  #sortComponent = null;
  #noEventsComponent = null;
  #loadingComponent = new LoadingMessageView();
  #failedLoadingComponent = new FailedLoadingMessageView();
  #currentSortType = SortType.DEFAULT;
  #currentFilter = FilterType.DEFAULT;
  #isLoading = true;
  #uiBlocker = new UiBlocker({
    lowerLimit: TimeLimit.LOWER_LIMIT,
    upperLimit: TimeLimit.UPPER_LIMIT
  });

  constructor({ container, pointsModel, destinationsModel, offersModel, filterModel, onNewEventDestroy }) {
    this.#mainContainer = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#filterModel = filterModel;

    this.#newEventPresenter = new NewEventPresenter({
      container: this.#eventsListComponent.element,
      offersModel: this.#offersModel,
      destinationsModel: this.#destinationsModel,

      onDataChange: this.#handleViewAction,
      onDestroy: onNewEventDestroy
    });

    this.#pointsModel.addObserver(this.#handlePointsModelEvent);
    this.#offersModel.addObserver(this.#handlePointsModelEvent);
    this.#destinationsModel.addObserver(this.#handlePointsModelEvent);
    this.#filterModel.addObserver(this.#handlePointsModelEvent);
  }

  get points() {
    this.#currentFilter = this.#filterModel.filter;
    const points = this.#pointsModel.points;
    const filteredPoints = filter[this.#currentFilter](points);

    switch (this.#currentSortType) {
      case SortType.PRICE:
        return filteredPoints.sort(sortEventsByPrice);
      case SortType.TIME:
        return filteredPoints.sort(sortEventsByTime);
      default:
        return filteredPoints.sort(sortEventsByDate);
    }
  }

  get destinations() {
    return this.#destinationsModel.destinations;
  }

  get offers() {
    return this.#offersModel.offers;
  }

  init() {
    this.#renderBoard();
  }

  createEvent() {
    this.#currentSortType = SortType.DEFAULT;
    this.#filterModel.setFilter(UpdateType.MAJOR, FilterType.DEFAULT);
    this.#newEventPresenter.init();

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
  }

  recoverNoEventsMessage() {
    if (this.points.length === 0) {
      this.#renderNoEventsComponent();
    }
  }

  #sortEvents(sortType) {
    this.#currentSortType = sortType;
  }

  #renderEvent(point) {
    const eventPresenter = new EventPresenter({
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
      currentSortType: this.#currentSortType,
      onSortTypeChange: this.#handleSortTypeChange,
    });

    render(this.#sortComponent, this.#mainContainer);
  }

  #renderEventsList() {
    render(this.#eventsListComponent, this.#mainContainer);

    if (this.points.length > 0) {
      this.points.forEach((point) => this.#renderEvent(point));
    } else {
      this.#renderNoEventsComponent();
    }
  }

  #renderNoEventsComponent() {
    this.#noEventsComponent = new EventListEmptyView({ filterType: this.#currentFilter });
    render(this.#noEventsComponent, this.#mainContainer);
  }

  #renderLoading() {
    render(this.#loadingComponent, this.#mainContainer);
  }

  #renderFailedLoading() {
    render(this.#failedLoadingComponent, this.#mainContainer);
  }

  #clearEventsList() {
    this.#eventPresenters.forEach((presenter) => presenter.destroy());
    this.#eventPresenters.clear();
  }

  #clearBoard() {
    this.#clearEventsList();
    this.#newEventPresenter.destroy();
    this.#currentSortType = SortType.DEFAULT;

    remove(this.#sortComponent);
    remove(this.#loadingComponent);
    remove(this.#failedLoadingComponent);

    if (this.#noEventsComponent) {
      remove(this.#noEventsComponent);
    }
  }

  #renderBoard() {
    this.#renderSortForm();

    if (this.#isLoading) {
      this.#renderLoading();
      return;
    }

    if (!this.#destinationsModel.destinations.length ||
        !this.#pointsModel.points.length && !this.#offersModel.offers.length) {
      this.#renderFailedLoading();
      return;
    }

    this.#renderEventsList();
  }

  #handleViewAction = async (actionType, updateType, dataToUpdate) => {
    this.#uiBlocker.block();

    switch (actionType) {
      case UserAction.UPDATE_EVENT:
        this.#eventPresenters.get(dataToUpdate.id).setSaving();
        try {
          await this.#pointsModel.updatePoint(updateType, dataToUpdate);
        } catch(err) {
          this.#eventPresenters.get(dataToUpdate.id).setAborting();
        }
        break;
      case UserAction.ADD_EVENT:
        this.#newEventPresenter.setSaving();
        try {
          await this.#pointsModel.addPoint(updateType, dataToUpdate);
        } catch(err) {
          this.#newEventPresenter.setAborting();
        }
        break;
      case UserAction.DELETE_EVENT:
        this.#eventPresenters.get(dataToUpdate.id).setDeleting();
        try {
          await this.#pointsModel.deletePoint(updateType, dataToUpdate);
        } catch(err) {
          this.#eventPresenters.get(dataToUpdate.id).setAborting();
        }
        break;
    }

    this.#uiBlocker.unblock();
  };

  #handlePointsModelEvent = (updateType, pointToUpdate) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#eventPresenters.get(pointToUpdate.id).init(pointToUpdate);
        break;
      case UpdateType.MINOR:
        this.#clearEventsList();
        this.#renderEventsList();
        break;
      case UpdateType.MAJOR:
        this.#clearBoard();
        this.#renderBoard();
        break;
      case UpdateType.INIT:
        this.#isLoading = false;
        remove(this.#loadingComponent);
        this.#clearBoard();
        this.#renderBoard();
        break;
    }
  };

  #handleModeChange = () => {
    this.#eventPresenters.forEach((presenter) => presenter.resetView());
    this.#newEventPresenter.destroy();
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortEvents(sortType);
    this.#clearEventsList();
    this.#renderEventsList();
  };
}
