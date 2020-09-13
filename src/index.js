import './pages/index.css';

//IMPORT
import {Card} from './components/Card.js';
import {FormValidator} from "./components/FormValidator.js";
import Section from "./components/Section.js";
import PopupWithImage from "./components/PopupWithImage.js";
import PopupWithForm from "./components/PopupWithForm.js";
import UserInfo from "./components/UserInfo.js";

//LET, CONST DEFINITIONS
const initialCards = [
  {
    name: 'Шушары',
    imgLink: 'http://webpunk.ru/images/shushari.jpg',
    imgAlt: 'Вид на здание НИИ в Шушарах'
  },
  {
    name: 'Севастополь',
    imgLink: 'http://webpunk.ru/images/sevastopol.jpg',
    imgAlt: 'Плавбасейн в бухте Севастополя'
  },
  {
    name: 'Санкт-Петербург',
    imgLink: 'http://webpunk.ru/images/saint-pete.jpg',
    imgAlt: 'Дворцы барокко зодчего Росси'
  },
  {
    name: 'Медео',
    imgLink: 'http://webpunk.ru/images/medeo.jpg',
    imgAlt: 'Стена стадиона в Медео'
  },
  {
    name: 'Алма-Ата',
    imgLink: 'http://webpunk.ru/images/alma-ata.jpg',
    imgAlt: 'Алма-Атинские дома близнецы'
  },
  {
    name: 'Мурино',
    imgLink: 'http://webpunk.ru/images/murino.jpg',
    imgAlt: 'Муринские дома-панельки'
  }
];

//edit profile --\
const profileEditPopupOpenButton = document.querySelector('.profile__edit-btn');
const profileFormName = document.querySelector('.input-profile-name');
const profileFormJob = document.querySelector('.input-profile-job');
const formProfile = document.querySelector('.form_type_profile');
//edit profile --/

//add card --\
const addCardPopupOpenButton = document.querySelector('.profile__add-btn');
const formCard = document.querySelector('.form_type_card');
const formCardImgAlt = 'Извините, но эту красоту невозможно описать словами';
const listElement = '.elements';
//add card --/

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

const userInfo = new UserInfo(
  {
    userNameSelector: '.profile__title',
    userJobSelector: '.profile__subtitle'
  }
);

const imagePopup = new PopupWithImage('.popup_type_img');
imagePopup.setEventListeners();

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item.name,
        item.imgLink,
        item.imgAlt,
        '.card-template',
        {
          handleCardClick: (event) => {
            imagePopup.open(event);
          }
        }
      );
      cardsList.addItem(card.generateCard());
    }
  },
  listElement
);

cardsList.renderItems();

const addCardPopup = new PopupWithForm(
  '.popup_type_card',
  {
    submitCallback: (item) => {
      const cardItem = [
        {
          name: item.title,
          imgLink: item.imgLink
        }
      ];

      const cardsList = new Section(
        {
          items: cardItem,
          renderer: (item) => {
            const card = new Card(
              item.name,
              item.imgLink,
              item.imgAlt,
              '.card-template',
              {
                handleCardClick: (event) => {
                  imagePopup.open(event);
                }
              }
            );
            cardsList.addItem(card.generateCard());
            addCardPopup.close();
          }
        },
        listElement
      );
      cardsList.renderItems();
    }
  }
);

addCardPopup.setEventListeners();

addCardPopupOpenButton.addEventListener('click', () => {
  formNewCardValidator.resetFormByCloseModal();
  addCardPopup.open();
});

const editProfilePopup = new PopupWithForm(
  '.popup_type_profile',
  {
    submitCallback: (item) => {
      userInfo.setUserInfo(item.name, item.job);
      editProfilePopup.close();
    }
  }
);

editProfilePopup.setEventListeners();

profileEditPopupOpenButton.addEventListener('click', () => {
  formProfileValidator.resetFormByCloseModal();
  const userInfoData = userInfo.getUserInfo();
  profileFormName.value = userInfoData.name;
  profileFormJob.value = userInfoData.job;
  editProfilePopup.open();
});