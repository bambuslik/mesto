//LET, CONST DEFINITIONS
//edit profile --\
const editProfilePopupOpenBtn = document.querySelector('.profile__edit-btn');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formName = document.querySelector('.input-profile-name');
const formJob = document.querySelector('.input-profile-job');
const formProfile = document.querySelector('.form_type_profile');
//edit profile --/

//add card --\
const addCardPopupOpenBtn = document.querySelector('.profile__add-btn');
const formCard = document.querySelector('.form_type_card');
const formCardTitle = document.querySelector('.input-card-title');
const formCardImg = document.querySelector('.input-card-img');
//add card --/

const popupElements = document.querySelectorAll('.popup');
const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
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

function cardLike() {
  event.target.classList.toggle('element__like-btn_status_active');
}

//имел ввиду "to place Cards" - разместить карточки
function placeCards(cardsArray) {
  cardsArray.forEach(function (card, i, cards) {
    const cardClone = cardTemplate.cloneNode(true);
    cardClone.querySelector('.element__title').textContent = card.name;
    cardClone.querySelector('.element__img').src = card.imgLink;
    cardClone.querySelector('.element__img').alt = card.imgAlt;

    //не красиво внутри перебора вешать обработчик, но по-другому не понял как повесить, чтобы он видел карточку из template --\
    cardClone.querySelector('.element__like-btn').addEventListener('click', event => {
      cardLike(event);
    });
    cardClone.querySelector('.element__trash').addEventListener('click', event => {
      event.target.parentElement.parentElement.remove()
    });
    cardClone.querySelector('.element__img').addEventListener('click', function () {
      document.querySelector('.popup__img').src = event.target.src;
      document.querySelector('.popup__img-title').textContent = event.target.closest('.element').querySelector('.element__title').textContent;
      openPopup('.popup_type_img');
    });

    cardsList.prepend(cardClone);
  });
}

function addCard(event) {
  event.preventDefault();
  const cardToAdd = [
    {
      name: formCardTitle.value,
      imgLink: formCardImg.value,
      imgAlt: 'Извините, но эту красоту невозможно описать словами'
    }
  ];
  placeCards(cardToAdd);
  popupHide();
  formCardTitle.value = '';
  formCardImg.value = '';
}

//FUNC CALL
//init cards
placeCards(initialCards);

//HOOK EVENT LISTENERS
editProfilePopupOpenBtn.addEventListener('click', () => {
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  openPopup('.popup_type_profile');
});
addCardPopupOpenBtn.addEventListener('click', () => {
  openPopup('.popup_type_card');
});

formProfile.addEventListener('submit', saveProfile);
formCard.addEventListener('submit', addCard);

popupCloseBtns.forEach(function (popupCloseBtn) {
  popupCloseBtn.addEventListener('click', function () {
    popupHide();
  });
});

popupElements.forEach((element) => {
  element.addEventListener('click', popupHideOverlay);
});
