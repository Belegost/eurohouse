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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/import/pages/project-page.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/import/pages/project-page.js":
/*!*********************************************!*\
  !*** ./src/js/import/pages/project-page.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

document.addEventListener("DOMContentLoaded", function (event) {
  var ProjectPage = {
    id: window.location.href.split('/')[window.location.href.split('/').length - 1],
    title: document.querySelector('.project__h1'),
    location: document.querySelector('.project__h3'),
    desc: document.querySelector('.project__p'),
    breadcrumb: document.querySelector('.project__page--active'),
    imgList: document.querySelector('.project__imgList'),
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
      } // Projects List


      getJSON('https://apiprod.denisglazkov.best/project/list').then(function (data) {
        var projectList = {};

        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].attributes.is_published) {
            projectList[i] = {
              id: data.data[i].id,
              priority: data.data[i].attributes.priority
            };
          }
        }

        return projectList;
      }).then(function (data) {
        var projectID = window.location.href.split('/')[window.location.href.split('/').length - 1];
        var sortProjects = [];

        for (var prop in data) {
          sortProjects.push([data[prop].priority, data[prop]]);
        }

        sortProjects.sort(function (a, b) {
          return a[0] - b[0];
        });
        var firstProject = sortProjects[0][1].priority;
        var lastProject = sortProjects[sortProjects.length - 1][1].priority;
        var prevPage = document.querySelector('.project__previous a');
        var nextPage = document.querySelector('.project__next a');

        for (var i = 0; i < sortProjects.length; i++) {
          if (sortProjects[i][1].id == projectID) {
            if (sortProjects[i][1].priority == firstProject) {
              prevPage.remove();
            } else {
              prevPage.href = "/project/".concat(sortProjects[i - 1][1].id);
            }

            if (sortProjects[i][1].priority == lastProject) {
              nextPage.remove();
            } else {
              nextPage.href = "/project/".concat(sortProjects[i + 1][1].id);
            }
          }
        }
      });
      getJSON("https://apiprod.denisglazkov.best/project/".concat(self.id)).then(function (data) {
        return data;
      }).then(function (data) {
        var imagesID = [];
        self.title.innerText = data.data.attributes.title;
        self.breadcrumb.innerText = data.data.attributes.title;
        self.breadcrumb.href = window.location.href;
        self.location.innerText = data.data.attributes.location;
        self.desc.innerText = data.data.attributes.description;

        for (var i = 0; i < data.included.length; i++) {
          imagesID.push(data.included[i].id);

          if (data.included[i].attributes.orientation) {
            if (self.imgList.lastChild.classList.contains('project__portrait')) {
              var firstImgURI = "https://apiprod.denisglazkov.best/static".concat(data.included[i].attributes.uri);
              var firstImg = "<a data-fancybox=\"gallery\" style=\"background: url(".concat(firstImgURI, ") no-repeat; background-size: cover; background-position: center;\" href=\"").concat(firstImgURI, "\"><img src=\"").concat(firstImgURI, "\"></img></a>");
              self.imgList.lastChild.insertAdjacentHTML('beforeEnd', firstImg);
            } else {
              var imgPortrait = "<div class=\"project__portrait\"></div>";
              self.imgList.insertAdjacentHTML('beforeEnd', imgPortrait);

              var _firstImgURI = "https://apiprod.denisglazkov.best/static".concat(data.included[i].attributes.uri);

              var _firstImg = "<a data-fancybox=\"gallery\" style=\"background: url(".concat(_firstImgURI, ") no-repeat; background-size: cover; background-position: center;\" href=\"").concat(_firstImgURI, "\"><img src=\"").concat(_firstImgURI, "\"></img></a>");

              self.imgList.lastChild.insertAdjacentHTML('beforeEnd', _firstImg);
            }
          } else {
            var imgURI = "https://apiprod.denisglazkov.best/static".concat(data.included[i].attributes.uri);
            var imgLandscape = "\n                            <div class=\"project__landscape\">\n                                <a data-fancybox=\"gallery\" href=\"".concat(imgURI, "\"><img src=\"").concat(imgURI, "\" width=\"100%\"></a>\n                            </div>");
            self.imgList.insertAdjacentHTML('beforeEnd', imgLandscape);
          }
        }

        return imagesID;
      }).then(function (imagesID) {
        var tagsID = [];

        function getTags() {
          return new Promise(function (resolve, reject) {
            for (var i = 0; i < imagesID.length; i++) {
              getJSON("https://apiprod.denisglazkov.best/image/".concat(imagesID[i])).then(function (image) {
                for (var _i = 0; _i < image.data.relationships.length - 1; _i++) {
                  tagsID.push(image.data.relationships[_i].id);
                }
              });
            }

            var timerID = setInterval(function () {
              if (tagsID.length >= imagesID.length) {
                resolve(_toConsumableArray(new Set(tagsID)));
                clearInterval(timerID);
              }
            }, 100);
          });
        }

        getTags().then(function (filterTags) {
          var tagsList = document.querySelector('.project__filter');

          for (var i = 0; i < filterTags.length; i++) {
            getJSON("https://apiprod.denisglazkov.best/tag/".concat(filterTags[i])).then(function (tag) {
              var li = "\n                            <li>\n                                <span class=\"projects__black-border\"></span>\n                                <a href=\"/tag/".concat(tag.data.id, "\">").concat(tag.data.attributes.title, "</a>\n                            </li>");
              tagsList.insertAdjacentHTML('beforeEnd', li);
            });
          }
        });
      });
    },
    init: function init() {
      this.setData();
    }
  };
  ProjectPage.init();
});

/***/ })

/******/ });
//# sourceMappingURL=pageProject.js.map