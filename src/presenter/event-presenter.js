import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey } from '../helpers/utils.js';
import { UserAction, UpdateType } from './../mock/const.js';

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
    this.#handleDataChange(
      UserAction.UPDATE_TASK,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite,},
    );
  };

  init(point) {
    this.#point = point;
    const selectedDestination = this.#destinationsModel.getById(point.destination);
    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

    // карточка события (точки)
    this.#eventComponent = new EventView({
      point,
      selectedDestination,
      selectedOffers: this.#offersModel.getByTypeAndIds(point.type, point.offers),

      onEditClick: () => {
        this.#replaceCardToForm();
        document.addEventListener('keydown', this.#escKeyDownHandler);
      },
      onFavoriteClick: this.#handleFavoriteClick,
    });

    // форма редактирования события (точки)
    this.#eventEditComponent = new EventEditView({
      point,
      selectedDestination,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,

      onFormSubmit: () => {
        this.#replaceFormToCard();
        this.#handleDataChange(
          UserAction.UPDATE_TASK,
          UpdateType.MINOR,
          this.#point,
        );
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
