import { RenderPosition, render } from './framework/render.js';

import NewEventButtonView from './view/new-event-button-view.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import DestinationsModel from './models/destinations-model.js';
import OffersModel from './models/offers-model.js';
import PointsModel from './models/points-model.js';
import FilterModel from './models/filter-model.js';
// import MockService from './mock/service.js';
import PointApiService from './point-api-service.js';
import DestinationsApiService from './destinations-api-service.js';
import OffersApiService from './offers-api-service.js';

const AUTHORIZATION = 'Basic ir3rg48j93ngi#th@#h%nivn';
const END_POINT = 'https://22.objects.htmlacademy.pro/big-trip';

const filtersContainer = document.querySelector('.trip-controls__filters');
const headerMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

// const mockService = new MockService();
const destinationsModel = new DestinationsModel({
  destinationsApiService: new DestinationsApiService(END_POINT, AUTHORIZATION)
});
const offersModel = new OffersModel({
  offersApiService: new OffersApiService(END_POINT, AUTHORIZATION)
});
const filterModel = new FilterModel();
// const pointsModel = new PointsModel(mockService);
const pointsModel = new PointsModel({
  pointApiService: new PointApiService(END_POINT, AUTHORIZATION)
});

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
  onNewEventDestroy: handleNewEventFormClose,
});

const filterPresenter = new FilterPresenter({
  filtersContainer,
  filterModel,
  pointsModel
});

const newEventButtonView = new NewEventButtonView({ onClick: handleNewEventButtonClick });

function handleNewEventFormClose() {
  newEventButtonView.element.disabled = false;
}

function handleNewEventButtonClick() {
  boardPresenter.createEvent();
  newEventButtonView.element.disabled = true;
}

render(new TripInfoView(), headerMainContainer, RenderPosition.AFTERBEGIN);

filterPresenter.init();
boardPresenter.init();
destinationsModel.init();
offersModel.init();
pointsModel.init()
  .finally(() => {
    render(newEventButtonView, headerMainContainer);
  });
