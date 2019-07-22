'use strict';

(function () {
  var BUTTON_WIDTH = 62;
  var BUTTON_HEIGHT = 84;
  var button = document.querySelector('.map__pin');

  window.getButtonWidth = function () {
    return BUTTON_WIDTH;
  };

  window.getButtonHeight = function () {
    return BUTTON_HEIGHT;
  };

  window.renderButton = function (offer) {
    var cloneButton = button.cloneNode(true);
    cloneButton.style.left = offer.location.x + 'px';
    cloneButton.style.top = offer.location.y + 'px';
    cloneButton.childNodes[1].src = offer.author.avatar;
    cloneButton.childNodes[1].alt = offer.offer.type;
    return cloneButton;
  };
})();
