import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, {submitCallback}) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  close() {
    super.close();
    this._popupElement.querySelector('.form').reset();
  }

  _getInputValues() {
    const inputList = this._popupElement.querySelectorAll('.form__input-text');
    const formValues = {}
    inputList.forEach((item) => {
      formValues[item.name] = item.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupElement.addEventListener('submit', (event) => {
      event.preventDefault();
      this._submitCallback(this._getInputValues());
    });
  }
}