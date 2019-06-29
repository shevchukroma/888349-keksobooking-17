'use strict';

var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
var button = document.querySelector('.map__pin');
var buttonsList = document.querySelector('.map__pins');
var offersMock = getAdverts();
var map = document.querySelector('.map');

function getRandomInt(min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  rand = Math.floor(rand);
  return rand;
}

function getAdverts() {
  var adverts = [];
  for (var i = 0; i < 8; i++) {
    var author = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
    var offer = {type: offerTypes[getRandomInt(0, offerTypes.length)]};
    var location = {x: getRandomInt(0, 1200), y: getRandomInt(130, 630)};
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
