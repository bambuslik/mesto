export class Card {
  constructor({title, imgLink}, cardElementSelector, {handleCardClick}) {
    this._cardTitle = title;
    this._cardImgLink = imgLink;
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
      const data = {};
      data.src = event.target.src;
      data.title = data.alt = event.target.closest('.element').querySelector('.element__title').textContent;
      this._handleCardClick(data);
    });
  }

  generateCard() {
    this._cardElement = this._getTemplate();
    const cardImg = this._cardElement.querySelector('.element__img');
    const cardTitle = this._cardElement.querySelector('.element__title');
    cardTitle.textContent = this._cardTitle;
    cardImg.src = this._cardImgLink;
    cardImg.alt = this._cardTitle;
    this._setEventListeners()

    return this._cardElement;
  }
}