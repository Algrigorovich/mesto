import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector, data) {
    super(popupSelector);
    this._popupImageLink = this._popup.querySelector('.popup__img');
    this._popupImageName = this._popup.querySelector('.popup__img-name');
    this._data = data;
    console.log(this._data, 'data in popimgh');
  }

  open() {
    this._popupImageLink.src = this._data.link;
    this._popupImageLink.alt = this._data.name;
    this._popupImageName.textContent = this._data.name;
    super.open();
  }
}
