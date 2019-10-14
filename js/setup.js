'use strict';
var WIZARDS_COUNT = 4;
var WIZARD_FIRST_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_LAST_NAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var FIREBALL_COLOR = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
// Задание 1
var userDialog = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = userDialog.querySelector('.setup-close');
var setupUserName = userDialog.querySelector('.setup-user-name');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closeUserDialog();
  }
};

var openUserDialog = function () {
  userDialog.classList.remove('hidden');
};

var closeUserDialog = function () {
  userDialog.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};


setupOpen.addEventListener('click', function () {
  openUserDialog();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openUserDialog();
  }
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closeUserDialog();
  }
});

setupClose.addEventListener('click', function () {
  closeUserDialog();
});
document.addEventListener('keydown', function (evt) {

  if (evt.keyCode === ESC_KEYCODE) {
    event.stopPropagation();
    closeUserDialog();
  }
});

setupUserName.addEventListener('keydown', function (evt) {
  evt.stopPropagation();
});

// Задание 3

var setupWizard = document.querySelector('.setup-wizard-form');
var wizardCoatColor = setupWizard.querySelector('input[name="coat-color"]');
var wizardEyesColor = setupWizard.querySelector('input[name="eyes-color"]');
var wizardfireballColor = setupWizard.querySelector('input[name="fireball-color"]');

var wizardCoat = setupWizard.querySelector('.wizard-coat');
wizardCoat.addEventListener('click', function () {
  var color = getRandomElement(COAT_COLORS);
  wizardCoat.style.fill = color;
  wizardCoatColor.value = color;
});

var wizardEyes = setupWizard.querySelector('.wizard-eyes');
wizardEyes.addEventListener('click', function () {
  var color = getRandomElement(EYES_COLOR);
  wizardEyes.style.fill = color;
  wizardEyesColor.value = color;
});

var setupFireballWrap = document.querySelector('.setup-fireball-wrap');
setupFireballWrap.addEventListener('click', function () {
  var color = getRandomElement(FIREBALL_COLOR);
  setupFireballWrap.style.backgroundColor = color;
  wizardfireballColor.value = color;
});

var getRandomElement = function (array) {
  var randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
};

var wizardNames = [];
var wizards = [];
for (var i = 0; i < WIZARDS_COUNT; i++) {
  wizardNames[i] = getRandomElement(WIZARD_FIRST_NAMES) + ' ' + getRandomElement(WIZARD_LAST_NAMES);
  wizards[i] =
    {
      name: wizardNames[i],
      coatColor: getRandomElement(COAT_COLORS),
      eyesColor: getRandomElement(EYES_COLOR),
    };
}

var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
