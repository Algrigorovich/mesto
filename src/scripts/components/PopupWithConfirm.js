import Popup from "./Popup.js";

export default class PopupWithConfirm extends Popup {
  constructor(popupSelector, formSubmit) {
    super(popupSelector);
    this._formSubmit = formSubmit;
    this._popupForm = this._popup.querySelector('.popup-form');
  }

  newHandleFormSubmit(newSubmitHandler) {
    this._formSubmit = newSubmitHandler;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', () => {
      this._formSubmit();
    });
  }
}
