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
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./tasks.js */ "./src/tasks.js");
 
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

    function appendAllTasks (project, taskArr, location) {
        taskArr.forEach(task => {
            const rowCont  = createContainer ('row-cont', 'div');
            addToHTML (rowCont, location);
            const rowIcons = createTaskRow (rowCont);
            const taskTitle = appendProj (task, rowIcons, 'div');
            const deleteIcon = createImg ('./img/delete.svg', '20px', 'Trash bin icon.', rowIcons);
            const taskDetails = createHiddenDetails (task, rowCont);
            bindEvents (taskTitle, 'click', () => toggleDetails (task, taskDetails));
            bindEvents (taskDetails, 'click', () => toggleDetails (task, taskDetails));
            bindEvents (deleteIcon, 'click', () => deleteTask (project, task, rowCont));
        });
    }

    function createTaskRow (parent) {
        const rowIcons  = createContainer ('row-icon', 'div');
        addToHTML (rowIcons, parent);
        return rowIcons;
    }

    function createImg (src, width, alt, parent) {
        const img = document.createElement('img')
        img.setAttribute("src", src);
        img.setAttribute("width", width);
        img.setAttribute("alt", alt);
        parent.appendChild(img);
        return img;
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

    function deleteTask (project, task, container) {
        console.log (project);
        console.log ('Remove from array.');
        _projects_js__WEBPACK_IMPORTED_MODULE_0__.projectMod.removeObjTask (project.taskList, task.id);
        console.log (project);
        container.remove ();
    }

    function createHiddenDetails (obj, location) {
        const active = useDOM.createContainer ('active', 'div');
        // active.style.display = "none";
        addToHTML (active, location);
        _tasks_js__WEBPACK_IMPORTED_MODULE_1__.taskMod.addTaskData (obj, active);
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
        appendAllTasks (project, project.taskList, displayContent);
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
            inputValues[2], inputValues[1], inputValues[3], 
            `${inputValues[0]}-id#${project.taskList.length}`);
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

    function removeObjTask (projectTaskList, taskId) {
        projectTaskList.forEach(task => {
            task.id === taskId ? projectTaskList.splice(projectTaskList.indexOf(task), 1) : false;
        });
    }

    return {
        createProject: createProject,
        createFromBtn, createFromBtn,
        removeObjTask: removeObjTask,
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
    const clean = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Clean', 'clean your room', '2023-12-31', 'Low', `Clean-id#0`);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (clean, todayTasks);
    const surf = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Surf', 'high tide at 3PM', '2023-12-31', 'High', `Surf-id#1`);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (surf, todayTasks);

    const moroccoTasks = [];
    const cook = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Cook', 'tagine', '2023-12-31', 'Medium', `Cook-id#0`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O0FBQWU7QUFDZixDQUEyQztBQUNOOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9EQUFVO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOENBQU87QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDakpnQjtBQUNqQixDQUErQjtBQUNPO0FBQ047O0FBRWhDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaURBQVU7QUFDbEIsMkJBQTJCLHdDQUFNO0FBQ2pDLFlBQVksd0NBQU07QUFDbEI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyQ0FBTztBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsSUFBSSxpREFBVSxrQkFBa0I7QUFDeEQsZ0JBQWdCLGlEQUFVO0FBQzFCLHVCQUF1QixpREFBVTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsMkNBQU87QUFDL0I7QUFDQSxlQUFlLGVBQWUsTUFBTSx3QkFBd0I7QUFDNUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSxpREFBVSxrQ0FBa0MsaURBQVU7QUFDOUQsUUFBUSx3Q0FBTTtBQUNkLFFBQVEsd0NBQU0sZ0JBQWdCLGlEQUFVO0FBQ3hDO0FBQ0EsOEJBQThCLGlEQUFVO0FBQ3hDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDdkdtQjs7QUFFcEI7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxQmdCO0FBQ2M7OztBQUcvQjs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsMkNBQU07QUFDZDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQ0FBaUMsMkNBQU0sc0JBQXNCLElBQUksU0FBUztBQUMxRSxnQkFBZ0IsMkNBQU0sWUFBWSwyQ0FBTTtBQUN4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7OztVQ25DRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTitCO0FBQ1M7QUFDTjtBQUNDOztBQUVuQztBQUNBOztBQUVBLDBCQUEwQiwyQ0FBTTtBQUNoQywyQkFBMkIsMkNBQU07QUFDakMsMEJBQTBCLDJDQUFNOztBQUVoQyxJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU07O0FBRVYsSUFBSSwyQ0FBTSxZQUFZLDJDQUFNOztBQUU1Qix1QkFBdUIsMkNBQU07QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRCx1QkFBdUIsMkNBQU07QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRDtBQUNBLElBQUksMkNBQU0sOENBQThDLCtDQUFRO0FBQ2hFOztBQUVBO0FBQ0EsSUFBSSwyQ0FBTSw4Q0FBOEMsK0NBQVE7QUFDaEU7O0FBRUEsSUFBSSwyQ0FBTSxZQUFZLDJDQUFNOztBQUU1QjtBQUNBLGtCQUFrQiw4Q0FBTztBQUN6QixJQUFJLDhDQUFPO0FBQ1gsaUJBQWlCLDhDQUFPO0FBQ3hCLElBQUksOENBQU87O0FBRVg7QUFDQSxpQkFBaUIsOENBQU87QUFDeEIsSUFBSSw4Q0FBTzs7QUFFWCxJQUFJLG9EQUFVLGdCQUFnQixvREFBVTtBQUN4QyxJQUFJLG9EQUFVLGdCQUFnQixvREFBVTs7QUFFeEMsSUFBSSwyQ0FBTSxnQkFBZ0Isb0RBQVU7QUFDcEMsSUFBSSwyQ0FBTSxnQkFBZ0Isb0RBQVU7O0FBRXBDO0FBQ0E7QUFDQSxJQUFJLCtDQUFRLHVCQUF1QixvREFBVTtBQUM3QztBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3VzZURPTX0gXG5pbXBvcnQgeyBwcm9qZWN0TW9kIH0gZnJvbSBcIi4vcHJvamVjdHMuanNcIjtcbmltcG9ydCB7IHRhc2tNb2QgfSBmcm9tIFwiLi90YXNrcy5qc1wiO1xuXG5jb25zdCB1c2VET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQsIGNzc0NsYXNzKSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9IVE1MIChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoY3NzQ2xhc3MsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qIChvYmosIGxvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgb2JqLnRpdGxlKVxuICAgICAgICBhZGRUb0hUTUwgKG5ld0VsZW1lbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kQWxsVGFza3MgKHByb2plY3QsIHRhc2tBcnIsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRhc2tBcnIuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0NvbnQgID0gY3JlYXRlQ29udGFpbmVyICgncm93LWNvbnQnLCAnZGl2Jyk7XG4gICAgICAgICAgICBhZGRUb0hUTUwgKHJvd0NvbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHJvd0ljb25zID0gY3JlYXRlVGFza1JvdyAocm93Q29udCk7XG4gICAgICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBhcHBlbmRQcm9qICh0YXNrLCByb3dJY29ucywgJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGNyZWF0ZUltZyAoJy4vaW1nL2RlbGV0ZS5zdmcnLCAnMjBweCcsICdUcmFzaCBiaW4gaWNvbi4nLCByb3dJY29ucyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrRGV0YWlscyA9IGNyZWF0ZUhpZGRlbkRldGFpbHMgKHRhc2ssIHJvd0NvbnQpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAodGFza1RpdGxlLCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCB0YXNrRGV0YWlscykpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAodGFza0RldGFpbHMsICdjbGljaycsICgpID0+IHRvZ2dsZURldGFpbHMgKHRhc2ssIHRhc2tEZXRhaWxzKSk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChkZWxldGVJY29uLCAnY2xpY2snLCAoKSA9PiBkZWxldGVUYXNrIChwcm9qZWN0LCB0YXNrLCByb3dDb250KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tSb3cgKHBhcmVudCkge1xuICAgICAgICBjb25zdCByb3dJY29ucyAgPSBjcmVhdGVDb250YWluZXIgKCdyb3ctaWNvbicsICdkaXYnKTtcbiAgICAgICAgYWRkVG9IVE1MIChyb3dJY29ucywgcGFyZW50KTtcbiAgICAgICAgcmV0dXJuIHJvd0ljb25zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUltZyAoc3JjLCB3aWR0aCwgYWx0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGFsdCk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMgKGVsZW1lbnQsIGV2ZW50LCBhY3Rpb24pIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZURldGFpbHMgKG9iaiwgZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrIChwcm9qZWN0LCB0YXNrLCBjb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2cgKHByb2plY3QpO1xuICAgICAgICBjb25zb2xlLmxvZyAoJ1JlbW92ZSBmcm9tIGFycmF5LicpO1xuICAgICAgICBwcm9qZWN0TW9kLnJlbW92ZU9ialRhc2sgKHByb2plY3QudGFza0xpc3QsIHRhc2suaWQpO1xuICAgICAgICBjb25zb2xlLmxvZyAocHJvamVjdCk7XG4gICAgICAgIGNvbnRhaW5lci5yZW1vdmUgKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSGlkZGVuRGV0YWlscyAob2JqLCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnYWN0aXZlJywgJ2RpdicpO1xuICAgICAgICAvLyBhY3RpdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhZGRUb0hUTUwgKGFjdGl2ZSwgbG9jYXRpb24pO1xuICAgICAgICB0YXNrTW9kLmFkZFRhc2tEYXRhIChvYmosIGFjdGl2ZSk7XG4gICAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaERpc3BsYXkgKHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICBkZWxldGVEaXNwbGF5ICgpO1xuICAgICAgICByZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICBjb25zdCBkaXNwbGF5Q29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdkaXNwbGF5JywgJ2RpdicpO1xuICAgICAgICBhZGRUb0hUTUwgKGRpc3BsYXlDb250ZW50LCBwYXJlbnQpO1xuXG4gICAgICAgIGFwcGVuZFByb2ogKHByb2plY3QsIGRpc3BsYXlDb250ZW50LCAnaDMnKTtcbiAgICAgICAgYXBwZW5kQWxsVGFza3MgKHByb2plY3QsIHByb2plY3QudGFza0xpc3QsIGRpc3BsYXlDb250ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCkge1xuICAgICAgICBkZWxldGVTaWRlYmFyICgpO1xuICAgICAgICByZWZyZXNoU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCk7XG4gICAgfVxuIFxuICAgIGZ1bmN0aW9uIHJlbmRlclNpZGViYXIgKHByb2pBcnIsIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQsIGRpc3BsYXlDb250YWluZXIpIHtcbiAgICAgICAgcHJvakFyci5mb3JFYWNoKHByb2ogPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvakRpdiA9IGFwcGVuZFByb2ogKHByb2osIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQpXG4gICAgICAgICAgICBiaW5kRXZlbnRzIChwcm9qRGl2LCAnY2xpY2snLCAoKSA9PiByZWZyZXNoRGlzcGxheSAocHJvaiwgZGlzcGxheUNvbnRhaW5lcikpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZXRlRGlzcGxheSAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcuZGlzcGxheScpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZVNpZGViYXIgKCkge1xuICAgICAgICBjb25zdCBzaWRlYmFyRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKCcuc2lkZWJhciA+IGRpdicpO1xuICAgICAgICBzaWRlYmFyRGl2cy5mb3JFYWNoKHByb2ogPT4gcHJvai5yZW1vdmUoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FwRmlyc3RMZXR0ZXIgKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRleHRFbGVtZW50OiBjcmVhdGVUZXh0RWxlbWVudCxcbiAgICAgICAgYWRkVG9IVE1MOiBhZGRUb0hUTUwsXG4gICAgICAgIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQ29udGFpbmVyLFxuICAgICAgICBhcHBlbmRQcm9qOiBhcHBlbmRQcm9qLFxuICAgICAgICBhcHBlbmRBbGxUYXNrczogYXBwZW5kQWxsVGFza3MsXG4gICAgICAgIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQ6IGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQsXG4gICAgICAgIGJpbmRFdmVudHM6IGJpbmRFdmVudHMsXG4gICAgICAgIHJlbmRlckRpc3BsYXk6IHJlbmRlckRpc3BsYXksXG4gICAgICAgIGRlbGV0ZURpc3BsYXk6IGRlbGV0ZURpc3BsYXksXG4gICAgICAgIHJlbmRlclNpZGViYXI6IHJlbmRlclNpZGViYXIsXG4gICAgICAgIHJlZnJlc2hEaXNwbGF5OiByZWZyZXNoRGlzcGxheSxcbiAgICAgICAgZGVsZXRlU2lkZWJhcjogZGVsZXRlU2lkZWJhcixcbiAgICAgICAgcmVmcmVzaFNpZGViYXI6IHJlZnJlc2hTaWRlYmFyLFxuICAgICAgICBjYXBGaXJzdExldHRlcjogY2FwRmlyc3RMZXR0ZXIsXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7bW9kYWxNb2R9XG5pbXBvcnQgeyB1c2VET00gfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7dGFza01vZH0gZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgbW9kYWxNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgdGFza0RpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcudGFzay1kaWFsb2cnKTtcbiAgICBjb25zdCB0YXNrSW5wdXRzID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yQWxsICgnaW5wdXQnKTtcbiAgICBjb25zdCBzZWxlY3QgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjcHJvamVjdC1zZWwnKTtcbiAgICBjb25zdCB0YXNrRGVzY3IgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjZGVzY3InKTtcbiAgICBjb25zdCB0YXNrUHJpbyAgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjcHJpb3JpdHknKTtcblxuICAgIGNvbnN0IHByb2pEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLnByb2otZGlhbG9nJyk7XG4gICAgY29uc3QgcHJvaklucHV0cyA9IHByb2pEaWFsb2cucXVlcnlTZWxlY3RvciAoJ2lucHV0Jyk7XG5cbiAgICBjb25zdCBhbGxJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICgnaW5wdXQnKTtcblxuICAgIGZ1bmN0aW9uIHNob3dUYXNrTW9kYWwgKCkge1xuICAgICAgICB0YXNrRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dQcm9qTW9kYWwgKCkge1xuICAgICAgICBwcm9qRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RPcHRpb25zICgpIHtcbiAgICAgICAgcmVtb3ZlUHJvak9wdGlvbnMgKClcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBwcm9qZWN0TW9kLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSB1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdvcHRpb24nLCBwcm9qZWN0LnRpdGxlKTtcbiAgICAgICAgICAgIHVzZURPTS5hZGRUb0hUTUwgKG9wdGlvbiwgc2VsZWN0KTtcbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qT3B0aW9ucyAoKSB7XG4gICAgICAgIGNvbnN0IHByb2pPcHRpb25zID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwgKCdvcHRpb24nKTtcbiAgICAgICAgcHJvak9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLnJlbW92ZSgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtVGFzayAoZXZlbnQsIHBhcmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCAoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGZpbmRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIHRhc2tNb2QuYWRkVG9Qcm9qZWN0IChwcm9qZWN0LnRhc2tMaXN0LCBjcmVhdGVUYXNrICh0YXNrSW5wdXRzLCBwcm9qZWN0KSwgcHJvamVjdCwgcGFyZW50KTtcbiAgICAgICAgY2xvc2VNb2RhbCAodGFza0RpYWxvZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgcmV0dXJuIHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNwcm9qZWN0LXNlbCcpLnZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRTZWxlY3RlZFByb2ogKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2ogPSBnZXRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdE1vZC5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RNb2QucHJvamVjdHNbaV0udGl0bGUgPT09IHNlbGVjdGVkUHJvaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0TW9kLnByb2plY3RzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNvcnRJbnB1dHMgKGlucHV0QXJyKSB7XG4gICAgICAgIGNvbnN0IG9iakFyciA9IFtdO1xuICAgICAgICBpbnB1dEFyci5mb3JFYWNoKGlucHV0ID0+IG9iakFyci5wdXNoIChpbnB1dC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gb2JqQXJyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKGlucHV0QXJyLCBwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWVzID0gc29ydElucHV0cyhpbnB1dEFycik7XG4gICAgICAgIGFkZE1vZGFsTm9uSW5wdXRzIChpbnB1dFZhbHVlcylcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHRhc2tNb2QuY3JlYXRlVGFzayhpbnB1dFZhbHVlc1swXSwgXG4gICAgICAgICAgICBpbnB1dFZhbHVlc1syXSwgaW5wdXRWYWx1ZXNbMV0sIGlucHV0VmFsdWVzWzNdLCBcbiAgICAgICAgICAgIGAke2lucHV0VmFsdWVzWzBdfS1pZCMke3Byb2plY3QudGFza0xpc3QubGVuZ3RofWApO1xuICAgICAgICByZXR1cm4gbmV3VGFzaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRNb2RhbE5vbklucHV0cyAodmFsdWVBcnIpIHtcbiAgICAgICAgdmFsdWVBcnIucHVzaCAodGFza0Rlc2NyLnZhbHVlKTtcbiAgICAgICAgdmFsdWVBcnIucHVzaCAodGFza1ByaW8udmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwgKG1vZGFsKSB7XG4gICAgICAgIGFsbElucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gJycpO1xuICAgICAgICBtb2RhbC5jbG9zZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpcm1Qcm9qIChldmVudCwgcHJvakNvbnRhaW5lciwgZGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCAoKTtcbiAgICAgICAgcHJvamVjdE1vZC5jcmVhdGVGcm9tQnRuIChwcm9qSW5wdXRzLnZhbHVlLCBwcm9qZWN0TW9kLnByb2plY3RzKTtcbiAgICAgICAgdXNlRE9NLmRlbGV0ZVNpZGViYXIgKCk7XG4gICAgICAgIHVzZURPTS5yZW5kZXJTaWRlYmFyIChwcm9qZWN0TW9kLnByb2plY3RzLCBwcm9qQ29udGFpbmVyLCAnZGl2JywgZGlzcGxheUNvbnRhaW5lcik7XG4gICAgICAgIGNsb3NlTW9kYWwgKHByb2pEaWFsb2cpO1xuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9ucyAocHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd1Rhc2tNb2RhbDogc2hvd1Rhc2tNb2RhbCxcbiAgICAgICAgc2hvd1Byb2pNb2RhbDogc2hvd1Byb2pNb2RhbCxcbiAgICAgICAgY29uZmlybVRhc2s6IGNvbmZpcm1UYXNrLFxuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9uczogY3JlYXRlUHJvamVjdE9wdGlvbnMsXG4gICAgICAgIGNvbmZpcm1Qcm9qLCBjb25maXJtUHJvaixcbiAgICB9XG5cbn0pKCk7IiwiZXhwb3J0IHtwcm9qZWN0TW9kfTtcblxuY29uc3QgcHJvamVjdE1vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdCAodGl0bGUsIHRhc2tMaXN0KSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIHRhc2tMaXN0fVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZyb21CdG4gKHRpdGxlLCBwcm9qZWN0c0Fycikge1xuICAgICAgICBwcm9qZWN0c0Fyci5wdXNoIChjcmVhdGVQcm9qZWN0ICh0aXRsZSwgW10pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVPYmpUYXNrIChwcm9qZWN0VGFza0xpc3QsIHRhc2tJZCkge1xuICAgICAgICBwcm9qZWN0VGFza0xpc3QuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIHRhc2suaWQgPT09IHRhc2tJZCA/IHByb2plY3RUYXNrTGlzdC5zcGxpY2UocHJvamVjdFRhc2tMaXN0LmluZGV4T2YodGFzayksIDEpIDogZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3Q6IGNyZWF0ZVByb2plY3QsXG4gICAgICAgIGNyZWF0ZUZyb21CdG4sIGNyZWF0ZUZyb21CdG4sXG4gICAgICAgIHJlbW92ZU9ialRhc2s6IHJlbW92ZU9ialRhc2ssXG4gICAgICAgIHByb2plY3RzLFxuICAgIH1cbn0pKCk7IiwiZXhwb3J0IHt0YXNrTW9kfTtcbmltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcblxuXG5jb25zdCB0YXNrTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZSwgcHJpb3JpdHksIGlkfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2lnblRhc2sgKHRhc2tPYmosIHRhc2tBcnIpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoKHRhc2tPYmopO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvUHJvamVjdCAodGFza0FyciwgdGFza09iaiwgcHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCAodGFza09iaik7XG4gICAgICAgIHVzZURPTS5yZWZyZXNoRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrRGF0YSAob2JqLCBwYXJlbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBgJHt1c2VET00uY2FwRmlyc3RMZXR0ZXIgKGtleSl9OiAke29ialtrZXldfWA7XG4gICAgICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgZmllbGQpLCBwYXJlbnQpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRhc2s6IGNyZWF0ZVRhc2ssXG4gICAgICAgIGFzc2lnblRhc2s6IGFzc2lnblRhc2ssXG4gICAgICAgIGFkZFRhc2tEYXRhOiBhZGRUYXNrRGF0YSxcbiAgICAgICAgYWRkVG9Qcm9qZWN0OiBhZGRUb1Byb2plY3QsXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tICcuL3Rhc2tzLmpzJ1xuaW1wb3J0IHttb2RhbE1vZH0gZnJvbSAnLi9tb2RhbC5qcydcblxuY29uc3QgbG9hZFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGh0bWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJyNjb250ZW50JylcblxuICAgIGNvbnN0IGhlYWRlckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnaGVhZGVyJywgJ2RpdicpO1xuICAgIGNvbnN0IHNpZGViYXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ3NpZGViYXInLCAnZGl2Jyk7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdncmlkJywgJ2RpdicpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoaGVhZGVyQ29udGVudCwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGdyaWRDb250YWluZXIsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcik7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMicsICdUbyBEbyBMaXN0JyksIGhlYWRlckNvbnRlbnQpO1xuXG4gICAgY29uc3QgYWRkUHJvakJ0biA9IHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50ICgnYnV0dG9uJywgJ0FkZCBQcm9qZWN0JywgJ2FkZC1wcm9qZWN0Jyk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoYWRkUHJvakJ0biwgaGVhZGVyQ29udGVudCk7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGFkZFByb2pCdG4sICdjbGljaycsICgpID0+IG1vZGFsTW9kLnNob3dQcm9qTW9kYWwoKSk7XG5cbiAgICBjb25zdCBhZGRUYXNrQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFRhc2snLCAnYWRkLXRhc2snKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRUYXNrQnRuLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoYWRkVGFza0J0biwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2Quc2hvd1Rhc2tNb2RhbCgpKTtcblxuICAgIGNvbnN0IGNvbmZpcm1UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtVGFza1wiKTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybVRhc2ssICdjbGljaycsIChldmVudCkgPT4gbW9kYWxNb2QuY29uZmlybVRhc2sgXG4gICAgKGV2ZW50LCBncmlkQ29udGFpbmVyKSk7XG5cbiAgICBjb25zdCBjb25maXJtUHJvaiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVByb2pcIik7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGNvbmZpcm1Qcm9qLCAnY2xpY2snLCAoZXZlbnQpID0+IG1vZGFsTW9kLmNvbmZpcm1Qcm9qIFxuICAgIChldmVudCwgc2lkZWJhckNvbnRlbnQsIGdyaWRDb250YWluZXIpKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2gzJywgJ1Byb2plY3RzJyksIHNpZGViYXJDb250ZW50KTtcblxuICAgIGNvbnN0IHRvZGF5VGFza3MgPSBbXTtcbiAgICBjb25zdCBjbGVhbiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0NsZWFuJywgJ2NsZWFuIHlvdXIgcm9vbScsICcyMDIzLTEyLTMxJywgJ0xvdycsIGBDbGVhbi1pZCMwYCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChjbGVhbiwgdG9kYXlUYXNrcyk7XG4gICAgY29uc3Qgc3VyZiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ1N1cmYnLCAnaGlnaCB0aWRlIGF0IDNQTScsICcyMDIzLTEyLTMxJywgJ0hpZ2gnLCBgU3VyZi1pZCMxYCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChzdXJmLCB0b2RheVRhc2tzKTtcblxuICAgIGNvbnN0IG1vcm9jY29UYXNrcyA9IFtdO1xuICAgIGNvbnN0IGNvb2sgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdDb29rJywgJ3RhZ2luZScsICcyMDIzLTEyLTMxJywgJ01lZGl1bScsIGBDb29rLWlkIzBgKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKGNvb2ssIG1vcm9jY29UYXNrcyk7XG5cbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ01vcm9jY28nLCBtb3JvY2NvVGFza3MpKTtcbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ1RvZGF5JywgdG9kYXlUYXNrcykpO1xuXG4gICAgdXNlRE9NLnJlbmRlckRpc3BsYXkgKHByb2plY3RNb2QucHJvamVjdHNbMF0sIGdyaWRDb250YWluZXIpO1xuICAgIHVzZURPTS5yZW5kZXJTaWRlYmFyIChwcm9qZWN0TW9kLnByb2plY3RzLCBzaWRlYmFyQ29udGVudCwgJ2RpdicsIGdyaWRDb250YWluZXIpXG5cbiAgICAvL25lZWQgdG8gcmUtcmVuZGVyIHRoaXMgYWZ0ZXIgYSBuZXcgcHJvamVjIGlzIGFkZGVkXG4gICAgLy9jcm9zcyB0aGlzIGJyaWRnZSB3aGVuIHdvcmtpbmcgb24gYWRkIHByb2ogYnRuXG4gICAgbW9kYWxNb2QuY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9