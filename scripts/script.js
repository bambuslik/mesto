//LET, CONST DEFINITIONS
//edit profile --\
const editProfilePopupOpenBtn = document.querySelector('#profile-edit-btn');
const editProfilePopup = document.querySelector('#profile-popup');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formName = document.querySelector('#profile-name');
let formJob = document.querySelector('#profile-job');
const editProfilePopupCloseBtn = document.querySelector('#profile-popup .form__close-btn');
const editProfileSubmitBtn = document.querySelector('#profile-popup .form__submit');
//edit profile --/

//add card --\
const addCardPopupOpenBtn = document.querySelector('#add-card-btn');
const addCardPopup = document.querySelector('#location-card-popup');
const addCardSubmitBtn = document.querySelector('#location-card-popup .form__submit');
const formCardTitle = document.querySelector('#location-card-title');
const formCardImg = document.querySelector('#location-card-img-link');
const addCardPopupCloseBtn = document.querySelector('#location-card-popup .form__close-btn');
//add card --/

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
const cardTemplate = document.querySelector('#card-template').content;
const cardsList = document.querySelector('#cards-list');

//FUNC DEFINITIONS
function editProfilePopupShow(event) {
  event.preventDefault();
  editProfilePopup.classList.add('popup_status_show');
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}

function addCardPopupShow(event) {
  event.preventDefault();
  addCardPopup.classList.add('popup_status_show');
}

function editProfilePopupHide(event) {
  event.preventDefault();
  editProfilePopup.classList.remove('popup_status_show');
}

function addCardPopupHide(event) {
  event.preventDefault();
  addCardPopup.classList.remove('popup_status_show');
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  editProfilePopup.classList.remove('popup_status_show');
}

function placeCards(cardsArray) {
  cardsArray.forEach(function (card, i, cards) {
    const cardClone = cardTemplate.cloneNode(true);
    cardClone.querySelector('.element__title').textContent = cards[i].name;
    cardClone.querySelector('.element__img').src = cards[i].imgLink;
    cardClone.querySelector('.element__img').alt = cards[i].imgAlt;

    //не красиво внутри перебора вешать обработчик, но по-другому не понял как повесить, чтобы он видел карточку из template --\
    cardClone.querySelector('.element__like-btn').addEventListener('click', (event) => {
      event.target.classList.toggle('element__like-btn_status_active');
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
  addCardPopup.classList.remove('popup_status_show');
  formCardTitle.value = '';
  formCardImg.value = '';
}

//FUNC CALL
//init cards
placeCards(initialCards);

//HOOK EVENT LISTENERS
editProfilePopupOpenBtn.addEventListener('click', editProfilePopupShow);
editProfilePopupCloseBtn.addEventListener('click', editProfilePopupHide);
editProfileSubmitBtn.addEventListener('click', saveProfile);

addCardPopupOpenBtn.addEventListener('click', addCardPopupShow);
addCardPopupCloseBtn.addEventListener('click', addCardPopupHide);
addCardSubmitBtn.addEventListener('click', addCard);


