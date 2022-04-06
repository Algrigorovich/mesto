import {setTimeout} from 'core-js';
import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup-form');
    this._handleFormSubmit = this._handleFormSubmit.bind(this);
    this._getInputValues = this._getInputValues.bind(this);
    this._inputList = [...this._popupForm.querySelectorAll('.popup-form__input')];
    this._submitButton = this._popup.querySelector('.popup-form__submit');
    this._initButtonText = this._submitButton.textContent;
  }

  _handleFormSubmit(event) {
    this._formSubmit(this._getInputValues(), this.submitButton);
  }

  changeFormSubmitHandler(newSubmitHandler) {
    this._formSubmit = newSubmitHandler;
    // this.close();
  }

  _getInputValues() {
    const data = {};
    this._inputList.forEach((input) => {
      data[input.name] = input.value;
    });
    return data;
  }

  setInputValues(data) {
    this._inputList.forEach((input) => {
      input.value = data[input.name];
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Сохранение...';
    } else {
      this._submitButton.textContent = this._initButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', this._handleFormSubmit);
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
