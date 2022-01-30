// Элементы
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const formElement = document.querySelector('.popup-form');
const cardsList = document.querySelector('.gallery__list');
const cardImage = cardsList.querySelector('.gallery-item__img');
const cardTitle = cardsList.querySelector('.gallery-item__title');

// Temaplate
const template = document.querySelector('.gallery-item-template').content;

// Попапы
const profileEditPopup = document.querySelector('.popup_edit-profile');
const addCardPopup = document.querySelector('.popup_add-item');
const imgPopup = document.querySelector('.popup_fullscreen-img');

// Элементы модалки
const popupProfileOpenButton = document.querySelector('.profile__edit-btn');
const popupAddOpenButton = document.querySelector('.profile__add-btn');
const popupCloseButtons = document.querySelectorAll('.popup__close');

// Формы
const profileEditForm = document.querySelector('#profile-edit-form');
const addCardForm = document.querySelector('#add-cart-form');

// Инпуты
const nameInput = document.querySelector('#name');
const jobInput = document.querySelector('#job');
const cardTitleInput = document.querySelector('#card-title');
const linkInput = document.querySelector('#card-link');

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
function openPopup(item) {
  item.classList.add('popup_opened');
}

// Функция закрытия модалки
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// Обновляем информацию профиля
function profileFormSubmitHandler(event) {
  event.preventDefault();
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closePopup(profileEditPopup);
}

profileEditForm.addEventListener('submit', profileFormSubmitHandler);

// Добавление карточек
function addCardSubmitHandler(event) {
  event.preventDefault();
  const item = {};
  item.name = cardTitleInput.value;
  item.link = linkInput.value;
  renderItem(item);
  event.target.reset(); // очищаем поля формы
  closePopup(addCardPopup);
}

addCardForm.addEventListener('submit', addCardSubmitHandler);

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

// Закрытие модалок
popupCloseButtons.forEach((element) => {
  element.addEventListener('click', function (event) {
    closePopup(event.target.closest('.popup'));
  });
});

// Рендер карточек
function render(items) {
  items.forEach(renderItem);
}

function renderItem(item) {
  const newCard = template.querySelector('.gallery-item').cloneNode(true);
  newCard.querySelector('.gallery-item__img').src = item.link;
  newCard.querySelector('.gallery-item__title').textContent = item.name;
  newCard.querySelector('.gallery-item__img').alt = item.name;
  addListeners(newCard);
  cardsList.prepend(newCard);
  return newCard;
}

// Слушатели событий для карточек
function addListeners(el) {
  el.querySelector('.gallery-item__delete').addEventListener('click', handlerDelete);
  el.querySelector('.gallery-item__favourite').addEventListener('click', handlerFavourite);
  el.querySelector('.gallery-item__img').addEventListener('click', openFullwidthImg);
}

// Удаление карточек
function handlerDelete(event) {
  event.target.closest('.gallery-item').remove();
}

// Ставим лайки
function handlerFavourite(event) {
  event.target.classList.toggle('gallery-item__favourite_active');
}

// Открываем картинки
function openFullwidthImg(event) {
  const item = event.target.closest('.gallery-item');
  const cardImageLink = document.querySelector('.popup__img');
  const cardImageName = document.querySelector('.popup__img-name');
  cardImageLink.src = item.querySelector('.gallery-item__img').src;
  cardImageName.textContent = item.querySelector('.gallery-item__title').textContent;

  openPopup(imgPopup);
}

render(initialCards);
