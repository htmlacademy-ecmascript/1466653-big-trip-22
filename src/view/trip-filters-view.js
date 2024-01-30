import AbstractView from '../framework/view/abstract-view';

function createTripFilterItemTemplate (filter, activeFilter) {
  const filterType = filter.type.toLowerCase();
  const isDisabled = filter.count === 0;
  const isChecked = filterType === activeFilter;

  return `
    <div class="trip-filters__filter">
      <input id="filter-${filterType}" class="trip-filters__filter-input  visually-hidden" type="radio" name="trip-filter" value="${filterType}" ${isChecked ? 'checked' : ''} ${isDisabled ? 'disabled' : ''}>
      <label class="trip-filters__filter-label" for="filter-${filterType}">${filterType}</label>
    </div>
  `;
}

function createTripFiltersTemplate(filters, activeFilter) {
  return `
  <form class="trip-filters" action="#" method="get">
    ${filters.map((item) => createTripFilterItemTemplate(item, activeFilter)).join('')}

    <button class="visually-hidden" type="submit">Accept filter</button>
  </form>
`;
}

export default class TripFiltersView extends AbstractView {
  #filters = [];
  #activeFilterType = null;
  #handleFilterTypeChange = null;

  constructor({ filters, currentFilterType, onFilterTypeChange }) {
    super();
    this.#filters = filters;
    this.#activeFilterType = currentFilterType;
    this.#handleFilterTypeChange = onFilterTypeChange;

    this.element.addEventListener('change', this.#filterTypeChangeHandler);
  }

  get template() {
    return createTripFiltersTemplate(this.#filters, this.#activeFilterType);
  }

  #filterTypeChangeHandler = (evt) => {
    this.#handleFilterTypeChange(evt.target.value);
  };
}
