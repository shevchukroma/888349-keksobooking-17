'use strict';

(function () {
  var selectOffers = document.querySelector('#type');
  var inputPrice = document.querySelector('#price');
  var timeIn = document.querySelector('#timein');
  var timeOut = document.querySelector('#timeout');
  var formInputs = document.querySelectorAll('.ad-form input');
  var formSelects = document.querySelectorAll('.ad-form select');
  var adressMarker = document.querySelector('#address');

  selectOffers.addEventListener('change', function () {
    if (selectOffers[0].selected) {
      inputPrice.min = '0';
      inputPrice.placeholder = '0';
    } else if (selectOffers[1].selected) {
      inputPrice.min = '1000';
      inputPrice.placeholder = '1000';
    } else if (selectOffers[2].selected) {
      inputPrice.min = '5000';
      inputPrice.placeholder = '5000';
    } else if (selectOffers[3].selected) {
      inputPrice.min = '10000';
      inputPrice.placeholder = '10000';
    }
  });

  timeIn.addEventListener('change', function () {
    if (timeIn[0].selected) {
      timeOut[0].selected = true;
    } else if (timeIn[1].selected) {
      timeOut[1].selected = true;
    } else if (timeIn[2].selected) {
      timeOut[2].selected = true;
    }
  });

  timeOut.addEventListener('change', function () {
    if (timeOut[0].selected) {
      timeIn[0].selected = true;
    } else if (timeOut[1].selected) {
      timeIn[1].selected = true;
    } else if (timeOut[2].selected) {
      timeIn[2].selected = true;
    }
  });

  for (var i = 0; i < formInputs.length; i++) {
    formInputs[i].setAttribute('disabled', 'disabled');
  }

  for (i = 0; i < formSelects.length; i++) {
    formSelects[i].setAttribute('disabled', 'disabled');
  }

  window.enableForm = function () {
    for (i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = false;
    }
    for (i = 0; i < formSelects.length; i++) {
      formSelects[i].disabled = false;
    }
  };

  window.disableForm = function () {
    adressMarker.setAttribute('disabled', 'disabled');
  };

  window.setAddressValue = function (val) {
    adressMarker.value = parseInt(val.left, 10) + window.getButtonWidth() / 2 + ', ' + (parseInt(val.top, 10) + window.getButtonHeight());
  };
})();
