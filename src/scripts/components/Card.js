export class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardSelector = cardSelector;
    this._handleOpenCardImage = handleCardClick;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery-item').cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.gallery-item__img');
    this._elementName = this._element.querySelector('.gallery-item__title');
    this._likeButton = this._element.querySelector('.gallery-item__favourite');
    this._buttonDelete = this._element.querySelector('.gallery-item__delete');
    this._likeCounter =  this._element.querySelector('.gallery-item__like-counter')

    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._elementName.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleDelete();
    });

    this._likeButton.addEventListener('click', () => {
      this._handleFavourite();
    });

    this._elementImg.addEventListener('click', () => {
      this._handleOpenCardImage(this._data);
    });
  }

  _handleLieks() {
    this._likeCounter.textContent = this._likes.length;
  }

  _handleDelete() {
    this._element.remove();
  }

  _handleFavourite = () => {
    this._likeButton.classList.toggle('gallery-item__favourite_active');
  };
}
