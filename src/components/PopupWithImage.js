import Popup from "./Popup.js";

export default class PicturePopup extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(data) {
    super.open();
    const popupImg = document.querySelector('.popup__img');
    popupImg.src = data.src;
    popupImg.alt = data.alt;
    document.querySelector('.popup__img-title').textContent = data.title;
  }
}