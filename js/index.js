import { debounce } from './utils/debounce.js';
import { regExps } from './utils/regexps.js';
import Input from './classes/Input.js';
import Textarea from './classes/Textarea.js';
import {setUtm} from './modules/setUtm.js';
import {getStringHtml} from './modules/getStringHtml.js';

const inputAreaNode = document.querySelector('.input-area .textarea__field');
const outputAreaNode = document.querySelector('.output-area .textarea__field');
const workingArea = document.querySelector('#working-area').contentWindow;
const settings = document.querySelector('.settings');
const settingsApplyButton = settings.querySelector('.settings__submit');
const settingsInputs = Array.from(settings.querySelectorAll('.param-input__input'));
const settingsErrorMessage = document.querySelector('.settings__error');

settingsInputs.forEach((node, i) => {
  settingsInputs[i] = new Input(node).init();
});

let inputTextarea = new Textarea(inputAreaNode).init();
let outputTextarea = new Textarea(outputAreaNode).init();

let inputAreaInputHandler = debounce(() => {
  workingArea.document.write(inputTextarea.node.value);
}, 1500, false);

inputTextarea.node.addEventListener('input', inputAreaInputHandler);

function showSetUpErrorMessage(text) {
  settingsErrorMessage.classList.remove('hidden');
  settingsErrorMessage.textContent = text;
}

settingsApplyButton.addEventListener('click', () => {
  let utms = {};
  let isValid = true;

  settingsErrorMessage.classList.add('hidden');

  if (inputTextarea.node.value === '') {
    showSetUpErrorMessage('Сначала нужно вставить HTML-код');
    return;
  }

  settingsInputs.forEach(input => {
    let validationResult = input.checkValidity(regExps.utm);

    if (validationResult.result) {
      if (input.node.value !== '') {
        utms[input.node.name.replace('utm-', '')] = input.node.value;
      }
    } else {
      isValid = false;
      input.node.classList.add('param-input__input_error');
      showSetUpErrorMessage(validationResult.message);
    }
  });

  if (isValid) {
    setUtm(workingArea.document, utms);
    let output = getStringHtml(workingArea.document);
    outputTextarea.node.textContent = output;
    outputTextarea.toggleTitleVisibility();
  }
});
