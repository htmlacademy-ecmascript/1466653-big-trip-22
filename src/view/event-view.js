import AbstractView from '../framework/view/abstract-view';
import {
  getDateTimeFullText,
  getMonthDateText,
  getTimeText,
  getDuration
} from '../helpers/dates';

function createEventTemplate(point, destination, offers) {
  const startDateText = getMonthDateText(point.dateFrom);
  const startDateTimeIsoText = getDateTimeFullText(point.dateFrom);
  const endDateTimeIsoText = getDateTimeFullText(point.dateTo);
  const startTimeText = getTimeText(point.dateFrom);
  const endTimeText = getTimeText(point.dateTo);
  const { minutes, hours, days } = getDuration(point.dateFrom, point.dateTo);
  const durationText = `${days ? `${days}D` : ''} ${hours}H ${minutes}M `;

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${startDateTimeIsoText}">${startDateText}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type}\u00a0${(destination && destination.name) ? destination.name : ''}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDateTimeIsoText}">${startTimeText}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDateTimeIsoText}">${endTimeText}</time>
        </p>
        <p class="event__duration">${durationText}</p>
      </div>
      <p class="event__price">
        &euro;&nbsp;<span class="event__price-value">${point.basePrice}</span>
      </p>

      ${ offers.length > 0 ? `
      <h4 class="visually-hidden">Offers:</h4>
      <ul class="event__selected-offers">
        ${offers.map((offer) => `<li class="event__offer">
        <span class="event__offer-title">${offer.title}</span>
        &plus;&euro;&nbsp;
        <span class="event__offer-price">${offer.price}</span>
      </li>`).join('')}
      </ul>` : ''}

      <button class="event__favorite-btn ${point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
        <span class="visually-hidden">Add to favorite</span>
        <svg class="event__favorite-icon" width="28" height="28" viewBox="0 0 28 28">
          <path d="M14 21l-8.22899 4.3262 1.57159-9.1631L.685209 9.67376 9.8855 8.33688 14 0l4.1145 8.33688 9.2003 1.33688-6.6574 6.48934 1.5716 9.1631L14 21z"/>
        </svg>
      </button>

      <button class="event__rollup-btn" type="button">
        <span class="visually-hidden">Open event</span>
      </button>
    </div>
  </li>
  `;
}

export default class EventView extends AbstractView {
  #point = null;
  #destination = null;
  #offers = null;
  #onEditClick = null;
  #onFavoriteClick = null;

  constructor({ point, selectedDestination, selectedOffers = [], onEditClick, onFavoriteClick }) {
    super();
    this.#point = point;
    this.#destination = selectedDestination;
    this.#offers = selectedOffers;
    this.#onEditClick = onEditClick;
    this.#onFavoriteClick = onFavoriteClick;

    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#onEditClick);
    this.element.querySelector('.event__favorite-btn').addEventListener('click', this.#favoriteClickHandler);
  }

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this.#onFavoriteClick(this.#point);
  };

  get template() {
    return createEventTemplate(this.#point, this.#destination, this.#offers);
  }
}
