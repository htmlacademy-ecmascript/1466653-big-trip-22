import AbstractView from '../framework/view/abstract-view';
import { getDateMonthText } from '../helpers/dates';

function createTripInfoTemplate(points = [], destinationNames = [], offersSum = 0) {
  const destinationsText = () => {
    if (destinationNames.length > 3) {
      return `${destinationNames[0]}&nbsp;&mdash;&nbsp;...&nbsp;&mdash;&nbsp;${destinationNames[destinationNames.length - 1]} `;
    }

    if (destinationNames.length === 0) {
      return '';
    }

    return `${destinationNames.join('\u00a0-\u00a0')} `;
  };

  const datesText = () => {
    switch(true) {
      case points.length === 0:
        return '';
      case points.length === 1:
        return ` ${getDateMonthText(points[0].dateFrom)} `;
      default:
        return `${getDateMonthText(points[0].dateFrom)}&nbsp;&mdash;&nbsp;${getDateMonthText(points[points.length - 1].dateTo)}`;
    }
  };

  const totalSum = () => {
    if (points.length === 0) {
      return '';
    }

    const pointsSum = points.reduce((sum, point) => (sum + Number(point.basePrice)), 0);
    const total = pointsSum + offersSum;

    if (total > 0) {
      return `Total: &euro;&nbsp;<span class="trip-info__cost-value">${total}</span>`;
    }

    return '';
  };

  return `
  <section class="trip-main__trip-info  trip-info">
    <div class="trip-info__main">
      <h1 class="trip-info__title">${destinationsText()}</h1>
      <p class="trip-info__dates">${datesText()}</p>
    </div>

    <p class="trip-info__cost">${totalSum()}</p>
  </section>
`;
}

export default class TripInfoView extends AbstractView {
  #points = [];
  #destinationNames = [];
  #offersPriceSum = null;

  constructor({ points, destinationNames, offersPriceSum }) {
    super();
    this.#points = points;
    this.#destinationNames = destinationNames;
    this.#offersPriceSum = offersPriceSum;
  }

  get template() {
    return createTripInfoTemplate(this.#points, this.#destinationNames, this.#offersPriceSum);
  }
}
