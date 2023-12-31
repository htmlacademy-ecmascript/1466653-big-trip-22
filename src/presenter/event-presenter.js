import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../helpers/utils.js';

const Mode = {
  DEFAULT: 'PREVIEW',
  EDITING: 'EDIT',
};

export default class EventPresenter {
  #mode = Mode.DEFAULT;
  #point = null;
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #handleDataChange = null;
  #handleModeChange = null;

  constructor({container, destinationsModel, offersModel, onDataChange, onModeChange}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#handleDataChange = onDataChange;
    this.#handleModeChange = onModeChange;
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
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #handleFavoriteClick = () => {
    this.#handleDataChange({...this.#point, isFavorite: !this.#point.isFavorite});
  };

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
      onFavoriteClick: this.#handleFavoriteClick,
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
        this.#handleDataChange(this.#point);
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      }
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventEditComponent, prevEventEditComponent);
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }
}
