import './index.css';

import {
  userNameElement,
  userJobElement,
  userAvatarElement,
  submitValue,
  waitApiSubmitValue,
  profileEditPopupOpenButton,
  profileAvatarPopupOpenButton,
  profileFormName,
  profileFormJob,
  formProfile,
  formAvatar,
  addCardPopupOpenButton,
  formCard,
  listElement
} from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {FormValidator} from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithSubmit from "../components/PopupWithSubmit.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

//add card
let cardPointer;
const newCard = (item, userId) => {
  return new Card(
    item,
    userId,
    '.card-template',
    {
      handleCardClick: (data) => {
        imagePopup.open(data);
      }
    },
    {
      handleDeleteButtonClick: (event) => {
        cardPointer = event.target;
        submitPopup.open(item._id, event);
      }
    },
    {
      handleLikeButtonClick: (event) => {
        //liked by user?
        if (event.target.classList.contains('like__btn_status_active')) {
          //click on like = DELETE
          api.unsetLike(item._id)
            .then((res) => {
              event.target.classList.toggle('like__btn_status_active');
              const cardLikesCounter = event.target.closest('.like').querySelector('.like__counter');
              cardLikesCounter.innerText = res.likes.length;
            })
            .catch((err) => {
              console.error(
                err
              );
            });
        } else {
          //click on like = PUT
          api.setLike(item._id)
            .then((res) => {
              console.log(
                res
              );
              event.target.classList.toggle('like__btn_status_active');
              const cardLikesCounter = event.target.closest('.like').querySelector('.like__counter');
              cardLikesCounter.innerText = res.likes.length;
            })
            .catch((err) => {
              console.error(
                err
              );
            });
        }
      }
    }
  );
}
//add card --/

//api config
const api = new Api({
    apiUrl: 'https://mesto.nomoreparties.co',
    token: '4214e0e0-c45a-4fb1-b86b-b162195f7419',
    cohort: 'cohort-15'
  }
);

//get Section instance
const cardsList = new Section(
  {
    renderer: (item, userId) => {
      const card = newCard(item, userId);
      cardsList.addItem(card.generateCard(), true);
    }
  },
  listElement
);

//get initial card from promises (api)
function initialCards(userId) {
  const initialCards = api.getInitialCards()
    .then((cardsArray) => {
      //render cards by Section method
      cardsList.renderItems(cardsArray, userId);
      return cardsArray;
    })
    .catch((err) => {
      console.error(
        err
      );
    });
}

//add card by user (popup)
function addCardByUser(userId) {
  const addCardPopup = new PopupWithForm(
    '.popup_type_card',
    {
      submitCallback: (item) => {
        formNewCardValidator.waitApiStart(waitApiSubmitValue);
        //send card to server
        api.addCard(item.name, item.link)
          .then((res) => {
            //set item owner
            item.owner = {
              '_id': userId
            };
            //set card id
            item._id = res._id;

            const card = newCard(item, userId);
            cardsList.addItem(card.generateCard(), false);
            addCardPopup.close();
            formNewCardValidator.waitApiFinish(submitValue);
          })
          .catch((err) => {
            formNewCardValidator.waitApiFinish(submitValue);
            console.error(
              err
            );
          });
      }
    }
  );

  addCardPopup.setEventListeners();

  addCardPopupOpenButton.addEventListener('click', () => {
    formNewCardValidator.resetFormByCloseModal();
    addCardPopup.open();
  });
}

//get user info from promises (api)
const user = api.getUser()
  .then((userInfo) => {
    userNameElement.textContent = userInfo.name;
    userJobElement.textContent = userInfo.about;
    userAvatarElement.style.backgroundImage = `url(${userInfo.avatar})`;
    //return user id to use it with cards init
    return userInfo._id;
  })
  .then((userId) => {
    //run initialCards when user is ready
    initialCards(userId);
    //add card by user (popup)
    addCardByUser(userId);
  })
  .catch((err) => {
    console.error(
      err
    );
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

const formAvatarValidator = new FormValidator(validatorConfig, formAvatar);
formAvatarValidator.enableValidation();

const userInfo = new UserInfo(
  {
    userNameSelector: '.profile__title',
    userJobSelector: '.profile__subtitle'
  }
);

const imagePopup = new PopupWithImage('.popup_type_img');
imagePopup.setEventListeners();

const submitPopup = new PopupWithSubmit(
  '.popup_type_submit',
  {
    handleDeleteCard: () => {

      //lock submit
      submitPopup.lockSubmit();

      const cardId = submitPopup.getCardId();
      api.deleteCard(cardId)
        .then((res) => {
          cardPointer.closest('.element').remove();
          submitPopup.close();

          //unlock submit
          submitPopup.unlockSubmit();

        })
        .catch((err) => {
          console.error(
            err
          );
          submitPopup.close();

          //unlock submit
          submitPopup.unlockSubmit();
        });
    }
  }
);
submitPopup.setEventListeners();

const editProfilePopup = new PopupWithForm(
  '.popup_type_profile',
  {
    submitCallback: (item) => {
      formProfileValidator.waitApiStart(waitApiSubmitValue);
      api.editProfile(item.name, item.job)
        .then(() => {
          userInfo.setUserInfo(item.name, item.job);
          editProfilePopup.close();
          formProfileValidator.waitApiFinish(submitValue);
        })
        .catch((err) => {
          formProfileValidator.waitApiFinish(submitValue);
          console.error(
            err
          );
        });
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

const editAvatarPopup = new PopupWithForm(
  '.popup_type_avatar',
  {
    submitCallback: (item) => {
      formAvatarValidator.waitApiStart(waitApiSubmitValue);
      api.setAvatar(item.link)
        .then((res) => {
          editAvatarPopup.close();
          profileAvatarPopupOpenButton.style.backgroundImage = `url(${item.link})`;
          formAvatarValidator.waitApiFinish(submitValue);
        })
        .catch((err) => {
          formAvatarValidator.waitApiFinish(submitValue);
          console.error(
            err
          );
        });
    }
  }
);

editAvatarPopup.setEventListeners();

profileAvatarPopupOpenButton.addEventListener('click', () => {
  formAvatarValidator.resetFormByCloseModal();
  editAvatarPopup.open();
})