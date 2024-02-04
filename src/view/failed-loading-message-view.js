import AbstractView from '../framework/view/abstract-view';

function createLoadingMessageTemplate() {
  return '<p class="trip-events__msg">Failed to load latest route information</p>';
}

export default class FailedLoadingMessageView extends AbstractView {
  get template() {
    return createLoadingMessageTemplate();
  }
}
