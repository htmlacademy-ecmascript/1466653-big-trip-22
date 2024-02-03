import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey, isDatesEqual, isDurationEqual } from '../helpers/utils.js';
import { UserAction, UpdateType } from './../helpers/const.js';

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

  init(point) {
    this.#point = point;
    const selectedDestination = this.#destinationsModel.getById(point.destination);
    const prevEventComponent = this.#eventComponent;
    const prevEventEditComponent = this.#eventEditComponent;

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

    this.#eventEditComponent = new EventEditView({
      point,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      offerTypes: this.#offersModel.types,

      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleFormClose,
      onEventDelete: this.#handleEventDelete,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDITING) {
      replace(this.#eventComponent, prevEventEditComponent);
      // replace(this.#eventEditComponent, prevEventEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode !== Mode.EDIT) {
      this.#eventEditComponent.updateElement({
        isSaving: true,
        isDisabled: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode !== Mode.EDIT) {
      this.#eventEditComponent.updateElement({
        isDeleting: true,
        isDisabled: true,
      });
    }
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #replaceCardToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#handleModeChange();
    this.#mode = Mode.EDITING;
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#replaceFormToCard();

      document.removeEventListener('keydown', this.#escKeyDownHandler);
    }
  };

  #handleFavoriteClick = () => {
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.MINOR,
      {...this.#point, isFavorite: !this.#point.isFavorite,},
    );
  };

  #handleFormSubmit = (pointToUpdate) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, pointToUpdate.dateFrom) &&
      this.#point.basePrice !== pointToUpdate.basePrice &&
      !isDurationEqual(this.#point, pointToUpdate);
    this.#handleDataChange(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      pointToUpdate,
    );
    // this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleEventDelete = (point) => {
    this.#handleDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      point,
    );
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #handleFormClose = () => {
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };
}
