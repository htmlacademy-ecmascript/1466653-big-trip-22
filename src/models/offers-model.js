import Observable from './../framework/observable';
import { UpdateType } from './../helpers/const';

export default class OffersModel extends Observable {
  #offersApiService = null;
  #offers = [];
  #isLoading = true;
  #isLoadingFailed = false;

  constructor ({ offersApiService }) {
    super();
    this.#offersApiService = offersApiService;
  }

  get offers() {
    return this.#offers;
  }

  get types() {
    return this.#offers.map((offer) => offer.type);
  }

  get isLoading() {
    return this.#isLoading;
  }

  get isLoadingFailed() {
    return this.#isLoadingFailed;
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
      this.#isLoadingFailed = false;
    } catch(err) {
      this.#isLoadingFailed = true;
    } finally {
      this.#isLoading = false;
    }


    this._notify(UpdateType.INIT);
  }
}
