export default class Input {
  constructor(node, initialValue) {
    this.node = node;
    this.initialValue = initialValue || localStorage.getItem(node.name) || '';
    this.wrap = this.node.closest('.param-input');
  }

  init() {
    this.node.value = this.initialValue;
    this.node.dataset.value = this.node.value;

    this.node.addEventListener('input', () => {
      this.node.dataset.value = this.node.value;
      this.node.classList.remove('param-input__input_error');
    });

    this.node.addEventListener('blur', () => {
      localStorage.setItem(this.node.name, this.node.value);
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
