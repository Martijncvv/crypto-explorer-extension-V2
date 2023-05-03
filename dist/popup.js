/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/App.css":
/*!***********************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/App.css ***!
  \***********************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "body,\n#root {\n    /*background: radial-gradient(#424f8c, #242D58);*/\n    width: 330px;\n    height: 600px;\n    margin: 0;\n    padding: 0;\n    /*overflow: hidden;*/\n}", "",{"version":3,"sources":["webpack://./src/App.css"],"names":[],"mappings":"AAAA;;IAEI,iDAAiD;IACjD,YAAY;IACZ,aAAa;IACb,SAAS;IACT,UAAU;IACV,oBAAoB;AACxB","sourcesContent":["body,\n#root {\n    /*background: radial-gradient(#424f8c, #242D58);*/\n    width: 330px;\n    height: 600px;\n    margin: 0;\n    padding: 0;\n    /*overflow: hidden;*/\n}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



var m = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./src/App.css":
/*!*********************!*\
  !*** ./src/App.css ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./App.css */ "./node_modules/css-loader/dist/cjs.js!./src/App.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_App_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/components/ChartsBlock.tsx":
/*!****************************************!*\
  !*** ./src/components/ChartsBlock.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

const ChartsBlock = ({ pricedata, volumedata }) => {
    const styles = {
        container: {
            width: 330,
            height: 165,
            backgroundColor: 'white', // Or any other background color
        },
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.container }));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ChartsBlock);


/***/ }),

/***/ "./src/components/ExchangeBlock.tsx":
/*!******************************************!*\
  !*** ./src/components/ExchangeBlock.tsx ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/colors */ "./src/static/colors.tsx");
/* harmony import */ var _static_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/constants */ "./src/static/constants.tsx");



// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import ExpandLessIcon from '@mui/icons-material/ExpandLess';
const ExpandMoreIcon = __webpack_require__(/*! ../static/images/icons/expand-more-icon.png */ "./src/static/images/icons/expand-more-icon.png");
const ExpandLessIcon = __webpack_require__(/*! ../static/images/icons/expand-less-icon.png */ "./src/static/images/icons/expand-less-icon.png");
const ExchangeBlock = ({ exchanges }) => {
    const [isExpanded, setIsExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const toggleExpanded = () => {
        setIsExpanded(!isExpanded);
    };
    const styles = {
        exchangeWrapper: {
            boxSizing: "border-box",
            width: 306,
            height: 40,
            background: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].primary_dark,
            display: "flex",
            alignItems: "center",
            padding: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].default_padding,
        },
        firstExchange: {
            borderTopLeftRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
            borderTopRightRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
            borderBottomLeftRadius: !isExpanded && _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
            borderBottomRightRadius: !isExpanded && _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
        },
        lastExchange: {
            borderBottomLeftRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
            borderBottomRightRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
        },
        image: {
            width: 22,
            height: 22,
        },
        exchangeName: {
            width: 100,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].white_medium,
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_medium,
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_medium,
            paddingLeft: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].default_padding,
        },
        tradingVolume: {
            paddingLeft: 6,
            width: 50,
            height: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_small,
            textAlign: "right",
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].white_medium,
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_small,
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_medium,
            verticalAlign: 'bottom',
        },
        staticText: {
            paddingLeft: 6,
            width: 34,
            height: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_small,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].accent_medium,
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_small,
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_medium,
            verticalAlign: 'bottom',
        },
        arrowIcon: {
            paddingLeft: 26,
            cursor: "pointer",
        },
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", null, exchanges.map((exchange, index) => (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { key: index, style: Object.assign(Object.assign(Object.assign(Object.assign({}, styles.exchangeWrapper), index === 0 && styles.firstExchange), index === exchanges.length - 1 && styles.lastExchange), { display: isExpanded || index === 0 ? "flex" : "none" }) },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: exchange.image, alt: exchange.exchangeName, style: styles.image, onClick: () => window.open(exchange.websiteLink, "_blank") }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.exchangeName, onClick: () => window.open(exchange.websiteLink, "_blank") }, exchange.exchangeName),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.tradingVolume },
            " ",
            exchange.tradingVolume,
            " "),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.staticText }, "/ 24h"),
        index === 0 && (isExpanded ? (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: ExpandLessIcon, alt: "expand-less-icon", style: styles.arrowIcon, onClick: toggleExpanded })) : (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: ExpandMoreIcon, alt: "expand-more-icon", style: styles.arrowIcon, onClick: toggleExpanded }))))))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExchangeBlock);
{ /*{index === 0 && (*/ }
{ /*    isExpanded ? (*/ }
{ /*        <ExpandLessIcon onClick={toggleExpanded} />*/ }
{ /*    ) : (*/ }
{ /*        <ExpandMoreIcon onClick={toggleExpanded} />*/ }
{ /*    )*/ }
{ /*)}*/ }


/***/ }),

/***/ "./src/components/ExpandableTextField.tsx":
/*!************************************************!*\
  !*** ./src/components/ExpandableTextField.tsx ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/colors */ "./src/static/colors.tsx");
/* harmony import */ var _static_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/constants */ "./src/static/constants.tsx");



const ExpandableTextField = ({ text }) => {
    const [expanded, setExpanded] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
    const handleClick = () => {
        setExpanded(!expanded);
    };
    const styles = {
        expandableField: {
            boxSizing: "border-box",
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: 306,
            minHeight: 67,
            padding: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].default_padding,
            backgroundColor: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].primary_dark,
            borderRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
        },
        textFieldContainer: {
            overflowY: expanded ? 'scroll' : 'hidden',
            maxHeight: expanded ? 220 : 32,
            scrollbarWidth: 'none'
        },
        textField: {
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_small,
            color: 'white',
            display: '-webkit-box',
            WebkitLineClamp: expanded ? 1000 : 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            textOverflow: 'ellipsis'
        },
        expandBtn: {
            marginTop: 2,
            paddingLeft: 0,
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_small,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].secondary_medium,
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            outline: 'none',
        },
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.expandableField },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.textFieldContainer },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.textField }, text)),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("button", { style: styles.expandBtn, onClick: handleClick }, expanded ? 'Collapse' : 'Expand')));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ExpandableTextField);


/***/ }),

/***/ "./src/components/HeaderBlock.tsx":
/*!****************************************!*\
  !*** ./src/components/HeaderBlock.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/colors */ "./src/static/colors.tsx");
/* harmony import */ var _static_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/constants */ "./src/static/constants.tsx");



const menuIcon = __webpack_require__(/*! ../static/images/icons/menu-icon.png */ "./src/static/images/icons/menu-icon.png");
const searchIcon = __webpack_require__(/*! ../static/images/icons/search-icon.png */ "./src/static/images/icons/search-icon.png");
const HeaderBlock = ({ mainLogo }) => {
    const styles = {
        headerBlock: {
            display: 'flex',
            alignItems: 'center',
        },
        rectangle: {
            width: 40,
            height: 40,
            borderRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
            backgroundColor: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].primary_dark,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        centeredImage: {
            width: 20,
            height: 20,
        },
        searchbar: {
            marginLeft: 12,
            width: 202,
            height: 40,
            borderRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
            backgroundColor: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].primary_dark,
            display: 'flex',
            alignItems: 'center',
            position: 'relative',
        },
        searchbarImage: {
            width: 20,
            height: 20,
            marginLeft: 12,
        },
        searchInput: {
            marginLeft: 12,
            border: 'none',
            background: 'transparent',
            color: 'white',
            outline: 'none',
            width: '100%',
        },
        mainLogo: {
            marginLeft: 12,
            width: 40,
            height: 40,
            borderRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius_small,
        },
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.headerBlock },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.rectangle },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { style: styles.centeredImage, src: menuIcon, alt: "Centered" })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.searchbar },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { style: styles.searchbarImage, src: searchIcon, alt: "Search" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("input", { style: styles.searchInput, type: "text", placeholder: "Search" })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { style: styles.mainLogo, src: mainLogo, alt: "Main Logo" })));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (HeaderBlock);


/***/ }),

/***/ "./src/components/PriceBar.tsx":
/*!*************************************!*\
  !*** ./src/components/PriceBar.tsx ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/colors */ "./src/static/colors.tsx");
/* harmony import */ var _static_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/constants */ "./src/static/constants.tsx");



const PriceBar = ({ allTimeLow, allTimeHigh, price }) => {
    const percentage = ((price - allTimeLow) / (allTimeHigh - allTimeLow)) * 100;
    const gradientWidth = Math.ceil(306 * (percentage / 100));
    const styles = {
        container: {
            width: '306px',
            height: '40px',
            backgroundColor: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].primary_dark,
            position: 'relative',
            borderRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
            overflow: 'hidden',
        },
        gradient: {
            width: `${gradientWidth}px`,
            height: '40px',
            position: 'absolute',
            borderRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `linear-gradient(to right, ${_static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].primary_dark}, rgba(220, 220, 256, 0.30)`,
        },
        allTimeLow: {
            position: 'absolute',
            left: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].default_padding,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_small,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].red_medium,
            fontFamily: 'Open Sans',
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_large,
        },
        price: {
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_large,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].white_medium,
            fontFamily: 'Open Sans',
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_large,
        },
        allTimeHigh: {
            position: 'absolute',
            right: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].default_padding,
            top: '50%',
            transform: 'translateY(-50%)',
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_small,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].green_medium,
            fontFamily: 'Open Sans',
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_large,
        },
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.container },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.gradient }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.allTimeLow },
            "$",
            allTimeLow.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.price },
            "$",
            price.toFixed(2)),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.allTimeHigh },
            "$",
            allTimeHigh.toFixed(2))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PriceBar);


/***/ }),

/***/ "./src/components/SocialBlock.tsx":
/*!****************************************!*\
  !*** ./src/components/SocialBlock.tsx ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/colors */ "./src/static/colors.tsx");
/* harmony import */ var _static_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/constants */ "./src/static/constants.tsx");



const SocialBlock = ({ image, mainValue, link }) => {
    const styles = {
        container: {
            width: 34,
            height: 49,
            marginRight: 10,
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].primary_dark,
            cursor: 'pointer',
        },
        image: {
            width: 22,
            height: 22,
            borderRadius: '50%',
            marginTop: 6,
        },
        mainValue: {
            fontSize: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_micro,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].white_medium,
            height: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_micro,
            marginBottom: 6,
            padding: 0,
        },
    };
    const openLinkInNewTab = () => {
        if (link) {
            window.open(link, '_blank');
        }
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.container, onClick: openLinkInNewTab },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("img", { src: image, alt: "Social image", style: styles.image }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.mainValue }, mainValue)));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SocialBlock);


/***/ }),

/***/ "./src/components/ValueBlock.tsx":
/*!***************************************!*\
  !*** ./src/components/ValueBlock.tsx ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _static_colors__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../static/colors */ "./src/static/colors.tsx");
/* harmony import */ var _static_constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../static/constants */ "./src/static/constants.tsx");



const ValueBlock = ({ title, mainValue, secondaryValue }) => {
    const styles = {
        rectangle: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: 144,
            height: 48,
            backgroundColor: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].primary_dark,
            borderRadius: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].border_radius,
        },
        title: {
            fontSize: 14,
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_medium,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].secondary_medium,
            margin: '4px 0 0',
        },
        values: {
            display: 'flex',
            alignItems: 'flex-end',
            height: 24,
        },
        mainValue: {
            fontSize: 16,
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_medium,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].white_medium,
        },
        secondaryValue: {
            fontSize: 14,
            fontWeight: _static_constants__WEBPACK_IMPORTED_MODULE_2__["default"].font_weight_medium,
            color: _static_colors__WEBPACK_IMPORTED_MODULE_1__["default"].accent_medium,
            marginLeft: 4,
        },
    };
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.rectangle },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.title }, title),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.values },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.mainValue }, mainValue),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement("span", { style: styles.secondaryValue }, secondaryValue))));
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ValueBlock);


/***/ }),

/***/ "./src/popup/popup.tsx":
/*!*****************************!*\
  !*** ./src/popup/popup.tsx ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _App_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../App.css */ "./src/App.css");
/* harmony import */ var _components_PriceBar__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/PriceBar */ "./src/components/PriceBar.tsx");
/* harmony import */ var _components_ValueBlock__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/ValueBlock */ "./src/components/ValueBlock.tsx");
/* harmony import */ var _components_ExpandableTextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/ExpandableTextField */ "./src/components/ExpandableTextField.tsx");
/* harmony import */ var _components_SocialBlock__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../components/SocialBlock */ "./src/components/SocialBlock.tsx");
/* harmony import */ var _components_ExchangeBlock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../components/ExchangeBlock */ "./src/components/ExchangeBlock.tsx");
/* harmony import */ var _components_HeaderBlock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../components/HeaderBlock */ "./src/components/HeaderBlock.tsx");
/* harmony import */ var _components_ChartsBlock__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../components/ChartsBlock */ "./src/components/ChartsBlock.tsx");










const blockchainIcon = __webpack_require__(/*! ../static/images/icons/blockchain-icon.png */ "./src/static/images/icons/blockchain-icon.png");
const coingeckoIcon = __webpack_require__(/*! ../static/images/icons/coingecko-icon.png */ "./src/static/images/icons/coingecko-icon.png");
const discordIcon = __webpack_require__(/*! ../static/images/icons/discord-icon.png */ "./src/static/images/icons/discord-icon.png");
const redditIcon = __webpack_require__(/*! ../static/images/icons/reddit-icon.png */ "./src/static/images/icons/reddit-icon.png");
const telegramIcon = __webpack_require__(/*! ../static/images/icons/telegram-icon.png */ "./src/static/images/icons/telegram-icon.png");
const twitterIcon = __webpack_require__(/*! ../static/images/icons/twitter-icon.png */ "./src/static/images/icons/twitter-icon.png");
const websiteIcon = __webpack_require__(/*! ../static/images/icons/website-icon.png */ "./src/static/images/icons/website-icon.png");
const styles = {
    container: {
        padding: '12px',
    },
    dataBlocks: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    socialBlocks: {
        display: 'flex',
        justifyContent: 'flex-start',
    },
};
const App = () => {
    return (react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.container },
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_HeaderBlock__WEBPACK_IMPORTED_MODULE_8__["default"], { mainLogo: blockchainIcon }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ChartsBlock__WEBPACK_IMPORTED_MODULE_9__["default"], { pricedata: [], volumedata: [] }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_PriceBar__WEBPACK_IMPORTED_MODULE_3__["default"], { allTimeLow: 0.22, allTimeHigh: 1.78, price: 1.60 }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.dataBlocks },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ValueBlock__WEBPACK_IMPORTED_MODULE_4__["default"], { title: "Circ. Supply", mainValue: "139 T", secondaryValue: "/ 250 T" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ValueBlock__WEBPACK_IMPORTED_MODULE_4__["default"], { title: "Market Cap", mainValue: "$11.6 B", secondaryValue: "#9" })),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ExchangeBlock__WEBPACK_IMPORTED_MODULE_7__["default"], { exchanges: [
                {
                    image: redditIcon,
                    exchangeName: "WOOnetwork",
                    tradingVolume: "$2.6 B",
                    websiteLink: "https://www.reddit.com/r/dogecoin/",
                },
                {
                    image: discordIcon,
                    exchangeName: "Binance",
                    tradingVolume: "$13.4 M",
                    websiteLink: "https://www.reddit.com/r/dogecoin/",
                },
                {
                    image: twitterIcon,
                    exchangeName: "Huobi",
                    tradingVolume: "$1.4 M",
                    websiteLink: "https://www.reddit.com/r/dogecoin/",
                },
                {
                    image: coingeckoIcon,
                    exchangeName: "Bittrex",
                    tradingVolume: "$0.5 M",
                    websiteLink: "https://www.reddit.com/r/dogecoin/",
                },
            ] }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_ExpandableTextField__WEBPACK_IMPORTED_MODULE_5__["default"], { text: "Dogecoin is a cryptocurrency based on the popular \"Doge\" Internet meme and features a Shiba Inu on its logo. Dogecoin is a Litecoin fork. Introduced as a \"joke currency\" on 6 December 2013, Dogecoin quickly developed its own online community and reached a capitalization of US$60 million in January 2014. Compared with other cryptocurrencies, Dogecoin had a fast initial coin production schedule: 100 billion coins were in circulation by mid-2015, with an additional 5.256 billion coins every year thereafter. As of 30 June 2015, the 100 billionth Dogecoin had been mined. Dogecoin was created by Billy Markus from Portland, Oregon and Jackson Palmer from Sydney, Australia. Both wanted to create a fun cryptocurrency that will appeal beyond the core Bitcoin audience. Dogecoin is primarily used as a tipping system on Reddit and Twitter where users tip each other for creating or sharing good content. The community is very active in organising fundraising activities for deserving causes. The developers of Dogecoin haven’t made any major changes to the coin since 2015. This means that Dogecoin could get left behind and is why Shibas are leaving Dogecoin to join more advanced platforms like Ethereum. One of Dogecoin strengths is its relaxed and fun-loving community. However, this is also a weakness because other currencies are way more professional. To purchase Dogecoin, it involves downloading a crypto wallet, setting up a crypto exchange account and then trading away for your desired crypto currency. Once we have set up an account with a DOGE currency exchange and deposited some funds, you are ready to start trading." }),
        react__WEBPACK_IMPORTED_MODULE_0___default().createElement("div", { style: styles.socialBlocks },
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SocialBlock__WEBPACK_IMPORTED_MODULE_6__["default"], { image: websiteIcon }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SocialBlock__WEBPACK_IMPORTED_MODULE_6__["default"], { image: blockchainIcon }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SocialBlock__WEBPACK_IMPORTED_MODULE_6__["default"], { image: coingeckoIcon, mainValue: "9 M" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SocialBlock__WEBPACK_IMPORTED_MODULE_6__["default"], { image: twitterIcon, mainValue: "1.7 K" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SocialBlock__WEBPACK_IMPORTED_MODULE_6__["default"], { image: redditIcon, mainValue: "14 M" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SocialBlock__WEBPACK_IMPORTED_MODULE_6__["default"], { image: telegramIcon, mainValue: "10 K" }),
            react__WEBPACK_IMPORTED_MODULE_0___default().createElement(_components_SocialBlock__WEBPACK_IMPORTED_MODULE_6__["default"], { image: discordIcon }))));
};
const root = document.createElement('div');
document.body.appendChild(root);
(0,react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot)(root).render(react__WEBPACK_IMPORTED_MODULE_0___default().createElement(App, null));


/***/ }),

/***/ "./src/static/colors.tsx":
/*!*******************************!*\
  !*** ./src/static/colors.tsx ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const colors = {
    primary_medium: '#34495e',
    primary_dark: '#2F396D',
    secondary_medium: '#8F95EC',
    accent_medium: '#FFFFFF80',
    red_medium: '#FD8E8E',
    green_medium: '#88EE58',
    white_medium: '#F5F5F5',
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (colors);


/***/ }),

/***/ "./src/static/constants.tsx":
/*!**********************************!*\
  !*** ./src/static/constants.tsx ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
const constants = {
    border_radius: 12,
    border_radius_small: 6,
    default_padding: 12,
    font_large: 22,
    font_medium: 16,
    font_small: 14,
    font_micro: 12,
    font_weight_large: 600,
    font_weight_medium: 500,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (constants);


/***/ }),

/***/ "./src/static/images/icons/blockchain-icon.png":
/*!*****************************************************!*\
  !*** ./src/static/images/icons/blockchain-icon.png ***!
  \*****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "3baa966daea0f5762b8b.png";

/***/ }),

/***/ "./src/static/images/icons/coingecko-icon.png":
/*!****************************************************!*\
  !*** ./src/static/images/icons/coingecko-icon.png ***!
  \****************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b9d0ed4b7bb4954412a6.png";

/***/ }),

/***/ "./src/static/images/icons/discord-icon.png":
/*!**************************************************!*\
  !*** ./src/static/images/icons/discord-icon.png ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "565568464a4cb91686f7.png";

/***/ }),

/***/ "./src/static/images/icons/expand-less-icon.png":
/*!******************************************************!*\
  !*** ./src/static/images/icons/expand-less-icon.png ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9fec87a5297912f46638.png";

/***/ }),

/***/ "./src/static/images/icons/expand-more-icon.png":
/*!******************************************************!*\
  !*** ./src/static/images/icons/expand-more-icon.png ***!
  \******************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "559b02f9d985feb71f8a.png";

/***/ }),

/***/ "./src/static/images/icons/menu-icon.png":
/*!***********************************************!*\
  !*** ./src/static/images/icons/menu-icon.png ***!
  \***********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "f4ba429b501f76efc5ef.png";

/***/ }),

/***/ "./src/static/images/icons/reddit-icon.png":
/*!*************************************************!*\
  !*** ./src/static/images/icons/reddit-icon.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "c9ba47d35142132fba34.png";

/***/ }),

/***/ "./src/static/images/icons/search-icon.png":
/*!*************************************************!*\
  !*** ./src/static/images/icons/search-icon.png ***!
  \*************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "265a38582130035fe898.png";

/***/ }),

/***/ "./src/static/images/icons/telegram-icon.png":
/*!***************************************************!*\
  !*** ./src/static/images/icons/telegram-icon.png ***!
  \***************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b4d367a778f32f46465a.png";

/***/ }),

/***/ "./src/static/images/icons/twitter-icon.png":
/*!**************************************************!*\
  !*** ./src/static/images/icons/twitter-icon.png ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "b45c0a98930b84c556dc.png";

/***/ }),

/***/ "./src/static/images/icons/website-icon.png":
/*!**************************************************!*\
  !*** ./src/static/images/icons/website-icon.png ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "275488b8325f50682b7c.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			loaded: false,
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/node module decorator */
/******/ 	(() => {
/******/ 		__webpack_require__.nmd = (module) => {
/******/ 			module.paths = [];
/******/ 			if (!module.children) module.children = [];
/******/ 			return module;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src;
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) {
/******/ 					var i = scripts.length - 1;
/******/ 					while (i > -1 && !scriptUrl) scriptUrl = scripts[i--].src;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"popup": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkcrypto_explorer_extension_v2"] = self["webpackChunkcrypto_explorer_extension_v2"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["vendors-node_modules_react-dom_index_js"], () => (__webpack_require__("./src/popup/popup.tsx")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=popup.js.map