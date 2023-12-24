export default class DestinationsModel {
  constructor (service) {
    this.destinations = service.getDestinations();
  }

  getDestinations() {
    return this.destinations;
  }

  getById(id) {
    return this.destinations.find((destination) => destination.id === id);
  }
}
