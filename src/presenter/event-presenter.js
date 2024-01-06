import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace } from '../framework/render.js';
import { isEscapeKey } from '../helpers/utils.js';

export default class EventPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;

  constructor({container, destinationsModel, offersModel}) {
    this.#container = container;
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
      point: point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: pointOffers,
      onEditClick: () => {
        replaceCardToForm();
        document.addEventListener('keydown', escKeyDownHandler);
      },
      onFavoriteClick: () => {
        point.isFavorite = !point.isFavorite;
      },
    });

    // компонент, отрисовывающий форму редактирования события (точки)
    const eventEditComponent = new EventEditView({
      point: point,
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

    render(eventComponent, this.#container);
  }

  init(point) {
    this.#renderEvent(point);
  }
}
