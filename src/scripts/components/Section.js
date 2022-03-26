export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._renderer = renderer;
    this._items = items;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    // const card = this._renderer(item) // чёт я туплю, не соображу как переделать renderer, чтобы отказаться от createCard
    this._container.prepend(item);
  }
}
