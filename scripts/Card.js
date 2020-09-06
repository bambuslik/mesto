export class Card {
  constructor(cardTitle, cardImgLink, cardImgAlt, cardElementSelector) {
    this._cardTitle = cardTitle;
    this._cardImgLink = cardImgLink;
    this._cardImgAlt = cardImgAlt;
    this._cardElementSelector = cardElementSelector;
    this._popupHideEscShim = (event) => {
      this._popupHideEsc(event);
    }
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardElementSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _handleCardLike(event) {
    event.target.classList.toggle('element__like-btn_status_active');
  }

  _handleCardRemove(event) {
    event.target.closest('.element').remove();
  }

  _popupHideEsc(event) {
    if (event.keyCode === 27) {
      document.removeEventListener('keydown', this._popupHideEscShim);
      const popupElement = document.querySelector('.popup_show');
      popupElement.classList.remove('popup_show');
    }
  }

  _handleCardPopupInit(event) {
    document.querySelector('.popup__img').src = event.target.src;
    document.querySelector('.popup__img-title').textContent = event.target.closest('.element').querySelector('.element__title').textContent;
    document.querySelector('.popup_type_img').classList.add('popup_show');
    document.addEventListener('keydown', this._popupHideEscShim);
  }

  _setEventListeners() {
    this._cardElement.querySelector('.element__like-btn').addEventListener('click', (event) => {
      this._handleCardLike(event);
    });

    this._cardElement.querySelector('.element__trash').addEventListener('click', (event) => {
      this._handleCardRemove(event);
    })

    this._cardElement.querySelector('.element__img').addEventListener('click', event => {
      this._handleCardPopupInit(event);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    this._cardElement.querySelector('.element__title').textContent = this._cardTitle;
    this._cardElement.querySelector('.element__img').src = this._cardImgLink;
    this._cardElement.querySelector('.element__img').alt = this._cardImgAlt;
    this._setEventListeners()

    return this._cardElement;
  }
}