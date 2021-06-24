export default class Input {
  constructor(node, initialValue) {
    this.node = node;
    this.initialValue = initialValue;
    this.wrap = this.node.closest('.param-input');
    this.placeholder = this.wrap.querySelector('.param-input__placeholder');
  }

  init() {
    this.node.value = this.initialValue;

    this.node.addEventListener('input', () => {
      this.node.setAttribute('data-value', this.node.value);
      this.node.classList.remove('param-input__input_error');
    });

    return this;
  }

  checkValidity(regExp) {
    let validationResult = {
      result: true
    };

    if (this.node.value === '' && this.node.required) {
      validationResult = {
        result: false,
        message: 'Нужно заполнить обязательные поля'
      }
      return validationResult;
    }

    if (this.node.value !== '' && !regExp.test(this.node.value)) {
      validationResult = {
        result: false,
        message: 'Можно вводить только английские буквы, цифры и символы - и _'
      }
      return validationResult;
    }

    return validationResult;
  }
}
