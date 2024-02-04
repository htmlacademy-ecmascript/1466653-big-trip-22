import { render, replace, remove, RenderPosition } from '../framework/render.js';
import TripInfoView from '../view/trip-info-view.js';

export default class TripInfoPresenter {
  #container = null;
  #pointsModel = null;
  #destinationsModel = null;
  #offersModel = null;
  #tripInfoComponent = null;

  constructor({container, pointsModel, destinationsModel, offersModel }) {
    this.#container = container;
    this.#pointsModel = pointsModel;
    this.#destinationsModel = destinationsModel;
    this.#offersModel = offersModel;
    this.#pointsModel.addObserver(this.#handleModelEvent);

  }

  init() {
    const prevTripInfoComponent = this.#tripInfoComponent;
    const destinationIds = this.#pointsModel.points.map((point) => point.destination);
    const points = this.#pointsModel.points;
    let offers = [];

    points.forEach((point) => {
      const newOffers = this.#offersModel.getByTypeAndIds(point.type, point.offers);

      if (newOffers && newOffers.length > 0) {
        offers = offers.concat(newOffers);
      }
    });

    this.#tripInfoComponent = new TripInfoView({
      points,
      destinationNames: this.#destinationsModel.getDestinationNames(destinationIds),
      offersPrice: offers.reduce((total, offer) => (total + offer.price), 0),
    });

    if (prevTripInfoComponent === null) {
      render(this.#tripInfoComponent, this.#container, RenderPosition.AFTERBEGIN);
      return;
    }

    replace(this.#tripInfoComponent, prevTripInfoComponent);
    remove(prevTripInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  };
}
