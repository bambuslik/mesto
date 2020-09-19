import Popup from "./Popup.js";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector, {handleDeleteCard}) {
    super(popupSelector);
    this._handleDeleteCard = handleDeleteCard;
    this._submitElement = this._popupElement.querySelector('.form__submit');
  }

  open(cardId, cardEvent) {
    super.open();
    //define card id when open popup
    this._cardId = cardId;
  }

  getCardId() {
    return this._cardId;
  }

  lockSubmit() {
    this._submitElement.setAttribute('disabled', 'disabled');
    this._submitElement.classList.toggle('form__submit_disabled');
  }

  unlockSubmit() {
    this._submitElement.removeAttribute('disabled');
    this._submitElement.classList.toggle('form__submit_disabled');
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleDeleteCard();
    });
  }

}