import SortFormView from '../view/sort-form-view.js';
import EventsListView from '../view/events-list-view.js';
import EventView from '../view/event-view.js';
import EventEditView from '../view/event-edit-view.js';
import {render} from '../render.js';

export default class TripsPresenter {
  eventsListComponent = new EventsListView();

  constructor({container, pointsModel}) {
    this.mainContainer = container;
    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(new SortFormView(), this.mainContainer);
    render(this.eventsListComponent, this.mainContainer);
    render(new EventEditView(), this.eventsListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new EventView({point: this.points[i]}), this.eventsListComponent.getElement());
    }
  }
}
