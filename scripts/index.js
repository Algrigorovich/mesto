import {Card} from './Card.js';
import {FormValidator} from './FormValidator.js';
import {initialCards, config} from './initialData.js';

// Элементы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const cardsList = document.querySelector('.gallery__list');

// Попапы
const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_edit-profile');
const addCardPopup = document.querySelector('.popup_add-item');
const imgPopup = document.querySelector('.popup_fullscreen-img');

// Элементы модалки
const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupAddOpenButton = document.querySelector('.profile__add-btn');
const popupImageLink = document.querySelector('.popup__img');
const popupImageName = document.querySelector('.popup__img-name');

// Формы
const profileEditForm = document.querySelector('#profile-edit-form');
const addCardForm = document.querySelector('#add-cart-form');

// Инпуты
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');

const profileEditFormValidator = new FormValidator(config, profileEditForm);
const addCardFormValidator = new FormValidator(config, addCardForm);

profileEditFormValidator.enableValidation();
addCardFormValidator.enableValidation();

// Функция открытия модалки
export function openPopup(popup) {
  popup.classList.add('popup_opened');
  addPopupListeners();
}

// Функция закрытия модалки
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  removePopupListeners();
}
// Устанавливаем слушатели на закрытие попапа нажатием на Escape
function addPopupListeners() {
  document.addEventListener('keydown', hadleСloseByEscape);
}

// Удаляем слушатели с закрытия попапа нажатием на Escape
function removePopupListeners(popup) {
  document.removeEventListener('keydown', hadleСloseByEscape);
}

// закрытие попапа клавишей Esc
const hadleСloseByEscape = (event) => {
  if (event.key == 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
};

// Для каждого попапа вешаем обработчик и проверям куда нажали
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup);
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup);
    }
  });
});

// Обновляем информацию профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Добавление карточек
function handleAddCardSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const item = {
    name: form.querySelector('#card-title').value,
    link: form.querySelector('#card-link').value,
  };
  const card = new Card(item, '.gallery-item-template', openFullwidthImg);
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);

  closePopup(addCardPopup);
}

addCardForm.addEventListener('submit', handleAddCardSubmit);

//  Открытие модалки редактирования профиля
popupProfileOpenButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;

  profileEditFormValidator.resetErrors();
  profileEditFormValidator.toggleButtonState();

  openPopup(profileEditPopup);
});

// Открытие модалки добавление карточки
popupAddOpenButton.addEventListener('click', function () {
  addCardFormValidator.resetErrors();
  addCardFormValidator.resetForm();
  addCardFormValidator.toggleButtonState();
  openPopup(addCardPopup);
});

// Открываем картинки
function openFullwidthImg(link, name) {
  popupImageLink.src = link;
  popupImageLink.alt = name;
  popupImageName.textContent = name;
  openPopup(imgPopup);
}

// Рендер карточек
function render(items) {
  items.forEach((item) => {
    const card = new Card(item, '.gallery-item-template', openFullwidthImg); // передаём объект аргументом
    const cardElement = card.generateCard();
    cardsList.prepend(cardElement);
  });
}

render(initialCards);
