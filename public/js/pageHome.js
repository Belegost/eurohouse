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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/import/pages/home-page.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/import/pages/home-page.js":
/*!******************************************!*\
  !*** ./src/js/import/pages/home-page.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


document.addEventListener("DOMContentLoaded", function (event) {
  var OurProjectMenu = {
    menu: document.querySelector('.our-projects'),
    buttons: document.querySelectorAll('.ourProjectsBtn'),
    projects: document.querySelectorAll('.our-projects__project'),
    closeButton: document.querySelector('.closeBtnProject'),
    logo: document.querySelector('.header__logo'),
    menuTitle: document.querySelector('.our-projects__title'),
    state: false,
    openMenu: function openMenu() {
      var self = this;
      this.menu.addEventListener('mouseenter', function () {
        self.menu.classList.add('our-projects--open');
        self.logo.classList.add('header__logo--open');
      });
      this.menu.addEventListener('mouseleave', function () {
        self.menu.classList.remove('our-projects--open');
        self.logo.classList.remove('header__logo--open');
      });
    },
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
      }

      getJSON('https://admin.eurohouse.ca/project/list').then(function (data) {
        var project = {};

        for (var i = 0; i < data.data.length; i++) {
          if (data.data[i].attributes.is_published) {
            project[i] = {
              id: data.data[i].id,
              title: data.data[i].attributes.title,
              imgID: data.data[i].relationships[0].id,
              priority: data.data[i].attributes.priority
            };
          }
        }

        return {
          project: project
        };
      }).then(function (data) {
        var sortProjects = [];

        function getImages() {
          for (var prop in data.project) {
            sortProjects.push([data.project[prop].priority, data.project[prop]]);
          }

          sortProjects.sort(function (a, b) {
            return a[0] - b[0];
          });
          return new Promise(function (resolve, reject) {
            var imgURI = [];
            var projectsCount = Object.keys(data.project).length;

            var _loop = function _loop(_prop) {
              getJSON("https://admin.eurohouse.ca/image/".concat(data.project[_prop].imgID)).then(function (img) {
                data.project[_prop].imgURI = img.data.attributes.uri;
                imgURI.push(img.data.attributes.uri);
              });
            };

            for (var _prop in data.project) {
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
            var list = document.querySelector('.our-projects__menu');
            var project = document.createElement('a');
            project.classList.add('our-projects__project');
            project.href = "/project/".concat(sortProjects[i][1].id);
            project.style.cssText = "background-image: url(https://admin.eurohouse.ca/static".concat(sortProjects[i][1].imgURI, "); transition-delay: ").concat(i * 100 + 300, "ms;");
            list.appendChild(project);
          }
        });
      });
    },
    init: function init() {
      this.openMenu();
      this.setData();
    }
  };
  OurProjectMenu.init();
});

/***/ })

/******/ });
//# sourceMappingURL=pageHome.js.map