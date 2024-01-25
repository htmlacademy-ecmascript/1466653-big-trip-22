import AbstractView from '../framework/view/abstract-view';

function createTripFilterItemTemplate (filterType, activeFilter) {
  return `
    <div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" checked="${filterType === activeFilter}">
      <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
    </div>
  `;
}

function createTripFiltersTemplate(filters, activeFilter) {
  console.log("createTripFiltersTemplate - filters", filters);
  // возвращает массив объектов с типом фильтра и количеством отфильтрованных событий
  return `
  <form class="trip-filters" action="#" method="get">
    ${filters.map((item) => createTripFilterItemTemplate(item.type, activeFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
}

export default class TripFiltersView extends AbstractView {
  #filters = [];
  #activeFilterType = null;
  #filterTypeChangeHandler = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#activeFilterType = currentFilterType;
    this.#filterTypeChangeHandler = onFilterTypeChange;
  }

  get template() {
    return createTripFiltersTemplate(this.#filters, this.#activeFilterType);
  }
}
