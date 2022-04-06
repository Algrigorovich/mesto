import {
  profileName,
  profileInfo,
  profileAvatar,
  cardsListSelector,
  cardSelector,
  profileEditPopup,
  addCardPopup,
  imgPopupSelector,
  popupProfileOpenButton,
  popupAddOpenButton,
  popupEditAvatarButton,
  confirmPopup,
  editAvatarPopup,
  config,
} from '../scripts/constants.js';

import {Card} from '../scripts/components/Card.js';
import {FormValidator} from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import PopupWithImage from '../scripts/components/PopupWithImage.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';
import UserInfo from '../scripts/components/UserInfo.js';
import {api} from '../scripts/components/Api.js';

import '../pages/index.css';

let userId;

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

const initialData = [api.getProfileData(), api.getInitialCards()]

Promise.all(initialData)
  .then( ([userData, cards]) => {
    userInfo.setUserInfo(userData.name, userData.about);
    userInfo.setUserAvatar(userData.avatar);
    userId = userData._id;

    cards.forEach((data) => {
      cardsList.addItem({
        name: data.name,
        link: data.link,
        likes: data.likes,
        id: data._id,
        userId: userId,
        ownerId: data.owner._id,
      });
    });
  })
  .catch((err) => console.log(err));

// рендерим карточки
function createCard(item) {
  const card = new Card(
    item,
    cardSelector,
    () => {
      imagePopup.open(item);
    },
    (id) => {
      comfirmPopup.open();
      comfirmPopup.changeFormSubmitHandler(() => {
        api.deleteCard(id)
          .then((res) => {
            card.handleDelete();
            comfirmPopup.close();
          })
          .catch((err) => console.log(err));
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteCardLike(id)
          .then((res) => {
            card.handleLikes(res.likes);
          })
          .catch((err) => console.log(err));
      } else {
        api.setCardLike(id)
          .then((res) => {
            card.handleLikes(res.likes);
          })
          .catch((err) => console.log(err));
      }
    }
  );

  const cardElement = card.generateCard();
  return cardElement;
}

const cardsList = new Section({items: [], renderer: createCard}, cardsListSelector);
const userInfo = new UserInfo({nameSelector: profileName, infoSelector: profileInfo, avatarSelector: profileAvatar});
const imagePopup = new PopupWithImage(imgPopupSelector);
const comfirmPopup = new PopupWithForm(confirmPopup);
const updateAvatarPopup = new PopupWithForm(editAvatarPopup, (data, button) => {
  updateAvatarPopup.renderLoading(true);
  api
    .updateAvatar(data)
    .then((res) => {
      userInfo.setUserAvatar(res.avatar);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      updateAvatarPopup.renderLoading(false);
      updateAvatarPopup.close();
    });
});

// Создаем экземпляр класса для попапа редактирования профиля,
const popupWithEditForm = new PopupWithForm(profileEditPopup, (data, button) => {
  popupWithEditForm.renderLoading(true);
  const {name, info} = data;
  api.editProfile(name, info)
    .then(() => {
      userInfo.setUserInfo(name, info);
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithEditForm.renderLoading(false);
      popupWithEditForm.close();
    });
});

// Открываем попап редактирования профиля
popupProfileOpenButton.addEventListener('click', () => {
  formValidators['profile-edit'].resetErrors();
  const data = userInfo.getUserInfo();
  popupWithEditForm.setInputValues(data);
  popupWithEditForm.open();
});

// Создаем экземпляр класса для попапа добавления карточки
const popupWithAddCardForm = new PopupWithForm(addCardPopup, (data, button) => {
  popupWithAddCardForm.renderLoading(true);
  api.addCard(data['card-title'], data['card-link'])
    .then((res) => {
      cardsList.addItem({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id,
      });
    })
    .catch((err) => console.log(err))
    .finally(() => {
      popupWithAddCardForm.renderLoading(false);
      popupWithAddCardForm.close();
    });
});

popupEditAvatarButton.addEventListener('click', () => {
  formValidators['edit-avatar'].resetErrors();
  updateAvatarPopup.open();
});

popupAddOpenButton.addEventListener('click', () => {
  formValidators['add-cart'].resetErrors();
  popupWithAddCardForm.open();
});
