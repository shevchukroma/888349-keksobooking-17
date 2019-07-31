'use strict';
var errorPopup = document.querySelector('#error');

(function () {
  var onSucces = function (data) {
    window.getAdverts = function () {      
      return data;
    }();
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
