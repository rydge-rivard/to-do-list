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
        // active.style.display = "none";
        useDOM.addToHTML (active, location);
        _tasks_js__WEBPACK_IMPORTED_MODULE_0__.taskMod.addTaskData (obj, active);
        return active;
    }

    function refreshDisplay (project, parent) {
        useDOM.deleteDisplay ();
        useDOM.renderDisplay (project, parent);
    }

    function renderDisplay (project, parent) {
        const displayContent = useDOM.createContainer ('display', 'div');
        useDOM.addToHTML (displayContent, parent);

        useDOM.appendProj (project, displayContent, 'h3');
        useDOM.appendAllTasks (project.taskList, displayContent, 'div');
    }

    function renderSidebar (projArr, location, element, displayParent) {
        projArr.forEach(proj => {
            const projDiv = appendProj (proj, location, element)
            bindEvents (projDiv, 'click', () => refreshDisplay (proj, displayParent));
        });
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
        refreshDisplay: refreshDisplay,
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

    const taskDialog = document.querySelector ('.task-dialog');
    const taskInputs = taskDialog.querySelectorAll ('input');
    const select = taskDialog.querySelector ('select');

    const projDialog = document.querySelector ('.proj-dialog')

    function showTaskModal () {
        taskDialog.showModal();
    }

    function showProjModal () {
        projDialog.showModal();
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
        _tasks__WEBPACK_IMPORTED_MODULE_2__.taskMod.addToProject (project.taskList, createTask (taskInputs), project, parent);
        closeModal (taskInputs);
    }

    function getSelectedProj () {
        return taskDialog.querySelector ('select').value;
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
        taskInputs.forEach(input => input.value = '');
        taskDialog.close();
    }

    function confirmProj (event, parent) {
        event.preventDefault ();
        console.log ('click')
        // const project = findSelectedProj ();
        // taskMod.addToProject (project.taskList, createTask (taskInputs), project, parent);
        // closeModal (taskInputs);
    }

    return {
        showTaskModal: showTaskModal,
        showProjModal: showProjModal,
        confirmTask: confirmTask,
        createProjectOptions: createProjectOptions,
        confirmProj, confirmProj,
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
        _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.refreshDisplay (project, parent);
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
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (addProjBtn, 'click', () => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.showProjModal());

    const addTaskBtn = _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createClassTextElement ('button', 'Add Task', 'add-task');
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (addTaskBtn, headerContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (addTaskBtn, 'click', () => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.showTaskModal());

    const confirmTask = document.querySelector("#confirmTask");
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (confirmTask, 'click', (event) => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.confirmTask 
    (event, gridContainer));

    const confirmProj = document.querySelector("#confirmProj");
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (confirmProj, 'click', (event) => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.confirmProj (event, parent));

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
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderSidebar (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects, sidebarContent, 'div', gridContainer)

    //need to re-render this after a new projec is added
    //cross this bridge when working on add proj btn
    _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.createProjectOptions (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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MkNBQU07QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRCx1QkFBdUIsMkNBQU07QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRDtBQUNBLElBQUksMkNBQU0sOENBQThDLCtDQUFRO0FBQ2hFOztBQUVBO0FBQ0EsSUFBSSwyQ0FBTSw4Q0FBOEMsK0NBQVE7O0FBRWhFLElBQUksMkNBQU0sWUFBWSwyQ0FBTTs7QUFFNUI7QUFDQSxrQkFBa0IsOENBQU87QUFDekIsSUFBSSw4Q0FBTztBQUNYLGlCQUFpQiw4Q0FBTztBQUN4QixJQUFJLDhDQUFPOztBQUVYO0FBQ0EsaUJBQWlCLDhDQUFPO0FBQ3hCLElBQUksOENBQU87O0FBRVgsSUFBSSxvREFBVSxnQkFBZ0Isb0RBQVU7QUFDeEMsSUFBSSxvREFBVSxnQkFBZ0Isb0RBQVU7O0FBRXhDLElBQUksMkNBQU0sZ0JBQWdCLG9EQUFVO0FBQ3BDLElBQUksMkNBQU0sZ0JBQWdCLG9EQUFVOztBQUVwQztBQUNBO0FBQ0EsSUFBSSwrQ0FBUSx1QkFBdUIsb0RBQVU7QUFDN0M7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHt1c2VET019IFxuaW1wb3J0IHsgdGFza01vZCB9IGZyb20gXCIuL3Rhc2tzLmpzXCI7XG5cbmNvbnN0IHVzZURPTSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoZWxlbWVudCwgdGV4dCwgY3NzQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb0hUTUwgKGVsZW1lbnQsIHBhcmVudCkge1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyIChjc3NDbGFzcywgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2ogKG9iaiwgbG9jYXRpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCBvYmoudGl0bGUpXG4gICAgICAgIGFkZFRvSFRNTCAobmV3RWxlbWVudCwgbG9jYXRpb24pO1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRBbGxUYXNrcyAodGFza0FyciwgbG9jYXRpb24pIHtcbiAgICAgICAgdGFza0Fyci5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFwcGVuZFByb2ogKHRhc2ssIGxvY2F0aW9uLCAnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrRGV0YWlscyA9IGNyZWF0ZUhpZGRlbkRldGFpbHMgKHRhc2ssIGVsZW1lbnQpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAoZWxlbWVudCwgJ2NsaWNrJywgKCkgPT4gdG9nZ2xlRGV0YWlscyAodGFzaywgdGFza0RldGFpbHMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyAoZWxlbWVudCwgZXZlbnQsIGFjdGlvbikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGV0YWlscyAob2JqLCBlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhpZGRlbkRldGFpbHMgKG9iaiwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2FjdGl2ZScsICdkaXYnKTtcbiAgICAgICAgLy8gYWN0aXZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAoYWN0aXZlLCBsb2NhdGlvbik7XG4gICAgICAgIHRhc2tNb2QuYWRkVGFza0RhdGEgKG9iaiwgYWN0aXZlKTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoRGlzcGxheSAocHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIHVzZURPTS5kZWxldGVEaXNwbGF5ICgpO1xuICAgICAgICB1c2VET00ucmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheUNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZGlzcGxheScsICdkaXYnKTtcbiAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAoZGlzcGxheUNvbnRlbnQsIHBhcmVudCk7XG5cbiAgICAgICAgdXNlRE9NLmFwcGVuZFByb2ogKHByb2plY3QsIGRpc3BsYXlDb250ZW50LCAnaDMnKTtcbiAgICAgICAgdXNlRE9NLmFwcGVuZEFsbFRhc2tzIChwcm9qZWN0LnRhc2tMaXN0LCBkaXNwbGF5Q29udGVudCwgJ2RpdicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlclNpZGViYXIgKHByb2pBcnIsIGxvY2F0aW9uLCBlbGVtZW50LCBkaXNwbGF5UGFyZW50KSB7XG4gICAgICAgIHByb2pBcnIuZm9yRWFjaChwcm9qID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2pEaXYgPSBhcHBlbmRQcm9qIChwcm9qLCBsb2NhdGlvbiwgZWxlbWVudClcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKHByb2pEaXYsICdjbGljaycsICgpID0+IHJlZnJlc2hEaXNwbGF5IChwcm9qLCBkaXNwbGF5UGFyZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBkZWxldGVEaXNwbGF5ICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy5kaXNwbGF5JykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGV4dEVsZW1lbnQ6IGNyZWF0ZVRleHRFbGVtZW50LFxuICAgICAgICBhZGRUb0hUTUw6IGFkZFRvSFRNTCxcbiAgICAgICAgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVDb250YWluZXIsXG4gICAgICAgIGFwcGVuZFByb2o6IGFwcGVuZFByb2osXG4gICAgICAgIGFwcGVuZEFsbFRhc2tzOiBhcHBlbmRBbGxUYXNrcyxcbiAgICAgICAgY3JlYXRlQ2xhc3NUZXh0RWxlbWVudDogY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCxcbiAgICAgICAgYmluZEV2ZW50czogYmluZEV2ZW50cyxcbiAgICAgICAgcmVuZGVyRGlzcGxheTogcmVuZGVyRGlzcGxheSxcbiAgICAgICAgZGVsZXRlRGlzcGxheTogZGVsZXRlRGlzcGxheSxcbiAgICAgICAgcmVuZGVyU2lkZWJhcjogcmVuZGVyU2lkZWJhcixcbiAgICAgICAgcmVmcmVzaERpc3BsYXk6IHJlZnJlc2hEaXNwbGF5LFxuICAgIH1cblxufSkoKTsiLCJleHBvcnQge21vZGFsTW9kfVxuaW1wb3J0IHsgdXNlRE9NIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IG1vZGFsTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLnRhc2stZGlhbG9nJyk7XG4gICAgY29uc3QgdGFza0lucHV0cyA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvckFsbCAoJ2lucHV0Jyk7XG4gICAgY29uc3Qgc2VsZWN0ID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yICgnc2VsZWN0Jyk7XG5cbiAgICBjb25zdCBwcm9qRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy5wcm9qLWRpYWxvZycpXG5cbiAgICBmdW5jdGlvbiBzaG93VGFza01vZGFsICgpIHtcbiAgICAgICAgdGFza0RpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93UHJvak1vZGFsICgpIHtcbiAgICAgICAgcHJvakRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0T3B0aW9ucyAoKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgcHJvamVjdE1vZC5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnb3B0aW9uJywgcHJvamVjdC50aXRsZSk7XG4gICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MIChvcHRpb24sIHNlbGVjdCk7XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlybVRhc2sgKGV2ZW50LCBwYXJlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgKCk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBmaW5kU2VsZWN0ZWRQcm9qICgpO1xuICAgICAgICB0YXNrTW9kLmFkZFRvUHJvamVjdCAocHJvamVjdC50YXNrTGlzdCwgY3JlYXRlVGFzayAodGFza0lucHV0cyksIHByb2plY3QsIHBhcmVudCk7XG4gICAgICAgIGNsb3NlTW9kYWwgKHRhc2tJbnB1dHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUHJvaiAoKSB7XG4gICAgICAgIHJldHVybiB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCdzZWxlY3QnKS52YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kU2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qID0gZ2V0U2VsZWN0ZWRQcm9qICgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RNb2QucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TW9kLnByb2plY3RzW2ldLnRpdGxlID09PSBzZWxlY3RlZFByb2opIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdE1vZC5wcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzb3J0SW5wdXRzIChpbnB1dEFycikge1xuICAgICAgICBjb25zdCBvYmpBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRBcnIuZm9yRWFjaChpbnB1dCA9PiBvYmpBcnIucHVzaCAoaW5wdXQudmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iakFycjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrIChpbnB1dEFycikge1xuICAgICAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHNvcnRJbnB1dHMoaW5wdXRBcnIpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gdGFza01vZC5jcmVhdGVUYXNrKGlucHV0VmFsdWVzWzBdKTtcbiAgICAgICAgcmV0dXJuIG5ld1Rhc2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCAoKSB7XG4gICAgICAgIHRhc2tJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICAgICAgdGFza0RpYWxvZy5jbG9zZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpcm1Qcm9qIChldmVudCwgcGFyZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ICgpO1xuICAgICAgICBjb25zb2xlLmxvZyAoJ2NsaWNrJylcbiAgICAgICAgLy8gY29uc3QgcHJvamVjdCA9IGZpbmRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIC8vIHRhc2tNb2QuYWRkVG9Qcm9qZWN0IChwcm9qZWN0LnRhc2tMaXN0LCBjcmVhdGVUYXNrICh0YXNrSW5wdXRzKSwgcHJvamVjdCwgcGFyZW50KTtcbiAgICAgICAgLy8gY2xvc2VNb2RhbCAodGFza0lucHV0cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd1Rhc2tNb2RhbDogc2hvd1Rhc2tNb2RhbCxcbiAgICAgICAgc2hvd1Byb2pNb2RhbDogc2hvd1Byb2pNb2RhbCxcbiAgICAgICAgY29uZmlybVRhc2s6IGNvbmZpcm1UYXNrLFxuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9uczogY3JlYXRlUHJvamVjdE9wdGlvbnMsXG4gICAgICAgIGNvbmZpcm1Qcm9qLCBjb25maXJtUHJvaixcbiAgICB9XG5cbn0pKCk7IiwiZXhwb3J0IHtwcm9qZWN0TW9kfTtcblxuY29uc3QgcHJvamVjdE1vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdCAodGl0bGUsIHRhc2tMaXN0KSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIHRhc2tMaXN0fVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3Q6IGNyZWF0ZVByb2plY3QsXG4gICAgICAgIHByb2plY3RzLFxuICAgIH1cbn0pKCk7IiwiZXhwb3J0IHt0YXNrTW9kfTtcbmltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcblxuXG5jb25zdCB0YXNrTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGlkKSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgaWR9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNzaWduVGFzayAodGFza09iaiwgdGFza0Fycikge1xuICAgICAgICB0YXNrQXJyLnB1c2godGFza09iaik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9Qcm9qZWN0ICh0YXNrQXJyLCB0YXNrT2JqLCBwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoICh0YXNrT2JqKTtcbiAgICAgICAgdXNlRE9NLnJlZnJlc2hEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRhc2tEYXRhIChvYmosIHBhcmVudCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gYCR7a2V5fTogJHtvYmpba2V5XX1gO1xuICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgZmllbGQpLCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGFzazogY3JlYXRlVGFzayxcbiAgICAgICAgYXNzaWduVGFzazogYXNzaWduVGFzayxcbiAgICAgICAgYWRkVGFza0RhdGE6IGFkZFRhc2tEYXRhLFxuICAgICAgICBhZGRUb1Byb2plY3Q6IGFkZFRvUHJvamVjdCxcbiAgICB9XG5cbn0pKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3VzZURPTX0gZnJvbSAnLi9kb20uanMnXG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gJy4vdGFza3MuanMnXG5pbXBvcnQge21vZGFsTW9kfSBmcm9tICcuL21vZGFsLmpzJ1xuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaHRtbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI2NvbnRlbnQnKVxuXG4gICAgY29uc3QgaGVhZGVyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdoZWFkZXInLCAnZGl2Jyk7XG4gICAgY29uc3Qgc2lkZWJhckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnc2lkZWJhcicsICdkaXYnKTtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2dyaWQnLCAnZGl2Jyk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MIChoZWFkZXJDb250ZW50LCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoZ3JpZENvbnRhaW5lciwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2gyJywgJ1RvIERvIExpc3QnKSwgaGVhZGVyQ29udGVudCk7XG5cbiAgICBjb25zdCBhZGRQcm9qQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFByb2plY3QnLCAnYWRkLXByb2plY3QnKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRQcm9qQnRuLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoYWRkUHJvakJ0biwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2Quc2hvd1Byb2pNb2RhbCgpKTtcblxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgVGFzaycsICdhZGQtdGFzaycpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFRhc2tCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRUYXNrQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93VGFza01vZGFsKCkpO1xuXG4gICAgY29uc3QgY29uZmlybVRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1UYXNrXCIpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtVGFzaywgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtVGFzayBcbiAgICAoZXZlbnQsIGdyaWRDb250YWluZXIpKTtcblxuICAgIGNvbnN0IGNvbmZpcm1Qcm9qID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUHJvalwiKTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybVByb2osICdjbGljaycsIChldmVudCkgPT4gbW9kYWxNb2QuY29uZmlybVByb2ogKGV2ZW50LCBwYXJlbnQpKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2gzJywgJ1Byb2plY3RzJyksIHNpZGViYXJDb250ZW50KTtcblxuICAgIGNvbnN0IHRvZGF5VGFza3MgPSBbXTtcbiAgICBjb25zdCBjbGVhbiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0NsZWFuJywgJ2NsZWFuIHlvdXIgcm9vbScsIERhdGUoKSwgJ0xvdycsIHRvZGF5VGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKGNsZWFuLCB0b2RheVRhc2tzKTtcbiAgICBjb25zdCBzdXJmID0gdGFza01vZC5jcmVhdGVUYXNrICgnU3VyZicsICdoaWdoIHRpZGUgYXQgM1BNJywgRGF0ZSgpLCAnSGlnaCcsIHRvZGF5VGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKHN1cmYsIHRvZGF5VGFza3MpO1xuXG4gICAgY29uc3QgbW9yb2Njb1Rhc2tzID0gW107XG4gICAgY29uc3QgY29vayA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0Nvb2snLCAndGFnaW5lJywgRGF0ZSgpLCAnTWVkaXVtJywgbW9yb2Njb1Rhc2tzLmxlbmd0aCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChjb29rLCBtb3JvY2NvVGFza3MpO1xuXG4gICAgcHJvamVjdE1vZC5wcm9qZWN0cy5wdXNoIChwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdNb3JvY2NvJywgbW9yb2Njb1Rhc2tzKSk7XG4gICAgcHJvamVjdE1vZC5wcm9qZWN0cy5wdXNoIChwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdUb2RheScsIHRvZGF5VGFza3MpKTtcblxuICAgIHVzZURPTS5yZW5kZXJEaXNwbGF5IChwcm9qZWN0TW9kLnByb2plY3RzWzBdLCBncmlkQ29udGFpbmVyKTtcbiAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgc2lkZWJhckNvbnRlbnQsICdkaXYnLCBncmlkQ29udGFpbmVyKVxuXG4gICAgLy9uZWVkIHRvIHJlLXJlbmRlciB0aGlzIGFmdGVyIGEgbmV3IHByb2plYyBpcyBhZGRlZFxuICAgIC8vY3Jvc3MgdGhpcyBicmlkZ2Ugd2hlbiB3b3JraW5nIG9uIGFkZCBwcm9qIGJ0blxuICAgIG1vZGFsTW9kLmNyZWF0ZVByb2plY3RPcHRpb25zIChwcm9qZWN0TW9kLnByb2plY3RzKTtcbiAgICBcbn0pKCk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==