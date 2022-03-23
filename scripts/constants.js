// Элементы
export const profileName = '.profile__name';
export const profileInfo = '.profile__job';
export const cardsList = '.gallery__list';
export const cardSelector = '.gallery-item-template';
// Попапы
export const popups = document.querySelectorAll('.popup');
export const profileEditPopup ='.popup_edit-profile';
export const addCardPopup = '.popup_add-item';
export const imgPopupSelector = '.popup_fullscreen-img';

// Элементы модалки
export const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
export const popupAddOpenButton = document.querySelector('.profile__add-btn');
export const popupImageLink = document.querySelector('.popup__img');
export const popupImageName = document.querySelector('.popup__img-name');

// Формы
export const profileEditForm = document.querySelector('#profile-edit-form');
export const addCardForm = document.querySelector('#add-cart-form');

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
}