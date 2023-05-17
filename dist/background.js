/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/utils/api.ts":
/*!**************************!*\
  !*** ./src/utils/api.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchCoinInfo": () => (/* binding */ fetchCoinInfo),
/* harmony export */   "fetchCoinsList": () => (/* binding */ fetchCoinsList),
/* harmony export */   "fetchExchangesList": () => (/* binding */ fetchExchangesList),
/* harmony export */   "fetchNameSearch": () => (/* binding */ fetchNameSearch),
/* harmony export */   "fetchNftInfo": () => (/* binding */ fetchNftInfo),
/* harmony export */   "fetchNftList": () => (/* binding */ fetchNftList),
/* harmony export */   "fetchPriceHistoryData": () => (/* binding */ fetchPriceHistoryData),
/* harmony export */   "fetchTokenTxs": () => (/* binding */ fetchTokenTxs),
/* harmony export */   "fetchTrendingCoins": () => (/* binding */ fetchTrendingCoins)
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
const COINGECKO_COINS_LIST_API = 'https://api.coingecko.com/api/v3/coins/list';
const COINGECKO_NFTS_LIST_API = 'https://api.coingecko.com/api/v3/nfts/list';
const COINGECKO_EXCHANGES_LIST_API = 'https://api.coingecko.com/api/v3/exchanges?per_page=250';
function fetchCoinsList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(COINGECKO_COINS_LIST_API);
            if (!res.ok) {
                throw new Error(`Fetch error, Coingecko Coins List: ${res.status} ${res.statusText}`);
            }
            return yield res.json();
        }
        catch (error) {
            console.error('Error fetching Coingecko Coins List:', error);
            throw error;
        }
    });
}
function fetchExchangesList() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let pageNr = 1;
            let perPage = 250;
            let allExchanges = [];
            while (true) {
                const res = yield fetch(`${COINGECKO_EXCHANGES_LIST_API}?per_page=${perPage}&page=${pageNr}`);
                if (!res.ok) {
                    throw new Error(`Fetch error, Coingecko exchanges List: ${res.status} ${res.statusText}`);
                }
                const exchanges = yield res.json();
                allExchanges.push(...exchanges);
                if (exchanges.length < perPage) {
                    // Reached the last page, exit the loop
                    break;
                }
                pageNr++;
            }
            const exchangesObject = allExchanges.reduce((acc, exchange) => {
                acc[exchange.id] = exchange.image;
                // acc[`"${exchange.id}"`] = exchange.image;
                return acc;
            }, {});
            console.log("exchangesObject", JSON.stringify(exchangesObject, null, 2));
            console.log("exchangesObject.length", Object.keys(exchangesObject).length);
        }
        catch (error) {
            console.error('Error fetching Coingecko exchanges List:', error);
            throw error;
        }
    });
}
function fetchNameSearch(searchQuery) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://api.coingecko.com/api/v3/search?query=${searchQuery}`);
            if (!res.ok) {
                throw new Error(`Fetch error, Coingecko searchQuery ${searchQuery}: ${res.status} ${res.statusText}`);
            }
            return yield res.json();
        }
        catch (error) {
            console.error('Error fetching  Coingecko searchQuery ${searchQuery}', error);
            throw error;
        }
    });
}
function fetchTrendingCoins() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch('https://api.coingecko.com/api/v3/search/trending');
            if (!res.ok) {
                throw new Error(`Fetch error, Hot Coins: ${res.status} ${res.statusText}`);
            }
            return yield res.json();
        }
        catch (error) {
            console.error('Error fetching Hot Coins:', error);
            throw error;
        }
    });
}
function fetchCoinInfo(coinId) {
    return __awaiter(this, void 0, void 0, function* () {
        coinId = coinId || 'bitcoin';
        try {
            const res = yield fetch(`https://api.coingecko.com/api/v3/coins/${coinId}?localization=false&market_data=true&community_data=true&developer_data=false&sparkline=false`);
            if (!res.ok) {
                throw new Error(`Fetch error, coin info data (${coinId}): ${res.status} ${res.statusText}`);
            }
            return yield res.json();
        }
        catch (error) {
            console.error(`Error fetching coin info data (${coinId}):`, error);
            throw error;
        }
    });
}
function fetchNftInfo(coinId) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://api.coingecko.com/api/v3/nfts/${coinId}`);
            if (!res.ok) {
                throw new Error(`Fetch error, NFT info data (${coinId}): ${res.status} ${res.statusText}`);
            }
            return yield res.json();
        }
        catch (error) {
            console.error(`Error fetching NFT info data (${coinId}):`, error);
            throw error;
        }
    });
}
function fetchPriceHistoryData(coinId, quote, chartRange) {
    return __awaiter(this, void 0, void 0, function* () {
        coinId = coinId || 'bitcoin';
        quote = quote || 'usd';
        try {
            const res = yield fetch(`https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${quote}&days=${chartRange}&interval=daily`);
            if (!res.ok) {
                throw new Error(`Fetch error, price history data (${coinId}): ${res.status} ${res.statusText}`);
            }
            return yield res.json();
        }
        catch (error) {
            console.error(`Error fetching price history data (${coinId}):`, error);
            throw error;
        }
    });
}
function fetchTokenTxs(domainName, contractAddress, txAmount) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const res = yield fetch(`https://api.${domainName}/api?module=account&action=tokentx&contractaddress=${contractAddress}&page=1&offset=${txAmount}&startblock=0&endblock=99999999&sort=desc`);
            if (!res.ok) {
                throw new Error(`Fetch error, Eth token txs info: ${res.status} ${res.statusText}`);
            }
            return yield res.json();
        }
        catch (error) {
            console.error('Error fetching Eth token txs info:', error);
            throw error;
        }
    });
}
function fetchNftList() {
    return __awaiter(this, void 0, void 0, function* () {
        let allNfts = [];
        for (let page = 1; page < 100; page++) {
            try {
                yield new Promise((resolve) => setTimeout(resolve, 500));
                const res = yield fetch(`${COINGECKO_NFTS_LIST_API}?per_page=250&page=${page}`);
                if (!res.ok) {
                    console.log(`Fetch error, API info page ${page}: ${res.status} ${res.statusText}`);
                    return allNfts;
                }
                const data = yield res.json();
                allNfts.push(...data);
                if (data.length < 250) {
                    return allNfts;
                }
            }
            catch (error) {
                console.error(`Error fetching API info page ${page}:`, error);
                return allNfts;
            }
        }
        return allNfts;
    });
}


/***/ }),

/***/ "./src/utils/storage.ts":
/*!******************************!*\
  !*** ./src/utils/storage.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getStoredCoinList": () => (/* binding */ getStoredCoinList),
/* harmony export */   "getStoredCoins": () => (/* binding */ getStoredCoins),
/* harmony export */   "getStoredNftList": () => (/* binding */ getStoredNftList),
/* harmony export */   "setStoredCoinList": () => (/* binding */ setStoredCoinList),
/* harmony export */   "setStoredCoins": () => (/* binding */ setStoredCoins),
/* harmony export */   "setStoredNftList": () => (/* binding */ setStoredNftList)
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
function setStoredCoinList(coins) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.set({ coins }, resolve);
        });
    });
}
function getStoredCoinList() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(['coins'], (res) => {
                var _a;
                resolve((_a = res.coins) !== null && _a !== void 0 ? _a : []);
            });
        });
    });
}
function setStoredCoins(coinIds) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.set({ coinIds }, resolve);
        });
    });
}
function getStoredCoins() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(['coinIds'], (res) => {
                var _a;
                resolve((_a = res.coinIds) !== null && _a !== void 0 ? _a : []);
            });
        });
    });
}
// NFTs
function setStoredNftList(nfts) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.set({ nfts }, resolve);
        });
    });
}
function getStoredNftList() {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve) => {
            chrome.storage.local.get(['nfts'], (res) => {
                var _a;
                resolve((_a = res.nfts) !== null && _a !== void 0 ? _a : []);
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
/*!**************************************!*\
  !*** ./src/background/background.ts ***!
  \**************************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/api */ "./src/utils/api.ts");
/* harmony import */ var _utils_storage__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/storage */ "./src/utils/storage.ts");
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


// fetchData()
function fetchData() {
    return __awaiter(this, void 0, void 0, function* () {
        let coinList = yield (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.fetchCoinsList)();
        let nftList = yield (0,_utils_api__WEBPACK_IMPORTED_MODULE_0__.fetchNftList)();
        (0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.setStoredCoinList)(coinList);
        (0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.setStoredNftList)(nftList);
        (0,_utils_storage__WEBPACK_IMPORTED_MODULE_1__.setStoredCoins)([{ id: 'bitcoin', symbol: 'btc', name: 'bitcoin' }]);
    });
}

})();

/******/ })()
;
//# sourceMappingURL=background.js.map