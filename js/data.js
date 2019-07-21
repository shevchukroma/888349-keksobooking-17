'use strict';

(function () {
  var offerTypes = ['palace', 'flat', 'house', 'bungalo'];
  var button = document.querySelector('.map__pin');

  window.getAdverts = function () {
    var adverts = [];
    var author;
    var offer;
    var location;
    for (var i = 0; i < 8; i++) {
      author = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
      offer = {type: offerTypes[window.getRandomInt(0, offerTypes.length)]};
      location = {x: window.getRandomInt(0, 1200) - window.getButtonWidth() / 2, y: window.getRandomInt(130, 630)};
      adverts.push({author: author, offer: offer, location: location});
    }
    return adverts;
  }();

  window.renderButton = function (offer) {
    var cloneButton = button.cloneNode(true);
    cloneButton.style.left = offer.location.x + 'px';
    cloneButton.style.top = offer.location.y + 'px';
    cloneButton.childNodes[1].src = offer.author.avatar;
    cloneButton.childNodes[1].alt = offer.offer.type;
    return cloneButton;
  }
})();
