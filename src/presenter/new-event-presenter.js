import { remove, render, RenderPosition } from './../framework/render.js';
import EventEditView from './../view/event-edit-view.js';
import { UserAction, UpdateType } from './../helpers/const.js';
import { isEscapeKey } from './../helpers/utils.js';

export default class NewEventPresenter {
  #container = null;
  #offersModel = null;
  #destinationsModel = null;
  #eventEditComponent = null;
  #handleDataChange = null;
  #handleDestroy = null;

  constructor({container, offersModel, destinationsModel, onDataChange, onDestroy}) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
    this.#handleDataChange = onDataChange;
    this.#handleDestroy = onDestroy;
  }

  init() {
    if (this.#eventEditComponent !== null) {
      return;
    }

    this.#eventEditComponent = new EventEditView({
      destinations: this.#destinationsModel.destinations,
      offers: this.#offersModel.offers,
      offerTypes: this.#offersModel.types,
      onFormSubmit: this.#handleFormSubmit,
      onFormClose: this.#handleDeleteClick,
      onEventDelete: this.#handleDeleteClick,
    });

    render(this.#eventEditComponent, this.#container, RenderPosition.AFTERBEGIN);

    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#eventEditComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#eventEditComponent);
    this.#eventEditComponent = null;
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleFormSubmit = (point) => {
    this.#handleDataChange(
      UserAction.ADD_EVENT,
      UpdateType.MINOR,
      point,
    );
    this.destroy();
  };

  #handleDeleteClick = () => {
    this.destroy();
  };

  #escKeyDownHandler = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      this.destroy();
    }
  };
}
