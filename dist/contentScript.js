/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/contentScript/contentScript.ts":
/*!********************************************!*\
  !*** ./src/contentScript/contentScript.ts ***!
  \********************************************/
/***/ (function() {

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
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
// TODO do we want this feature. People freaking on warning at installation permission requests
function handleSelection() {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the selected text, remove special characters, and convert to lowercase
        let selectedTicker = window
            .getSelection()
            .toString()
            .trim()
            .replace(/[#$?!.,:"']/g, '')
            .toLowerCase();
        // Process the selected text if it's not empty and shorter than 7 characters //
        // todo check if this can be improved
        if (selectedTicker !== '' && selectedTicker.length < 7) {
        }
    });
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/contentScript/contentScript.ts"]();
/******/ 	
/******/ })()
;
//# sourceMappingURL=contentScript.js.map