import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import { getDateTimeFieldText } from '../helpers/dates.js';
import { defaultPoint } from '../mock/points.js';
import { OFFER_TYPES } from '../mock/const.js';
import flatpickr from 'flatpickr';
import he from 'he';

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
        <input class="event__offer-checkbox  visually-hidden" id="${offer.id}" type="checkbox" name="event-offer-${offerTitle}" value="${offer.id}" ${isOfferSelected ? 'checked' : ''}>
        <label class="event__offer-label" for="${offer.id}">
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
          <input class="event__input  event__input--destination" id="event-destination-${pointId}" type="text" name="event-destination" value="${selectedDestination ? he.encode(selectedDestination.name) : ''}" list="destination-list-${pointId}">
          <datalist id="destination-list-${pointId}">
            ${allDestinations.map((item) => `<option value="${item.name}" data-destination-id="${item.id}"></option>`).join('')}
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
          <input class="event__input  event__input--price" id="event-price-${pointId}" type="text" name="event-price" value="${point.basePrice ?? ''}">
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
  #offers = [];
  #destinations = [];
  #datepickerStart = null;
  #datepickerEnd = null;
  #handleSaveClick = null;
  #handleResetClick = null;
  #handleDeleteClick = null;

  constructor({ point = defaultPoint, destinations, offers, onFormSubmit, onFormClose, onEventDelete }) {
    super();
    this.#point = point;
    this._state = EventEditView.parsePointToState(point);
    this.#destinations = destinations;
    this.#offers = offers;
    this.#handleSaveClick = onFormSubmit;
    this.#handleResetClick = onFormClose;
    this.#handleDeleteClick = onEventDelete;

    this._restoreHandlers();
  }

  get template() {
    return createEventEditTemplate(this._state, this.#destinations, this.#offers);
  }

  _restoreHandlers() {
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#onFormSubmit);
    this.element.querySelector('.event__reset-btn').addEventListener('click', this.#onDeleteEvent);
    this.element.querySelector('.event__type-group').addEventListener('change', this.#onTypeChange);
    this.element.querySelector('.event__input--price').addEventListener('change', this.#onPriceChange);
    this.element.querySelector('.event__input--destination').addEventListener('change', this.#onDestinationСhange);

    const offersSelector = this.element.querySelector('.event__available-offers');
    const rollupBtn = this.element.querySelector('.event__rollup-btn');

    if(rollupBtn) {
      rollupBtn.addEventListener('click', this.#handleResetClick);
    }
    if(offersSelector) {
      offersSelector.addEventListener('change', this.#onOfferChange);
    }

    this.#setCalendarStart();
    this.#setCalendarEnd();
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

  removeElement() {
    super.removeElement();

    this.#datepickerStart.destroy();
    this.#datepickerEnd.destroy();
    this.#datepickerStart = null;
    this.#datepickerEnd = null;
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
    this.#handleSaveClick(EventEditView.parseStateToPoint(this._state));
  };

  #onDeleteEvent = (evt) => {
    evt.preventDefault();
    this.#handleDeleteClick(EventEditView.parseStateToPoint(this._state));
  };

  #onTypeChange = (evt) => {
    evt.preventDefault();
    this.updateElement({
      type: evt.target.value,
      offers: [],
    });
  };

  #onOfferChange = (evt) => {
    let selectedOffers = this._state.offers;

    if (selectedOffers.includes(evt.target.value)) {
      selectedOffers = selectedOffers.filter((item) => item !== evt.target.value);
    } else {
      selectedOffers.push(evt.target.value);
    }

    this.updateElement({
      offers: selectedOffers,
    });
  };

  #onDestinationСhange = (evt) => {
    const selectedDestination = this.#destinations.find((item) => evt.target.value === item.name);

    if (selectedDestination) {
      this.updateElement({
        destination: selectedDestination.id,
      });
    }
  };

  #onPriceChange = (evt) => {
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
}
