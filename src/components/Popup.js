export default class Popup {
  constructor(popupSelector) {
    this._popupElement = document.querySelector(popupSelector);
    this._popupCloseButtonElement = this._popupElement.querySelector('.popup__close-btn');
    this._boundedHandleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popupElement.classList.add('popup_show');
    document.addEventListener('keydown', this._boundedHandleEscClose);
  }

  close() {
    this._popupElement.classList.remove('popup_show');
    document.removeEventListener('keydown', this._boundedHandleEscClose);
  }

  _closeByOverlay(event) {
    if (event.target.classList.contains('popup')) {
      this.close();
    }
  }

  _handleEscClose(event) {
    if (event.keyCode === 27) {
      this.close();
    }
  }

  setEventListeners() {
    this._popupCloseButtonElement.addEventListener('click', this.close.bind(this));
    this._popupElement.addEventListener('click', this._closeByOverlay.bind(this));
  }
}