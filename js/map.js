'use strict';

(function () {
  var mainButton = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var form = document.querySelector('.ad-form');
  var buttonsList = document.querySelector('.map__pins');
  var maxLeft = 1200;
  var minLeft = 0;
  var minHeight = 130;
  var maxHeight = 630;
  var newButton;
  var errorPopup = document.querySelector('#error');

  mainButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    map.classList.remove('map--faded');
    form.classList.remove('ad-form--disabled');
    for (var i = 0; i < buttonsList.querySelectorAll('.map__pin').length; i++) {
      buttonsList.querySelectorAll('.map__pin')[i].style.display = 'block';
    }
    window.enableForm();
    window.disableAddressMarker();
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

  var onSucces = function (data) {
    for (var i = 0; i < 8; i++) {
      newButton = window.renderButton(data[i]);
      newButton.style.display = 'none';
      buttonsList.appendChild(newButton);
    }
  };

  var onError = function () {
    errorPopup.style.position = 'absolute';
    errorPopup.textContent = 'ERROR';
    errorPopup.style.fontSize = '40px';
    errorPopup.style.textAlign = 'center';
    errorPopup.style.color = 'red';
    errorPopup.style.zIndex = '100';
    errorPopup.style.top = '0';
    errorPopup.style.left = '50%';
    errorPopup.style.transform = 'translateX(-50%)';
    errorPopup.style.backgroundColor = 'black';
    errorPopup.style.display = 'block';
    errorPopup.style.width = '200px';
    errorPopup.style.height = '200px';
  };

  window.load(onSucces, onError);
})();
