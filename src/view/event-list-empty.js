import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from './../helpers/const.js';

const NoEventsText = {
  [FilterType.DEFAULT]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future events now',
  [FilterType.PRESENT]: 'There are no present events now',
  [FilterType.PAST]: 'There are no past events now',
};

function createEventListEmptyTemplate(filterType) {
  return `
  <p class="trip-events__msg">${NoEventsText[filterType]}</p>
  `;
}

export default class EventListEmptyView extends AbstractView {
  #filterType = null;

  constructor({ filterType }) {
    super();
    this.#filterType = filterType;
  }

  get template() {
    return createEventListEmptyTemplate(this.#filterType);
  }
}
