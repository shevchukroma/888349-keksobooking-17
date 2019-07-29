'use strict';
var errorPopup = document.querySelector('#error');

(function () {
  var onSuccess = function (data) {
    window.getAdverts = function () {
      var adverts = [];
      var author;
      var offer;
      var location;
      for (var i = 0; i < data.length; i++) {
        author = data[i].author;
        offer = {type: data[i].offer.type};
        location = data[i].location;
        adverts.push({author: author, offer: offer, location: location});
      }
      return adverts;
    }();
  };

  var errorLoad = function () {
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

  window.data = {
    succes: onSuccess,
    error: errorLoad
  };

  window.load(window.data.succes, window.data.error);
})();
