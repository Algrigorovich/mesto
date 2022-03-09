import { config } from "./initialData.js";

export class FormValidator {
  constructor (config, formElement) {
    this._form = formElement;
    this._config = config;
    this._inputList = Array.from(this._form.querySelectorAll(this._config.inputSelector));
    this._submitButton = this._form.querySelector(this._config.submitButtonSelector);
  }

  _showInputError (inputElement) {
    const errorElement =  this._form.querySelector(`.${inputElement.name}-input-error`);
    errorElement.classList.add(this._config.errorClass);
    errorElement.textContent =  inputElement.validationMessage;
    inputElement.classList.add(this._config.inputErrorClass);
  }

  _hideInputError (inputElement) {
    const errorElement =  this._form.querySelector(`.${inputElement.name}-input-error`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
    inputElement.classList.remove(this._config.inputErrorClass);
  }

  _findInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _checkValidityInput (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  toggleButtonState () {
    if (this._findInvalidInput()) {
      this._submitButton.classList.add(config.inactiveButtonClass);
      this._submitButton.setAttribute('disabled', '');
    } else {
      this._submitButton.classList.remove(config.inactiveButtonClass);
      this._submitButton.removeAttribute('disabled');
    }
  }

  _setInputEventListeners () {
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkValidityInput(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._form.addEventListener('submit', (event) => {
      event.preventDefault();
    });
    this._setInputEventListeners();
  }

  revalidateForm () {
    this._form.reset();
    this._inputList.forEach( (inputElement) => {
      this._hideInputError(inputElement);
    })
  }
}
