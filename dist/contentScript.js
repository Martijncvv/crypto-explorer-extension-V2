/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getHomeCoinStorage": () => (/* binding */ getHomeCoinStorage),
/* harmony export */   "getSearchPrefStorage": () => (/* binding */ getSearchPrefStorage),
/* harmony export */   "getSearchResultNftAmountStorage": () => (/* binding */ getSearchResultNftAmountStorage),
/* harmony export */   "getSelectedTokenStorage": () => (/* binding */ getSelectedTokenStorage),
/* harmony export */   "setHomeCoinStorage": () => (/* binding */ setHomeCoinStorage),
/* harmony export */   "setSearchPrefStorage": () => (/* binding */ setSearchPrefStorage),
/* harmony export */   "setSearchResultNftAmountStorage": () => (/* binding */ setSearchResultNftAmountStorage),
/* harmony export */   "setSelectedTokenStorage": () => (/* binding */ setSelectedTokenStorage)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// SETTERS
function setSelectedTokenStorage(token) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve) => {
                chrome.storage.local.set({ selectedToken: token }, () => {
                    resolve();
                });
            });
        }
        catch (error) {
            console.log("setSelectedToken error: ", error);
        }
    });
}
function setSearchPrefStorage(searchPref) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve) => {
                chrome.storage.local.set({ searchPref: searchPref }, () => {
                    resolve();
                });
            });
        }
        catch (error) {
            console.log("setSearchPrefStorage error: ", error);
        }
    });
}
function setSearchResultNftAmountStorage(searchResultNftAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve) => {
                chrome.storage.local.set({ searchResultNftAmount }, () => {
                    resolve();
                });
            });
        }
        catch (error) {
            console.log("setSearchResultNftAmountStorage error: ", error);
        }
    });
}
// GETTERS
function getSelectedTokenStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(['selectedToken'], (res) => {
                if (res === null || res === void 0 ? void 0 : res.selectedToken) {
                    resolve(res.selectedToken);
                }
            });
        });
    });
}
function getSearchPrefStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(['searchPref'], (res) => {
                if (res === null || res === void 0 ? void 0 : res.searchPref) {
                    resolve(res.searchPref);
                }
            });
        });
    });
}
function getSearchResultNftAmountStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(['searchResultNftAmount'], (res) => {
                if (res === null || res === void 0 ? void 0 : res.searchResultNftAmount) {
                    resolve(res.searchResultNftAmount);
                }
            });
        });
    });
}
function setHomeCoinStorage(homeCoinData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve) => {
                chrome.storage.local.set({ homeCoinData }, () => {
                    resolve();
                });
            });
        }
        catch (error) {
            console.log("setHomeCoinStorage error: ", error);
        }
    });
}
function getHomeCoinStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(['homeCoinData'], (res) => {
                if (res === null || res === void 0 ? void 0 : res.homeCoinData) {
                    resolve(res.homeCoinData);
                }
            });
        });
    });
}


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
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// Listen for the 'selectionchange' event to process the selected text

document.addEventListener('selectionchange', handleSelection);
function handleSelection() {
    var _a, _b, _c;
    return __awaiter(this, void 0, void 0, function* () {
        let selectedTicker = (_b = (_a = window
            .getSelection()) === null || _a === void 0 ? void 0 : _a.toString()) === null || _b === void 0 ? void 0 : _b.trim();
        if (selectedTicker.includes('$') || selectedTicker.includes('#')) {
            selectedTicker = (_c = selectedTicker === null || selectedTicker === void 0 ? void 0 : selectedTicker.replace(/[#$?!.,:"']/g, '')) === null || _c === void 0 ? void 0 : _c.toLowerCase();
            if (selectedTicker !== '' && selectedTicker !== null && selectedTicker.length < 7) {
                (0,_utils_storage__WEBPACK_IMPORTED_MODULE_0__.setSelectedTokenStorage)(selectedTicker);
            }
        }
    });
}

})();

/******/ })()
;
//# sourceMappingURL=contentScript.js.map