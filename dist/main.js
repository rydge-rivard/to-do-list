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
        const displayContent = useDOM.createContainer ('display', 'div');
        useDOM.addToHTML (displayContent, parent);

        useDOM.appendProj (project, displayContent, 'h3');
        useDOM.appendAllTasks (project.tasks, displayContent, 'div');
    }

    
    function deleteDisplay () {
        document.querySelector ('.display').remove();
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
        deleteDisplay: deleteDisplay,
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
    

    function showModal () {
        console.log('click')
        dialog.showModal();
    }

    function confirmTask (event, taskArr, project, parent) {
        event.preventDefault();
        let newTask = createTask ();
        _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMod.addToProject (taskArr, newTask, project, parent)
        return newTask;
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
        confirmTask: confirmTask,
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

    function addToProject (taskArr, taskObj, project, parent) {
        taskArr.push (taskObj);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.deleteDisplay ();
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (project, parent);
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
        addToProject: addToProject,
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
    const confirmBtn = document.querySelector("#confirmBtn");

    const headerContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('header', 'div');
    const sidebarContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('sidebar', 'div');
    const gridContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('grid', 'div');

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (headerContent, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (gridContainer, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (sidebarContent, gridContainer);

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
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (today, gridContainer);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (addTaskBtn, 'click', () => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.showModal());
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (confirmBtn, 'click', (event) => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.confirmTask (event,
         tasks, today, gridContainer));
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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L3RvLWRvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7dXNlRE9NfSBcbmltcG9ydCB7IHRhc2tNb2QgfSBmcm9tIFwiLi90YXNrcy5qc1wiO1xuXG5jb25zdCB1c2VET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQsIGNzc0NsYXNzKSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9IVE1MIChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoY3NzQ2xhc3MsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qIChvYmosIGxvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgb2JqLnRpdGxlKVxuICAgICAgICBhZGRUb0hUTUwgKG5ld0VsZW1lbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgLy9wb3RlbnRpYWxseSBzcGxpdCB0aGlzIGludG8gdGFza3MuanNcbiAgICBmdW5jdGlvbiBhcHBlbmRBbGxUYXNrcyAodGFza0FyciwgbG9jYXRpb24pIHtcbiAgICAgICAgdGFza0Fyci5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFwcGVuZFByb2ogKHRhc2ssIGxvY2F0aW9uLCAnZGl2Jyk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChlbGVtZW50LCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCBlbGVtZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMgKGVsZW1lbnQsIGV2ZW50LCBhY3Rpb24pIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhY3Rpb24pO1xuICAgIH1cblxuICAgIC8vY2lyY2xlIGJhY2sgdG8gdGhpcyBhbmQgc3BsaXQgZnVuY3Rpb24gaW50IHRhc2tzLmpzXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGV0YWlscyAob2JqLCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnYWN0aXZlJywgJ2RpdicpO1xuICAgICAgICB1c2VET00uYWRkVG9IVE1MIChhY3RpdmUsIGxvY2F0aW9uKTtcbiAgICAgICAgdGFza01vZC5hZGRUYXNrRGF0YSAob2JqLCBhY3RpdmUpO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICBjb25zdCBkaXNwbGF5Q29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdkaXNwbGF5JywgJ2RpdicpO1xuICAgICAgICB1c2VET00uYWRkVG9IVE1MIChkaXNwbGF5Q29udGVudCwgcGFyZW50KTtcblxuICAgICAgICB1c2VET00uYXBwZW5kUHJvaiAocHJvamVjdCwgZGlzcGxheUNvbnRlbnQsICdoMycpO1xuICAgICAgICB1c2VET00uYXBwZW5kQWxsVGFza3MgKHByb2plY3QudGFza3MsIGRpc3BsYXlDb250ZW50LCAnZGl2Jyk7XG4gICAgfVxuXG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZXRlRGlzcGxheSAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcuZGlzcGxheScpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRleHRFbGVtZW50OiBjcmVhdGVUZXh0RWxlbWVudCxcbiAgICAgICAgYWRkVG9IVE1MOiBhZGRUb0hUTUwsXG4gICAgICAgIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQ29udGFpbmVyLFxuICAgICAgICBhcHBlbmRQcm9qOiBhcHBlbmRQcm9qLFxuICAgICAgICBhcHBlbmRBbGxUYXNrczogYXBwZW5kQWxsVGFza3MsXG4gICAgICAgIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQ6IGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQsXG4gICAgICAgIGJpbmRFdmVudHM6IGJpbmRFdmVudHMsXG4gICAgICAgIHJlbmRlckRpc3BsYXk6IHJlbmRlckRpc3BsYXksXG4gICAgICAgIGRlbGV0ZURpc3BsYXk6IGRlbGV0ZURpc3BsYXksXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7bW9kYWxNb2R9XG5pbXBvcnQge3VzZURPTX0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IG1vZGFsTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpXG4gICAgXG5cbiAgICBmdW5jdGlvbiBzaG93TW9kYWwgKCkge1xuICAgICAgICBjb25zb2xlLmxvZygnY2xpY2snKVxuICAgICAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlybVRhc2sgKGV2ZW50LCB0YXNrQXJyLCBwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgbGV0IG5ld1Rhc2sgPSBjcmVhdGVUYXNrICgpO1xuICAgICAgICB0YXNrTW9kLmFkZFRvUHJvamVjdCAodGFza0FyciwgbmV3VGFzaywgcHJvamVjdCwgcGFyZW50KVxuICAgICAgICByZXR1cm4gbmV3VGFzaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzb3J0SW5wdXRzICgpIHtcbiAgICAgICAgY29uc3QgaW5wdXRzID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwoJ2lucHV0JylcbiAgICAgICAgY29uc3Qgb2JqQXJyID0gW107XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IG9iakFyci5wdXNoIChpbnB1dC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gb2JqQXJyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKCkge1xuICAgICAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHNvcnRJbnB1dHMoKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHRhc2tNb2QuY3JlYXRlVGFzayhpbnB1dFZhbHVlc1swXSk7XG4gICAgICAgIHJldHVybiBuZXdUYXNrO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIC8vcmV0dXJuIGFuIG9iamVjdCB0byBwdXNoIHRvIGFycmF5IGluIGluZGV4XG4gICAgICAgIHNob3dNb2RhbDogc2hvd01vZGFsLFxuICAgICAgICBjb25maXJtVGFzazogY29uZmlybVRhc2ssXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7cHJvamVjdE1vZH07XG5cbmNvbnN0IHByb2plY3RNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdCAodGl0bGUsIHRhc2tzKSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIHRhc2tzfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3Q6IGNyZWF0ZVByb2plY3QsXG4gICAgfVxufSkoKTsiLCJleHBvcnQge3Rhc2tNb2R9O1xuaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuXG5cbmNvbnN0IHRhc2tNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBpZH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3NpZ25UYXNrICh0YXNrT2JqLCB0YXNrQXJyKSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCh0YXNrT2JqKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRUYXNrICh0YXNrLCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBlbGVtZW50ID0gdXNlRE9NLmFwcGVuZFByb2ogKHRhc2ssIGxvY2F0aW9uLCAnZGl2Jyk7XG4gICAgICAgIHJldHVybiBlbGVtZW50O1xuICAgICAgICAvLyBiaW5kRXZlbnRzIChlbGVtZW50LCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCBlbGVtZW50KSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9Qcm9qZWN0ICh0YXNrQXJyLCB0YXNrT2JqLCBwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoICh0YXNrT2JqKTtcbiAgICAgICAgdXNlRE9NLmRlbGV0ZURpc3BsYXkgKCk7XG4gICAgICAgIHVzZURPTS5yZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vY3JlYXRlIGNvbnRlbnQgZGl2cyBvbiB0YXNrIGNyZWF0ZSB0aGF0IGFyZSBkaXNwbGF5ID0gbm9uZVxuICAgIC8vdG9nZ2xlIGRpc3BsYXkgPSBibG9jayBvbiBjbGlja1xuICAgIC8vb24gdGFzayBlZGl0LCB0aGUgaXRlbSBpcyByZW1vdmVkIGFuZCByZS1hZGRlZCB0byBhcnJheT9cblxuICAgIGZ1bmN0aW9uIGFkZFRhc2tEYXRhIChvYmosIHBhcmVudCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gYCR7a2V5fTogJHtvYmpba2V5XX1gO1xuICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgZmllbGQpLCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGFzazogY3JlYXRlVGFzayxcbiAgICAgICAgYXNzaWduVGFzazogYXNzaWduVGFzayxcbiAgICAgICAgYWRkVGFza0RhdGE6IGFkZFRhc2tEYXRhLFxuICAgICAgICBhcHBlbmRUYXNrOiBhcHBlbmRUYXNrLFxuICAgICAgICBhZGRUb1Byb2plY3Q6IGFkZFRvUHJvamVjdCxcbiAgICB9XG5cbn0pKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3VzZURPTX0gZnJvbSAnLi9kb20uanMnXG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gJy4vdGFza3MuanMnXG5pbXBvcnQge21vZGFsTW9kfSBmcm9tICcuL21vZGFsLmpzJ1xuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaHRtbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI2NvbnRlbnQnKVxuICAgIGNvbnN0IGNvbmZpcm1CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1CdG5cIik7XG5cbiAgICBjb25zdCBoZWFkZXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2hlYWRlcicsICdkaXYnKTtcbiAgICBjb25zdCBzaWRlYmFyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdzaWRlYmFyJywgJ2RpdicpO1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZ3JpZCcsICdkaXYnKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKGhlYWRlckNvbnRlbnQsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChncmlkQ29udGFpbmVyLCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoc2lkZWJhckNvbnRlbnQsIGdyaWRDb250YWluZXIpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDInLCAnVG8gRG8gTGlzdCcpLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCBcbiAgICAgICAgKCdidXR0b24nLCAnQWRkIFByb2plY3QnLCAnYWRkLXByb2plY3QnKSwgaGVhZGVyQ29udGVudCk7XG4gICAgY29uc3QgYWRkVGFza0J0biA9IHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50ICgnYnV0dG9uJywgJ0FkZCBUYXNrJywgJ2FkZC10YXNrJyk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoYWRkVGFza0J0biwgaGVhZGVyQ29udGVudCk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCAnUHJvamVjdHMnKSwgc2lkZWJhckNvbnRlbnQpO1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcbiAgICBjb25zdCB0YXNrcyA9IFtdO1xuICAgIGNvbnN0IGNsZWFuID0gdGFza01vZC5jcmVhdGVUYXNrICgnQ2xlYW4nLCAnY2xlYW4geW91ciByb29tJywgRGF0ZSgpLCAnTG93JywgdGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKGNsZWFuLCB0YXNrcyk7XG4gICAgY29uc3Qgc3VyZiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ1N1cmYnLCAnaGlnaCB0aWRlIGF0IDNQTScsIERhdGUoKSwgJ0hpZ2gnLCB0YXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoc3VyZiwgdGFza3MpO1xuXG4gICAgY29uc3QgdG9kYXkgPSBwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdUb2RheScsIHRhc2tzKTtcblxuICAgIHVzZURPTS5hcHBlbmRQcm9qICh0b2RheSwgc2lkZWJhckNvbnRlbnQsICdkaXYnKTtcbiAgICB1c2VET00ucmVuZGVyRGlzcGxheSAodG9kYXksIGdyaWRDb250YWluZXIpO1xuXG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGFkZFRhc2tCdG4sICdjbGljaycsICgpID0+IG1vZGFsTW9kLnNob3dNb2RhbCgpKTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybUJ0biwgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtVGFzayAoZXZlbnQsXG4gICAgICAgICB0YXNrcywgdG9kYXksIGdyaWRDb250YWluZXIpKTtcbiAgICBcbn0pKCk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==