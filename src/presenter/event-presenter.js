import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import { render, replace, remove } from '../framework/render.js';
import { isEscapeKey, isDatesEqual, isDurationEqual } from '../helpers/utils.js';
import { UserAction, UpdateType } from './../helpers/const.js';

const Mode = {
  DEFAULT: 'PREVIEW',
  EDIT: 'EDIT',
};

export default class EventPresenter {
  #mode = Mode.DEFAULT;
  #point = null;
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #eventComponent = null;
  #eventEditComponent = null;
  #onDataChange = null;
  #onModeChange = null;

  constructor({container, destinationsModel, offersModel, onDataChange, onModeChange}) {
    this.#container = container;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#onDataChange = onDataChange;
    this.#onModeChange = onModeChange;
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
        document.addEventListener('keydown', this.#onEscKeyDown);
      },
      onFavoriteClick: this.#onFavoriteClick,
    });

    this.#eventEditComponent = new EventEditView({
      point,
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      offerTypes: this.#offersModel.types,

      onFormSubmit: this.#onFormSubmit,
      onFormClose: this.#onFormClose,
      onEventDelete: this.#onEventDelete,
    });

    if (prevEventComponent === null || prevEventEditComponent === null) {
      render(this.#eventComponent, this.#container);
      return;
    }

    if (this.#mode === Mode.DEFAULT) {
      replace(this.#eventComponent, prevEventComponent);
    }

    if (this.#mode === Mode.EDIT) {
      replace(this.#eventComponent, prevEventEditComponent);
      this.#mode = Mode.DEFAULT;
    }

    remove(prevEventComponent);
    remove(prevEventEditComponent);
  }

  resetView() {
    if (this.#mode !== Mode.DEFAULT) {
      this.#eventEditComponent.reset(this.#point);
      this.#replaceFormToCard();
    }
  }

  setSaving() {
    if (this.#mode === Mode.EDIT) {
      this.#eventEditComponent.updateElement({
        isSaving: true,
        isDisabled: true,
      });
    }
  }

  setDeleting() {
    if (this.#mode === Mode.EDIT) {
      this.#eventEditComponent.updateElement({
        isDeleting: true,
        isDisabled: true,
      });
    }
  }

  setAborting() {
    if (this.#mode === Mode.DEFAULT) {
      this.#eventComponent.shake();
      return;
    }

    const resetFormState = () => {
      this.#eventEditComponent.updateElement({
        isDisabled: false,
        isSaving: false,
        isDeleting: false,
      });
    };

    this.#eventEditComponent.shake(resetFormState);
  }

  destroy() {
    remove(this.#eventComponent);
    remove(this.#eventEditComponent);
  }

  #replaceCardToForm() {
    replace(this.#eventEditComponent, this.#eventComponent);
    this.#onModeChange();
    this.#mode = Mode.EDIT;
  }

  #replaceFormToCard() {
    replace(this.#eventComponent, this.#eventEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.#eventEditComponent.reset(this.#point);
      this.#replaceFormToCard();

      document.removeEventListener('keydown', this.#onEscKeyDown);
    }
  };

  #onFavoriteClick = () => {
    this.#onDataChange(
      UserAction.UPDATE_EVENT,
      UpdateType.PATCH,
      {...this.#point, isFavorite: !this.#point.isFavorite},
    );
  };

  #onFormSubmit = (pointToUpdate) => {
    const isMinorUpdate =
      !isDatesEqual(this.#point.dateFrom, pointToUpdate.dateFrom) ||
      this.#point.basePrice !== pointToUpdate.basePrice ||
      !isDurationEqual(this.#point, pointToUpdate);
    this.#onDataChange(
      UserAction.UPDATE_EVENT,
      isMinorUpdate ? UpdateType.MINOR : UpdateType.PATCH,
      pointToUpdate,
    );

    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onEventDelete = (point) => {
    this.#onDataChange(
      UserAction.DELETE_EVENT,
      UpdateType.MINOR,
      point,
    );
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };

  #onFormClose = () => {
    this.#eventEditComponent.reset(this.#point);
    this.#replaceFormToCard();
    document.removeEventListener('keydown', this.#onEscKeyDown);
  };
}
