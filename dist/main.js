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
    const select = taskDialog.querySelector ('#project-sel');
    const taskDescr = taskDialog.querySelector ('#descr');
    const taskPrio  = taskDialog.querySelector ('#priority');

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
        const projOptions = select.querySelectorAll ('option');
        projOptions.forEach(option => option.remove());
    }

    function confirmTask (event, parent) {
        event.preventDefault ();
        const project = findSelectedProj ();
        _tasks__WEBPACK_IMPORTED_MODULE_2__.taskMod.addToProject (project.taskList, createTask (taskInputs, project), project, parent);
        closeModal (taskDialog);
    }

    function getSelectedProj () {
        return taskDialog.querySelector ('#project-sel').value;
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

    function createTask (inputArr, project) {
        const inputValues = sortInputs(inputArr);
        addModalNonInputs (inputValues)
        const newTask = _tasks__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask(inputValues[0], 
            inputValues[2], inputValues[1], inputValues[3], project.taskList.length);
        return newTask;
    }

    function addModalNonInputs (valueArr) {
        valueArr.push (taskDescr.value);
        valueArr.push (taskPrio.value);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOK0I7QUFDUztBQUNOO0FBQ0M7O0FBRW5DO0FBQ0E7O0FBRUEsMEJBQTBCLDJDQUFNO0FBQ2hDLDJCQUEyQiwyQ0FBTTtBQUNqQywwQkFBMEIsMkNBQU07O0FBRWhDLElBQUksMkNBQU07QUFDVixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTTs7QUFFVixJQUFJLDJDQUFNLFlBQVksMkNBQU07O0FBRTVCLHVCQUF1QiwyQ0FBTTtBQUM3QixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTSx3Q0FBd0MsK0NBQVE7O0FBRTFELHVCQUF1QiwyQ0FBTTtBQUM3QixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTSx3Q0FBd0MsK0NBQVE7O0FBRTFEO0FBQ0EsSUFBSSwyQ0FBTSw4Q0FBOEMsK0NBQVE7QUFDaEU7O0FBRUE7QUFDQSxJQUFJLDJDQUFNLDhDQUE4QywrQ0FBUTtBQUNoRTs7QUFFQSxJQUFJLDJDQUFNLFlBQVksMkNBQU07O0FBRTVCO0FBQ0Esa0JBQWtCLDhDQUFPO0FBQ3pCLElBQUksOENBQU87QUFDWCxpQkFBaUIsOENBQU87QUFDeEIsSUFBSSw4Q0FBTzs7QUFFWDtBQUNBLGlCQUFpQiw4Q0FBTztBQUN4QixJQUFJLDhDQUFPOztBQUVYLElBQUksb0RBQVUsZ0JBQWdCLG9EQUFVO0FBQ3hDLElBQUksb0RBQVUsZ0JBQWdCLG9EQUFVOztBQUV4QyxJQUFJLDJDQUFNLGdCQUFnQixvREFBVTtBQUNwQyxJQUFJLDJDQUFNLGdCQUFnQixvREFBVTs7QUFFcEM7QUFDQTtBQUNBLElBQUksK0NBQVEsdUJBQXVCLG9EQUFVO0FBQzdDO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvbW9kYWwuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9wcm9qZWN0cy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7dXNlRE9NfSBcbmltcG9ydCB7IHRhc2tNb2QgfSBmcm9tIFwiLi90YXNrcy5qc1wiO1xuXG5jb25zdCB1c2VET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQsIGNzc0NsYXNzKSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9IVE1MIChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoY3NzQ2xhc3MsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qIChvYmosIGxvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgb2JqLnRpdGxlKVxuICAgICAgICBhZGRUb0hUTUwgKG5ld0VsZW1lbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kQWxsVGFza3MgKHRhc2tBcnIsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRhc2tBcnIuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcHBlbmRQcm9qICh0YXNrLCBsb2NhdGlvbiwgJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgdGFza0RldGFpbHMgPSBjcmVhdGVIaWRkZW5EZXRhaWxzICh0YXNrLCBlbGVtZW50KTtcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKGVsZW1lbnQsICdjbGljaycsICgpID0+IHRvZ2dsZURldGFpbHMgKHRhc2ssIHRhc2tEZXRhaWxzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMgKGVsZW1lbnQsIGV2ZW50LCBhY3Rpb24pIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZURldGFpbHMgKG9iaiwgZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVIaWRkZW5EZXRhaWxzIChvYmosIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdhY3RpdmUnLCAnZGl2Jyk7XG4gICAgICAgIC8vIGFjdGl2ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIHVzZURPTS5hZGRUb0hUTUwgKGFjdGl2ZSwgbG9jYXRpb24pO1xuICAgICAgICB0YXNrTW9kLmFkZFRhc2tEYXRhIChvYmosIGFjdGl2ZSk7XG4gICAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaERpc3BsYXkgKHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICB1c2VET00uZGVsZXRlRGlzcGxheSAoKTtcbiAgICAgICAgdXNlRE9NLnJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXlDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2Rpc3BsYXknLCAnZGl2Jyk7XG4gICAgICAgIHVzZURPTS5hZGRUb0hUTUwgKGRpc3BsYXlDb250ZW50LCBwYXJlbnQpO1xuXG4gICAgICAgIHVzZURPTS5hcHBlbmRQcm9qIChwcm9qZWN0LCBkaXNwbGF5Q29udGVudCwgJ2gzJyk7XG4gICAgICAgIHVzZURPTS5hcHBlbmRBbGxUYXNrcyAocHJvamVjdC50YXNrTGlzdCwgZGlzcGxheUNvbnRlbnQsICdkaXYnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCkge1xuICAgICAgICBkZWxldGVTaWRlYmFyICgpO1xuICAgICAgICByZWZyZXNoU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCk7XG4gICAgfVxuIFxuICAgIGZ1bmN0aW9uIHJlbmRlclNpZGViYXIgKHByb2pBcnIsIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQsIGRpc3BsYXlDb250YWluZXIpIHtcbiAgICAgICAgcHJvakFyci5mb3JFYWNoKHByb2ogPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvakRpdiA9IGFwcGVuZFByb2ogKHByb2osIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQpXG4gICAgICAgICAgICBiaW5kRXZlbnRzIChwcm9qRGl2LCAnY2xpY2snLCAoKSA9PiByZWZyZXNoRGlzcGxheSAocHJvaiwgZGlzcGxheUNvbnRhaW5lcikpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZXRlRGlzcGxheSAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcuZGlzcGxheScpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZVNpZGViYXIgKCkge1xuICAgICAgICBjb25zdCBzaWRlYmFyRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKCcuc2lkZWJhciA+IGRpdicpO1xuICAgICAgICBzaWRlYmFyRGl2cy5mb3JFYWNoKHByb2ogPT4gcHJvai5yZW1vdmUoKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGV4dEVsZW1lbnQ6IGNyZWF0ZVRleHRFbGVtZW50LFxuICAgICAgICBhZGRUb0hUTUw6IGFkZFRvSFRNTCxcbiAgICAgICAgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVDb250YWluZXIsXG4gICAgICAgIGFwcGVuZFByb2o6IGFwcGVuZFByb2osXG4gICAgICAgIGFwcGVuZEFsbFRhc2tzOiBhcHBlbmRBbGxUYXNrcyxcbiAgICAgICAgY3JlYXRlQ2xhc3NUZXh0RWxlbWVudDogY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCxcbiAgICAgICAgYmluZEV2ZW50czogYmluZEV2ZW50cyxcbiAgICAgICAgcmVuZGVyRGlzcGxheTogcmVuZGVyRGlzcGxheSxcbiAgICAgICAgZGVsZXRlRGlzcGxheTogZGVsZXRlRGlzcGxheSxcbiAgICAgICAgcmVuZGVyU2lkZWJhcjogcmVuZGVyU2lkZWJhcixcbiAgICAgICAgcmVmcmVzaERpc3BsYXk6IHJlZnJlc2hEaXNwbGF5LFxuICAgICAgICBkZWxldGVTaWRlYmFyOiBkZWxldGVTaWRlYmFyLFxuICAgICAgICByZWZyZXNoU2lkZWJhcjogcmVmcmVzaFNpZGViYXIsXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7bW9kYWxNb2R9XG5pbXBvcnQgeyB1c2VET00gfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7dGFza01vZH0gZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgbW9kYWxNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgdGFza0RpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcudGFzay1kaWFsb2cnKTtcbiAgICBjb25zdCB0YXNrSW5wdXRzID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yQWxsICgnaW5wdXQnKTtcbiAgICBjb25zdCBzZWxlY3QgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjcHJvamVjdC1zZWwnKTtcbiAgICBjb25zdCB0YXNrRGVzY3IgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjZGVzY3InKTtcbiAgICBjb25zdCB0YXNrUHJpbyAgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjcHJpb3JpdHknKTtcblxuICAgIGNvbnN0IHByb2pEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLnByb2otZGlhbG9nJyk7XG4gICAgY29uc3QgcHJvaklucHV0cyA9IHByb2pEaWFsb2cucXVlcnlTZWxlY3RvciAoJ2lucHV0Jyk7XG5cbiAgICBjb25zdCBhbGxJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICgnaW5wdXQnKTtcblxuICAgIGZ1bmN0aW9uIHNob3dUYXNrTW9kYWwgKCkge1xuICAgICAgICB0YXNrRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dQcm9qTW9kYWwgKCkge1xuICAgICAgICBwcm9qRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RPcHRpb25zICgpIHtcbiAgICAgICAgcmVtb3ZlUHJvak9wdGlvbnMgKClcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBwcm9qZWN0TW9kLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSB1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdvcHRpb24nLCBwcm9qZWN0LnRpdGxlKTtcbiAgICAgICAgICAgIHVzZURPTS5hZGRUb0hUTUwgKG9wdGlvbiwgc2VsZWN0KTtcbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qT3B0aW9ucyAoKSB7XG4gICAgICAgIGNvbnN0IHByb2pPcHRpb25zID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwgKCdvcHRpb24nKTtcbiAgICAgICAgcHJvak9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLnJlbW92ZSgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtVGFzayAoZXZlbnQsIHBhcmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCAoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGZpbmRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIHRhc2tNb2QuYWRkVG9Qcm9qZWN0IChwcm9qZWN0LnRhc2tMaXN0LCBjcmVhdGVUYXNrICh0YXNrSW5wdXRzLCBwcm9qZWN0KSwgcHJvamVjdCwgcGFyZW50KTtcbiAgICAgICAgY2xvc2VNb2RhbCAodGFza0RpYWxvZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgcmV0dXJuIHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNwcm9qZWN0LXNlbCcpLnZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRTZWxlY3RlZFByb2ogKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2ogPSBnZXRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdE1vZC5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RNb2QucHJvamVjdHNbaV0udGl0bGUgPT09IHNlbGVjdGVkUHJvaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0TW9kLnByb2plY3RzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNvcnRJbnB1dHMgKGlucHV0QXJyKSB7XG4gICAgICAgIGNvbnN0IG9iakFyciA9IFtdO1xuICAgICAgICBpbnB1dEFyci5mb3JFYWNoKGlucHV0ID0+IG9iakFyci5wdXNoIChpbnB1dC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gb2JqQXJyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKGlucHV0QXJyLCBwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWVzID0gc29ydElucHV0cyhpbnB1dEFycik7XG4gICAgICAgIGFkZE1vZGFsTm9uSW5wdXRzIChpbnB1dFZhbHVlcylcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHRhc2tNb2QuY3JlYXRlVGFzayhpbnB1dFZhbHVlc1swXSwgXG4gICAgICAgICAgICBpbnB1dFZhbHVlc1syXSwgaW5wdXRWYWx1ZXNbMV0sIGlucHV0VmFsdWVzWzNdLCBwcm9qZWN0LnRhc2tMaXN0Lmxlbmd0aCk7XG4gICAgICAgIHJldHVybiBuZXdUYXNrO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE1vZGFsTm9uSW5wdXRzICh2YWx1ZUFycikge1xuICAgICAgICB2YWx1ZUFyci5wdXNoICh0YXNrRGVzY3IudmFsdWUpO1xuICAgICAgICB2YWx1ZUFyci5wdXNoICh0YXNrUHJpby52YWx1ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCAobW9kYWwpIHtcbiAgICAgICAgYWxsSW5wdXRzLmZvckVhY2goaW5wdXQgPT4gaW5wdXQudmFsdWUgPSAnJyk7XG4gICAgICAgIG1vZGFsLmNsb3NlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlybVByb2ogKGV2ZW50LCBwcm9qQ29udGFpbmVyLCBkaXNwbGF5Q29udGFpbmVyKSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ICgpO1xuICAgICAgICBwcm9qZWN0TW9kLmNyZWF0ZUZyb21CdG4gKHByb2pJbnB1dHMudmFsdWUsIHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgICAgICB1c2VET00uZGVsZXRlU2lkZWJhciAoKTtcbiAgICAgICAgdXNlRE9NLnJlbmRlclNpZGViYXIgKHByb2plY3RNb2QucHJvamVjdHMsIHByb2pDb250YWluZXIsICdkaXYnLCBkaXNwbGF5Q29udGFpbmVyKTtcbiAgICAgICAgY2xvc2VNb2RhbCAocHJvakRpYWxvZyk7XG4gICAgICAgIGNyZWF0ZVByb2plY3RPcHRpb25zIChwcm9qZWN0TW9kLnByb2plY3RzKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93VGFza01vZGFsOiBzaG93VGFza01vZGFsLFxuICAgICAgICBzaG93UHJvak1vZGFsOiBzaG93UHJvak1vZGFsLFxuICAgICAgICBjb25maXJtVGFzazogY29uZmlybVRhc2ssXG4gICAgICAgIGNyZWF0ZVByb2plY3RPcHRpb25zOiBjcmVhdGVQcm9qZWN0T3B0aW9ucyxcbiAgICAgICAgY29uZmlybVByb2osIGNvbmZpcm1Qcm9qLFxuICAgIH1cblxufSkoKTsiLCJleHBvcnQge3Byb2plY3RNb2R9O1xuXG5jb25zdCBwcm9qZWN0TW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHByb2plY3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0ICh0aXRsZSwgdGFza0xpc3QpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgdGFza0xpc3R9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUJ0biAodGl0bGUsIHByb2plY3RzQXJyKSB7XG4gICAgICAgIHByb2plY3RzQXJyLnB1c2ggKGNyZWF0ZVByb2plY3QgKHRpdGxlLCBbXSkpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3Q6IGNyZWF0ZVByb2plY3QsXG4gICAgICAgIGNyZWF0ZUZyb21CdG4sIGNyZWF0ZUZyb21CdG4sXG4gICAgICAgIHByb2plY3RzLFxuICAgIH1cbn0pKCk7IiwiZXhwb3J0IHt0YXNrTW9kfTtcbmltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcblxuXG5jb25zdCB0YXNrTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGlkKSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgaWR9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNzaWduVGFzayAodGFza09iaiwgdGFza0Fycikge1xuICAgICAgICB0YXNrQXJyLnB1c2godGFza09iaik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9Qcm9qZWN0ICh0YXNrQXJyLCB0YXNrT2JqLCBwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoICh0YXNrT2JqKTtcbiAgICAgICAgdXNlRE9NLnJlZnJlc2hEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRhc2tEYXRhIChvYmosIHBhcmVudCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gYCR7a2V5fTogJHtvYmpba2V5XX1gO1xuICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgZmllbGQpLCBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGFzazogY3JlYXRlVGFzayxcbiAgICAgICAgYXNzaWduVGFzazogYXNzaWduVGFzayxcbiAgICAgICAgYWRkVGFza0RhdGE6IGFkZFRhc2tEYXRhLFxuICAgICAgICBhZGRUb1Byb2plY3Q6IGFkZFRvUHJvamVjdCxcbiAgICB9XG5cbn0pKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3VzZURPTX0gZnJvbSAnLi9kb20uanMnXG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gJy4vdGFza3MuanMnXG5pbXBvcnQge21vZGFsTW9kfSBmcm9tICcuL21vZGFsLmpzJ1xuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaHRtbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI2NvbnRlbnQnKVxuXG4gICAgY29uc3QgaGVhZGVyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdoZWFkZXInLCAnZGl2Jyk7XG4gICAgY29uc3Qgc2lkZWJhckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnc2lkZWJhcicsICdkaXYnKTtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2dyaWQnLCAnZGl2Jyk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MIChoZWFkZXJDb250ZW50LCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoZ3JpZENvbnRhaW5lciwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2gyJywgJ1RvIERvIExpc3QnKSwgaGVhZGVyQ29udGVudCk7XG5cbiAgICBjb25zdCBhZGRQcm9qQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFByb2plY3QnLCAnYWRkLXByb2plY3QnKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRQcm9qQnRuLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoYWRkUHJvakJ0biwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2Quc2hvd1Byb2pNb2RhbCgpKTtcblxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgVGFzaycsICdhZGQtdGFzaycpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFRhc2tCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRUYXNrQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93VGFza01vZGFsKCkpO1xuXG4gICAgY29uc3QgY29uZmlybVRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1UYXNrXCIpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtVGFzaywgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtVGFzayBcbiAgICAoZXZlbnQsIGdyaWRDb250YWluZXIpKTtcblxuICAgIGNvbnN0IGNvbmZpcm1Qcm9qID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUHJvalwiKTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybVByb2osICdjbGljaycsIChldmVudCkgPT4gbW9kYWxNb2QuY29uZmlybVByb2ogXG4gICAgKGV2ZW50LCBzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcikpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDMnLCAnUHJvamVjdHMnKSwgc2lkZWJhckNvbnRlbnQpO1xuXG4gICAgY29uc3QgdG9kYXlUYXNrcyA9IFtdO1xuICAgIGNvbnN0IGNsZWFuID0gdGFza01vZC5jcmVhdGVUYXNrICgnQ2xlYW4nLCAnY2xlYW4geW91ciByb29tJywgRGF0ZSgpLCAnTG93JywgdG9kYXlUYXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoY2xlYW4sIHRvZGF5VGFza3MpO1xuICAgIGNvbnN0IHN1cmYgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdTdXJmJywgJ2hpZ2ggdGlkZSBhdCAzUE0nLCBEYXRlKCksICdIaWdoJywgdG9kYXlUYXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoc3VyZiwgdG9kYXlUYXNrcyk7XG5cbiAgICBjb25zdCBtb3JvY2NvVGFza3MgPSBbXTtcbiAgICBjb25zdCBjb29rID0gdGFza01vZC5jcmVhdGVUYXNrICgnQ29vaycsICd0YWdpbmUnLCBEYXRlKCksICdNZWRpdW0nLCBtb3JvY2NvVGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKGNvb2ssIG1vcm9jY29UYXNrcyk7XG5cbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ01vcm9jY28nLCBtb3JvY2NvVGFza3MpKTtcbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ1RvZGF5JywgdG9kYXlUYXNrcykpO1xuXG4gICAgdXNlRE9NLnJlbmRlckRpc3BsYXkgKHByb2plY3RNb2QucHJvamVjdHNbMF0sIGdyaWRDb250YWluZXIpO1xuICAgIHVzZURPTS5yZW5kZXJTaWRlYmFyIChwcm9qZWN0TW9kLnByb2plY3RzLCBzaWRlYmFyQ29udGVudCwgJ2RpdicsIGdyaWRDb250YWluZXIpXG5cbiAgICAvL25lZWQgdG8gcmUtcmVuZGVyIHRoaXMgYWZ0ZXIgYSBuZXcgcHJvamVjIGlzIGFkZGVkXG4gICAgLy9jcm9zcyB0aGlzIGJyaWRnZSB3aGVuIHdvcmtpbmcgb24gYWRkIHByb2ogYnRuXG4gICAgbW9kYWxNb2QuY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9