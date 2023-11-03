/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dom.js":
/*!********************!*\
  !*** ./src/dom.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   manipulateDOM: () => (/* binding */ manipulateDOM)
/* harmony export */ });
 

const manipulateDOM = (function () {
    function createTextElement (element, text) {
        const newElement = document.createElement(element);
        newElement.textContent = text;
        return newElement;
    }

    function addToHTML (element, parent) {
        parent.appendChild(element);
    }

    function createContainer (cssClass) {
        const container = document.createElement('div');
        container.classList.add(cssClass);
        return container;
    };

    return {
        createTextElement: createTextElement,
        addToHTML: addToHTML,
        createContainer, createContainer,
    }

})();

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   projectMod: () => (/* binding */ projectMod)
/* harmony export */ });


const projectMod = (function () {

    const projects = [];

    function createProject (title, tasks) {
        return {title, tasks}
    }

    return {
        createProject: createProject,
    }
})();

/***/ }),

/***/ "./src/tasks.js":
/*!**********************!*\
  !*** ./src/tasks.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   taskMod: () => (/* binding */ taskMod)
/* harmony export */ });


const taskMod = (function () {

    function createTask (title, description, dueDate, priority) {
        return {title, description, dueDate, priority}
    }

    function assignTask (taskObj, taskArr) {
        taskArr.push(taskObj);
    }

    return {
        createTask: createTask,
        assignTask: assignTask,
    }

})();

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
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks.js */ "./src/tasks.js");






const loadPage = (function () {
    const htmlContent = document.querySelector('#content')

    const headerContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createContainer ('header');
    const sidebarContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createContainer ('sidebar');
    const displayContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createContainer ('display');
    const gridContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createContainer ('grid');

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (headerContent, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (gridContainer, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (sidebarContent, gridContainer);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (displayContent, gridContainer);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('h2', 'To Do List'), headerContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('button', 'Add Project'), headerContent);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('div', 'Projects'), sidebarContent);

    const tasks = [];
    const clean = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask('Clean', 'clean your room', Date(), 'Low');
    const surf = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask('Surf', 'high tide at 3PM', Date(), 'High');
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask(clean, tasks);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask(surf, tasks);

    const today = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject('Today', tasks);
    console.log(today);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('div', today.title), sidebarContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('h3', today.title), displayContent)
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFzQjs7QUFFdEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUN6Qm1COztBQUVwQjs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ2JnQjs7QUFFakI7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7OztVQ2pCRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7QUNOc0M7QUFDRTtBQUNOOzs7O0FBSWxDO0FBQ0E7O0FBRUEsMEJBQTBCLGtEQUFhO0FBQ3ZDLDJCQUEyQixrREFBYTtBQUN4QywyQkFBMkIsa0RBQWE7QUFDeEMsMEJBQTBCLGtEQUFhOztBQUV2QyxJQUFJLGtEQUFhO0FBQ2pCLElBQUksa0RBQWE7QUFDakIsSUFBSSxrREFBYTtBQUNqQixJQUFJLGtEQUFhOztBQUVqQixJQUFJLGtEQUFhLFlBQVksa0RBQWE7QUFDMUMsSUFBSSxrREFBYSxZQUFZLGtEQUFhOztBQUUxQyxJQUFJLGtEQUFhLFlBQVksa0RBQWE7O0FBRTFDO0FBQ0Esa0JBQWtCLDhDQUFPO0FBQ3pCLGlCQUFpQiw4Q0FBTztBQUN4QixJQUFJLDhDQUFPO0FBQ1gsSUFBSSw4Q0FBTzs7QUFFWCxrQkFBa0Isb0RBQVU7QUFDNUI7O0FBRUEsSUFBSSxrREFBYSxZQUFZLGtEQUFhO0FBQzFDLElBQUksa0RBQWEsWUFBWSxrREFBYTtBQUMxQyxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7bWFuaXB1bGF0ZURPTX0gXG5cbmNvbnN0IG1hbmlwdWxhdGVET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9IVE1MIChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoY3NzQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGV4dEVsZW1lbnQ6IGNyZWF0ZVRleHRFbGVtZW50LFxuICAgICAgICBhZGRUb0hUTUw6IGFkZFRvSFRNTCxcbiAgICAgICAgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVDb250YWluZXIsXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7cHJvamVjdE1vZH07XG5cbmNvbnN0IHByb2plY3RNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QgKHRpdGxlLCB0YXNrcykge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCB0YXNrc31cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVQcm9qZWN0OiBjcmVhdGVQcm9qZWN0LFxuICAgIH1cbn0pKCk7IiwiZXhwb3J0IHt0YXNrTW9kfTtcblxuY29uc3QgdGFza01vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5KSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eX1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3NpZ25UYXNrICh0YXNrT2JqLCB0YXNrQXJyKSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCh0YXNrT2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUYXNrOiBjcmVhdGVUYXNrLFxuICAgICAgICBhc3NpZ25UYXNrOiBhc3NpZ25UYXNrLFxuICAgIH1cblxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7bWFuaXB1bGF0ZURPTX0gZnJvbSAnLi9kb20uanMnXG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gJy4vdGFza3MuanMnXG5cblxuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaHRtbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjY29udGVudCcpXG5cbiAgICBjb25zdCBoZWFkZXJDb250ZW50ID0gbWFuaXB1bGF0ZURPTS5jcmVhdGVDb250YWluZXIgKCdoZWFkZXInKTtcbiAgICBjb25zdCBzaWRlYmFyQ29udGVudCA9IG1hbmlwdWxhdGVET00uY3JlYXRlQ29udGFpbmVyICgnc2lkZWJhcicpO1xuICAgIGNvbnN0IGRpc3BsYXlDb250ZW50ID0gbWFuaXB1bGF0ZURPTS5jcmVhdGVDb250YWluZXIgKCdkaXNwbGF5Jyk7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IG1hbmlwdWxhdGVET00uY3JlYXRlQ29udGFpbmVyICgnZ3JpZCcpO1xuXG4gICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKGhlYWRlckNvbnRlbnQsIGh0bWxDb250ZW50KTtcbiAgICBtYW5pcHVsYXRlRE9NLmFkZFRvSFRNTCAoZ3JpZENvbnRhaW5lciwgaHRtbENvbnRlbnQpO1xuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcik7XG4gICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKGRpc3BsYXlDb250ZW50LCBncmlkQ29udGFpbmVyKTtcblxuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChtYW5pcHVsYXRlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDInLCAnVG8gRG8gTGlzdCcpLCBoZWFkZXJDb250ZW50KTtcbiAgICBtYW5pcHVsYXRlRE9NLmFkZFRvSFRNTCAobWFuaXB1bGF0ZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgUHJvamVjdCcpLCBoZWFkZXJDb250ZW50KTtcblxuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChtYW5pcHVsYXRlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgJ1Byb2plY3RzJyksIHNpZGViYXJDb250ZW50KTtcblxuICAgIGNvbnN0IHRhc2tzID0gW107XG4gICAgY29uc3QgY2xlYW4gPSB0YXNrTW9kLmNyZWF0ZVRhc2soJ0NsZWFuJywgJ2NsZWFuIHlvdXIgcm9vbScsIERhdGUoKSwgJ0xvdycpO1xuICAgIGNvbnN0IHN1cmYgPSB0YXNrTW9kLmNyZWF0ZVRhc2soJ1N1cmYnLCAnaGlnaCB0aWRlIGF0IDNQTScsIERhdGUoKSwgJ0hpZ2gnKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2soY2xlYW4sIHRhc2tzKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2soc3VyZiwgdGFza3MpO1xuXG4gICAgY29uc3QgdG9kYXkgPSBwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QoJ1RvZGF5JywgdGFza3MpO1xuICAgIGNvbnNvbGUubG9nKHRvZGF5KTtcblxuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChtYW5pcHVsYXRlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgdG9kYXkudGl0bGUpLCBzaWRlYmFyQ29udGVudCk7XG4gICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKG1hbmlwdWxhdGVET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMycsIHRvZGF5LnRpdGxlKSwgZGlzcGxheUNvbnRlbnQpXG59KSgpO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=