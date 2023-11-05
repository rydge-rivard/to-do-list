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

    function appendAllTasks (taskArr, location) {
        taskArr.forEach(task => {
            const element = appendProj (task, location, 'div');
            const taskDetails = createHiddenDetails (task, element);
            bindEvents (element, 'click', () => toggleDetails (task, taskDetails));
        });
    }

    function bindEvents (element, event, action) {
        element.addEventListener(event, action);
    }

    function toggleDetails (obj, element) {
        if (element.style.display === 'none') {
            element.style.display = 'block';
        } else {
            element.style.display = 'none';
        }
    }

    function createHiddenDetails (obj, location) {
        const active = useDOM.createContainer ('active', 'div');
        active.style.display = "none";
        useDOM.addToHTML (active, location);
        _tasks_js__WEBPACK_IMPORTED_MODULE_0__.taskMod.addTaskData (obj, active);
        return active;
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

    const dialog = document.querySelector('dialog');
    const inputs = dialog.querySelectorAll('input');

    function showModal () {
        console.log('click')
        dialog.showModal();
    }

    function confirmTask (event, taskArr, project, parent) {
        event.preventDefault();
        _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMod.addToProject (taskArr, createTask (inputs), project, parent)
        closeModal (inputs);
    }

    function sortInputs (inputArr) {
        const objArr = [];
        inputArr.forEach(input => objArr.push (input.value));
        return objArr;
    }

    function createTask (inputArr) {
        const inputValues = sortInputs(inputArr);
        const newTask = _tasks__WEBPACK_IMPORTED_MODULE_1__.taskMod.createTask(inputValues[0]);
        return newTask;
    }

    function closeModal () {
        inputs.forEach(input => input.value = '');
        dialog.close();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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NkMsK0NBQVE7QUFDL0Q7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3VzZURPTX0gXG5pbXBvcnQgeyB0YXNrTW9kIH0gZnJvbSBcIi4vdGFza3MuanNcIjtcblxuY29uc3QgdXNlRE9NID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgdGV4dCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzc1RleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0LCBjc3NDbGFzcykge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvSFRNTCAoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIgKGNzc0NsYXNzLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvaiAob2JqLCBsb2NhdGlvbiwgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIG9iai50aXRsZSlcbiAgICAgICAgYWRkVG9IVE1MIChuZXdFbGVtZW50LCBsb2NhdGlvbik7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEFsbFRhc2tzICh0YXNrQXJyLCBsb2NhdGlvbikge1xuICAgICAgICB0YXNrQXJyLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXBwZW5kUHJvaiAodGFzaywgbG9jYXRpb24sICdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEZXRhaWxzID0gY3JlYXRlSGlkZGVuRGV0YWlscyAodGFzaywgZWxlbWVudCk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChlbGVtZW50LCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCB0YXNrRGV0YWlscykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzIChlbGVtZW50LCBldmVudCwgYWN0aW9uKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVEZXRhaWxzIChvYmosIGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSGlkZGVuRGV0YWlscyAob2JqLCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnYWN0aXZlJywgJ2RpdicpO1xuICAgICAgICBhY3RpdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB1c2VET00uYWRkVG9IVE1MIChhY3RpdmUsIGxvY2F0aW9uKTtcbiAgICAgICAgdGFza01vZC5hZGRUYXNrRGF0YSAob2JqLCBhY3RpdmUpO1xuICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICBjb25zdCBkaXNwbGF5Q29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdkaXNwbGF5JywgJ2RpdicpO1xuICAgICAgICB1c2VET00uYWRkVG9IVE1MIChkaXNwbGF5Q29udGVudCwgcGFyZW50KTtcblxuICAgICAgICB1c2VET00uYXBwZW5kUHJvaiAocHJvamVjdCwgZGlzcGxheUNvbnRlbnQsICdoMycpO1xuICAgICAgICB1c2VET00uYXBwZW5kQWxsVGFza3MgKHByb2plY3QudGFza3MsIGRpc3BsYXlDb250ZW50LCAnZGl2Jyk7XG4gICAgfVxuXG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZXRlRGlzcGxheSAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcuZGlzcGxheScpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRleHRFbGVtZW50OiBjcmVhdGVUZXh0RWxlbWVudCxcbiAgICAgICAgYWRkVG9IVE1MOiBhZGRUb0hUTUwsXG4gICAgICAgIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQ29udGFpbmVyLFxuICAgICAgICBhcHBlbmRQcm9qOiBhcHBlbmRQcm9qLFxuICAgICAgICBhcHBlbmRBbGxUYXNrczogYXBwZW5kQWxsVGFza3MsXG4gICAgICAgIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQ6IGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQsXG4gICAgICAgIGJpbmRFdmVudHM6IGJpbmRFdmVudHMsXG4gICAgICAgIHJlbmRlckRpc3BsYXk6IHJlbmRlckRpc3BsYXksXG4gICAgICAgIGRlbGV0ZURpc3BsYXk6IGRlbGV0ZURpc3BsYXksXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7bW9kYWxNb2R9XG5pbXBvcnQge3VzZURPTX0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IG1vZGFsTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2RpYWxvZycpO1xuICAgIGNvbnN0IGlucHV0cyA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dCcpO1xuXG4gICAgZnVuY3Rpb24gc2hvd01vZGFsICgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NsaWNrJylcbiAgICAgICAgZGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpcm1UYXNrIChldmVudCwgdGFza0FyciwgcHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHRhc2tNb2QuYWRkVG9Qcm9qZWN0ICh0YXNrQXJyLCBjcmVhdGVUYXNrIChpbnB1dHMpLCBwcm9qZWN0LCBwYXJlbnQpXG4gICAgICAgIGNsb3NlTW9kYWwgKGlucHV0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc29ydElucHV0cyAoaW5wdXRBcnIpIHtcbiAgICAgICAgY29uc3Qgb2JqQXJyID0gW107XG4gICAgICAgIGlucHV0QXJyLmZvckVhY2goaW5wdXQgPT4gb2JqQXJyLnB1c2ggKGlucHV0LnZhbHVlKSk7XG4gICAgICAgIHJldHVybiBvYmpBcnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAoaW5wdXRBcnIpIHtcbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZXMgPSBzb3J0SW5wdXRzKGlucHV0QXJyKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHRhc2tNb2QuY3JlYXRlVGFzayhpbnB1dFZhbHVlc1swXSk7XG4gICAgICAgIHJldHVybiBuZXdUYXNrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwgKCkge1xuICAgICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICAgICAgZGlhbG9nLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgLy9yZXR1cm4gYW4gb2JqZWN0IHRvIHB1c2ggdG8gYXJyYXkgaW4gaW5kZXhcbiAgICAgICAgc2hvd01vZGFsOiBzaG93TW9kYWwsXG4gICAgICAgIGNvbmZpcm1UYXNrOiBjb25maXJtVGFzayxcbiAgICB9XG5cbn0pKCk7IiwiZXhwb3J0IHtwcm9qZWN0TW9kfTtcblxuY29uc3QgcHJvamVjdE1vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0ICh0aXRsZSwgdGFza3MpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgdGFza3N9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdDogY3JlYXRlUHJvamVjdCxcbiAgICB9XG59KSgpOyIsImV4cG9ydCB7dGFza01vZH07XG5pbXBvcnQge3VzZURPTX0gZnJvbSAnLi9kb20uanMnXG5cblxuY29uc3QgdGFza01vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBpZCkge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGlkfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2lnblRhc2sgKHRhc2tPYmosIHRhc2tBcnIpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoKHRhc2tPYmopO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZFRhc2sgKHRhc2ssIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IGVsZW1lbnQgPSB1c2VET00uYXBwZW5kUHJvaiAodGFzaywgbG9jYXRpb24sICdkaXYnKTtcbiAgICAgICAgcmV0dXJuIGVsZW1lbnQ7XG4gICAgICAgIC8vIGJpbmRFdmVudHMgKGVsZW1lbnQsICdjbGljaycsICgpID0+IHRvZ2dsZURldGFpbHMgKHRhc2ssIGVsZW1lbnQpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb1Byb2plY3QgKHRhc2tBcnIsIHRhc2tPYmosIHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICB0YXNrQXJyLnB1c2ggKHRhc2tPYmopO1xuICAgICAgICB1c2VET00uZGVsZXRlRGlzcGxheSAoKTtcbiAgICAgICAgdXNlRE9NLnJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgLy9jcmVhdGUgY29udGVudCBkaXZzIG9uIHRhc2sgY3JlYXRlIHRoYXQgYXJlIGRpc3BsYXkgPSBub25lXG4gICAgLy90b2dnbGUgZGlzcGxheSA9IGJsb2NrIG9uIGNsaWNrXG4gICAgLy9vbiB0YXNrIGVkaXQsIHRoZSBpdGVtIGlzIHJlbW92ZWQgYW5kIHJlLWFkZGVkIHRvIGFycmF5P1xuXG4gICAgZnVuY3Rpb24gYWRkVGFza0RhdGEgKG9iaiwgcGFyZW50KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBgJHtrZXl9OiAke29ialtrZXldfWA7XG4gICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCBmaWVsZCksIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUYXNrOiBjcmVhdGVUYXNrLFxuICAgICAgICBhc3NpZ25UYXNrOiBhc3NpZ25UYXNrLFxuICAgICAgICBhZGRUYXNrRGF0YTogYWRkVGFza0RhdGEsXG4gICAgICAgIGFwcGVuZFRhc2s6IGFwcGVuZFRhc2ssXG4gICAgICAgIGFkZFRvUHJvamVjdDogYWRkVG9Qcm9qZWN0LFxuICAgIH1cblxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7dGFza01vZH0gZnJvbSAnLi90YXNrcy5qcydcbmltcG9ydCB7bW9kYWxNb2R9IGZyb20gJy4vbW9kYWwuanMnXG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBodG1sQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcjY29udGVudCcpXG4gICAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybUJ0blwiKTtcblxuICAgIGNvbnN0IGhlYWRlckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnaGVhZGVyJywgJ2RpdicpO1xuICAgIGNvbnN0IHNpZGViYXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ3NpZGViYXInLCAnZGl2Jyk7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdncmlkJywgJ2RpdicpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoaGVhZGVyQ29udGVudCwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGdyaWRDb250YWluZXIsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcik7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMicsICdUbyBEbyBMaXN0JyksIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50IFxuICAgICAgICAoJ2J1dHRvbicsICdBZGQgUHJvamVjdCcsICdhZGQtcHJvamVjdCcpLCBoZWFkZXJDb250ZW50KTtcbiAgICBjb25zdCBhZGRUYXNrQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFRhc2snLCAnYWRkLXRhc2snKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRUYXNrQnRuLCBoZWFkZXJDb250ZW50KTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2RpdicsICdQcm9qZWN0cycpLCBzaWRlYmFyQ29udGVudCk7XG5cbiAgICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuICAgIGNvbnN0IHRhc2tzID0gW107XG4gICAgY29uc3QgY2xlYW4gPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdDbGVhbicsICdjbGVhbiB5b3VyIHJvb20nLCBEYXRlKCksICdMb3cnLCB0YXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoY2xlYW4sIHRhc2tzKTtcbiAgICBjb25zdCBzdXJmID0gdGFza01vZC5jcmVhdGVUYXNrICgnU3VyZicsICdoaWdoIHRpZGUgYXQgM1BNJywgRGF0ZSgpLCAnSGlnaCcsIHRhc2tzLmxlbmd0aCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChzdXJmLCB0YXNrcyk7XG5cbiAgICBjb25zdCB0b2RheSA9IHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ1RvZGF5JywgdGFza3MpO1xuXG4gICAgdXNlRE9NLmFwcGVuZFByb2ogKHRvZGF5LCBzaWRlYmFyQ29udGVudCwgJ2RpdicpO1xuICAgIHVzZURPTS5yZW5kZXJEaXNwbGF5ICh0b2RheSwgZ3JpZENvbnRhaW5lcik7XG5cbiAgICB1c2VET00uYmluZEV2ZW50cyAoYWRkVGFza0J0biwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2Quc2hvd01vZGFsKCkpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtQnRuLCAnY2xpY2snLCAoZXZlbnQpID0+IG1vZGFsTW9kLmNvbmZpcm1UYXNrIChldmVudCxcbiAgICAgICAgIHRhc2tzLCB0b2RheSwgZ3JpZENvbnRhaW5lcikpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9