import {
  profileName,
  profileInfo,
  cardsList as cardsListSeelctor,
  cardSelector,
  profileEditPopup,
  addCardPopup,
  imgPopupSelector,
  popupProfileOpenButton,
  popupAddOpenButton,
  nameInput,
  infoInput,
  config,
} from '../scripts/constants.js';

import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import { api } from '../scripts/components/Api.js';

import '../pages/index.css';


// Валидация форм
const formValidators = {};

const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(config);

 api.getProfileData()
   .then((res)=> {
     userInfo.setUserInfo(res.name, res.about);
  });

  api.getInitialCards()
    .then(cardlist => {
      console.log(cardlist, 'cardlist')
      cardlist.forEach(data => {
        cardsList.addItem({name:data.name, link: data.link})
      })
  });


// рендерим карточки
function createCard(item) {
  const card = new Card(item, cardSelector, () => {
    imagePopup.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({ items: [], renderer: createCard }, cardsListSeelctor);

const userInfo = new UserInfo({nameSelector: profileName, infoSelector: profileInfo});
const imagePopup = new PopupWithImage(imgPopupSelector);

// Создаем экземпляр класса для попапа редактирования профиля,
const popupWithEditForm = new PopupWithForm(profileEditPopup, (data) => {
  const { name, info}  = data;

  api.editProfile(name, info)
  .then(()=> {
    userInfo.setUserInfo(name, info);
  })
});

// Открываем попап редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  formValidators['profile-edit'].resetErrors();
  const data = userInfo.getUserInfo();
  popupWithEditForm.setInputValues(data);
  popupWithEditForm.open();
});

// Создаем экземпляр класса для попапа добавления карточки
const popupWithAddCardForm = new PopupWithForm(addCardPopup, (data) => {

 api.addCard()
  .then(res => {
    cardsList.addItem({
      name: res.name,
      link: res.link
    });
  })
});

popupAddOpenButton.addEventListener('click', () => {
  formValidators['add-cart'].resetErrors();
  popupWithAddCardForm.open();
});
