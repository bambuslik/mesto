//let, const definitions
const editProfile = document.querySelector('.profile__edit-btn');
let popup = document.querySelector('.popup');
let profileName = document.querySelector('.profile__title');
let profileJob = document.querySelector('.profile__subtitle');
let formName = document.querySelector('.form__name');
let formJob = document.querySelector('.form__job');
const closeBtn = document.querySelector('.form__close-btn');
const submitBtn = document.querySelector('.form__submit');

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

//hook events listeners
editProfile.addEventListener('click', openPopup);
closeBtn.addEventListener('click', closePopup);
submitBtn.addEventListener('click', saveProfile)