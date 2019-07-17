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
var maxLeft = 1200;
var minLeft = 0;
var minHeight = 130;
var maxHeight = 630;

mainButton.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
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
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var onMouseMove = function (moveEvt) {
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };
    adressMarker.value = Math.ceil(parseInt(mainButton.style.left, 10) + BUTTON_WIDTH / 2) + ', ' + (parseInt(mainButton.style.top, 10));
    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainButton.style.left = (mainButton.offsetLeft - shift.x) + 'px';
    mainButton.style.top = (mainButton.offsetTop - shift.y) + 'px';
    if (parseInt(mainButton.style.top, 10) >= maxHeight) {
      mainButton.style.top = maxHeight + 'px';
    } else if (parseInt(mainButton.style.top, 10) <= minHeight) {
      mainButton.style.top = minHeight + 'px';
    } 
    if (parseInt(mainButton.style.left, 10) >= maxLeft - BUTTON_WIDTH / 2) {
      mainButton.style.left = maxLeft - BUTTON_WIDTH / 2 + 'px';
    } else if (parseInt(mainButton.style.left, 10) <= minLeft - BUTTON_WIDTH / 2) {
      mainButton.style.left = minLeft - BUTTON_WIDTH / 2 + 'px';
    } 
    console.log(mainButton.style.top);
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    adressMarker.value = Math.floor(parseInt(mainButton.style.left, 10) + BUTTON_WIDTH / 2) + ', ' + (parseInt(mainButton.style.top, 10));
  };
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

selectOffers.addEventListener('change', function () {
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

timeIn.addEventListener('change', function () {
  if (timeIn[0].selected) {
    timeOut[0].selected = true;
  } else if (timeIn[1].selected) {
    timeOut[1].selected = true;
  } else if (timeIn[2].selected) {
    timeOut[2].selected = true;
  }
});

timeOut.addEventListener('change', function () {
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

function getRandomInt(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getAdverts() {
  var adverts = [];
  var author;
  var offer;
  var location;
  for (i = 0; i < 8; i++) {
    author = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
    offer = {type: offerTypes[getRandomInt(0, offerTypes.length)]};
    location = {x: getRandomInt(0, 1200) - BUTTON_WIDTH / 2, y: getRandomInt(130, 630)};
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
