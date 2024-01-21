import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getDateTimeFieldText } from '../helpers/dates.js';
import { defaultPoint } from '../mock/points.js';
import { OFFER_TYPES } from '../mock/const.js';
import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

function createOfferTypeSelectorsTemplate() {
  return OFFER_TYPES.map((offerType) => `
  <div class="event__type-item">
    <input id="event-type-${offerType.toLowerCase()}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${offerType}">
    <label class="event__type-label  event__type-label--${offerType.toLowerCase()}" for="event-type-${offerType.toLowerCase()}-1">${offerType}</label>
  </div>
  `).join('');
}

function createAvailableOffersTemplate(availableOffers, selectedOffers = []) {
  if (availableOffers.length === 0) {
    return '';
  }

  return `
  <section class="event__section  event__section--offers">
  <h3 class="event__section-title  event__section-title--offers">Offers</h3>

  <div class="event__available-offers">
    ${availableOffers.map((offer) => {
    const isOfferSelected = selectedOffers.includes(offer.id);
    const offerTitle = offer.title.toLowerCase().split(' ').join('-');

    return `
      <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-${offer.id}" type="checkbox" name="event-offer-${offerTitle}" ${isOfferSelected ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-${offer.id}">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>
    `;
  }).join('')}
    </div>
  </section>
  `;
}

function createDestinationPhotosTemplate(pictures) {
  if (!pictures) {
    return '';
  }

  return `
    <div class="event__photos-container">
      <div class="event__photos-tape">
        ${pictures.map((pic) => `
          <img class="event__photo" src="${pic.src}" alt="${pic.description}">
        `).join('')}
      </div>
    </div>`;
}

function createDestinationTemplate(destination) {
  if (!destination) {
    return '';
  }

  return `
    <section class="event__section  event__section--destination">
      <h3 class="event__section-title  event__section-title--destination">Destination</h3>
      ${destination.description ? `<p class="event__destination-description">${destination.description}</p>` : ''}

      ${destination.pictures.length > 0 ? createDestinationPhotosTemplate(destination.pictures) : ''}
    </section>`;
}

function createEventEditTemplate(point, allDestinations, allOffers) {
  const startDateTimeText = getDateTimeFieldText(point.dateFrom);
  const endDateTimeText = getDateTimeFieldText(point.dateTo);
  const pointId = point.id || 0;
  const selectedDestination = allDestinations.find((item) => item.id === point.destination);
  const availableTypeOffers = allOffers.find((item) => item.type === point.type)?.offers || [];

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-${pointId}">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-${pointId}" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>

              ${createOfferTypeSelectorsTemplate()}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-${pointId}">
            ${point.type}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${selectedDestination ? selectedDestination.name : ''}" list="destination-list-${pointId}">
          <datalist id="destination-list-${pointId}">
            ${allDestinations.map((item) => `<option value="${item.name}"></option>`).join('')}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-${pointId}">From</label>
          <input class="event__input  event__input--time" id="event-start-time-${pointId}" type="text" name="event-start-time" value="${startDateTimeText}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-${pointId}" type="text" name="event-end-time" value="${endDateTimeText}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-${pointId}">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${point.basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">${point.id ? 'Delete' : 'Cancel'}</button>
        ${point.id ? `
          <button class="event__rollup-btn" type="button">
            <span class="visually-hidden">Open event</span>
          </button>
        ` : ''}
      </header>

      <section class="event__details">
        ${createAvailableOffersTemplate(availableTypeOffers, point.offers)}
        ${createDestinationTemplate(selectedDestination)}
      </section>
    </form>
  </li>
  `;
}

export default class EventEditView extends AbstractStatefulView {
  #point = null;
  #selectedDestination = null;
  #offers = [];
  #destinations = [];
  #handleSaveClick = null;
  #datepickerStart = null;
  #datepickerEnd = null;
  #onDateChangeHandler = null;

  constructor({ point = defaultPoint, selectedDestination, destinations, offers, onFormSubmit }) {
    super();
    this.#point = point;
    this._state = EventEditView.parsePointToState(point);
    this.#selectedDestination = selectedDestination;
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleSaveClick = onFormSubmit;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onFormSubmit);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#onFormSubmit);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onFormSubmit);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    // destinationChange

    this.#setCalendarStart();
    this.#setCalendarEnd();
  }

  #setCalendarStart () {
    this.#datepickerStart = flatpickr(this.element.querySelectorAll('.event__input--time')[0], {
      dateFormat: 'd/m/y',
      minDate: new Date(),
      // eslint-disable-next-line camelcase
      time_24hr: true,
      onChange: this.#onDateStartChangeHandler,
    });
  }

  #setCalendarEnd () {
    this.#datepickerEnd = flatpickr(this.element.querySelectorAll('.event__input--time')[1], {
      dateFormat: 'd/m/y',
      minDate: this.#datepickerStart.selectedDates[0] || new Date(),
      // eslint-disable-next-line camelcase
      time_24hr: true,
      onChange: this.#onDateEndChangeHandler,
    });
  }

  #onFormSubmit = (evt) => {
    evt.preventDefault();
    this.#handleSaveClick();
  };

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
    });
  };

  #onDestinationChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      destination: evt.target.value,
    });
  };

  #onPriceChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      basePrice: evt.target.value,
    });
  };

  #onDateStartChangeHandler = ([date]) => {
    this.updateElement({dateFrom: date});
    this.#datepickerEnd.destroy();
    this.#setCalendarEnd();
  };

  #onDateEndChangeHandler = ([date]) => {
    this.updateElement({dateTo: date});
  };

  removeElement() {
    super.removeElement();

    this.#datepickerStart.destroy();
    this.#datepickerEnd.destroy();
    this.#datepickerStart = null;
    this.#datepickerEnd = null;
  }

  static parsePointToState(point) {
    return {
      ...point,
    };
  }

  static parseStateToPoint(state) {
    const point = {...state};
    return point;
  }
}
