import Observable from './../framework/observable';
import { UpdateType } from './../mock/const';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];

  constructor ({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  getByType(type) {
    return this.#offers.find((offer) => offer.type === type);
  }

  getByTypeAndIds(offerType, offerIds) {
    let filteredOffers = [];
    const filteredByType = this.getByType(offerType);

    if (filteredByType) {
      filteredOffers = filteredByType.offers.filter((offer) => offerIds.includes(offer.id));
    }

    return filteredOffers;
  }

  async init() {
    try {
      this.#offers = await this.#offersApiService.offers;
    } catch(err) {
      this.#offers = [];
    }

    this._notify(UpdateType.INIT);
    console.log("offersModel - init - finished");
  }
}
