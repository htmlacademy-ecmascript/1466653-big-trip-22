import { RenderPosition, render } from './framework/render.js';

import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import DestinationsModel from './models/destinations-model.js';
import OffersModel from './models/offers-model.js';
import PointsModel from './models/points-model.js';
import FilterModel from './models/filter-model.js';
import MockService from './mock/service.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const headerMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);
const filterModel = new FilterModel();

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  pointsModel,
  destinationsModel,
  offersModel,
  filterModel,
});

const filterPresenter = new FilterPresenter({
  filtersContainer,
  filterModel,
  pointsModel
});

render(new TripInfoView(), headerMainContainer, RenderPosition.AFTERBEGIN);

filterPresenter.init();
boardPresenter.init();
