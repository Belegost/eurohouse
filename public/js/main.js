/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"main": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/index.js","vendor"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/blocks/modules/form/form.js":
/*!*****************************************!*\
  !*** ./src/blocks/modules/form/form.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {
  var SendRequest = {
    form: document.querySelector('.form'),
    inputs: document.querySelectorAll('input[type=text],input[type=password],input[type=tel],input[type=email],input[type=time],input[type=date],input[type=url], textarea'),
    inpName: document.querySelector('input[name=name]'),
    inpEmail: document.querySelector('input[name=email]'),
    inpMessage: document.querySelector('textarea[name=message]'),
    button: document.querySelector('.form__submit'),
    focused: document.querySelectorAll('form__label--focused'),
    validInput: function validInput(value, inpName) {
      if (inpName == 'validName') {
        var regex = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
        return regex.test(value);
      } else if (inpName == 'validEmail') {
        var _regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return _regex.test(value);
      }
    },
    validFields: function validFields(event) {
      var validForm = true;

      for (var i = 0; i < this.inputs.length; i++) {
        var validFunc = this.inputs[i].dataset.valid;

        if (this.inputs[i].value == '') {
          validForm = false;
        } else if (this.validInput(this.inputs[i].value, validFunc) == false) {
          validForm = false;
        }
      }

      return validForm;
    },
    submit: function submit() {
      var self = this;
      this.form.addEventListener('submit', function (event) {
        event.preventDefault();
        var name = event.target.querySelector('input[name="name"]').value;
        var email = event.target.querySelector('input[name="email"]').value;
        var message = event.target.querySelector('textarea[name="message"]').value;

        if (self.validFields(event)) {
          var data = {
            "data": {
              "attributes": {
                "email": "".concat(email),
                "full_name": "".concat(name),
                "message": "".concat(message),
                "phone": "null"
              },
              "type": "request"
            }
          };
          var req = new XMLHttpRequest();
          req.open('POST', 'https://apiprod.denisglazkov.best/requests/create', true);
          req.setRequestHeader('Content-type', 'application/json; charset=utf-8');

          req.onload = function () {
            if (req.status == 204) {
              console.log(req.response);
            } else {
              throw new Error(req.statusText);
            }
          };

          req.onerror = function () {
            throw new Error('Network Error');
          };

          req.send(JSON.stringify(data));
          self.inpName.value = '';
          self.inpEmail.value = '';
          self.inpMessage.value = '';
          var validWrap = document.querySelectorAll('.form__wrap');
          var completed = document.querySelector('.send-requestComplete');
          var menu = document.querySelector('.send-request__menu');
          menu.classList.remove('send-request__menu--open');
          setTimeout(function () {
            completed.classList.add('send-requestComplete--visible');
          }, 500);

          for (var i = 0; i < validWrap.length; i++) {
            validWrap[i].classList.remove('form__wrap--valid');
          }
        }

        return false;
      });
    },
    inpInit: function inpInit() {
      var self = this;

      for (var i = 0; i < this.inputs.length; i++) {
        this.inputs[i].addEventListener('focus', function (event) {
          var label = event.target.parentElement.parentElement.querySelector('label');
          label.classList.add('form__label--focused');
        });
      }
    },
    init: function init() {
      this.inpInit();
      this.submit();
    }
  };
  SendRequest.init();
});

/***/ }),

/***/ "./src/blocks/modules/header/header.js":
/*!*********************************************!*\
  !*** ./src/blocks/modules/header/header.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {
  var MainMenu = {
    menu: document.querySelector('.header__menu'),
    buttons: document.querySelectorAll('.header__menuBtn'),
    state: false,
    toggleMenu: function toggleMenu() {
      var _this = this;

      var _loop = function _loop(i) {
        var self = _this;

        _this.buttons[i].addEventListener('click', function () {
          self.state = !self.state;
          self.menu.classList.toggle('header__menu--open');
        });
      };

      for (var i = 0; i < this.buttons.length; i++) {
        _loop(i);
      }
    },
    closeMenu: function closeMenu() {
      var self = this;
      document.body.addEventListener('click', function (event) {
        var stopEvent = false;

        if (event.target.closest('.header__menuBtn')) {
          stopEvent = true;
        }

        if (event.target.closest('.header__menu') == null && self.state && !stopEvent) {
          self.state = !self.state;
          self.menu.classList.remove('header__menu--open');
        }
      });
    },
    init: function init() {
      this.closeMenu();
      this.toggleMenu();
    }
  };
  MainMenu.init();
});

/***/ }),

/***/ "./src/blocks/modules/home/home.js":
/*!*****************************************!*\
  !*** ./src/blocks/modules/home/home.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {
  var Slider = {
    slider: document.querySelector('.hero__slider'),
    items: document.querySelectorAll('.hero__slide'),
    images: ['img/hero/1.jpg', 'img/hero/2.jpg', 'img/hero/3.jpg', 'img/hero/4.jpg', 'img/hero/5.jpg', 'img/hero/6.jpg', 'img/hero/7.jpg', 'img/hero/8.jpg', 'img/hero/9.jpg', 'img/hero/10.jpg', 'img/hero/11.jpg', 'img/hero/12.jpg', 'img/hero/13.jpg', 'img/hero/14.jpg'],
    setImages: function setImages() {
      for (var i = 0; i < this.items.length; i++) {
        this.items[i].style.backgroundImage = "url('".concat(this.images[i], "')");
      }
    },
    init: function init() {
      this.setImages();
    }
  };
  Slider.init();
});

/***/ }),

/***/ "./src/blocks/modules/send-request/send-request.js":
/*!*********************************************************!*\
  !*** ./src/blocks/modules/send-request/send-request.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {
  var SendRequest = {
    menu: document.querySelector('.send-request__menu'),
    wrapper: document.querySelector('.send-request__wrapper'),
    buttons: document.querySelectorAll('.requestBtn'),
    completedMenu: document.querySelector('.send-requestComplete'),
    completedBtn: document.querySelector('.closeMenu'),
    state: false,
    clearForm: function clearForm() {
      var labels = document.querySelectorAll('.form__label');
      var inputs = document.querySelectorAll('.form__inp');

      for (var i = 0; i < labels.length; i++) {
        labels[i].classList.remove('form__label--focused');
        inputs[i].value = '';
      }
    },
    toggleMenu: function toggleMenu() {
      var _this = this;

      var _loop = function _loop(i) {
        var self = _this;

        _this.buttons[i].addEventListener('click', function () {
          self.state = !self.state;
          self.menu.classList.toggle('send-request__menu--open');
        });
      };

      for (var i = 0; i < this.buttons.length; i++) {
        _loop(i);
      }
    },
    closeMenu: function closeMenu() {
      var self = this;
      document.body.addEventListener('click', function (event) {
        var stopEvent = false;

        if (event.target.closest('.header__menu') || event.target.classList.contains('requestBtn')) {
          stopEvent = true;
          self.clearForm();
        }

        if (self.state && !stopEvent && event.target.closest('.send-request') == null) {
          self.state = !self.state;
          self.menu.classList.remove('send-request__menu--open');
          self.clearForm();
        }
      });
      this.completedBtn.addEventListener('click', function () {
        self.completedMenu.classList.remove('send-requestComplete--visible');
      });
    },
    init: function init() {
      this.closeMenu();
      this.toggleMenu();
    }
  };
  SendRequest.init();
});

/***/ }),

/***/ "./src/js/import/modules.js":
/*!**********************************!*\
  !*** ./src/js/import/modules.js ***!
  \**********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! %modules%/header/header */ "./src/blocks/modules/header/header.js");
/* harmony import */ var _modules_header_header__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_modules_header_header__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_home_home__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! %modules%/home/home */ "./src/blocks/modules/home/home.js");
/* harmony import */ var _modules_home_home__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_modules_home_home__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _modules_send_request_send_request__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! %modules%/send-request/send-request */ "./src/blocks/modules/send-request/send-request.js");
/* harmony import */ var _modules_send_request_send_request__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_modules_send_request_send_request__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _modules_form_form__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! %modules%/form/form */ "./src/blocks/modules/form/form.js");
/* harmony import */ var _modules_form_form__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_modules_form_form__WEBPACK_IMPORTED_MODULE_3__);





/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function($) {/* harmony import */ var _import_modules__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./import/modules */ "./src/js/import/modules.js");

document.addEventListener("DOMContentLoaded", function (event) {
  var windowHeight = document.documentElement.clientHeight;
  var windowWidth = document.documentElement.clientWidth;

  function showVisible() {
    var elems = document.querySelectorAll('.animate-visible');

    for (var i = 0; i < elems.length; i++) {
      var elem = elems[i];

      if (isVisible(elem)) {
        elem.classList.remove('animate-visible');
      }
    }
  }

  function isVisible(elem) {
    var coords = elem.getBoundingClientRect();
    var topVisible = coords.top >= 0 && coords.top < windowHeight;
    var bottomVisible = coords.bottom < windowHeight && coords.bottom >= 0;
    return topVisible || bottomVisible;
  }

  document.addEventListener('scroll', function () {
    showVisible();
  });
  $(document).ready(function () {
    setTimeout(function () {
      document.querySelector('.preloader').classList.add('preloader--hidden');
      setTimeout(function () {
        document.querySelector('.preloader').remove();
        showVisible();
        var requestComplete = document.querySelector('.send-requestComplete');
        var requestMenu = document.querySelector('.send-request__menu');
        requestComplete.style = '';
        requestMenu.style = '';
      }, 400);
    }, 1000);
  });
});
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! jquery */ "./node_modules/jquery/dist/jquery.js")))

/***/ })

/******/ });
//# sourceMappingURL=main.js.map