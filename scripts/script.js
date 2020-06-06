//let, const definitions
const editProfile = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formName = document.querySelector('.form__name');
let formJob = document.querySelector('.form__job');
const closeBtn = document.querySelector('.form__close-btn');
const submitBtn = document.querySelector('.form__submit');
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

//func definitions
function openPopup(event) {
  event.preventDefault();
  popup.classList.add('popup_opened');
  formName.value = profileName.textContent;
  formJob.value = profileJob.textContent;
}

function closePopup(event) {
  event.preventDefault();
  popup.classList.remove('popup_opened');
}

function saveProfile(event) {
  event.preventDefault();
  profileName.textContent = formName.value;
  profileJob.textContent = formJob.value;
  popup.classList.remove('popup_opened');
}

function addCard(name, imgLink, imgAlt) {
  //TODO check if empty
  const cardClone = cardTemplate.cloneNode(true);
  cardClone.querySelector('.element__title').textContent = name;
  cardClone.querySelector('.element__img').src = imgLink;
  cardClone.querySelector('.element__img').alt = imgAlt;
  cardsList.append(cardClone);
}

//hook events listeners
editProfile.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
submitBtn.addEventListener('click', saveProfile)

//functions call
//init cards
initialCards.forEach(function (card, i, cards) {
  addCard(cards[i].name,cards[i].imgLink,cards[i].imgAlt);
});