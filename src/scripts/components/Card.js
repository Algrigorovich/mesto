export class Card {
  constructor(data, cardSelector, handleCardImgClick, handleCardDeleteClick, handleCardLikeClick) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;
    this._cardSelector = cardSelector;
    this._handleOpenCardImage = handleCardImgClick;
    this._handleCardDeleteClick = handleCardDeleteClick;
    this._handleCardLikeClick = handleCardLikeClick;
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
    this._likeCounter = this._element.querySelector('.gallery-item__like-counter');

    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._elementName.textContent = this._name;

    this.handleLikes(this._likes);
    this._setEventListeners();
    if (this._userId !== this._ownerId) this._buttonDelete.style.display = 'none';

    return this._element;
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener('click', () => {
      this._handleCardDeleteClick(this._id);
    });

    this._likeButton.addEventListener('click', () => {
      this._handleCardLikeClick(this._id);
    });

    this._elementImg.addEventListener('click', () => {
      this._handleOpenCardImage(this._data);
    });
  }

  isLiked() {
    const hasUserLike = this._likes.find((user) => user._id === this._userId);
    return hasUserLike;
  }

  handleLikes(likesFromServer) {
    this._likes = likesFromServer;
    this._likeCounter.textContent = this._likes.length;
    if (this.isLiked()) {
      this._addFavouriteClass();
    } else {
      this._removeFavouriteClass();
    }
  }

  handleDelete() {
    this._element.remove();
    this._element = null;
  }

  _addFavouriteClass() {
    this._likeButton.classList.add('gallery-item__favourite_active');
  }

  _removeFavouriteClass() {
    this._likeButton.classList.remove('gallery-item__favourite_active');
  }
}
