//IMPORT
import {Card} from './Card.js';
import {FormValidator} from "./FormValidator.js";
import Section from "./Section.js";

//LET, CONST DEFINITIONS
const initialCards = [
  {
    name: 'Шушары',
    imgLink: 'https://raw.githubusercontent.com/bambuslik/mesto/master/images/shushari.jpg',
    imgAlt: 'Вид на здание НИИ в Шушарах'
  },
  {
    name: 'Севастополь',
    imgLink: 'https://raw.githubusercontent.com/bambuslik/mesto/master/images/sevastopol.jpg',
    imgAlt: 'Плавбасейн в бухте Севастополя'
  },
  {
    name: 'Санкт-Петербург',
    imgLink: 'https://raw.githubusercontent.com/bambuslik/mesto/master/images/saint-pete.jpg',
    imgAlt: 'Дворцы барокко зодчего Росси'
  },
  {
    name: 'Медео',
    imgLink: 'https://raw.githubusercontent.com/bambuslik/mesto/master/images/medeo.jpg',
    imgAlt: 'Стена стадиона в Медео'
  },
  {
    name: 'Алма-Ата',
    imgLink: 'https://raw.githubusercontent.com/bambuslik/mesto/master/images/alma-ata.jpg',
    imgAlt: 'Алма-Атинские дома близнецы'
  },
  {
    name: 'Мурино',
    imgLink: 'https://raw.githubusercontent.com/bambuslik/mesto/master/images/murino.jpg',
    imgAlt: 'Муринские дома-панельки'
  }
];

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
const cardPopupSettings = {
  openPopup: (event) => {
    document.querySelector('.popup__img').src = event.target.src;
    document.querySelector('.popup__img-title').textContent = event.target.closest('.element').querySelector('.element__title').textContent;
    openPopup('.popup_type_img');
  }
};
//add card --/

const popupElements = document.querySelectorAll('.popup');
const popupCloseButtons = document.querySelectorAll('.popup__close-btn');
const listElement = '.elements';

//FUNC DEFINITIONS
function popupHide() {
  const popupElement = document.querySelector('.popup_show');
  // const formElement = popupElement.querySelector('.form');
  popupElement.classList.remove('popup_show');
  document.removeEventListener('keydown', popupHideEsc);
}

function popupHideOverlay(event) {
  if (event.target.classList.contains('popup')) {
    popupHide();
  }
}

function popupHideEsc(event) {
  if (event.keyCode === 27) {
    popupHide();
  }
}

function openPopup(popupClass) {
  document.querySelector(popupClass).classList.add('popup_show');
  document.addEventListener('keydown', popupHideEsc);
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  popupHide();
}

// function addCard(cartToAdd) {
//   cardsList.prepend(cartToAdd);
// }

// function initCards(initCards) {
//   initCards.forEach(card => {
//     const cartToAdd = new Card(
//       card.name,
//       card.imgLink,
//       card.imgAlt,
//       '.card-template',
//       cardPopupSettings
//     );
//     addCard(cartToAdd.generateCard());
//   });
// }

// function submitAddCardForm(event) {
//   event.preventDefault();
//   const cartToAdd = new Card(
//     formCardTitle.value,
//     formCardImg.value,
//     formCardImgAlt,
//     '.card-template',
//     cardPopupSettings
//   )
//   addCard(cartToAdd.generateCard());
//   popupHide();
//   formCardTitle.value = '';
//   formCardImg.value = '';
// }

//FUNC CALL
// initCards(initialCards);

//HOOK EVENT LISTENERS
editProfilePopupOpenButton.addEventListener('click', () => {
  formProfileValidator.resetFormByCloseModal();
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
  openPopup('.popup_type_profile');
});

addCardPopupOpenButton.addEventListener('click', () => {
  formNewCardValidator.resetFormByCloseModal();
  openPopup('.popup_type_card');
});

formProfile.addEventListener('submit', saveProfile);
// formCard.addEventListener('submit', submitAddCardForm);

popupCloseButtons.forEach(function (popupCloseButton) {
  popupCloseButton.addEventListener('click', function () {
    popupHide();
  });
});

popupElements.forEach((element) => {
  element.addEventListener('click', popupHideOverlay);
});

//VALIDATION
const validatorConfig = {
  inputErrorClass: 'form__input-text_type_error',
  errorClass: 'form__input-error_type_visible',
  inactiveButtonClass: 'form__submit_disabled',
  submitButtonSelector: '.form__submit',
  submitButtonDisabledClass: '.form__submit_disabled'
}

const formProfileValidator = new FormValidator(validatorConfig, formProfile);
formProfileValidator.enableValidation();

const formNewCardValidator = new FormValidator(validatorConfig, formCard);
formNewCardValidator.enableValidation();


//WORK 8
const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.imgLink,
        item.imgAlt,
        '.card-template',
        cardPopupSettings
      );
      cardsList.addItem(card.generateCard());
    }
  },
  listElement
);

cardsList.renderItems();
