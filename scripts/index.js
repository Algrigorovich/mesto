import {initialCards} from './initialData.js';
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
} from './constants.js';

import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import Section from './Section.js';
import PopupWithImage from './PopupWithImage.js';
import PopupWithForm from './PopupWithForm.js';
import UserInfo from './UserInfo.js';

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
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, cardSelector, () => {
        const imagePopup = new PopupWithImage(imgPopupSelector, item);
        imagePopup.open();
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  cardsList
);

cardList.renderItems();

// Создаем экземпляр класса для попапа редактирования профиля
const popupWithEditForm = new PopupWithForm(profileEditPopup, (data) => {
  const userInfo = new UserInfo({nameSelector: profileName, infoSelector: profileInfo});
  userInfo.setUserInfo(data);
});

// Открываем попап редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  const userInfo = new UserInfo({nameSelector: profileName, infoSelector: profileInfo});
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  infoInput.value = data.info;
  formValidators['profile-edit'].resetErrors();
  popupWithEditForm.open();
});

// Создаем экземпляр класса для попапа добавления карточки
const popupWithAddCardForm = new PopupWithForm(addCardPopup, (data) => {
  const newData = {name: data['card-title'], link: data['card-link']};
  const card = new Card(newData, cardSelector, () => {
    const imagePopup = new PopupWithImage(imgPopupSelector, newData);
    imagePopup.open();
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
});

popupAddOpenButton.addEventListener('click', () => {
  formValidators['add-cart'].resetErrors();
  popupWithAddCardForm.open();
});
