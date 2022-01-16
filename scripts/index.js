// Элементы вёрстки
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.profile-edit-form');

// Инпуты
const nameInput = formElement.querySelector('.profile-edit-form__input[name="name"]');
const jobInput = formElement.querySelector('.profile-edit-form__input[name="job"]');

// Элементы модалки
const popup = document.querySelector('.popup');
const popupOpenButton = document.querySelector('.profile__edit-btn');
const popupCloseButton = document.querySelector('.popup__close');

// Функция открытия
function openPopup() {
  if (popup) {
    popup.classList.add('popup_opened');
    nameInput.setAttribute('value', profileName.textContent);
    jobInput.setAttribute('value', profileJob.textContent);
  } else {
    console.log(`Элемент ${popup} отстутсвует на странице`);
  }
}

// Функция закрытия
function closePopup() {
  if (popup) {
    popup.classList.remove('popup_opened');
  } else {
    console.log(`Элемент ${popup} отстутсвует на странице`);
  }
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
const addToFavouriteBtn = document.querySelectorAll('.gallery__favourite');

addToFavouriteBtn.forEach((element) => {
  element.addEventListener('click', function () {
    element.classList.toggle('gallery__favourite_active');
  });
});

//  Открытие и закрытие модалки с проверкой
if (popupOpenButton) {
  popupOpenButton.addEventListener('click', openPopup);
} else {
  console.log(`Элемент ${popupOpenButton} отстутсвует на странице`);
}

if (popupCloseButton) {
  popupCloseButton.addEventListener('click', closePopup);
} else {
  console.log(`Элемент ${popupCloseButton} отстутсвует на странице`);
}

popup.addEventListener('click', function (event) {
  if (event.target === event.currentTarget) {
    closePopup();
  }
});
