import { RenderPosition, render } from './framework/render.js';
import TripFiltersView from './view/trip-filters-view.js';
import TripInfoView from './view/trip-info-view.js';
import BoardPresenter from './presenter/board-presenter.js';
import DestinationsModel from './models/destinations-model.js';
import OffersModel from './models/offers-model.js';
import PointsModel from './models/points-model.js';
import MockService from './mock/service.js';

const filtersContainer = document.querySelector('.trip-controls__filters');
const headerMainContainer = document.querySelector('.trip-main');
const tripEventsContainer = document.querySelector('.trip-events');

const mockService = new MockService();
const destinationsModel = new DestinationsModel(mockService);
const offersModel = new OffersModel(mockService);
const pointsModel = new PointsModel(mockService);

const boardPresenter = new BoardPresenter({
  container: tripEventsContainer,
  pointsModel,
  destinationsModel,
  offersModel,
});

render(new TripFiltersView(), filtersContainer);
render(new TripInfoView(), headerMainContainer, RenderPosition.AFTERBEGIN);

boardPresenter.init();
