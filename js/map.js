'use strict';

(function () {
  var mainButton = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var buttonsList = document.querySelector('.map__pins');
  var offersMock = window.getAdverts;
  var maxLeft = 1200;
  var minLeft = 0;
  var minHeight = 130;
  var maxHeight = 630;

  mainButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < 8; i++) {
      var newButton = window.renderButton(offersMock[i]);
      buttonsList.appendChild(newButton);
    }
    window.enableForm();
    window.disableForm();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };
      window.setAddressValue(mainButton.style);
      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mainButton.style.left = (mainButton.offsetLeft - shift.x) + 'px';
      mainButton.style.top = (mainButton.offsetTop - shift.y) + 'px';
      if (parseInt(mainButton.style.top, 10) + window.getButtonHeight() >= maxHeight) {
        mainButton.style.top = maxHeight - window.getButtonHeight() + 'px';
      } else if (parseInt(mainButton.style.top, 10) + window.getButtonHeight() <= minHeight) {
        mainButton.style.top = minHeight - window.getButtonHeight() + 'px';
      }
      if (parseInt(mainButton.style.left, 10) >= maxLeft - window.getButtonWidth() / 2) {
        mainButton.style.left = maxLeft - window.getButtonWidth() / 2 + 'px';
      } else if (parseInt(mainButton.style.left, 10) <= minLeft - window.getButtonWidth() / 2) {
        mainButton.style.left = minLeft - window.getButtonWidth() / 2 + 'px';
      }
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.setAddressValue(mainButton.style);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
