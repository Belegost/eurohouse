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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/import/pages/projects-page.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/import/pages/projects-page.js":
/*!**********************************************!*\
  !*** ./src/js/import/pages/projects-page.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {
  var ProjectsPage = {
    setData: function setData() {
      function get(url) {
        return new Promise(function (resolve, reject) {
          var req = new XMLHttpRequest();
          req.open('GET', url);

          req.onload = function () {
            if (req.status == 200) {
              resolve(req.response);
            } else {
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
      } // Set tags


      getJSON('https://apiprod.denisglazkov.best/tag/list').then(function (data) {
        var tags = {};

        for (var i = 0; i < data.data.length; i++) {
          tags[i] = {
            id: data.data[i].id,
            title: data.data[i].attributes.title,
            priority: data.data[i].attributes.priority
          };
        }

        return tags;
      }).then(function (tags) {
        var filter = document.querySelector('.projects__filter');
        var sortTags = [];

        for (var prop in tags) {
          sortTags.push([tags[prop].priority, tags[prop]]);
        }

        sortTags.sort(function (a, b) {
          return a[0] - b[0];
        });

        for (var i = 0; i < sortTags.length; i++) {
          var li = document.createElement('li');
          var span = document.createElement('span');
          var a = document.createElement('a');
          span.classList.add('projects__black-border');
          a.href = "/tag/".concat(sortTags[i][1].id);
          a.innerText = sortTags[i][1].title;
          li.appendChild(span);
          li.appendChild(a);
          filter.appendChild(li);
        }
      }); // Set Projects

      getJSON('https://apiprod.denisglazkov.best/project/list').then(function (data) {
        var project = {};

        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].attributes.is_published) {
            project[i] = {
              id: data.data[i].id,
              title: data.data[i].attributes.title,
              location: data.data[i].attributes.location,
              imgID: data.data[i].relationships[0].id,
              priority: data.data[i].attributes.priority
            };
          }
        }

        return project;
      }).then(function (data) {
        var sortProjects = [];

        function getImages() {
          for (var prop in data) {
            sortProjects.push([data[prop].priority, data[prop]]);
          }

          sortProjects.sort(function (a, b) {
            return a[0] - b[0];
          });
          return new Promise(function (resolve, reject) {
            var imgURI = [];
            var projectsCount = Object.keys(data).length;

            var _loop = function _loop(_prop) {
              getJSON("https://apiprod.denisglazkov.best/image/".concat(data[_prop].imgID)).then(function (img) {
                data[_prop].imgURI = img.data.attributes.uri;
                imgURI.push(img.data.attributes.uri);
              });
            };

            for (var _prop in data) {
              _loop(_prop);
            }

            var timerID = setInterval(function () {
              if (imgURI.length == projectsCount) {
                resolve();
                clearInterval(timerID);
              }
            }, 100);
          });
        }

        getImages().then(function () {
          for (var i = 0; i < sortProjects.length; i++) {
            var list = document.querySelector('.projects__list');
            var element = "\n                        <div class=\"projects__project\">\n                            <a class=\"projects__img\" href=\"/project/".concat(sortProjects[i][1].id, "\" style=\"background-image: url('https://apiprod.denisglazkov.best/static").concat(sortProjects[i][1].imgURI, "')\">\n                                <div class=\"projects__info\">\n                                    <div class=\"box\">\n                                        <div class=\"draw\">\n                                            <span class=\"top\"></span>\n                                            <span class=\"right\"></span>\n                                            <span class=\"bottom\"></span>\n                                            <span class=\"left\"></span>\n                                            <h3 class=\"projects__name\">").concat(sortProjects[i][1].title, "</h3>\n                                        </div>\n                                    </div>\n                                </div>\n                                <div class=\"projects__hidenName\">").concat(sortProjects[i][1].title, "</div>\n                            </a>\n                        </div>");
            var elementReverse = "\n                        <div class=\"projects__projectReverse\">\n                            <div class=\"projects__info\">\n                                <h3 class=\"projects__name\">".concat(sortProjects[i][1].title, "</h3>\n                                <a class=\"btn-transparent detect-inview\" href=\"/project/").concat(sortProjects[i][1].id, "\">\n                                    <span class=\"btn-line-1\"><i></i></span>\n                                    <span class=\"btn-line-2\"><i></i></span>\n                                    <span class=\"btn-line-3\"><i></i></span>\n                                    <span class=\"btn-line-4\"><i></i></span>\n                                    <span class=\"hover-out\"><span class=\"hover-out_i\">Show details</span></span>\n                                    <span class=\"hover\"><span class=\"hover_i\">Show details</span></span>\n                                </a>\n                            </div>\n                            <a class=\"projects__img\" href=\"/project/").concat(sortProjects[i][1].id, "\" style=\"background-image: url('https://apiprod.denisglazkov.best/static").concat(sortProjects[i][1].imgURI, "')\">\n                                <div class=\"box\">\n                                    <div class=\"draw\">\n                                        <span class=\"top\"></span>\n                                        <span class=\"right\"></span>\n                                        <span class=\"bottom\"></span>\n                                        <span class=\"left\"></span>\n                                    </div>\n                                    <div class=\"projects__hidenName\">").concat(sortProjects[i][1].title, "</div>\n                                </div>\n                            </a>\n                        </div>");

            if (i % 2 === 0) {
              list.insertAdjacentHTML('beforeend', element);
            } else {
              list.insertAdjacentHTML('beforeend', elementReverse);
            }
          }

          var windowHeight = document.documentElement.clientHeight;

          function showVisible() {
            var elems = document.querySelectorAll('.btn-transparent');

            for (var _i = 0; _i < elems.length; _i++) {
              var elem = elems[_i];

              if (isVisible(elem)) {
                elem.classList.add('inview');
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
        });
      });
    },
    init: function init() {
      this.setData();
    }
  };
  ProjectsPage.init();
});

/***/ })

/******/ });
//# sourceMappingURL=pageProjects.js.map