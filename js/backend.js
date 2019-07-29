'use strict';

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
})();
