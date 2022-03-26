import {initialCards} from '../scripts/initialData.js';
import {
  profileName,
  profileInfo,
  cardsList,
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

// рендерим карточки
function createCard(item) {
  const card = new Card(item, cardSelector, () => {
    imagePopup.open(item);
  });
  const cardElement = card.generateCard();
  return cardElement;
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  cardsList
);

cardList.renderItems();

const userInfo = new UserInfo({nameSelector: profileName, infoSelector: profileInfo});
const imagePopup = new PopupWithImage(imgPopupSelector);

// Создаем экземпляр класса для попапа редактирования профиля,
const popupWithEditForm = new PopupWithForm(profileEditPopup, (data) => {
  userInfo.setUserInfo(data);
});

// Открываем попап редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  formValidators['profile-edit'].resetErrors();
  const data = userInfo.getUserInfo();
  popupWithEditForm.setInputValues(data); // подскажите, я правильно реализовал эту функциональностЬ?
  popupWithEditForm.open();
});

// Создаем экземпляр класса для попапа добавления карточки
const popupWithAddCardForm = new PopupWithForm(addCardPopup, (data) => {
  const newData = {
    name: data['card-title'],
    link: data['card-link'],
  };
  cardList.addItem(createCard(newData));
});

popupAddOpenButton.addEventListener('click', () => {
  formValidators['add-cart'].resetErrors();
  popupWithAddCardForm.open();
});
