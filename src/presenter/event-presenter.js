import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../helpers/utils.js';

export default class EventPresenter {
  #point = null;
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventComponent = null;
  #eventEditComponent = null;

  constructor({container, destinationsModel, offersModel}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();
      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #replaceCardToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
  }

  init(point) {
    this.#point = point;
    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;
    const pointOffers = this.#offersModel.getByTypeAndIds(point.type, point.offers);

    // карточка события (точки)
    this.#eventComponent = new EventView({
      point: point,
      destination: this.#destinationsModel.getById(point.destination),
      offers: pointOffers,
      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: () => {
        point.isFavorite = !point.isFavorite;
      },
    });

    // форма редактирования события (точки)
    this.#eventEditComponent = new EventEditView({
      point: point,
      selectedDestination: this.#destinationsModel.getById(point.destination),
      destinations: this.#destinationsModel.destinations,
      availableOffers: this.#offersModel.getByType(point.type).offers,
      selectedOffers: this.#offersModel.getByTypeAndIds(point.type, point.offers),
      onFormSubmit: () => {
        this.#replaceFormToCard();
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#container.contains(prevEventComponent.element)) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#container.contains(prevEventEditComponent.element)) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }
}
