import Observable from './../framework/observable';

export default class OffersModel extends Observable {
  #offers = [];

  constructor (service) {
    super();
    this.#offers = service.offers;
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getByTypeAndIds(offerType, offerIds) {
    let filteredOffers = [];

    filteredOffers = this.getByType(offerType).offers.filter((offer) => offerIds.includes(offer.id));

    return filteredOffers;
  }

  updatePoint(updateAction, offerToUpdate) {
    const index = this.#offers.findIndex((offer) => offer.id === offerToUpdate.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting offer');
    }

    this.#offers = [
      ...this.#offers.slice(0, index),
      offerToUpdate,
      ...this.#offers.slice(index + 1),
    ];

    this._notify(updateAction, offerToUpdate);
  }

  addPoint(updateAction, offerToUpdate) {
    this.points = [
      offerToUpdate,
      ...this.points,
    ];

    this._notify(updateAction, offerToUpdate);
  }

  deletePoint(updateAction, update) {
    const index = this.#offers.findIndex((point) => offers.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t delete unexisting offers');
    }

    this.#offers = [
      ...this.#offers.slice(0, index),
      ...this.#offers.slice(index + 1),
    ];

    this._notify(updateAction);
  }
}
