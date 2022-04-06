// Элементы
export const profileName = '.profile__name';
export const profileInfo = '.profile__job';
export const profileAvatar = '.profile__avatar';
export const cardsListSelector = '.gallery__list';
export const cardSelector = '.gallery-item-template';

// Попапы
export const profileEditPopup = '.popup_edit-profile';
export const addCardPopup = '.popup_add-item';
export const imgPopupSelector = '.popup_fullscreen-img';
export const confirmPopup = '.popup_confirm';
export const editAvatarPopup = '.popup_edit-avatar';

// Элементы открытия модалки
export const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
export const popupAddOpenButton = document.querySelector('.profile__add-btn');
export const popupEditAvatarButton = document.querySelector('.profile__edit-avatar-btn');

// Инпуты
export const nameInput = document.querySelector('#name');
export const infoInput = document.querySelector('#about');

// Селекторы форм

export const config = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__submit',
  inactiveButtonClass: 'popup-form__submit_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_visible',
};
