import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup-form');
    this._submitButton = this._popup.querySelector('.popup-form__submit');
    this._initButtonText = this._submitButton.textContent;
  }

  newHandleFormSubmit(newSubmitHandler) {
    this._formSubmit = newSubmitHandler;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = 'Удаление...';
    } else {
      this._submitButton.textContent = this._initButtonText;
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', () => {
      this._formSubmit();
    });
  }
}
