//LET, CONST DEFINITIONS
const formList = Array.from(document.querySelectorAll('.form'));

//FUNC DEFINITIONS
function inputList(formElement) {
  return Array.from(formElement.querySelectorAll('.form__input-text'));
}

function hasInvalidInput(formElement) {
  return inputList(formElement).some(inputElement => {
    return !inputElement.validity.valid
  });
}

function submitBtnState(formElement, submitButtonSelector, inactiveButtonClass) {
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  if (hasInvalidInput(formElement)) {
    submitButtonElement.classList.add(inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', 'disabled');
  } else {
    submitButtonElement.classList.remove(inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }
}

function showInputError(inputSelector, inputErrorClass, errorClass) {
  inputSelector.classList.add(inputErrorClass);
  const errorElement = inputSelector.closest('.form__field').querySelector('.form__input-error');
  errorElement.textContent = inputSelector.validationMessage;
  errorElement.classList.add(errorClass);
}

function hideInputError(inputSelector, inputErrorClass, errorClass) {
  inputSelector.classList.remove(inputErrorClass);
  inputSelector.closest('.form__field').querySelector('.form__input-error').classList.remove(errorClass);
}

function isValid(inputSelector, inputErrorClass, errorClass) {
  if (!inputSelector.validity.valid) {
    showInputError(inputSelector, inputErrorClass, errorClass);
  } else {
    hideInputError(inputSelector, inputErrorClass, errorClass);
  }
}

function enableValidation(options) {
  isValid(options.inputElement, options.inputErrorClass, options.errorClass);
  submitBtnState(options.formElement, options.submitButtonSelector, options.inactiveButtonClass);
}

function setEventListeners(formElement, inputList) {
  submitBtnState(formElement, '.form__submit', 'form__submit_disabled');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      enableValidation({
        formElement: formElement,
        inputElement: inputElement,
        submitButtonSelector: '.form__submit',
        inactiveButtonClass: 'form__submit_disabled',
        inputErrorClass: 'form__input-text_type_error',
        errorClass: 'form__input-error_type_visible'
      });
    });
  });
}

//FUNC CALL
formList.forEach((formElement) => {
  setEventListeners(formElement, inputList(formElement));
});