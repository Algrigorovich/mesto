// Элементы вёрстки
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup-form');

// Инпуты
const nameInput = formElement.querySelector('#name');
const jobInput = formElement.querySelector('#job');

// Элементы модалки
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = document.querySelector('.popup__close');

// Функция открытия
function openPopup() {
  popup.classList.add('popup_opened');
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
}

// Функция закрытия
function closePopup() {
  popup.classList.remove('popup_opened');
}

// Обновляем информацию профиля
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);

// Ставим лайки
// const addToFavouriteBtn = document.querySelectorAll('.gallery__favourite');

// addToFavouriteBtn.forEach((element) => {
//   element.addEventListener('click', function () {
//     element.classList.toggle('gallery__favourite_active');
//   });
// });

//  Открытие и закрытие модалки
popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);

// popup.addEventListener('click', function (event) {
//   if (event.target === event.currentTarget) {
//     closePopup();
//   }
// });
