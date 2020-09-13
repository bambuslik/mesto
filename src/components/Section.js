export default class Section {
  constructor({items, renderer}, elementsContainer) {
    this._renderItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(elementsContainer);
  }

  renderItems() {
    this._renderItems.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
};