export class Card {
  constructor({name, link, likes, owner, _id}, userId, cardElementSelector, {handleCardClick}, {handleDeleteButtonClick}, {handleLikeButtonClick}) {
    this._cardTitle = name;
    this._cardImgLink = link;
    this._cardLikesArray = likes;
    this._cardElementSelector = cardElementSelector;
    this._handleCardClick = handleCardClick;
    this._handleDeleteButtonClick = handleDeleteButtonClick;
    this._handleLikeButtonClick = handleLikeButtonClick;
    this._userId = userId;
    this._cardOwnerId = owner._id;
    this._cardId = _id;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardElementSelector).content.querySelector('.element').cloneNode(true);

    return cardElement;
  }

  _setDeleteButton() {
    const deleteButtonElement = document.createElement('button');
    deleteButtonElement.classList.add('element__trash');
    this._cardElement.querySelector('.element__img-container').append(deleteButtonElement);

    this._cardElement.querySelector('.element__trash').addEventListener('click', (event) => {
      this._handleDeleteButtonClick(event);
    })
  }

  _setEventListeners() {
    this._cardElement.querySelector('.like__btn').addEventListener('click', (event) => {
      this._handleLikeButtonClick(event);
    });

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
    const cardLikes = this._cardElement.querySelector('.like__counter');
    cardTitle.textContent = this._cardTitle;
    cardImg.src = this._cardImgLink;
    cardImg.alt = this._cardTitle;
    cardLikes.textContent = (this._cardLikesArray) ? this._cardLikesArray.length : 0;

    if (this._userId === this._cardOwnerId) {
      this._setDeleteButton();
    }

    this._liked = false;
    if (this._cardLikesArray) {
      this._cardLikesArray.forEach((item) => {
        if (item._id === this._userId) this._liked = true;
      });
    }

    if (this._liked) {
      const cardIsLiked = this._cardElement.querySelector('.like__btn');
      cardIsLiked.classList.toggle('like__btn_status_active');
    }

    this._setEventListeners()

    console.log(
      // `user id: ${this._userId}`,
      // `card owner id: ${this._cardOwnerId}`,
      // `card id: ${this._cardId}`,
      // `is liked: ${this._liked}`
    );

    return this._cardElement;
  }
}