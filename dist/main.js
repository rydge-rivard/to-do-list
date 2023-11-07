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
            createImg ('./img/delete.svg', '20px', 'Trash bin icon.', element)
            const taskDetails = createHiddenDetails (task, element);
            bindEvents (element, 'click', () => toggleDetails (task, taskDetails));
        });
    }

    function createImg (src, width, alt, parent) {
        const element = document.createElement('img')
        element.setAttribute("src", src);
        element.setAttribute("width", width);
        element.setAttribute("alt", alt);
        parent.appendChild(element);
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
        addToHTML (active, location);
        _tasks_js__WEBPACK_IMPORTED_MODULE_0__.taskMod.addTaskData (obj, active);
        return active;
    }

    function refreshDisplay (project, parent) {
        deleteDisplay ();
        renderDisplay (project, parent);
    }

    function renderDisplay (project, parent) {
        const displayContent = useDOM.createContainer ('display', 'div');
        addToHTML (displayContent, parent);

        appendProj (project, displayContent, 'h3');
        appendAllTasks (project.taskList, displayContent, 'div');
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

    function capFirstLetter (str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
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
        capFirstLetter: capFirstLetter,
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

    function createTask (title, description, due, priority, id) {
        return {title, description, due, priority, id}
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
            if (key !== 'id') {
                const field = `${_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.capFirstLetter (key)}: ${obj[key]}`;
                _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('div', field), parent);
            } 
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
    const clean = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Clean', 'clean your room', '2023-12-31', 'Low', todayTasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (clean, todayTasks);
    const surf = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Surf', 'high tide at 3PM', '2023-12-31', 'High', todayTasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (surf, todayTasks);

    const moroccoTasks = [];
    const cook = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Cook', 'tagine', '2023-12-31', 'Medium', moroccoTasks.length);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Ly90by1kby1saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3VzZURPTX0gXG5pbXBvcnQgeyB0YXNrTW9kIH0gZnJvbSBcIi4vdGFza3MuanNcIjtcblxuY29uc3QgdXNlRE9NID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgdGV4dCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzc1RleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0LCBjc3NDbGFzcykge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvSFRNTCAoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIgKGNzc0NsYXNzLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvaiAob2JqLCBsb2NhdGlvbiwgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIG9iai50aXRsZSlcbiAgICAgICAgYWRkVG9IVE1MIChuZXdFbGVtZW50LCBsb2NhdGlvbik7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEFsbFRhc2tzICh0YXNrQXJyLCBsb2NhdGlvbikge1xuICAgICAgICB0YXNrQXJyLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXBwZW5kUHJvaiAodGFzaywgbG9jYXRpb24sICdkaXYnKTtcbiAgICAgICAgICAgIGNyZWF0ZUltZyAoJy4vaW1nL2RlbGV0ZS5zdmcnLCAnMjBweCcsICdUcmFzaCBiaW4gaWNvbi4nLCBlbGVtZW50KVxuICAgICAgICAgICAgY29uc3QgdGFza0RldGFpbHMgPSBjcmVhdGVIaWRkZW5EZXRhaWxzICh0YXNrLCBlbGVtZW50KTtcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKGVsZW1lbnQsICdjbGljaycsICgpID0+IHRvZ2dsZURldGFpbHMgKHRhc2ssIHRhc2tEZXRhaWxzKSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUltZyAoc3JjLCB3aWR0aCwgYWx0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNyYyk7XG4gICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImFsdFwiLCBhbHQpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyAoZWxlbWVudCwgZXZlbnQsIGFjdGlvbikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGV0YWlscyAob2JqLCBlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhpZGRlbkRldGFpbHMgKG9iaiwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2FjdGl2ZScsICdkaXYnKTtcbiAgICAgICAgLy8gYWN0aXZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYWRkVG9IVE1MIChhY3RpdmUsIGxvY2F0aW9uKTtcbiAgICAgICAgdGFza01vZC5hZGRUYXNrRGF0YSAob2JqLCBhY3RpdmUpO1xuICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgZGVsZXRlRGlzcGxheSAoKTtcbiAgICAgICAgcmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheUNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZGlzcGxheScsICdkaXYnKTtcbiAgICAgICAgYWRkVG9IVE1MIChkaXNwbGF5Q29udGVudCwgcGFyZW50KTtcblxuICAgICAgICBhcHBlbmRQcm9qIChwcm9qZWN0LCBkaXNwbGF5Q29udGVudCwgJ2gzJyk7XG4gICAgICAgIGFwcGVuZEFsbFRhc2tzIChwcm9qZWN0LnRhc2tMaXN0LCBkaXNwbGF5Q29udGVudCwgJ2RpdicpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hTaWRlYmFyIChwcm9qQXJyLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGRlbGV0ZVNpZGViYXIgKCk7XG4gICAgICAgIHJlZnJlc2hTaWRlYmFyIChwcm9qQXJyLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50KTtcbiAgICB9XG4gXG4gICAgZnVuY3Rpb24gcmVuZGVyU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCwgZGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgICBwcm9qQXJyLmZvckVhY2gocHJvaiA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qRGl2ID0gYXBwZW5kUHJvaiAocHJvaiwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudClcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKHByb2pEaXYsICdjbGljaycsICgpID0+IHJlZnJlc2hEaXNwbGF5IChwcm9qLCBkaXNwbGF5Q29udGFpbmVyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBkZWxldGVEaXNwbGF5ICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy5kaXNwbGF5JykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlU2lkZWJhciAoKSB7XG4gICAgICAgIGNvbnN0IHNpZGViYXJEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCAoJy5zaWRlYmFyID4gZGl2Jyk7XG4gICAgICAgIHNpZGViYXJEaXZzLmZvckVhY2gocHJvaiA9PiBwcm9qLnJlbW92ZSgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXBGaXJzdExldHRlciAoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGV4dEVsZW1lbnQ6IGNyZWF0ZVRleHRFbGVtZW50LFxuICAgICAgICBhZGRUb0hUTUw6IGFkZFRvSFRNTCxcbiAgICAgICAgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVDb250YWluZXIsXG4gICAgICAgIGFwcGVuZFByb2o6IGFwcGVuZFByb2osXG4gICAgICAgIGFwcGVuZEFsbFRhc2tzOiBhcHBlbmRBbGxUYXNrcyxcbiAgICAgICAgY3JlYXRlQ2xhc3NUZXh0RWxlbWVudDogY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCxcbiAgICAgICAgYmluZEV2ZW50czogYmluZEV2ZW50cyxcbiAgICAgICAgcmVuZGVyRGlzcGxheTogcmVuZGVyRGlzcGxheSxcbiAgICAgICAgZGVsZXRlRGlzcGxheTogZGVsZXRlRGlzcGxheSxcbiAgICAgICAgcmVuZGVyU2lkZWJhcjogcmVuZGVyU2lkZWJhcixcbiAgICAgICAgcmVmcmVzaERpc3BsYXk6IHJlZnJlc2hEaXNwbGF5LFxuICAgICAgICBkZWxldGVTaWRlYmFyOiBkZWxldGVTaWRlYmFyLFxuICAgICAgICByZWZyZXNoU2lkZWJhcjogcmVmcmVzaFNpZGViYXIsXG4gICAgICAgIGNhcEZpcnN0TGV0dGVyOiBjYXBGaXJzdExldHRlcixcbiAgICB9XG5cbn0pKCk7IiwiZXhwb3J0IHttb2RhbE1vZH1cbmltcG9ydCB7IHVzZURPTSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tIFwiLi90YXNrc1wiO1xuXG5jb25zdCBtb2RhbE1vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy50YXNrLWRpYWxvZycpO1xuICAgIGNvbnN0IHRhc2tJbnB1dHMgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwgKCdpbnB1dCcpO1xuICAgIGNvbnN0IHNlbGVjdCA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNwcm9qZWN0LXNlbCcpO1xuICAgIGNvbnN0IHRhc2tEZXNjciA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNkZXNjcicpO1xuICAgIGNvbnN0IHRhc2tQcmlvICA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNwcmlvcml0eScpO1xuXG4gICAgY29uc3QgcHJvakRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcucHJvai1kaWFsb2cnKTtcbiAgICBjb25zdCBwcm9qSW5wdXRzID0gcHJvakRpYWxvZy5xdWVyeVNlbGVjdG9yICgnaW5wdXQnKTtcblxuICAgIGNvbnN0IGFsbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKCdpbnB1dCcpO1xuXG4gICAgZnVuY3Rpb24gc2hvd1Rhc2tNb2RhbCAoKSB7XG4gICAgICAgIHRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1Byb2pNb2RhbCAoKSB7XG4gICAgICAgIHByb2pEaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdE9wdGlvbnMgKCkge1xuICAgICAgICByZW1vdmVQcm9qT3B0aW9ucyAoKVxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHByb2plY3RNb2QucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ29wdGlvbicsIHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAob3B0aW9uLCBzZWxlY3QpO1xuICAgICAgICAgICAgaSArPSAxO1xuICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2pPcHRpb25zICgpIHtcbiAgICAgICAgY29uc3QgcHJvak9wdGlvbnMgPSBzZWxlY3QucXVlcnlTZWxlY3RvckFsbCAoJ29wdGlvbicpO1xuICAgICAgICBwcm9qT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBvcHRpb24ucmVtb3ZlKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpcm1UYXNrIChldmVudCwgcGFyZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ICgpO1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZmluZFNlbGVjdGVkUHJvaiAoKTtcbiAgICAgICAgdGFza01vZC5hZGRUb1Byb2plY3QgKHByb2plY3QudGFza0xpc3QsIGNyZWF0ZVRhc2sgKHRhc2tJbnB1dHMsIHByb2plY3QpLCBwcm9qZWN0LCBwYXJlbnQpO1xuICAgICAgICBjbG9zZU1vZGFsICh0YXNrRGlhbG9nKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZFByb2ogKCkge1xuICAgICAgICByZXR1cm4gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yICgnI3Byb2plY3Qtc2VsJykudmFsdWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZmluZFNlbGVjdGVkUHJvaiAoKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdGVkUHJvaiA9IGdldFNlbGVjdGVkUHJvaiAoKTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcm9qZWN0TW9kLnByb2plY3RzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAocHJvamVjdE1vZC5wcm9qZWN0c1tpXS50aXRsZSA9PT0gc2VsZWN0ZWRQcm9qKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByb2plY3RNb2QucHJvamVjdHNbaV07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gc29ydElucHV0cyAoaW5wdXRBcnIpIHtcbiAgICAgICAgY29uc3Qgb2JqQXJyID0gW107XG4gICAgICAgIGlucHV0QXJyLmZvckVhY2goaW5wdXQgPT4gb2JqQXJyLnB1c2ggKGlucHV0LnZhbHVlKSk7XG4gICAgICAgIHJldHVybiBvYmpBcnI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAoaW5wdXRBcnIsIHByb2plY3QpIHtcbiAgICAgICAgY29uc3QgaW5wdXRWYWx1ZXMgPSBzb3J0SW5wdXRzKGlucHV0QXJyKTtcbiAgICAgICAgYWRkTW9kYWxOb25JbnB1dHMgKGlucHV0VmFsdWVzKVxuICAgICAgICBjb25zdCBuZXdUYXNrID0gdGFza01vZC5jcmVhdGVUYXNrKGlucHV0VmFsdWVzWzBdLCBcbiAgICAgICAgICAgIGlucHV0VmFsdWVzWzJdLCBpbnB1dFZhbHVlc1sxXSwgaW5wdXRWYWx1ZXNbM10sIHByb2plY3QudGFza0xpc3QubGVuZ3RoKTtcbiAgICAgICAgcmV0dXJuIG5ld1Rhc2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkTW9kYWxOb25JbnB1dHMgKHZhbHVlQXJyKSB7XG4gICAgICAgIHZhbHVlQXJyLnB1c2ggKHRhc2tEZXNjci52YWx1ZSk7XG4gICAgICAgIHZhbHVlQXJyLnB1c2ggKHRhc2tQcmlvLnZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsIChtb2RhbCkge1xuICAgICAgICBhbGxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtUHJvaiAoZXZlbnQsIHByb2pDb250YWluZXIsIGRpc3BsYXlDb250YWluZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgKCk7XG4gICAgICAgIHByb2plY3RNb2QuY3JlYXRlRnJvbUJ0biAocHJvaklucHV0cy52YWx1ZSwgcHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgICAgIHVzZURPTS5kZWxldGVTaWRlYmFyICgpO1xuICAgICAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgcHJvakNvbnRhaW5lciwgJ2RpdicsIGRpc3BsYXlDb250YWluZXIpO1xuICAgICAgICBjbG9zZU1vZGFsIChwcm9qRGlhbG9nKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIHNob3dUYXNrTW9kYWw6IHNob3dUYXNrTW9kYWwsXG4gICAgICAgIHNob3dQcm9qTW9kYWw6IHNob3dQcm9qTW9kYWwsXG4gICAgICAgIGNvbmZpcm1UYXNrOiBjb25maXJtVGFzayxcbiAgICAgICAgY3JlYXRlUHJvamVjdE9wdGlvbnM6IGNyZWF0ZVByb2plY3RPcHRpb25zLFxuICAgICAgICBjb25maXJtUHJvaiwgY29uZmlybVByb2osXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7cHJvamVjdE1vZH07XG5cbmNvbnN0IHByb2plY3RNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QgKHRpdGxlLCB0YXNrTGlzdCkge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCB0YXNrTGlzdH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGcm9tQnRuICh0aXRsZSwgcHJvamVjdHNBcnIpIHtcbiAgICAgICAgcHJvamVjdHNBcnIucHVzaCAoY3JlYXRlUHJvamVjdCAodGl0bGUsIFtdKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdDogY3JlYXRlUHJvamVjdCxcbiAgICAgICAgY3JlYXRlRnJvbUJ0biwgY3JlYXRlRnJvbUJ0bixcbiAgICAgICAgcHJvamVjdHMsXG4gICAgfVxufSkoKTsiLCJleHBvcnQge3Rhc2tNb2R9O1xuaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuXG5cbmNvbnN0IHRhc2tNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWUsIHByaW9yaXR5LCBpZCkge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlLCBwcmlvcml0eSwgaWR9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNzaWduVGFzayAodGFza09iaiwgdGFza0Fycikge1xuICAgICAgICB0YXNrQXJyLnB1c2godGFza09iaik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9Qcm9qZWN0ICh0YXNrQXJyLCB0YXNrT2JqLCBwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoICh0YXNrT2JqKTtcbiAgICAgICAgdXNlRE9NLnJlZnJlc2hEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRhc2tEYXRhIChvYmosIHBhcmVudCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09ICdpZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IGAke3VzZURPTS5jYXBGaXJzdExldHRlciAoa2V5KX06ICR7b2JqW2tleV19YDtcbiAgICAgICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCBmaWVsZCksIHBhcmVudCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGFzazogY3JlYXRlVGFzayxcbiAgICAgICAgYXNzaWduVGFzazogYXNzaWduVGFzayxcbiAgICAgICAgYWRkVGFza0RhdGE6IGFkZFRhc2tEYXRhLFxuICAgICAgICBhZGRUb1Byb2plY3Q6IGFkZFRvUHJvamVjdCxcbiAgICB9XG5cbn0pKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3VzZURPTX0gZnJvbSAnLi9kb20uanMnXG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gJy4vdGFza3MuanMnXG5pbXBvcnQge21vZGFsTW9kfSBmcm9tICcuL21vZGFsLmpzJ1xuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaHRtbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI2NvbnRlbnQnKVxuXG4gICAgY29uc3QgaGVhZGVyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdoZWFkZXInLCAnZGl2Jyk7XG4gICAgY29uc3Qgc2lkZWJhckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnc2lkZWJhcicsICdkaXYnKTtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2dyaWQnLCAnZGl2Jyk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MIChoZWFkZXJDb250ZW50LCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoZ3JpZENvbnRhaW5lciwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2gyJywgJ1RvIERvIExpc3QnKSwgaGVhZGVyQ29udGVudCk7XG5cbiAgICBjb25zdCBhZGRQcm9qQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFByb2plY3QnLCAnYWRkLXByb2plY3QnKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRQcm9qQnRuLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoYWRkUHJvakJ0biwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2Quc2hvd1Byb2pNb2RhbCgpKTtcblxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgVGFzaycsICdhZGQtdGFzaycpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFRhc2tCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRUYXNrQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93VGFza01vZGFsKCkpO1xuXG4gICAgY29uc3QgY29uZmlybVRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1UYXNrXCIpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtVGFzaywgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtVGFzayBcbiAgICAoZXZlbnQsIGdyaWRDb250YWluZXIpKTtcblxuICAgIGNvbnN0IGNvbmZpcm1Qcm9qID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUHJvalwiKTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybVByb2osICdjbGljaycsIChldmVudCkgPT4gbW9kYWxNb2QuY29uZmlybVByb2ogXG4gICAgKGV2ZW50LCBzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcikpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDMnLCAnUHJvamVjdHMnKSwgc2lkZWJhckNvbnRlbnQpO1xuXG4gICAgY29uc3QgdG9kYXlUYXNrcyA9IFtdO1xuICAgIGNvbnN0IGNsZWFuID0gdGFza01vZC5jcmVhdGVUYXNrICgnQ2xlYW4nLCAnY2xlYW4geW91ciByb29tJywgJzIwMjMtMTItMzEnLCAnTG93JywgdG9kYXlUYXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoY2xlYW4sIHRvZGF5VGFza3MpO1xuICAgIGNvbnN0IHN1cmYgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdTdXJmJywgJ2hpZ2ggdGlkZSBhdCAzUE0nLCAnMjAyMy0xMi0zMScsICdIaWdoJywgdG9kYXlUYXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoc3VyZiwgdG9kYXlUYXNrcyk7XG5cbiAgICBjb25zdCBtb3JvY2NvVGFza3MgPSBbXTtcbiAgICBjb25zdCBjb29rID0gdGFza01vZC5jcmVhdGVUYXNrICgnQ29vaycsICd0YWdpbmUnLCAnMjAyMy0xMi0zMScsICdNZWRpdW0nLCBtb3JvY2NvVGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKGNvb2ssIG1vcm9jY29UYXNrcyk7XG5cbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ01vcm9jY28nLCBtb3JvY2NvVGFza3MpKTtcbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ1RvZGF5JywgdG9kYXlUYXNrcykpO1xuXG4gICAgdXNlRE9NLnJlbmRlckRpc3BsYXkgKHByb2plY3RNb2QucHJvamVjdHNbMF0sIGdyaWRDb250YWluZXIpO1xuICAgIHVzZURPTS5yZW5kZXJTaWRlYmFyIChwcm9qZWN0TW9kLnByb2plY3RzLCBzaWRlYmFyQ29udGVudCwgJ2RpdicsIGdyaWRDb250YWluZXIpXG5cbiAgICAvL25lZWQgdG8gcmUtcmVuZGVyIHRoaXMgYWZ0ZXIgYSBuZXcgcHJvamVjIGlzIGFkZGVkXG4gICAgLy9jcm9zcyB0aGlzIGJyaWRnZSB3aGVuIHdvcmtpbmcgb24gYWRkIHByb2ogYnRuXG4gICAgbW9kYWxNb2QuY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9