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

    function refreshSidebar (projArr, childLocation, element) {
        deleteSidebar ();
        refreshSidebar (projArr, childLocation, element);
    }
 
    function renderSidebar (projArr, childLocation, element, displayContainer) {
        projArr.forEach(proj => {
            const projDiv = appendProj (proj, childLocation, element)
            bindEvents (projDiv, 'click', () => refreshDisplay (proj, displayContainer));
        });
    }
    
    function deleteDisplay () {
        document.querySelector ('.display').remove();
    }

    function deleteSidebar () {
        const sidebarDivs = document.querySelectorAll ('.sidebar > div');
        sidebarDivs.forEach(proj => proj.remove());
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
        deleteSidebar: deleteSidebar,
        refreshSidebar: refreshSidebar,
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

    const projDialog = document.querySelector ('.proj-dialog');
    const projInputs = projDialog.querySelector ('input');

    const allInputs = document.querySelectorAll ('input');

    function showTaskModal () {
        taskDialog.showModal();
    }

    function showProjModal () {
        projDialog.showModal();
    }

    function createProjectOptions () {
        removeProjOptions ()
        let i = 0;
        _projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.forEach(project => {
            const option = _dom__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('option', project.title);
            _dom__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (option, select);
            i += 1;
    });
    }

    function removeProjOptions () {
        const projOptions = taskDialog.querySelectorAll ('option');
        projOptions.forEach(option => option.remove());
    }

    function confirmTask (event, parent) {
        event.preventDefault ();
        const project = findSelectedProj ();
        _tasks__WEBPACK_IMPORTED_MODULE_2__.taskMod.addToProject (project.taskList, createTask (taskInputs), project, parent);
        closeModal (taskDialog);
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

    function closeModal (modal) {
        allInputs.forEach(input => input.value = '');
        modal.close();
    }

    function confirmProj (event, projContainer, displayContainer) {
        event.preventDefault ();
        _projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.createFromBtn (projInputs.value, _projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
        _dom__WEBPACK_IMPORTED_MODULE_0__.useDOM.deleteSidebar ();
        _dom__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderSidebar (_projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects, projContainer, 'div', displayContainer);
        closeModal (projDialog);
        createProjectOptions (_projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
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

    function createFromBtn (title, projectsArr) {
        projectsArr.push (createProject (title, []));
    }

    return {
        createProject: createProject,
        createFromBtn, createFromBtn,
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
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (confirmProj, 'click', (event) => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.confirmProj 
    (event, sidebarContent, gridContainer));

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('h3', 'Projects'), sidebarContent);

    const todayTasks = [];
    const clean = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', todayTasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (clean, todayTasks);
    const surf = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', todayTasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (surf, todayTasks);

    const moroccoTasks = [];
    const cook = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Cook', 'tagine', Date(), 'Medium', moroccoTasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (cook, moroccoTasks);

    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createFromBtn ('test', _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ozs7Ozs7Ozs7Ozs7O0FDTitCO0FBQ1M7QUFDTjtBQUNDOztBQUVuQztBQUNBOztBQUVBLDBCQUEwQiwyQ0FBTTtBQUNoQywyQkFBMkIsMkNBQU07QUFDakMsMEJBQTBCLDJDQUFNOztBQUVoQyxJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU07O0FBRVYsSUFBSSwyQ0FBTSxZQUFZLDJDQUFNOztBQUU1Qix1QkFBdUIsMkNBQU07QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRCx1QkFBdUIsMkNBQU07QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRDtBQUNBLElBQUksMkNBQU0sOENBQThDLCtDQUFRO0FBQ2hFOztBQUVBO0FBQ0EsSUFBSSwyQ0FBTSw4Q0FBOEMsK0NBQVE7QUFDaEU7O0FBRUEsSUFBSSwyQ0FBTSxZQUFZLDJDQUFNOztBQUU1QjtBQUNBLGtCQUFrQiw4Q0FBTztBQUN6QixJQUFJLDhDQUFPO0FBQ1gsaUJBQWlCLDhDQUFPO0FBQ3hCLElBQUksOENBQU87O0FBRVg7QUFDQSxpQkFBaUIsOENBQU87QUFDeEIsSUFBSSw4Q0FBTzs7QUFFWCxJQUFJLG9EQUFVLHdCQUF3QixvREFBVTs7QUFFaEQsSUFBSSxvREFBVSxnQkFBZ0Isb0RBQVU7QUFDeEMsSUFBSSxvREFBVSxnQkFBZ0Isb0RBQVU7O0FBRXhDLElBQUksMkNBQU0sZ0JBQWdCLG9EQUFVO0FBQ3BDLElBQUksMkNBQU0sZ0JBQWdCLG9EQUFVOztBQUVwQztBQUNBO0FBQ0EsSUFBSSwrQ0FBUSx1QkFBdUIsb0RBQVU7QUFDN0M7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHt1c2VET019IFxuaW1wb3J0IHsgdGFza01vZCB9IGZyb20gXCIuL3Rhc2tzLmpzXCI7XG5cbmNvbnN0IHVzZURPTSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG4gICAgZnVuY3Rpb24gY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoZWxlbWVudCwgdGV4dCwgY3NzQ2xhc3MpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb0hUTUwgKGVsZW1lbnQsIHBhcmVudCkge1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyIChjc3NDbGFzcywgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2ogKG9iaiwgbG9jYXRpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCBvYmoudGl0bGUpXG4gICAgICAgIGFkZFRvSFRNTCAobmV3RWxlbWVudCwgbG9jYXRpb24pO1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRBbGxUYXNrcyAodGFza0FyciwgbG9jYXRpb24pIHtcbiAgICAgICAgdGFza0Fyci5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFwcGVuZFByb2ogKHRhc2ssIGxvY2F0aW9uLCAnZGl2Jyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrRGV0YWlscyA9IGNyZWF0ZUhpZGRlbkRldGFpbHMgKHRhc2ssIGVsZW1lbnQpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAoZWxlbWVudCwgJ2NsaWNrJywgKCkgPT4gdG9nZ2xlRGV0YWlscyAodGFzaywgdGFza0RldGFpbHMpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyAoZWxlbWVudCwgZXZlbnQsIGFjdGlvbikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGV0YWlscyAob2JqLCBlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhpZGRlbkRldGFpbHMgKG9iaiwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2FjdGl2ZScsICdkaXYnKTtcbiAgICAgICAgLy8gYWN0aXZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAoYWN0aXZlLCBsb2NhdGlvbik7XG4gICAgICAgIHRhc2tNb2QuYWRkVGFza0RhdGEgKG9iaiwgYWN0aXZlKTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoRGlzcGxheSAocHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIHVzZURPTS5kZWxldGVEaXNwbGF5ICgpO1xuICAgICAgICB1c2VET00ucmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheUNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZGlzcGxheScsICdkaXYnKTtcbiAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAoZGlzcGxheUNvbnRlbnQsIHBhcmVudCk7XG5cbiAgICAgICAgdXNlRE9NLmFwcGVuZFByb2ogKHByb2plY3QsIGRpc3BsYXlDb250ZW50LCAnaDMnKTtcbiAgICAgICAgdXNlRE9NLmFwcGVuZEFsbFRhc2tzIChwcm9qZWN0LnRhc2tMaXN0LCBkaXNwbGF5Q29udGVudCwgJ2RpdicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hTaWRlYmFyIChwcm9qQXJyLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGRlbGV0ZVNpZGViYXIgKCk7XG4gICAgICAgIHJlZnJlc2hTaWRlYmFyIChwcm9qQXJyLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50KTtcbiAgICB9XG4gXG4gICAgZnVuY3Rpb24gcmVuZGVyU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCwgZGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgICBwcm9qQXJyLmZvckVhY2gocHJvaiA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qRGl2ID0gYXBwZW5kUHJvaiAocHJvaiwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudClcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKHByb2pEaXYsICdjbGljaycsICgpID0+IHJlZnJlc2hEaXNwbGF5IChwcm9qLCBkaXNwbGF5Q29udGFpbmVyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBkZWxldGVEaXNwbGF5ICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy5kaXNwbGF5JykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlU2lkZWJhciAoKSB7XG4gICAgICAgIGNvbnN0IHNpZGViYXJEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCAoJy5zaWRlYmFyID4gZGl2Jyk7XG4gICAgICAgIHNpZGViYXJEaXZzLmZvckVhY2gocHJvaiA9PiBwcm9qLnJlbW92ZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUZXh0RWxlbWVudDogY3JlYXRlVGV4dEVsZW1lbnQsXG4gICAgICAgIGFkZFRvSFRNTDogYWRkVG9IVE1MLFxuICAgICAgICBjcmVhdGVDb250YWluZXIsIGNyZWF0ZUNvbnRhaW5lcixcbiAgICAgICAgYXBwZW5kUHJvajogYXBwZW5kUHJvaixcbiAgICAgICAgYXBwZW5kQWxsVGFza3M6IGFwcGVuZEFsbFRhc2tzLFxuICAgICAgICBjcmVhdGVDbGFzc1RleHRFbGVtZW50OiBjcmVhdGVDbGFzc1RleHRFbGVtZW50LFxuICAgICAgICBiaW5kRXZlbnRzOiBiaW5kRXZlbnRzLFxuICAgICAgICByZW5kZXJEaXNwbGF5OiByZW5kZXJEaXNwbGF5LFxuICAgICAgICBkZWxldGVEaXNwbGF5OiBkZWxldGVEaXNwbGF5LFxuICAgICAgICByZW5kZXJTaWRlYmFyOiByZW5kZXJTaWRlYmFyLFxuICAgICAgICByZWZyZXNoRGlzcGxheTogcmVmcmVzaERpc3BsYXksXG4gICAgICAgIGRlbGV0ZVNpZGViYXI6IGRlbGV0ZVNpZGViYXIsXG4gICAgICAgIHJlZnJlc2hTaWRlYmFyOiByZWZyZXNoU2lkZWJhcixcbiAgICB9XG5cbn0pKCk7IiwiZXhwb3J0IHttb2RhbE1vZH1cbmltcG9ydCB7IHVzZURPTSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tIFwiLi90YXNrc1wiO1xuXG5jb25zdCBtb2RhbE1vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy50YXNrLWRpYWxvZycpO1xuICAgIGNvbnN0IHRhc2tJbnB1dHMgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwgKCdpbnB1dCcpO1xuICAgIGNvbnN0IHNlbGVjdCA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJ3NlbGVjdCcpO1xuXG4gICAgY29uc3QgcHJvakRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcucHJvai1kaWFsb2cnKTtcbiAgICBjb25zdCBwcm9qSW5wdXRzID0gcHJvakRpYWxvZy5xdWVyeVNlbGVjdG9yICgnaW5wdXQnKTtcblxuICAgIGNvbnN0IGFsbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKCdpbnB1dCcpO1xuXG4gICAgZnVuY3Rpb24gc2hvd1Rhc2tNb2RhbCAoKSB7XG4gICAgICAgIHRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1Byb2pNb2RhbCAoKSB7XG4gICAgICAgIHByb2pEaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdE9wdGlvbnMgKCkge1xuICAgICAgICByZW1vdmVQcm9qT3B0aW9ucyAoKVxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHByb2plY3RNb2QucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ29wdGlvbicsIHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAob3B0aW9uLCBzZWxlY3QpO1xuICAgICAgICAgICAgaSArPSAxO1xuICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2pPcHRpb25zICgpIHtcbiAgICAgICAgY29uc3QgcHJvak9wdGlvbnMgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwgKCdvcHRpb24nKTtcbiAgICAgICAgcHJvak9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLnJlbW92ZSgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtVGFzayAoZXZlbnQsIHBhcmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCAoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGZpbmRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIHRhc2tNb2QuYWRkVG9Qcm9qZWN0IChwcm9qZWN0LnRhc2tMaXN0LCBjcmVhdGVUYXNrICh0YXNrSW5wdXRzKSwgcHJvamVjdCwgcGFyZW50KTtcbiAgICAgICAgY2xvc2VNb2RhbCAodGFza0RpYWxvZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgcmV0dXJuIHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJ3NlbGVjdCcpLnZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRTZWxlY3RlZFByb2ogKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2ogPSBnZXRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdE1vZC5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RNb2QucHJvamVjdHNbaV0udGl0bGUgPT09IHNlbGVjdGVkUHJvaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0TW9kLnByb2plY3RzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNvcnRJbnB1dHMgKGlucHV0QXJyKSB7XG4gICAgICAgIGNvbnN0IG9iakFyciA9IFtdO1xuICAgICAgICBpbnB1dEFyci5mb3JFYWNoKGlucHV0ID0+IG9iakFyci5wdXNoIChpbnB1dC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gb2JqQXJyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKGlucHV0QXJyKSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWVzID0gc29ydElucHV0cyhpbnB1dEFycik7XG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSB0YXNrTW9kLmNyZWF0ZVRhc2soaW5wdXRWYWx1ZXNbMF0pO1xuICAgICAgICByZXR1cm4gbmV3VGFzaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsIChtb2RhbCkge1xuICAgICAgICBhbGxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtUHJvaiAoZXZlbnQsIHByb2pDb250YWluZXIsIGRpc3BsYXlDb250YWluZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgKCk7XG4gICAgICAgIHByb2plY3RNb2QuY3JlYXRlRnJvbUJ0biAocHJvaklucHV0cy52YWx1ZSwgcHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgICAgIHVzZURPTS5kZWxldGVTaWRlYmFyICgpO1xuICAgICAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgcHJvakNvbnRhaW5lciwgJ2RpdicsIGRpc3BsYXlDb250YWluZXIpO1xuICAgICAgICBjbG9zZU1vZGFsIChwcm9qRGlhbG9nKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNob3dUYXNrTW9kYWw6IHNob3dUYXNrTW9kYWwsXG4gICAgICAgIHNob3dQcm9qTW9kYWw6IHNob3dQcm9qTW9kYWwsXG4gICAgICAgIGNvbmZpcm1UYXNrOiBjb25maXJtVGFzayxcbiAgICAgICAgY3JlYXRlUHJvamVjdE9wdGlvbnM6IGNyZWF0ZVByb2plY3RPcHRpb25zLFxuICAgICAgICBjb25maXJtUHJvaiwgY29uZmlybVByb2osXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7cHJvamVjdE1vZH07XG5cbmNvbnN0IHByb2plY3RNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QgKHRpdGxlLCB0YXNrTGlzdCkge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCB0YXNrTGlzdH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGcm9tQnRuICh0aXRsZSwgcHJvamVjdHNBcnIpIHtcbiAgICAgICAgcHJvamVjdHNBcnIucHVzaCAoY3JlYXRlUHJvamVjdCAodGl0bGUsIFtdKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdDogY3JlYXRlUHJvamVjdCxcbiAgICAgICAgY3JlYXRlRnJvbUJ0biwgY3JlYXRlRnJvbUJ0bixcbiAgICAgICAgcHJvamVjdHMsXG4gICAgfVxufSkoKTsiLCJleHBvcnQge3Rhc2tNb2R9O1xuaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuXG5cbmNvbnN0IHRhc2tNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBpZH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3NpZ25UYXNrICh0YXNrT2JqLCB0YXNrQXJyKSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCh0YXNrT2JqKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb1Byb2plY3QgKHRhc2tBcnIsIHRhc2tPYmosIHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICB0YXNrQXJyLnB1c2ggKHRhc2tPYmopO1xuICAgICAgICB1c2VET00ucmVmcmVzaERpc3BsYXkgKHByb2plY3QsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFza0RhdGEgKG9iaiwgcGFyZW50KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBgJHtrZXl9OiAke29ialtrZXldfWA7XG4gICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCBmaWVsZCksIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUYXNrOiBjcmVhdGVUYXNrLFxuICAgICAgICBhc3NpZ25UYXNrOiBhc3NpZ25UYXNrLFxuICAgICAgICBhZGRUYXNrRGF0YTogYWRkVGFza0RhdGEsXG4gICAgICAgIGFkZFRvUHJvamVjdDogYWRkVG9Qcm9qZWN0LFxuICAgIH1cblxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7dGFza01vZH0gZnJvbSAnLi90YXNrcy5qcydcbmltcG9ydCB7bW9kYWxNb2R9IGZyb20gJy4vbW9kYWwuanMnXG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBodG1sQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcjY29udGVudCcpXG5cbiAgICBjb25zdCBoZWFkZXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2hlYWRlcicsICdkaXYnKTtcbiAgICBjb25zdCBzaWRlYmFyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdzaWRlYmFyJywgJ2RpdicpO1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZ3JpZCcsICdkaXYnKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKGhlYWRlckNvbnRlbnQsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChncmlkQ29udGFpbmVyLCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoc2lkZWJhckNvbnRlbnQsIGdyaWRDb250YWluZXIpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDInLCAnVG8gRG8gTGlzdCcpLCBoZWFkZXJDb250ZW50KTtcblxuICAgIGNvbnN0IGFkZFByb2pCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgUHJvamVjdCcsICdhZGQtcHJvamVjdCcpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFByb2pCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRQcm9qQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93UHJvak1vZGFsKCkpO1xuXG4gICAgY29uc3QgYWRkVGFza0J0biA9IHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50ICgnYnV0dG9uJywgJ0FkZCBUYXNrJywgJ2FkZC10YXNrJyk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoYWRkVGFza0J0biwgaGVhZGVyQ29udGVudCk7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGFkZFRhc2tCdG4sICdjbGljaycsICgpID0+IG1vZGFsTW9kLnNob3dUYXNrTW9kYWwoKSk7XG5cbiAgICBjb25zdCBjb25maXJtVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVRhc2tcIik7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGNvbmZpcm1UYXNrLCAnY2xpY2snLCAoZXZlbnQpID0+IG1vZGFsTW9kLmNvbmZpcm1UYXNrIFxuICAgIChldmVudCwgZ3JpZENvbnRhaW5lcikpO1xuXG4gICAgY29uc3QgY29uZmlybVByb2ogPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1Qcm9qXCIpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtUHJvaiwgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtUHJvaiBcbiAgICAoZXZlbnQsIHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKSk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMycsICdQcm9qZWN0cycpLCBzaWRlYmFyQ29udGVudCk7XG5cbiAgICBjb25zdCB0b2RheVRhc2tzID0gW107XG4gICAgY29uc3QgY2xlYW4gPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdDbGVhbicsICdjbGVhbiB5b3VyIHJvb20nLCBEYXRlKCksICdMb3cnLCB0b2RheVRhc2tzLmxlbmd0aCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChjbGVhbiwgdG9kYXlUYXNrcyk7XG4gICAgY29uc3Qgc3VyZiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ1N1cmYnLCAnaGlnaCB0aWRlIGF0IDNQTScsIERhdGUoKSwgJ0hpZ2gnLCB0b2RheVRhc2tzLmxlbmd0aCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChzdXJmLCB0b2RheVRhc2tzKTtcblxuICAgIGNvbnN0IG1vcm9jY29UYXNrcyA9IFtdO1xuICAgIGNvbnN0IGNvb2sgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdDb29rJywgJ3RhZ2luZScsIERhdGUoKSwgJ01lZGl1bScsIG1vcm9jY29UYXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoY29vaywgbW9yb2Njb1Rhc2tzKTtcblxuICAgIHByb2plY3RNb2QuY3JlYXRlRnJvbUJ0biAoJ3Rlc3QnLCBwcm9qZWN0TW9kLnByb2plY3RzKTtcblxuICAgIHByb2plY3RNb2QucHJvamVjdHMucHVzaCAocHJvamVjdE1vZC5jcmVhdGVQcm9qZWN0ICgnTW9yb2NjbycsIG1vcm9jY29UYXNrcykpO1xuICAgIHByb2plY3RNb2QucHJvamVjdHMucHVzaCAocHJvamVjdE1vZC5jcmVhdGVQcm9qZWN0ICgnVG9kYXknLCB0b2RheVRhc2tzKSk7XG5cbiAgICB1c2VET00ucmVuZGVyRGlzcGxheSAocHJvamVjdE1vZC5wcm9qZWN0c1swXSwgZ3JpZENvbnRhaW5lcik7XG4gICAgdXNlRE9NLnJlbmRlclNpZGViYXIgKHByb2plY3RNb2QucHJvamVjdHMsIHNpZGViYXJDb250ZW50LCAnZGl2JywgZ3JpZENvbnRhaW5lcilcblxuICAgIC8vbmVlZCB0byByZS1yZW5kZXIgdGhpcyBhZnRlciBhIG5ldyBwcm9qZWMgaXMgYWRkZWRcbiAgICAvL2Nyb3NzIHRoaXMgYnJpZGdlIHdoZW4gd29ya2luZyBvbiBhZGQgcHJvaiBidG5cbiAgICBtb2RhbE1vZC5jcmVhdGVQcm9qZWN0T3B0aW9ucyAocHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgXG59KSgpO1xuXG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=