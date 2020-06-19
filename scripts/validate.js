//LET, CONST DEFINITIONS
const formList = Array.from(document.querySelectorAll('.form'));
const inputErrorClass = 'form__input-text_type_error';
const errorClass = 'form__input-error_type_visible';
const inactiveButtonClass = 'form__submit_disabled';
const submitButtonSelector = '.form__submit';

//FUNC DEFINITIONS
function inputList(formElement) {
  return Array.from(formElement.querySelectorAll('.form__input-text'));
}

function hasInvalidInput(formElement) {
  return inputList(formElement).some(inputElement => {
    return !inputElement.validity.valid
  });
}

function setSubmitDisabled(submitButtonElement, inactiveButtonClass) {
  submitButtonElement.classList.add(inactiveButtonClass);
  submitButtonElement.setAttribute('disabled', 'disabled');
}

function setSubmitEnabled(submitButtonElement, inactiveButtonClass) {
  submitButtonElement.classList.remove(inactiveButtonClass);
  submitButtonElement.removeAttribute('disabled');
}

function setSubmitState(formElement, submitButtonSelector, inactiveButtonClass) {
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  if (hasInvalidInput(formElement)) {
    setSubmitDisabled(submitButtonElement, inactiveButtonClass);
  } else {
    setSubmitEnabled(submitButtonElement, inactiveButtonClass);
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

function checkInputValidity(inputSelector, inputErrorClass, errorClass) {
  if (!inputSelector.validity.valid) {
    showInputError(inputSelector, inputErrorClass, errorClass);
  } else {
    hideInputError(inputSelector, inputErrorClass, errorClass);
  }
}

function enableValidation(options) {
  checkInputValidity(options.inputElement, options.inputErrorClass, options.errorClass);
  setSubmitState(options.formElement, options.submitButtonSelector, options.inactiveButtonClass);
}

function setEventListeners(formElement, inputList) {
  setSubmitState(formElement, '.form__submit', 'form__submit_disabled');
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', (event) => {
      enableValidation({
        formElement: formElement,
        inputElement: inputElement,
        submitButtonSelector: submitButtonSelector,
        inactiveButtonClass: inactiveButtonClass,
        inputErrorClass: inputErrorClass,
        errorClass: errorClass
      });
    });
  });
}

function resetForm(formElement) {
  if (formElement) {
    formElement.reset();
    const errorInputElements = Array.from(formElement.querySelectorAll('.form__input-text_type_error'));
    errorInputElements.forEach((element) => {
      hideInputError(element, inputErrorClass, errorClass)
    });
    setSubmitDisabled(formElement.querySelector(submitButtonSelector), inactiveButtonClass);
  }
}

//FUNC CALL
formList.forEach((formElement) => {
  setEventListeners(formElement, inputList(formElement));
});