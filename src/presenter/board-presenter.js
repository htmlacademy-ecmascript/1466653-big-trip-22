import SortFormView from '../view/sort-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import EventListEmptyView from '../view/event-list-empty.js';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../helpers/utils.js';

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
    const pointOffers = this.#offersModel.getByTypeAndIds(point.type, point.offers);

    // закрывает форму, отображает карточку на Esc
    const escKeyDownHandler = (evt) => {
      if (isEscapeKey(evt)) {
        evt.preventDefault();
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    };

    // компонент, отрисовывающий карточку события (точки)
    const eventComponent = new EventView({
      point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: pointOffers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      }
    });

    // компонент, отрисовывающий форму редактирования события (точки)
    const eventEditComponent = new EventEditView({
      point,
      selectedDestination: this.#destinationsModel.getById(point.destination),
      destinations: this.#destinationsModel.destinations,
      availableOffers: this.#offersModel.getByType(point.type).offers,
      selectedOffers: this.#offersModel.getByTypeAndIds(point.type, point.offers),
      onFormSubmit: () => {
        replaceFormToCard();
        document.removeEventListener('keydown', escKeyDownHandler);
      }
    });

    function replaceCardToForm() {
      replace(eventEditComponent, eventComponent);
    }

    function replaceFormToCard() {
      replace(eventComponent, eventEditComponent);
    }

    render(eventComponent, this.#eventsListComponent.element);
  }

  init() {
    this.#points = [...this.#pointsModel.points];

    render(new SortFormView(), this.#mainContainer);
    render(this.#eventsListComponent, this.#mainContainer);

    // отрисовывает список точек маршрута
    if (this.#points.length > 0) {
      for (let i = 1; i < this.#points.length; i++) {
        this.#renderEvent(this.#points[i]);
      }
    } else {
      render(new EventListEmptyView(), this.#mainContainer);
    }
  }
}