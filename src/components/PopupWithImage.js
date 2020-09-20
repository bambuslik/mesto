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
    const popupImgTitle = document.querySelector('.popup__img-title');
    popupImgTitle.textContent = data.title;
  }
}