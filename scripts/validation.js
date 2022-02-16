const formSubmit = (event, formElement) => {
  event.preventDefault();
};

// показываем сообщения об ошибках
const showInputError = (inputElement, errorElement, config) => {
  errorElement.classList.add(config.errorClass);
  errorElement.textContent = inputElement.validationMessage;
  inputElement.classList.add(config.inputErrorClass);
};

// прячем сообщения об ошибках
const hideInputError = (inputElement, errorElement, config) => {
  errorElement.classList.remove(config.errorClass);
  errorElement.textContent = '';
  inputElement.classList.remove(config.inputErrorClass);
};

/* проверяем инпут на валидность, если инпут валиден прячем ошибки
   иначе показываем ошибки */
const checkValidityInput = (inputElement, errorElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(inputElement, errorElement, config);
  } else {
    hideInputError(inputElement, errorElement, config);
  }
};

/* Проверяем  форму на валидность, если ок то делаем кнопку активной,
   иначе выключаем кнопку*/
const toggleButtonState = (inputList, button, config) => {
  if (checkInvalidInput(inputList)) {
    button.classList.add(config.inactiveButtonClass);
    button.setAttribute('disabled', '');
  } else {
    button.classList.remove(config.inactiveButtonClass);
    button.removeAttribute('disabled');
  }
};

// Ищём невалидные инпуты в массиве инпутов, возвращаем true если есть они
const checkInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

// Вешаем слушатели на инпуты
/* Нашли в форме список всех инпутов
  нашли в форме кнопку сабмита
  на каждый инпут навесли обработчик событий "инпут",
  при кадом срабатывании события мы вызываем функцию проверки валидности инпута
  и проверяем состояние кнопки
 */
const setInputEventListeners = (formElement, config) => {
  const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
  const button = formElement.querySelector(config.submitButtonSelector);

  toggleButtonState(inputList, button, config);

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      const errorElement = formElement.querySelector(`.${inputElement.name}-input-error`);
      checkValidityInput(inputElement, errorElement, config);
      toggleButtonState(inputList, button, config);
    });
  });
};

// Включение валидации
/* Нашли формы и на кажду форму повесили обработчик сабмит,
  для каждой формы вызвали функцию слушателей событий для инпутов (передали в неё форму)
*/
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (event )=> formSubmit(event, formElement))
    setInputEventListeners(formElement, config);
  });
};

enableValidation({
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__submit',
  inactiveButtonClass: 'popup-form__submit_disabled',
  inputErrorClass: 'popup-form__input_type_error',
  errorClass: 'popup-form__input-error_visible',
});
