import AbstractView from '../framework/view/abstract-view';
import { getDateMonthText } from '../helpers/dates';

function createTripInfoTemplate(points = [], destinationNames = [], offersPrice = 0) {
  const destinationsText = () => {
    if (destinationNames.length > 3) {
      return `${destinationNames[0]}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames[destinationNames.length - 1]}`;
    }

    if (destinationNames.length === 0) {
      return '';
    }

    return `${destinationNames.join('\u00a0-\u00a0')}`;
  };

  const datesText = () => {
    switch(true) {
      case points.length === 0:
        return '';
      case points.length === 1:
        return `${getDateMonthText(points[0].dateFrom)}`;
      default:
        return `${getDateMonthText(points[0].dateFrom)}&nbsp;&mdash;&nbsp;${getDateMonthText(points[points.length - 1].dateTo)}`;
    }
  };

  const totalSum = () => {
    if(points.length === 0) {
      return 0;
    }

    const sum = points.reduce((total, point) => (total + Number(point.basePrice)), 0);

    return sum + offersPrice;
  };

  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinationsText()}</h1>

      <p class="trip-info__dates">${datesText()}</p>
    </div>

    <p class="trip-info__cost">
      Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalSum()}</span>
    </p>
  </section>
`;
}

export default class TripInfoView extends AbstractView {
  #points = [];
  #destinationNames = [];
  #offersPrice = null;

  constructor({ points, destinationNames, offersPrice }) {
    super();
    this.#points = points;
    this.#destinationNames = destinationNames;
    this.#offersPrice = offersPrice;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinationNames, this.#offersPrice);
  }
}
