'use strict';

var BUTTON_WIDTH = 65;
var BUTTON_HEIGHT = 82;
var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var button = document.querySelector('.map__pin');
var mainButton = document.querySelector('.map__pin--main');
var buttonsList = document.querySelector('.map__pins');
var offersMock = getAdverts();
var map = document.querySelector('.map');
var form = document.querySelector('.ad-form');
var formInputs = document.querySelectorAll('.ad-form input');
var formSelects = document.querySelectorAll('.ad-form select');
var adressMarker = document.querySelector('#address');
var selectOffers = document.querySelector('#type');
var inputPrice = document.querySelector('#price');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');

selectOffers.addEventListener('click', function () {  
  if (selectOffers[0].selected) {
    inputPrice.min = '0';
    inputPrice.placeholder = '0';
  } else if (selectOffers[1].selected) {
    inputPrice.min = '1000';
    inputPrice.placeholder = '1000';
  } else if (selectOffers[2].selected) {
    inputPrice.min = '5000';
    inputPrice.placeholder = '5000';
  } else if (selectOffers[3].selected) {
    inputPrice.min = '10000';
    inputPrice.placeholder = '10000';
  }
});

timeIn.addEventListener('click', function () {
  if (timeIn[0].selected) {
    timeOut[0].selected = true;
  } else if (timeIn[1].selected) {
    timeOut[1].selected = true;
  } else if (timeIn[2].selected) {
    timeOut[2].selected = true;
  }
});

timeOut.addEventListener('click', function () {
  if (timeOut[0].selected) {
    timeIn[0].selected = true;
  } else if (timeOut[1].selected) {
    timeIn[1].selected = true;
  } else if (timeOut[2].selected) {
    timeIn[2].selected = true;
  }
});

for (var i = 0; i < formInputs.length; i++) {
  formInputs[i].setAttribute('disabled', 'disabled');
}

for (i = 0; i < formSelects.length; i++) {
  formSelects[i].setAttribute('disabled', 'disabled');
}

mainButton.addEventListener('click', function () {
  map.classList.remove('map--faded');
  form.classList.remove('ad-form--disabled');
  for (i = 0; i < 8; i++) {
    var newButton = renderButton(offersMock[i]);
    buttonsList.appendChild(newButton);
  }
  for (i = 0; i < formInputs.length; i++) {
    formInputs[i].disabled = false;
  }
  for (i = 0; i < formSelects.length; i++) {
    formSelects[i].disabled = false;
  }
  adressMarker.setAttribute('disabled', 'disabled');
});

function getRandomInt(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

adressMarker.value = parseInt(mainButton.style.left, 10) + ', ' + parseInt(mainButton.style.top, 10);

function getAdverts() {
  var adverts = [];
  var author;
  var offer;
  var location;
  for (i = 0; i < 8; i++) {
    author = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
    offer = {type: offerTypes[getRandomInt(0, offerTypes.length)]};
    location = {x: getRandomInt(0, 1200) - BUTTON_WIDTH / 2, y: getRandomInt(130, 630) - BUTTON_HEIGHT};
    adverts.push({author: author, offer: offer, location: location});
  }
  return adverts;
}

function renderButton(offer) {
  var cloneButton = button.cloneNode(true);
  cloneButton.style.left = offer.location.x + 'px';
  cloneButton.style.top = offer.location.y + 'px';
  cloneButton.childNodes[1].src = offer.author.avatar;
  cloneButton.childNodes[1].alt = offer.offer.type;
  return cloneButton;
}
