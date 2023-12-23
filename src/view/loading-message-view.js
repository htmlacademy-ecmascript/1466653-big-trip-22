import { createElement } from '../render.js';

function createLoadingMessageTemplate() {
  return `
  <p class="trip-events__msg">Loading...</p>
`;
}

export default class LoadingMessageView {
  getTemplate() {
    return createLoadingMessageTemplate();
  }

  getElement() {
    if(!this.element) {
      this.element = createElement(this.getTemplate());
    }

    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
