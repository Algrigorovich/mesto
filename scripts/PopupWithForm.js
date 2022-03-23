import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup-form');
    this._submitButton = this._popupForm.querySelector('.popup-form__submit');
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._getInputValues = this._getInputValues.bind(this);
  }

  _handleFormSubmit(event) {
    event.preventDefault();

    this._formSubmit(this._getInputValues());
    this.close();
  }

  _getInputValues() {
    const inputList = Array.from(this._popupForm.querySelectorAll('.popup-form__input'));
    const data = {};
    inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    super.close();
  }
}
