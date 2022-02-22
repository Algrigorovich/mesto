// Элементы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup-form');
const cardsList = document.querySelector('.gallery__list');

// Template
const template = document.querySelector('.gallery-item-template').content;

// Попапы
const popups = document.querySelectorAll('.popup');
const profileEditPopup = document.querySelector('.popup_edit-profile');
const addCardPopup = document.querySelector('.popup_add-item');
const imgPopup = document.querySelector('.popup_fullscreen-img');

// Элементы модалки
const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupAddOpenButton = document.querySelector('.profile__add-btn');
const cardImageLink = document.querySelector('.popup__img');
const cardImageName = document.querySelector('.popup__img-name');

// Формы
const profileEditForm = document.querySelector('#profile-edit-form');
const addCardForm = document.querySelector('#add-cart-form');

// Инпуты
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#about');

// Карточки по умолчанию
const initialCards = [
  {
    name: 'Алтай',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg',
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg',
  },
  {
    name: 'Ергаки',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg',
  },
  {
    name: 'Карелия',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg',
  },
  {
    name: 'Санкт-Петербург',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg',
  },
  {
    name: 'Сочи',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg',
  },
];

// Функция открытия модалки
function openPopup(popup) {
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
}

// Для каждого попапа вешаем обработчик и проверям куда нажали (не клик, он с багом случайного закрытия)
popups.forEach( popup => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
    if (evt.target.classList.contains('popup__close')) {
      closePopup(popup)
    }
  })
})

// Обновляем информацию профиля
function handleProfileFormSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
  const inputList = [nameInput, jobInput];
  const button = profileEditPopup.querySelector('.popup-form__submit')
  toggleButtonState(inputList, button, { inactiveButtonClass: 'popup-form__submit_disabled'} )
}

profileEditForm.addEventListener('submit', handleProfileFormSubmit);

// Добавление карточек
function handleAddCardSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const button = form.querySelector('.popup-form__submit');
  const item = {};
  item.name = form.querySelector('#card-title').value;
  item.link = form.querySelector('#card-link').value;
  renderItem(item);
  form.reset(); // очищаем поля формы
  button.setAttribute('disabled', '');
  button.classList.add('popup-form__submit_disabled')
  closePopup(addCardPopup);
}

addCardForm.addEventListener('submit', handleAddCardSubmit);

//  Открытие модалки редактирования профиля
popupProfileOpenButton.addEventListener('click', function () {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(profileEditPopup);

});

// Открытие модалки добавление карточки
popupAddOpenButton.addEventListener('click', function () {
  openPopup(addCardPopup);
});

// Рендер карточек
function render(items) {
  items.forEach(renderItem);
}

function renderItem(item) {
  const newCard = createCard(item);
  cardsList.prepend(newCard);
}

// Создание карточки
function createCard(item) {
  const cardElement = template.querySelector('.gallery-item').cloneNode(true);
  const cardImage = cardElement.querySelector('.gallery-item__img');
  const cardTitle = cardElement.querySelector('.gallery-item__title');
  const deleteBtn = cardElement.querySelector('.gallery-item__delete');
  const favouriteBtn = cardElement.querySelector('.gallery-item__favourite');

  cardImage.src = item.link;
  cardTitle.textContent = item.name;
  cardImage.alt = item.name;
  addCardListeners(cardImage, deleteBtn, favouriteBtn);
  return cardElement;
}

// Слушатели событий для карточек
function addCardListeners(cardImage, deleteBtn, favouriteBtn) {
  deleteBtn.addEventListener('click', handleDelete);
  favouriteBtn.addEventListener('click', handleFavourite);
  cardImage.addEventListener('click', openFullwidthImg);
}

// Удаление карточек
function handleDelete(event) {
  event.target.closest('.gallery-item').remove();
}

// Ставим лайки
function handleFavourite(event) {
  event.target.classList.toggle('gallery-item__favourite_active');
}

// Открываем картинки
function openFullwidthImg(event) {
  cardImageLink.src = event.target.src;
  cardImageLink.alt = event.target.alt;
  cardImageName.textContent = event.target.alt;
  openPopup(imgPopup);
}

render(initialCards);


// Геннадий, спасибо большое за ревью!
