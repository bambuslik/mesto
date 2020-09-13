export class Card {
  constructor(cardTitle, cardImgLink, cardImgAlt, cardElementSelector, {handleCardClick}) {
    this._cardTitle = cardTitle;
    this._cardImgLink = cardImgLink;
    this._cardImgAlt = cardImgAlt;
    this._cardElementSelector = cardElementSelector;
     this._handleCardClick = handleCardClick;
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

  _setEventListeners() {
    this._cardElement.querySelector('.element__like-btn').addEventListener('click', (event) => {
      this._handleCardLike(event);
    });

    this._cardElement.querySelector('.element__trash').addEventListener('click', (event) => {
      this._handleCardRemove(event);
    })

    this._cardElement.querySelector('.element__img').addEventListener('click', event => {
      this._handleCardClick(event);
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