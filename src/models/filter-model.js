import Observable from '../framework/observable';
import { FilterType } from './../mock/const';

export default class FilterModel extends Observable {
  #filter = FilterType.DEFAULT;

  get filter() {
    console.log("FilterModel - get filter", this.#filter);
    return this.#filter;
  }

  setFilter(updateType, filter) {
    this.#filter = filter;
    this._notify(updateType, filter);
  }
}
