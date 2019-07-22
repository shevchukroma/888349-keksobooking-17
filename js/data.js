'use strict';

(function () {
  var OFFER_TYPES = ['palace', 'flat', 'house', 'bungalo'];

  window.getAdverts = function () {
    var adverts = [];
    var author;
    var offer;
    var location;
    for (var i = 0; i < 8; i++) {
      author = {avatar: 'img/avatars/user0' + (i + 1) + '.png'};
      offer = {type: OFFER_TYPES[window.getRandomInt(0, OFFER_TYPES.length)]};
      location = {x: window.getRandomInt(0, 1200) - window.getButtonWidth() / 2, y: window.getRandomInt(130, 630)};
      adverts.push({author: author, offer: offer, location: location});
    }
    return adverts;
  }();
})();
