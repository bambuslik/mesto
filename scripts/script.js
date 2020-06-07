//LET, CONST DEFINITIONS
//edit profile --\
const editProfilePopupOpenBtn = document.querySelector('#profile-edit-btn');
const editProfilePopup = document.querySelector('#profile-popup');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');
const formName = document.querySelector('#profile-name');
const formJob = document.querySelector('#profile-job');
const editProfileSubmitBtn = document.querySelector('#profile-popup .form__submit');
//edit profile --/

//add card --\
const addCardPopupOpenBtn = document.querySelector('#add-card-btn');
const addCardPopup = document.querySelector('#location-card-popup');
const addCardSubmitBtn = document.querySelector('#location-card-popup .form__submit');
const formCardTitle = document.querySelector('#location-card-title');
const formCardImg = document.querySelector('#location-card-img-link');
//add card --/

const popupCloseBtns = document.querySelectorAll('.popup__close-btn');
const fullImgPopup = document.querySelector('#full-img-popup');

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
function editProfilePopupShow() {
  editProfilePopup.classList.add('popup_opacity');
  editProfilePopup.classList.add('popup_visibility');
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}

function addCardPopupShow() {
  addCardPopup.classList.add('popup_opacity');
  addCardPopup.classList.add('popup_visibility');
}

function showFullImg(event) {
  document.querySelector('.popup__img').src = event.target.src;
  document.querySelector('.popup__img-title').textContent = event.target.parentElement.parentElement.parentElement.querySelector('.element__title').textContent
  fullImgPopup.classList.add('popup_opacity');
  fullImgPopup.classList.add('popup_visibility');
}

function popupHide(event) {
  function clearVisibility() {
    event.target.closest('.popup').classList.remove('popup_visibility');
  }

  event.target.closest('.popup').classList.remove('popup_opacity');
  window.setTimeout(clearVisibility, 300);
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  popupHide(event);
}

function placeCards(cardsArray) {
  cardsArray.forEach(function (card, i, cards) {
    const cardClone = cardTemplate.cloneNode(true);
    cardClone.querySelector('.element__title').textContent = cards[i].name;
    cardClone.querySelector('.element__img').src = cards[i].imgLink;
    cardClone.querySelector('.element__img').alt = cards[i].imgAlt;

    //не красиво внутри перебора вешать обработчик, но по-другому не понял как повесить, чтобы он видел карточку из template --\
    cardClone.querySelector('.element__like-btn').addEventListener('click', event => {
      event.target.classList.toggle('element__like-btn_status_active');
    });
    cardClone.querySelector('.element__trash').addEventListener('click', event => {
      event.target.parentElement.parentElement.remove()
    });
    cardClone.querySelector('.element__img').addEventListener('click', function () {
      showFullImg(event);
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
  popupHide(event);
  formCardTitle.value = '';
  formCardImg.value = '';
}

//FUNC CALL
//init cards
placeCards(initialCards);

//HOOK EVENT LISTENERS
editProfilePopupOpenBtn.addEventListener('click', editProfilePopupShow);
editProfileSubmitBtn.addEventListener('click', saveProfile);

addCardPopupOpenBtn.addEventListener('click', addCardPopupShow);
addCardSubmitBtn.addEventListener('click', addCard);

popupCloseBtns.forEach(function (popupCloseBtn) {
  popupCloseBtn.addEventListener('click', function () {
    popupHide(event);
  });
});

