export default class Section {
  constructor({renderer}, elementsContainer) {
    this._renderer = renderer;
    this._container = document.querySelector(elementsContainer);
  }

  renderItems(items, userId) {
    items.forEach((item) => {
      this._renderer(item, userId);
    });
  }

  addItem(item, append) {
    append ? this._container.append(item) : this._container.prepend(item);
  }
};