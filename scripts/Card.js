export class Card {
  constructor (data, cardSelector, handleOpenCardImage) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
    this._handleOpenCardImage = handleOpenCardImage;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._cardSelector).content.querySelector('.gallery-item').cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._elementImg = this._element.querySelector('.gallery-item__img');
    this._elementName = this._element.querySelector('.gallery-item__title');

    this._elementImg.src = this._link;
    this._elementImg.alt = this._name;
    this._elementName.textContent = this._name;

    this._setEventListeners();
    return this._element;
  }


  _setEventListeners() {
    this._element.querySelector('.gallery-item__delete').addEventListener('click', () => {
      this._handleDelete();
    });

    this._element.querySelector('.gallery-item__favourite').addEventListener('click', () => {
      this._handleFavourite();
    });

    this._elementImg.addEventListener('click', () => {
      this._handleOpenCardImage(this._link, this._name);
    });
  }

  _handleDelete() {
    this._element.closest('.gallery-item').remove();
  }

  _handleFavourite = () => {
    this._element.querySelector('.gallery-item__favourite').classList.toggle('gallery-item__favourite_active');
  }

}

