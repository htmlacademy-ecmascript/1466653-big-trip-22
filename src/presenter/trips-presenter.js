import SortFormView from '../view/sort-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import {render} from '../render.js';

export default class TripsPresenter {
  eventsListComponent = new EventsListView();

  constructor({container}) {
    this.mainContainer = container;
  }

  init() {
    render(new SortFormView(), this.mainContainer);
    render(this.eventsListComponent, this.mainContainer);
    render(new EventEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < 3; i++) {
      render(new EventView(), this.eventsListComponent.getElement());
    }
  }
}
