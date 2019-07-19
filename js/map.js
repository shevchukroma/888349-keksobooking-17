'use strict';

(function () {
  var BUTTON_HEIGHT = 84;
  var BUTTON_WIDTH = 62;
  var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
  var button = document.querySelector('.map__pin');
  var mainButton = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var buttonsList = document.querySelector('.map__pins');
  var formInputs = document.querySelectorAll('.ad-form input');
  var formSelects = document.querySelectorAll('.ad-form select');
  var adressMarker = document.querySelector('#address');
  var offersMock = getAdverts();
  var maxLeft = 1200;
  var minLeft = 0;
  var minHeight = 130;
  var maxHeight = 630;

  function getRandomInt(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
  }

  mainButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < 8; i++) {
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
      adressMarker.value = parseInt(mainButton.style.left, 10) + BUTTON_WIDTH / 2 + ', ' + (parseInt(mainButton.style.top, 10) + BUTTON_HEIGHT);
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainButton.style.left = (mainButton.offsetLeft - shift.x) + 'px';
      mainButton.style.top = (mainButton.offsetTop - shift.y) + 'px';
      if (parseInt(mainButton.style.top, 10) + BUTTON_HEIGHT >= maxHeight) {
        mainButton.style.top = maxHeight - BUTTON_HEIGHT + 'px';
      } else if (parseInt(mainButton.style.top, 10) + BUTTON_HEIGHT <= minHeight) {
        mainButton.style.top = minHeight - BUTTON_HEIGHT + 'px';
      }
      if (parseInt(mainButton.style.left, 10) >= maxLeft - BUTTON_WIDTH / 2) {
        mainButton.style.left = maxLeft - BUTTON_WIDTH / 2 + 'px';
      } else if (parseInt(mainButton.style.left, 10) <= minLeft - BUTTON_WIDTH / 2) {
        mainButton.style.left = minLeft - BUTTON_WIDTH / 2 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      adressMarker.value = parseInt(mainButton.style.left, 10) + BUTTON_WIDTH / 2 + ', ' + (parseInt(mainButton.style.top, 10) + BUTTON_HEIGHT);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

  function getAdverts() {
    var adverts = [];
    var author;
    var offer;
    var location;
    for (var i = 0; i < 8; i++) {
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
})();
