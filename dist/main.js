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
        useDOM.appendAllTasks (project.taskList, displayContent, 'div');
    }

    function renderSidebar (projArr, location, element) {
        projArr.forEach(project => appendProj (project, location, element));
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
        renderSidebar: renderSidebar,
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
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects */ "./src/projects.js");
/* harmony import */ var _tasks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks */ "./src/tasks.js");

;



const modalMod = (function () {

    const dialog = document.querySelector ('dialog');
    const inputs = dialog.querySelectorAll ('input');
    const select = dialog.querySelector ('select');

    function showModal () {
        
        dialog.showModal();
    }

    function createProjectOptions () {
        let i = 0;
        _projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.forEach(project => {
            const option = _dom__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('option', project.title);
            _dom__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (option, select);
            i += 1;
    });
    }

    function confirmTask (event, parent) {
        event.preventDefault ();
        const project = findSelectedProj ();
        _tasks__WEBPACK_IMPORTED_MODULE_2__.taskMod.addToProject (project.taskList, createTask (inputs), project, parent);
        closeModal (inputs);
    }

    function getSelectedProj () {
        return dialog.querySelector ('select').value;
    }

    function findSelectedProj () {
        const selectedProj = getSelectedProj ();
        for (let i = 0; i < _projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.length; i++) {
            if (_projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects[i].title === selectedProj) {
                return _projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects[i];
            }
        }
    };

    function sortInputs (inputArr) {
        const objArr = [];
        inputArr.forEach(input => objArr.push (input.value));
        return objArr;
    }

    function createTask (inputArr) {
        const inputValues = sortInputs(inputArr);
        const newTask = _tasks__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask(inputValues[0]);
        return newTask;
    }

    function closeModal () {
        inputs.forEach(input => input.value = '');
        dialog.close();
    }

    function removeProjOptions () {
        const options = dialog.querySelectorAll('option');
        options.forEach(option => option.remove());
    }

    return {
        showModal: showModal,
        confirmTask: confirmTask,
        createProjectOptions: createProjectOptions,
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

    function createProject (title, taskList) {
        return {title, taskList}
    }

    return {
        createProject: createProject,
        projects,
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

    function addToProject (taskArr, taskObj, project, parent) {
        taskArr.push (taskObj);
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.deleteDisplay ();
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (project, parent);
    }

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

    const headerContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('header', 'div');
    const sidebarContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('sidebar', 'div');
    const gridContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createContainer ('grid', 'div');

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (headerContent, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (gridContainer, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (sidebarContent, gridContainer);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('h2', 'To Do List'), headerContent);

    const addProjBtn = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createClassTextElement ('button', 'Add Project', 'add-project');
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (addProjBtn, headerContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (addProjBtn, 'click', () => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.showModal());

    const addTaskBtn = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createClassTextElement ('button', 'Add Task', 'add-task');
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (addTaskBtn, headerContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (addTaskBtn, 'click', () => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.showModal());

    const confirmBtn = document.querySelector("#confirmBtn");
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (confirmBtn, 'click', (event) => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.confirmTask 
    (event, gridContainer));

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('h3', 'Projects'), sidebarContent);

    const todayTasks = [];
    const clean = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', todayTasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (clean, todayTasks);
    const surf = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', todayTasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (surf, todayTasks);

    const moroccoTasks = [];
    const cook = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Cook', 'tagine', Date(), 'Medium', moroccoTasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (cook, moroccoTasks);

    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.push (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject ('Morocco', moroccoTasks));
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.push (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject ('Today', todayTasks));

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects[0], gridContainer);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderSidebar (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects, sidebarContent, 'div')

    //need to re-render this after a new projec is added
    //cross this bridge when working on add proj btn
    _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.createProjectOptions (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRDtBQUNBLElBQUksMkNBQU0sNkNBQTZDLCtDQUFRO0FBQy9EOztBQUVBLElBQUksMkNBQU0sWUFBWSwyQ0FBTTs7QUFFNUI7QUFDQSxrQkFBa0IsOENBQU87QUFDekIsSUFBSSw4Q0FBTztBQUNYLGlCQUFpQiw4Q0FBTztBQUN4QixJQUFJLDhDQUFPOztBQUVYO0FBQ0EsaUJBQWlCLDhDQUFPO0FBQ3hCLElBQUksOENBQU87O0FBRVgsSUFBSSxvREFBVSxnQkFBZ0Isb0RBQVU7QUFDeEMsSUFBSSxvREFBVSxnQkFBZ0Isb0RBQVU7O0FBRXhDLElBQUksMkNBQU0sZ0JBQWdCLG9EQUFVO0FBQ3BDLElBQUksMkNBQU0sZ0JBQWdCLG9EQUFVOztBQUVwQztBQUNBO0FBQ0EsSUFBSSwrQ0FBUSx1QkFBdUIsb0RBQVU7QUFDN0M7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHt1c2VET019IFxuaW1wb3J0IHsgdGFza01vZCB9IGZyb20gXCIuL3Rhc2tzLmpzXCI7XG5cbmNvbnN0IHVzZURPTSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoZWxlbWVudCwgdGV4dCwgY3NzQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb0hUTUwgKGVsZW1lbnQsIHBhcmVudCkge1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyIChjc3NDbGFzcywgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2ogKG9iaiwgbG9jYXRpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCBvYmoudGl0bGUpXG4gICAgICAgIGFkZFRvSFRNTCAobmV3RWxlbWVudCwgbG9jYXRpb24pO1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRBbGxUYXNrcyAodGFza0FyciwgbG9jYXRpb24pIHtcbiAgICAgICAgdGFza0Fyci5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFwcGVuZFByb2ogKHRhc2ssIGxvY2F0aW9uLCAnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrRGV0YWlscyA9IGNyZWF0ZUhpZGRlbkRldGFpbHMgKHRhc2ssIGVsZW1lbnQpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAoZWxlbWVudCwgJ2NsaWNrJywgKCkgPT4gdG9nZ2xlRGV0YWlscyAodGFzaywgdGFza0RldGFpbHMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyAoZWxlbWVudCwgZXZlbnQsIGFjdGlvbikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGV0YWlscyAob2JqLCBlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhpZGRlbkRldGFpbHMgKG9iaiwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2FjdGl2ZScsICdkaXYnKTtcbiAgICAgICAgYWN0aXZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAoYWN0aXZlLCBsb2NhdGlvbik7XG4gICAgICAgIHRhc2tNb2QuYWRkVGFza0RhdGEgKG9iaiwgYWN0aXZlKTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheUNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZGlzcGxheScsICdkaXYnKTtcbiAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAoZGlzcGxheUNvbnRlbnQsIHBhcmVudCk7XG5cbiAgICAgICAgdXNlRE9NLmFwcGVuZFByb2ogKHByb2plY3QsIGRpc3BsYXlDb250ZW50LCAnaDMnKTtcbiAgICAgICAgdXNlRE9NLmFwcGVuZEFsbFRhc2tzIChwcm9qZWN0LnRhc2tMaXN0LCBkaXNwbGF5Q29udGVudCwgJ2RpdicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclNpZGViYXIgKHByb2pBcnIsIGxvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIHByb2pBcnIuZm9yRWFjaChwcm9qZWN0ID0+IGFwcGVuZFByb2ogKHByb2plY3QsIGxvY2F0aW9uLCBlbGVtZW50KSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGRlbGV0ZURpc3BsYXkgKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLmRpc3BsYXknKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUZXh0RWxlbWVudDogY3JlYXRlVGV4dEVsZW1lbnQsXG4gICAgICAgIGFkZFRvSFRNTDogYWRkVG9IVE1MLFxuICAgICAgICBjcmVhdGVDb250YWluZXIsIGNyZWF0ZUNvbnRhaW5lcixcbiAgICAgICAgYXBwZW5kUHJvajogYXBwZW5kUHJvaixcbiAgICAgICAgYXBwZW5kQWxsVGFza3M6IGFwcGVuZEFsbFRhc2tzLFxuICAgICAgICBjcmVhdGVDbGFzc1RleHRFbGVtZW50OiBjcmVhdGVDbGFzc1RleHRFbGVtZW50LFxuICAgICAgICBiaW5kRXZlbnRzOiBiaW5kRXZlbnRzLFxuICAgICAgICByZW5kZXJEaXNwbGF5OiByZW5kZXJEaXNwbGF5LFxuICAgICAgICBkZWxldGVEaXNwbGF5OiBkZWxldGVEaXNwbGF5LFxuICAgICAgICByZW5kZXJTaWRlYmFyOiByZW5kZXJTaWRlYmFyLFxuICAgIH1cblxufSkoKTsiLCJleHBvcnQge21vZGFsTW9kfVxuaW1wb3J0IHsgdXNlRE9NIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IG1vZGFsTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IGRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCdkaWFsb2cnKTtcbiAgICBjb25zdCBpbnB1dHMgPSBkaWFsb2cucXVlcnlTZWxlY3RvckFsbCAoJ2lucHV0Jyk7XG4gICAgY29uc3Qgc2VsZWN0ID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCdzZWxlY3QnKTtcblxuICAgIGZ1bmN0aW9uIHNob3dNb2RhbCAoKSB7XG4gICAgICAgIFxuICAgICAgICBkaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdE9wdGlvbnMgKCkge1xuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHByb2plY3RNb2QucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ29wdGlvbicsIHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAob3B0aW9uLCBzZWxlY3QpO1xuICAgICAgICAgICAgaSArPSAxO1xuICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpcm1UYXNrIChldmVudCwgcGFyZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ICgpO1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZmluZFNlbGVjdGVkUHJvaiAoKTtcbiAgICAgICAgdGFza01vZC5hZGRUb1Byb2plY3QgKHByb2plY3QudGFza0xpc3QsIGNyZWF0ZVRhc2sgKGlucHV0cyksIHByb2plY3QsIHBhcmVudCk7XG4gICAgICAgIGNsb3NlTW9kYWwgKGlucHV0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgcmV0dXJuIGRpYWxvZy5xdWVyeVNlbGVjdG9yICgnc2VsZWN0JykudmFsdWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFNlbGVjdGVkUHJvaiAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvaiA9IGdldFNlbGVjdGVkUHJvaiAoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TW9kLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdE1vZC5wcm9qZWN0c1tpXS50aXRsZSA9PT0gc2VsZWN0ZWRQcm9qKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3RNb2QucHJvamVjdHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc29ydElucHV0cyAoaW5wdXRBcnIpIHtcbiAgICAgICAgY29uc3Qgb2JqQXJyID0gW107XG4gICAgICAgIGlucHV0QXJyLmZvckVhY2goaW5wdXQgPT4gb2JqQXJyLnB1c2ggKGlucHV0LnZhbHVlKSk7XG4gICAgICAgIHJldHVybiBvYmpBcnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAoaW5wdXRBcnIpIHtcbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZXMgPSBzb3J0SW5wdXRzKGlucHV0QXJyKTtcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHRhc2tNb2QuY3JlYXRlVGFzayhpbnB1dFZhbHVlc1swXSk7XG4gICAgICAgIHJldHVybiBuZXdUYXNrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwgKCkge1xuICAgICAgICBpbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICAgICAgZGlhbG9nLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvak9wdGlvbnMgKCkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0gZGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwoJ29wdGlvbicpO1xuICAgICAgICBvcHRpb25zLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5yZW1vdmUoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd01vZGFsOiBzaG93TW9kYWwsXG4gICAgICAgIGNvbmZpcm1UYXNrOiBjb25maXJtVGFzayxcbiAgICAgICAgY3JlYXRlUHJvamVjdE9wdGlvbnM6IGNyZWF0ZVByb2plY3RPcHRpb25zLFxuICAgIH1cblxufSkoKTsiLCJleHBvcnQge3Byb2plY3RNb2R9O1xuXG5jb25zdCBwcm9qZWN0TW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHByb2plY3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0ICh0aXRsZSwgdGFza0xpc3QpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgdGFza0xpc3R9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdDogY3JlYXRlUHJvamVjdCxcbiAgICAgICAgcHJvamVjdHMsXG4gICAgfVxufSkoKTsiLCJleHBvcnQge3Rhc2tNb2R9O1xuaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuXG5cbmNvbnN0IHRhc2tNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBpZH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3NpZ25UYXNrICh0YXNrT2JqLCB0YXNrQXJyKSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCh0YXNrT2JqKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb1Byb2plY3QgKHRhc2tBcnIsIHRhc2tPYmosIHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICB0YXNrQXJyLnB1c2ggKHRhc2tPYmopO1xuICAgICAgICB1c2VET00uZGVsZXRlRGlzcGxheSAoKTtcbiAgICAgICAgdXNlRE9NLnJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFza0RhdGEgKG9iaiwgcGFyZW50KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBgJHtrZXl9OiAke29ialtrZXldfWA7XG4gICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCBmaWVsZCksIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUYXNrOiBjcmVhdGVUYXNrLFxuICAgICAgICBhc3NpZ25UYXNrOiBhc3NpZ25UYXNrLFxuICAgICAgICBhZGRUYXNrRGF0YTogYWRkVGFza0RhdGEsXG4gICAgICAgIGFkZFRvUHJvamVjdDogYWRkVG9Qcm9qZWN0LFxuICAgIH1cblxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7dGFza01vZH0gZnJvbSAnLi90YXNrcy5qcydcbmltcG9ydCB7bW9kYWxNb2R9IGZyb20gJy4vbW9kYWwuanMnXG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBodG1sQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcjY29udGVudCcpXG5cbiAgICBjb25zdCBoZWFkZXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2hlYWRlcicsICdkaXYnKTtcbiAgICBjb25zdCBzaWRlYmFyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdzaWRlYmFyJywgJ2RpdicpO1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZ3JpZCcsICdkaXYnKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKGhlYWRlckNvbnRlbnQsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChncmlkQ29udGFpbmVyLCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoc2lkZWJhckNvbnRlbnQsIGdyaWRDb250YWluZXIpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDInLCAnVG8gRG8gTGlzdCcpLCBoZWFkZXJDb250ZW50KTtcblxuICAgIGNvbnN0IGFkZFByb2pCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgUHJvamVjdCcsICdhZGQtcHJvamVjdCcpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFByb2pCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRQcm9qQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93TW9kYWwoKSk7XG5cbiAgICBjb25zdCBhZGRUYXNrQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFRhc2snLCAnYWRkLXRhc2snKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRUYXNrQnRuLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoYWRkVGFza0J0biwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2Quc2hvd01vZGFsKCkpO1xuXG4gICAgY29uc3QgY29uZmlybUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybUJ0blwiKTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybUJ0biwgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtVGFzayBcbiAgICAoZXZlbnQsIGdyaWRDb250YWluZXIpKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2gzJywgJ1Byb2plY3RzJyksIHNpZGViYXJDb250ZW50KTtcblxuICAgIGNvbnN0IHRvZGF5VGFza3MgPSBbXTtcbiAgICBjb25zdCBjbGVhbiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0NsZWFuJywgJ2NsZWFuIHlvdXIgcm9vbScsIERhdGUoKSwgJ0xvdycsIHRvZGF5VGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKGNsZWFuLCB0b2RheVRhc2tzKTtcbiAgICBjb25zdCBzdXJmID0gdGFza01vZC5jcmVhdGVUYXNrICgnU3VyZicsICdoaWdoIHRpZGUgYXQgM1BNJywgRGF0ZSgpLCAnSGlnaCcsIHRvZGF5VGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKHN1cmYsIHRvZGF5VGFza3MpO1xuXG4gICAgY29uc3QgbW9yb2Njb1Rhc2tzID0gW107XG4gICAgY29uc3QgY29vayA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0Nvb2snLCAndGFnaW5lJywgRGF0ZSgpLCAnTWVkaXVtJywgbW9yb2Njb1Rhc2tzLmxlbmd0aCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChjb29rLCBtb3JvY2NvVGFza3MpO1xuXG4gICAgcHJvamVjdE1vZC5wcm9qZWN0cy5wdXNoIChwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdNb3JvY2NvJywgbW9yb2Njb1Rhc2tzKSk7XG4gICAgcHJvamVjdE1vZC5wcm9qZWN0cy5wdXNoIChwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdUb2RheScsIHRvZGF5VGFza3MpKTtcblxuICAgIHVzZURPTS5yZW5kZXJEaXNwbGF5IChwcm9qZWN0TW9kLnByb2plY3RzWzBdLCBncmlkQ29udGFpbmVyKTtcbiAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgc2lkZWJhckNvbnRlbnQsICdkaXYnKVxuXG4gICAgLy9uZWVkIHRvIHJlLXJlbmRlciB0aGlzIGFmdGVyIGEgbmV3IHByb2plYyBpcyBhZGRlZFxuICAgIC8vY3Jvc3MgdGhpcyBicmlkZ2Ugd2hlbiB3b3JraW5nIG9uIGFkZCBwcm9qIGJ0blxuICAgIG1vZGFsTW9kLmNyZWF0ZVByb2plY3RPcHRpb25zIChwcm9qZWN0TW9kLnByb2plY3RzKTtcbiAgICBcbn0pKCk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==