//LET, CONST DEFINITIONS
//edit profile --\
const editProfilePopupOpenButton = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formName = document.querySelector('.input-profile-name');
const formJob = document.querySelector('.input-profile-job');
const formProfile = document.querySelector('.form_type_profile');
//edit profile --/

//add card --\
const addCardPopupOpenButton = document.querySelector('.profile__add-btn');
const formCard = document.querySelector('.form_type_card');
const formCardTitle = document.querySelector('.input-card-title');
const formCardImg = document.querySelector('.input-card-img');
const formCardImgAlt = 'Извините, но эту красоту невозможно описать словами';
//add card --/

const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const cardTemplate = document.querySelector('.card-template').content;
const cardsList = document.querySelector('.elements');

//FUNC DEFINITIONS
function popupHide() {
  const popupElement = document.querySelector('.popup_show');
  const formElement = popupElement.querySelector('.form');
  popupElement.classList.remove('popup_show');
  resetForm(formElement);
}

function popupHideOverlay(event) {
  //check if click on overlay
  if (event.target.classList.contains('popup')) {
    popupHide();
  }
}

function popupHideEsc(event) {
  if (event.keyCode === 27) {
    document.removeEventListener('keydown', popupHideEsc);
    popupHide();
  }
}

function openPopup(popupClass) {
  document.querySelector(popupClass).classList.add('popup_show');
  //close popup by ESC
  document.addEventListener('keydown', popupHideEsc);
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  popupHide();
}

function cardLike(event) {
  event.target.classList.toggle('element__like-btn_status_active');
}

function cardRemove(event) {
  event.target.closest('.element').remove();
}

function cardPopupInit(event) {
  document.querySelector('.popup__img').src = event.target.src;
  document.querySelector('.popup__img-title').textContent = event.target.closest('.element').querySelector('.element__title').textContent;
  openPopup('.popup_type_img');
}

function createCard(cardTitle, cardImgLink, cardImgAlt) {
  const cardClone = cardTemplate.cloneNode(true);
  cardClone.querySelector('.element__title').textContent = cardTitle;
  cardClone.querySelector('.element__img').src = cardImgLink;
  cardClone.querySelector('.element__img').alt = cardImgAlt;
  cardClone.querySelector('.element__like-btn').addEventListener('click', event => {
    cardLike(event);
  });
  cardClone.querySelector('.element__trash').addEventListener('click', event => {
    cardRemove(event);
  });
  cardClone.querySelector('.element__img').addEventListener('click', event => {
    cardPopupInit(event);
  });
  return cardClone;
}

function addCard(cartToAdd) {
  cardsList.prepend(cartToAdd);
}

function initCards(initCards) {
  initCards.forEach(card => {
    const cartToAdd = createCard(card.name, card.imgLink, card.imgAlt);
    addCard(cartToAdd);
  });
}

function submitAddCardForm(event) {
  event.preventDefault();
  const cartToAdd = createCard(formCardTitle.value, formCardImg.value, formCardImgAlt);
  addCard(cartToAdd);
  popupHide();
  formCardTitle.value = '';
  formCardImg.value = '';
}

//FUNC CALL
initCards(initialCards);

//HOOK EVENT LISTENERS
editProfilePopupOpenButton.addEventListener('click', () => {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  openPopup('.popup_type_profile');
});
addCardPopupOpenButton.addEventListener('click', () => {
  openPopup('.popup_type_card');
});

formProfile.addEventListener('submit', saveProfile);
formCard.addEventListener('submit', submitAddCardForm);

popupCloseButtons.forEach(function (popupCloseButton) {
  popupCloseButton.addEventListener('click', function () {
    popupHide();
  });
});

popupElements.forEach((element) => {
  element.addEventListener('click', popupHideOverlay);
});