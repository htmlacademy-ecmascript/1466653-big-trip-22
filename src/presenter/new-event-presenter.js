import { remove, render, RenderPosition } from './../framework/render.js';
import EventEditView from './../view/event-edit-view.js';
import { UserAction, UpdateType } from './../helpers/const.js';
import { isEscapeKey } from './../helpers/utils.js';

export default class NewEventPresenter {
  #container = null;
  #offersModel = null;
  #destinationsModel = null;
  #eventEditComponent = null;
  #onDataChange = null;
  #onDestroy = null;

  constructor({container, offersModel, destinationsModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#onDataChange = onDataChange;
    this.#onDestroy = onDestroy;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EventEditView({
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      offerTypes: this.#offersModel.types,
      onFormSubmit: this.#onFormSubmit,
      onFormClose: this.#onDeleteClick,
      onEventDelete: this.#onDeleteClick,
    });

    render(this.#eventEditComponent, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#onEscKeyDown);
  }

  setSaving() {
    this.#eventEditComponent.updateElement({
      isSaving: true,
      isDisabled: true,
    });
  }

  setAborting() {
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
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#onDestroy();
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;
    document.removeEventListener('keydown', this.#onEscKeyDown);
  }

  #onFormSubmit = (point) => {
    this.#onDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MAJOR,
      point,
    );
  };

  #onDeleteClick = () => {
    this.destroy();
  };

  #onEscKeyDown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
