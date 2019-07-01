'use strict';

var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var button = document.querySelector('.map__pin');
var buttonsList = document.querySelector('.map__pins');
var BUTTON_WIDTH = 65;
var BUTTON_HEIGHT = 82;
var offersMock = getAdverts();
var map = document.querySelector('.map');

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
  for (var i = 0; i < 8; i++) {
    author = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
    offer = {type: offerTypes[getRandomInt(0, offerTypes.length)]};
    location = {x: getRandomInt(0, 1200) - BUTTON_WIDTH / 2, y: getRandomInt(130, 630) - BUTTON_HEIGHT};
    adverts.push({author: author, offer: offer, location: location});
  }
  return adverts;
}

function renderButton(offer) {
  var cloneButton = button.cloneNode(true);
  button.style.left = offer.location.x + 'px';
  button.style.top = offer.location.y + 'px';
  button.childNodes[1].src = offer.author.avatar;
  button.childNodes[1].alt = offer.offer.type;
  return cloneButton;
}

for (var i = 0; i < 8; i++) {
  var newButton = renderButton(offersMock[i]);
  buttonsList.appendChild(newButton);
}

map.classList.remove('map--faded');
