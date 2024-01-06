import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../helpers/utils.js';

export default class EventPresenter {
  #point = null;
  #container = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({point, container, destinationsModel, offersModel}) {
    this.#point = point;
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  #renderEvent() {
    const pointOffers = this.#offersModel.getByTypeAndIds(this.#point.type, this.#point.offers);

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
      point: this.#point,
      destination: this.#destinationsModel.getById(this.#point.destination),
      offers: pointOffers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavoriteClick: () => {
        this.#point.isFavorite = !this.#point.isFavorite;
      },
    });

    // компонент, отрисовывающий форму редактирования события (точки)
    const eventEditComponent = new EventEditView({
      point: this.#point,
      selectedDestination: this.#destinationsModel.getById(this.#point.destination),
      destinations: this.#destinationsModel.destinations,
      availableOffers: this.#offersModel.getByType(this.#point.type).offers,
      selectedOffers: this.#offersModel.getByTypeAndIds(this.#point.type, this.#point.offers),
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

    render(eventComponent, this.#container);
  }

  init() {
    this.#renderEvent();
  }
}
