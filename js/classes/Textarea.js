export default class Textarea {
  constructor(node) {
    this.node = node;
    this.wrap = this.node.closest('.textarea');
    this.title = this.wrap.querySelector('.textarea__title');
  }

  init() {
    this.toggleTitleVisibility();
    this.node.addEventListener('input', () => {
      this.toggleTitleVisibility();
    });

    return this;
  }

  toggleTitleVisibility() {
    if (this.isEmpty()) {
      this.title.classList.remove('hidden');
    } else {
      this.title.classList.add('hidden');
    }
  }

  isEmpty() {
    return this.node.value === '';
  }
}
