import AbstractView from '../framework/view/abstract-view.js';
import { FilterType } from '../mock/const.js';

const NoEventsText = {
  [FilterType.DEFAULT]: 'Click New Event to create your first point',
  [FilterType.FUTURE]: 'There are no future points. Click New Event to create a future point',
  [FilterType.PRESENT]: 'There are no present points',
  [FilterType.PAST]: 'There are no points in past',
};

function createEventListEmptyTemplate({ filterType }) {
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
