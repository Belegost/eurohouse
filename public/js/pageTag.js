/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/import/pages/tag-page.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/import/pages/tag-page.js":
/*!*****************************************!*\
  !*** ./src/js/import/pages/tag-page.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {
  var TagPag = {
    id: window.location.href.split('/')[window.location.href.split('/').length - 1],
    title: document.querySelector('.tag__h1'),
    result: document.querySelector('.tag__result'),
    breadcrumb: document.querySelector('.tag__page--active'),
    setData: function setData() {
      var self = this;

      function get(url) {
        return new Promise(function (resolve, reject) {
          var req = new XMLHttpRequest();
          req.open('GET', url);

          req.onload = function () {
            if (req.status == 200) {
              resolve(req.response);
            } else {
              window.location.href = '/404';
              reject(Error(req.statusText));
            }
          };

          req.onerror = function () {
            reject(Error('Network Error'));
          };

          req.send();
        });
      }

      function getJSON(url) {
        return get(url).then(JSON.parse);
      }

      getJSON("https://api.eurohouse.ca/tag/".concat(this.id)).then(function (data) {
        self.title.innerText = data.data.attributes.title;
        self.breadcrumb.innerText = data.data.attributes.title;
        self.result.innerText = "".concat(data.data.relationships.length, " result");
        var tags = [];

        function getImages() {
          return new Promise(function (resolve, reject) {
            for (var i = 0; i < data.data.relationships.length; i++) {
              getJSON("https://api.eurohouse.ca/image/".concat(data.data.relationships[i].id)).then(function (data) {
                var counter = data.data.relationships.length;
                tags.push({
                  uri: data.data.attributes.uri,
                  id: data.data.relationships[counter - 1].id
                });
              });
            }

            var timerID = setInterval(function () {
              if (tags.length == data.data.relationships.length) {
                resolve(tags);
                clearInterval(timerID);
              }
            }, 100);
          });
        }

        getImages().then(function (tags) {
          var list = document.querySelector('.tag__list');
          var link = window.location.origin;

          var _loop = function _loop(i) {
            var img = "https://api.eurohouse.ca/static".concat(tags[i].uri);

            if (tags[i].id != null) {
              getJSON("https://api.eurohouse.ca/project/".concat(tags[i].id)).then(function (project) {
                var element = "\n                                <div class=\"tag__item\">\n                                    <a data-fancybox=\"gallery\" href=\"".concat(img, "\"><img src=\"").concat(img, "\" width=\"100%\"></a>\n                                    <a class=\"tag__name\" href=\"").concat(link, "/project/").concat(project.data.id, "\">\n                                        ").concat(project.data.attributes.title, "\n                                        <span>\n                                            <svg xmlns=\"http://www.w3.org/2000/svg\" width=\"30.725\" height=\"16.707\" viewBox=\"0 0 30.725 16.707\">\n                                                <defs>\n                                                    <style>\n                                                        .prefix__cls-1{fill:none;stroke:#000}\n                                                    </style>\n                                                </defs>\n                                                <g id=\"prefix__Group_7490\" data-name=\"Group 7490\" transform=\"translate(0 .354)\">\n                                                    <path id=\"prefix__Path_3250\" d=\"M0 16l8-8-8-8\" class=\"prefix__cls-1\" data-name=\"Path 3250\" transform=\"translate(22.018)\"/>\n                                                    <path id=\"prefix__Path_3251\" d=\"M29.49 0H0\" class=\"prefix__cls-1\" data-name=\"Path 3251\" transform=\"translate(0 8)\"/>\n                                                </g>\n                                            </svg>\n                                        </span>\n                                    </a>\n                                </div>");
                list.insertAdjacentHTML('beforeend', element);
              });
            }
          };

          for (var i = 0; i < tags.length; i++) {
            _loop(i);
          }
        });
      });
    },
    init: function init() {
      this.setData();
    }
  };
  TagPag.init();
});

/***/ })

/******/ });
//# sourceMappingURL=pageTag.js.map