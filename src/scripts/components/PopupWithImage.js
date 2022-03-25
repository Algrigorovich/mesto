import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  open(data) {
    const image = this._popup.querySelector('.popup__img');
    const title = this._popup.querySelector('.popup__img-name');

    image.src = data.link;
    image.alt = data.text;
    title.textContent =  data.text;
    super.open();
  }
}
