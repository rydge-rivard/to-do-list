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
/* harmony export */   useDOM: () => (/* binding */ useDOM)
/* harmony export */ });
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tasks.js */ "./src/tasks.js");
 
;

const useDOM = (function () {
    function createTextElement (element, text) {
        const newElement = document.createElement(element);
        newElement.textContent = text;
        return newElement;
    }
    function createClassTextElement (element, text, cssClass) {
        const newElement = document.createElement(element);
        newElement.classList.add(cssClass);
        newElement.textContent = text;
        return newElement;
    }

    function addToHTML (element, parent) {
        parent.appendChild(element);
    }

    function createContainer (cssClass, element) {
        const container = document.createElement(element);
        container.classList.add(cssClass);
        return container;
    };

    function appendProj (obj, location, element) {
        const newElement = createTextElement (element, obj.title)
        addToHTML (newElement, location);
        return newElement;
    }

    //potentially split this into tasks.js
    function appendAllTasks (taskArr, location) {
        taskArr.forEach(task => {
            const element = appendProj (task, location, 'div');
            bindEvents (element, 'click', () => toggleDetails (task, element));
        });
    }

    function bindEvents (element, event, action) {
        element.addEventListener(event, action);
    }

    //circle back to this and split function int tasks.js
    function toggleDetails (obj, location) {
        const active = useDOM.createContainer ('active', 'div');
        useDOM.addToHTML (active, location);
        _tasks_js__WEBPACK_IMPORTED_MODULE_0__.taskMod.addTaskData (obj, active);
        return obj;
    }

    function renderDisplay (project, parent) {
        useDOM.appendProj (project, parent, 'h3');
        useDOM.appendAllTasks (project.tasks, parent, 'div');
    }

    return {
        createTextElement: createTextElement,
        addToHTML: addToHTML,
        createContainer, createContainer,
        appendProj: appendProj,
        appendAllTasks: appendAllTasks,
        createClassTextElement: createClassTextElement,
        bindEvents: bindEvents,
        renderDisplay: renderDisplay,
    }

})();

/***/ }),

/***/ "./src/modal.js":
/*!**********************!*\
  !*** ./src/modal.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   modalMod: () => (/* binding */ modalMod)
/* harmony export */ });
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom */ "./src/dom.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");

;


const modalMod = (function () {

    const dialog = document.querySelector('dialog')
    const confirmBtn = dialog.querySelector("#confirmBtn");
    let newTask;

    _dom__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (confirmBtn, 'click', (event) => confirmTask (event));

    function showModal () {
        console.log('click')
        dialog.showModal();
    }

    function confirmTask (event) {
        event.preventDefault();
        newTask = createTask ();
        _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMod.appendTask (newTask, document.querySelector('.display'));
        console.log(newTask);
    }

    function sortInputs () {
        const inputs = dialog.querySelectorAll('input')
        const objArr = [];
        inputs.forEach(input => objArr.push (input.value));
        return objArr;
    }

    function createTask () {
        const inputValues = sortInputs();
        const newTask = _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMod.createTask(inputValues[0]);
        return newTask;
    }

    return {
        //return an object to push to array in index
        showModal: showModal,
        newTask,
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
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");




const taskMod = (function () {

    function createTask (title, description, dueDate, priority, id) {
        return {title, description, dueDate, priority, id}
    }

    function assignTask (taskObj, taskArr) {
        taskArr.push(taskObj);
    }

    function appendTask (task, location) {
        const element = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.appendProj (task, location, 'div');
        return element;
        // bindEvents (element, 'click', () => toggleDetails (task, element));
    }

    //create content divs on task create that are display = none
    //toggle display = block on click
    //on task edit, the item is removed and re-added to array?

    function addTaskData (obj, parent) {
        for (const key in obj) {
            const field = `${key}: ${obj[key]}`;
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('div', field), parent);
        }
    }

    return {
        createTask: createTask,
        assignTask: assignTask,
        addTaskData: addTaskData,
        appendTask: appendTask,
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
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modal.js */ "./src/modal.js");





const loadPage = (function () {
    const htmlContent = document.querySelector ('#content')

    const headerContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('header', 'div');
    const sidebarContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('sidebar', 'div');
    const displayContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('display', 'div');
    const gridContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('grid', 'div');

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (headerContent, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (gridContainer, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (sidebarContent, gridContainer);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (displayContent, gridContainer);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('h2', 'To Do List'), headerContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createClassTextElement 
        ('button', 'Add Project', 'add-project'), headerContent);
    const addTaskBtn = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createClassTextElement ('button', 'Add Task', 'add-task');
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (addTaskBtn, headerContent);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('div', 'Projects'), sidebarContent);

    const projects = [];
    const tasks = [];
    const clean = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', tasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (clean, tasks);
    const surf = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', tasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (surf, tasks);

    const today = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject ('Today', tasks);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.appendProj (today, sidebarContent, 'div');
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (today, displayContent);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (addTaskBtn, 'click', () => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.showModal());
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmLENBQXFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOENBQU87QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7QUNwRWdCO0FBQ2pCLENBQTZCO0FBQ0c7O0FBRWhDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSxJQUFJLHdDQUFNOztBQUVWO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMkNBQU87QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLDJDQUFPO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQzNDbUI7O0FBRXBCOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQ1hnQjtBQUNjOzs7QUFHL0I7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0Esd0JBQXdCLDJDQUFNO0FBQzlCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QixJQUFJLElBQUksU0FBUztBQUM5QyxZQUFZLDJDQUFNLFlBQVksMkNBQU07QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7O1VDdENEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOK0I7QUFDUztBQUNOO0FBQ0M7O0FBRW5DO0FBQ0E7O0FBRUEsMEJBQTBCLDJDQUFNO0FBQ2hDLDJCQUEyQiwyQ0FBTTtBQUNqQywyQkFBMkIsMkNBQU07QUFDakMsMEJBQTBCLDJDQUFNOztBQUVoQyxJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU07QUFDVixJQUFJLDJDQUFNOztBQUVWLElBQUksMkNBQU0sWUFBWSwyQ0FBTTtBQUM1QixJQUFJLDJDQUFNLFlBQVksMkNBQU07QUFDNUI7QUFDQSx1QkFBdUIsMkNBQU07QUFDN0IsSUFBSSwyQ0FBTTs7QUFFVixJQUFJLDJDQUFNLFlBQVksMkNBQU07O0FBRTVCO0FBQ0E7QUFDQSxrQkFBa0IsOENBQU87QUFDekIsSUFBSSw4Q0FBTztBQUNYLGlCQUFpQiw4Q0FBTztBQUN4QixJQUFJLDhDQUFPOztBQUVYLGtCQUFrQixvREFBVTs7QUFFNUIsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU07O0FBRVYsSUFBSSwyQ0FBTSx3Q0FBd0MsK0NBQVE7QUFDMUQ7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHt1c2VET019IFxuaW1wb3J0IHsgdGFza01vZCB9IGZyb20gXCIuL3Rhc2tzLmpzXCI7XG5cbmNvbnN0IHVzZURPTSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoZWxlbWVudCwgdGV4dCwgY3NzQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb0hUTUwgKGVsZW1lbnQsIHBhcmVudCkge1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyIChjc3NDbGFzcywgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2ogKG9iaiwgbG9jYXRpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCBvYmoudGl0bGUpXG4gICAgICAgIGFkZFRvSFRNTCAobmV3RWxlbWVudCwgbG9jYXRpb24pO1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICAvL3BvdGVudGlhbGx5IHNwbGl0IHRoaXMgaW50byB0YXNrcy5qc1xuICAgIGZ1bmN0aW9uIGFwcGVuZEFsbFRhc2tzICh0YXNrQXJyLCBsb2NhdGlvbikge1xuICAgICAgICB0YXNrQXJyLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXBwZW5kUHJvaiAodGFzaywgbG9jYXRpb24sICdkaXYnKTtcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKGVsZW1lbnQsICdjbGljaycsICgpID0+IHRvZ2dsZURldGFpbHMgKHRhc2ssIGVsZW1lbnQpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyAoZWxlbWVudCwgZXZlbnQsIGFjdGlvbikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgLy9jaXJjbGUgYmFjayB0byB0aGlzIGFuZCBzcGxpdCBmdW5jdGlvbiBpbnQgdGFza3MuanNcbiAgICBmdW5jdGlvbiB0b2dnbGVEZXRhaWxzIChvYmosIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdhY3RpdmUnLCAnZGl2Jyk7XG4gICAgICAgIHVzZURPTS5hZGRUb0hUTUwgKGFjdGl2ZSwgbG9jYXRpb24pO1xuICAgICAgICB0YXNrTW9kLmFkZFRhc2tEYXRhIChvYmosIGFjdGl2ZSk7XG4gICAgICAgIHJldHVybiBvYmo7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIHVzZURPTS5hcHBlbmRQcm9qIChwcm9qZWN0LCBwYXJlbnQsICdoMycpO1xuICAgICAgICB1c2VET00uYXBwZW5kQWxsVGFza3MgKHByb2plY3QudGFza3MsIHBhcmVudCwgJ2RpdicpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRleHRFbGVtZW50OiBjcmVhdGVUZXh0RWxlbWVudCxcbiAgICAgICAgYWRkVG9IVE1MOiBhZGRUb0hUTUwsXG4gICAgICAgIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQ29udGFpbmVyLFxuICAgICAgICBhcHBlbmRQcm9qOiBhcHBlbmRQcm9qLFxuICAgICAgICBhcHBlbmRBbGxUYXNrczogYXBwZW5kQWxsVGFza3MsXG4gICAgICAgIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQ6IGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQsXG4gICAgICAgIGJpbmRFdmVudHM6IGJpbmRFdmVudHMsXG4gICAgICAgIHJlbmRlckRpc3BsYXk6IHJlbmRlckRpc3BsYXksXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7bW9kYWxNb2R9XG5pbXBvcnQge3VzZURPTX0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IG1vZGFsTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpXG4gICAgY29uc3QgY29uZmlybUJ0biA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1CdG5cIik7XG4gICAgbGV0IG5ld1Rhc2s7XG5cbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybUJ0biwgJ2NsaWNrJywgKGV2ZW50KSA9PiBjb25maXJtVGFzayAoZXZlbnQpKTtcblxuICAgIGZ1bmN0aW9uIHNob3dNb2RhbCAoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCdjbGljaycpXG4gICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtVGFzayAoZXZlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbmV3VGFzayA9IGNyZWF0ZVRhc2sgKCk7XG4gICAgICAgIHRhc2tNb2QuYXBwZW5kVGFzayAobmV3VGFzaywgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3BsYXknKSk7XG4gICAgICAgIGNvbnNvbGUubG9nKG5ld1Rhc2spO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNvcnRJbnB1dHMgKCkge1xuICAgICAgICBjb25zdCBpbnB1dHMgPSBkaWFsb2cucXVlcnlTZWxlY3RvckFsbCgnaW5wdXQnKVxuICAgICAgICBjb25zdCBvYmpBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRzLmZvckVhY2goaW5wdXQgPT4gb2JqQXJyLnB1c2ggKGlucHV0LnZhbHVlKSk7XG4gICAgICAgIHJldHVybiBvYmpBcnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAoKSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWVzID0gc29ydElucHV0cygpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gdGFza01vZC5jcmVhdGVUYXNrKGlucHV0VmFsdWVzWzBdKTtcbiAgICAgICAgcmV0dXJuIG5ld1Rhc2s7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy9yZXR1cm4gYW4gb2JqZWN0IHRvIHB1c2ggdG8gYXJyYXkgaW4gaW5kZXhcbiAgICAgICAgc2hvd01vZGFsOiBzaG93TW9kYWwsXG4gICAgICAgIG5ld1Rhc2ssXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7cHJvamVjdE1vZH07XG5cbmNvbnN0IHByb2plY3RNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdCAodGl0bGUsIHRhc2tzKSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIHRhc2tzfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3Q6IGNyZWF0ZVByb2plY3QsXG4gICAgfVxufSkoKTsiLCJleHBvcnQge3Rhc2tNb2R9O1xuaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuXG5cbmNvbnN0IHRhc2tNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBpZH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3NpZ25UYXNrICh0YXNrT2JqLCB0YXNrQXJyKSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCh0YXNrT2JqKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRUYXNrICh0YXNrLCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdXNlRE9NLmFwcGVuZFByb2ogKHRhc2ssIGxvY2F0aW9uLCAnZGl2Jyk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAvLyBiaW5kRXZlbnRzIChlbGVtZW50LCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCBlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgLy9jcmVhdGUgY29udGVudCBkaXZzIG9uIHRhc2sgY3JlYXRlIHRoYXQgYXJlIGRpc3BsYXkgPSBub25lXG4gICAgLy90b2dnbGUgZGlzcGxheSA9IGJsb2NrIG9uIGNsaWNrXG4gICAgLy9vbiB0YXNrIGVkaXQsIHRoZSBpdGVtIGlzIHJlbW92ZWQgYW5kIHJlLWFkZGVkIHRvIGFycmF5P1xuXG4gICAgZnVuY3Rpb24gYWRkVGFza0RhdGEgKG9iaiwgcGFyZW50KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBgJHtrZXl9OiAke29ialtrZXldfWA7XG4gICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCBmaWVsZCksIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUYXNrOiBjcmVhdGVUYXNrLFxuICAgICAgICBhc3NpZ25UYXNrOiBhc3NpZ25UYXNrLFxuICAgICAgICBhZGRUYXNrRGF0YTogYWRkVGFza0RhdGEsXG4gICAgICAgIGFwcGVuZFRhc2s6IGFwcGVuZFRhc2ssXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tICcuL3Rhc2tzLmpzJ1xuaW1wb3J0IHttb2RhbE1vZH0gZnJvbSAnLi9tb2RhbC5qcydcblxuY29uc3QgbG9hZFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGh0bWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJyNjb250ZW50JylcblxuICAgIGNvbnN0IGhlYWRlckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnaGVhZGVyJywgJ2RpdicpO1xuICAgIGNvbnN0IHNpZGViYXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ3NpZGViYXInLCAnZGl2Jyk7XG4gICAgY29uc3QgZGlzcGxheUNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZGlzcGxheScsICdkaXYnKTtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2dyaWQnLCAnZGl2Jyk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MIChoZWFkZXJDb250ZW50LCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoZ3JpZENvbnRhaW5lciwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChkaXNwbGF5Q29udGVudCwgZ3JpZENvbnRhaW5lcik7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMicsICdUbyBEbyBMaXN0JyksIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50IFxuICAgICAgICAoJ2J1dHRvbicsICdBZGQgUHJvamVjdCcsICdhZGQtcHJvamVjdCcpLCBoZWFkZXJDb250ZW50KTtcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFRhc2snLCAnYWRkLXRhc2snKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRUYXNrQnRuLCBoZWFkZXJDb250ZW50KTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2RpdicsICdQcm9qZWN0cycpLCBzaWRlYmFyQ29udGVudCk7XG5cbiAgICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuICAgIGNvbnN0IHRhc2tzID0gW107XG4gICAgY29uc3QgY2xlYW4gPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdDbGVhbicsICdjbGVhbiB5b3VyIHJvb20nLCBEYXRlKCksICdMb3cnLCB0YXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoY2xlYW4sIHRhc2tzKTtcbiAgICBjb25zdCBzdXJmID0gdGFza01vZC5jcmVhdGVUYXNrICgnU3VyZicsICdoaWdoIHRpZGUgYXQgM1BNJywgRGF0ZSgpLCAnSGlnaCcsIHRhc2tzLmxlbmd0aCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChzdXJmLCB0YXNrcyk7XG5cbiAgICBjb25zdCB0b2RheSA9IHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ1RvZGF5JywgdGFza3MpO1xuXG4gICAgdXNlRE9NLmFwcGVuZFByb2ogKHRvZGF5LCBzaWRlYmFyQ29udGVudCwgJ2RpdicpO1xuICAgIHVzZURPTS5yZW5kZXJEaXNwbGF5ICh0b2RheSwgZGlzcGxheUNvbnRlbnQpO1xuXG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGFkZFRhc2tCdG4sICdjbGljaycsICgpID0+IG1vZGFsTW9kLnNob3dNb2RhbCgpKTtcbiAgICBcbn0pKCk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==