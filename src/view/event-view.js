import AbstractView from '../framework/view/abstract-view';
import {
  getDateTimeFullText,
  getDateTimeShortText,
  getDateMonthText,
  getTimeText,
  getDuration
} from '../helpers/utils';

function createEventTemplate(point, destination, offers) {
  const startDateText = getDateMonthText(point.dateFrom);
  const startDateTimeFullText = getDateTimeFullText(point.dateFrom);
  const endDateTimeFullText = getDateTimeFullText(point.dateTo);
  const startDateTimeShortText = getDateTimeShortText(point.dateFrom);
  const startTimeText = getTimeText(point.dateFrom);
  const endTimeText = getTimeText(point.dateTo);
  const { minutes, hours, days } = getDuration(point.dateFrom, point.dateTo);

  return `
  <li class="trip-events__item">
    <div class="event">
      <time class="event__date" datetime="${startDateTimeShortText}">${startDateText}</time>
      <div class="event__type">
        <img class="event__type-icon" width="42" height="42" src="img/icons/${point.type.toLowerCase()}.png" alt="Event type icon">
      </div>
      <h3 class="event__title">${point.type}\u00a0${destination.name}</h3>
      <div class="event__schedule">
        <p class="event__time">
          <time class="event__start-time" datetime="${startDateTimeFullText}">${startTimeText}</time>
          &mdash;
          <time class="event__end-time" datetime="${endDateTimeFullText}">${endTimeText}</time>
        </p>
        <p class="event__duration">
          ${days ? `${days}D ` : ''}
          ${hours}H
          ${minutes}M
        </p>
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

      <button class="event__favorite-btn ${!point.isFavorite ? 'event__favorite-btn--active' : ''}" type="button">
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
  constructor({ point, destination, selectedOffers = [] }) {
    super();
    this.point = point;
    this.destination = destination;
    this.offers = selectedOffers;
  }

  get template() {
    return createEventTemplate(this.point, this.destination, this.offers);
  }
}
