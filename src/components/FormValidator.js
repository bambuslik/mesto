export class FormValidator {
  constructor(validatorConfig, formElement) {
    this._inputErrorClass = validatorConfig.inputErrorClass;
    this._errorClass = validatorConfig.errorClass;
    this._submitButtonSelector = validatorConfig.submitButtonSelector;
    this._inactiveButtonClass = validatorConfig.inactiveButtonClass;
    this._formElement = formElement;
  }

  _getInputsList() {
    return Array.from(this._formElement.querySelectorAll('.form__input-text'));
  }

  _showInputError(inputElement) {
    inputElement.classList.add(this._inputErrorClass);
    const errorElement = inputElement.closest('.form__field').querySelector('.form__input-error');
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  }

  _hideInputError(inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    inputElement.closest('.form__field').querySelector('.form__input-error').classList.remove(this._errorClass);
  }

  _hasInvalidInput() {
    return this._getInputsList().some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setSubmitDisabled(submitButtonElement) {
    submitButtonElement.classList.add(this._inactiveButtonClass);
    submitButtonElement.setAttribute('disabled', 'disabled');
  }

  _setSubmitEnabled(submitButtonElement) {
    submitButtonElement.classList.remove(this._inactiveButtonClass);
    submitButtonElement.removeAttribute('disabled');
  }

  _setSubmitState() {
    const submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    if (this._hasInvalidInput()) {
      this._setSubmitDisabled(submitButtonElement);
    } else {
      this._setSubmitEnabled(submitButtonElement);
    }
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
    this._setSubmitState();
  }

  _setEventListeners() {
    this._getInputsList().forEach((inputElement) => {
      inputElement.addEventListener('input', (event) => {
        this._checkInputValidity(inputElement);
      });
    });
  }

  resetFormByCloseModal() {
    this._getInputsList().forEach((inputElement) => {
      inputElement.value = '';
      this._hideInputError(inputElement);
    });
    const submitButtonElement = this._formElement.querySelector(this._submitButtonSelector);
    this._setSubmitDisabled(submitButtonElement);
  }

  enableValidation() {
    this._setSubmitState();
    this._setEventListeners();
  }
}