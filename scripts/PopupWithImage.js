import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(event) {
    super.open();
    document.querySelector('.popup__img').src = event.target.src;
    document.querySelector('.popup__img-title').textContent = event.target.closest('.element').querySelector('.element__title').textContent;
  }
}