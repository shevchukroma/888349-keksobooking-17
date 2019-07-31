'use strict';
var errorPopup = document.querySelector('#error');
window.getAdverts = function () {};

(function () {
  window.load = function (succesLoad, errorLoad) {
    var xhr = new XMLHttpRequest();
    var link = 'https://js.dump.academy/keksobooking/data';
    xhr.responseType = 'json';
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        succesLoad(xhr.response);
      } else {
        errorLoad('Error');
      }
    });
    xhr.open('GET', link);
    xhr.send();
  };

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
