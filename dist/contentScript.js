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
/* harmony export */   "changePortfolioCoinAmountStorage": () => (/* binding */ changePortfolioCoinAmountStorage),
/* harmony export */   "getHomeCoinStorage": () => (/* binding */ getHomeCoinStorage),
/* harmony export */   "getPortfolioDataStorage": () => (/* binding */ getPortfolioDataStorage),
/* harmony export */   "getSearchPrefStorage": () => (/* binding */ getSearchPrefStorage),
/* harmony export */   "getSearchResultNftAmountStorage": () => (/* binding */ getSearchResultNftAmountStorage),
/* harmony export */   "getSelectedTokenStorage": () => (/* binding */ getSelectedTokenStorage),
/* harmony export */   "getStartPrefStorage": () => (/* binding */ getStartPrefStorage),
/* harmony export */   "removePortfolioCoinStorage": () => (/* binding */ removePortfolioCoinStorage),
/* harmony export */   "setHomeCoinStorage": () => (/* binding */ setHomeCoinStorage),
/* harmony export */   "setPortfolioDataStorage": () => (/* binding */ setPortfolioDataStorage),
/* harmony export */   "setSearchPrefStorage": () => (/* binding */ setSearchPrefStorage),
/* harmony export */   "setSearchResultNftAmountStorage": () => (/* binding */ setSearchResultNftAmountStorage),
/* harmony export */   "setSelectedTokenStorage": () => (/* binding */ setSelectedTokenStorage),
/* harmony export */   "setStartPrefStorage": () => (/* binding */ setStartPrefStorage)
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
function setStartPrefStorage(startPref) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve) => {
                chrome.storage.local.set({ startPref: startPref }, () => {
                    resolve();
                });
            });
        }
        catch (error) {
            console.log("setStartPrefStorage error: ", error);
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
function setPortfolioDataStorage(newCoinData) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve) => {
                // chrome.storage.local.set({ portfolioCoinData: [] }, () => {
                //   resolve();
                // });
                chrome.storage.local.get("portfolioCoinData", (result) => {
                    const existingData = result.portfolioCoinData || [];
                    let updatedData = [];
                    if (existingData.length > 0) {
                        const existingCoinIndex = existingData.findIndex((coin) => coin.id === newCoinData.id);
                        if (existingCoinIndex === -1) {
                            updatedData = [...existingData, newCoinData];
                        }
                        else {
                            updatedData = existingData.filter((coin) => coin.id !== newCoinData.id);
                        }
                    }
                    else {
                        updatedData = [newCoinData];
                    }
                    console.log("updatedData1: ", updatedData);
                    chrome.storage.local.set({ portfolioCoinData: updatedData }, () => {
                        resolve();
                    });
                });
            });
        }
        catch (error) {
            console.log("setPortfolioDataStorage error: ", error);
        }
    });
}
function changePortfolioCoinAmountStorage(coinId, amount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve) => {
                chrome.storage.local.get("portfolioCoinData", (result) => {
                    const existingData = result.portfolioCoinData || [];
                    const updatedData = existingData.map((coinInfo) => {
                        if (coinInfo.id === coinId) {
                            return Object.assign(Object.assign({}, coinInfo), { amount });
                        }
                        return coinInfo;
                    });
                    chrome.storage.local.set({ portfolioCoinData: updatedData }, () => {
                        resolve();
                    });
                });
            });
        }
        catch (error) {
            console.log("changePortfolioCoinAmountStorage error: ", error);
        }
    });
}
function removePortfolioCoinStorage(coinId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            return new Promise((resolve) => {
                chrome.storage.local.get("portfolioCoinData", (result) => {
                    const existingData = result.portfolioCoinData || [];
                    const updatedData = existingData.filter((coinInfo) => {
                        return coinInfo.id !== coinId;
                    });
                    chrome.storage.local.set({ portfolioCoinData: updatedData }, () => {
                        resolve();
                    });
                });
            });
        }
        catch (error) {
            console.log("setPortfolioCoinStorage error: ", error);
        }
    });
}
// GETTERS
function getSelectedTokenStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(["selectedToken"], (res) => {
                if (res === null || res === void 0 ? void 0 : res.selectedToken) {
                    resolve(res.selectedToken);
                }
                else {
                    resolve(null);
                }
            });
        });
    });
}
function getSearchPrefStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(["searchPref"], (res) => {
                if (res === null || res === void 0 ? void 0 : res.searchPref) {
                    resolve(res.searchPref);
                }
                else {
                    resolve(null);
                }
            });
        });
    });
}
function getStartPrefStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(["startPref"], (res) => {
                if (res === null || res === void 0 ? void 0 : res.startPref) {
                    resolve(res.startPref);
                }
                else {
                    resolve(null);
                }
            });
        });
    });
}
function getSearchResultNftAmountStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(["searchResultNftAmount"], (res) => {
                if (res === null || res === void 0 ? void 0 : res.searchResultNftAmount) {
                    resolve(res.searchResultNftAmount);
                }
                else {
                    resolve(null);
                }
            });
        });
    });
}
function getHomeCoinStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(["homeCoinData"], (res) => {
                if (res === null || res === void 0 ? void 0 : res.homeCoinData) {
                    resolve(res.homeCoinData);
                }
                else {
                    resolve(null);
                }
            });
        });
    });
}
function getPortfolioDataStorage() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(["portfolioCoinData"], (res) => {
                if (res === null || res === void 0 ? void 0 : res.portfolioCoinData) {
                    resolve(res.portfolioCoinData);
                }
                else {
                    resolve(null);
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