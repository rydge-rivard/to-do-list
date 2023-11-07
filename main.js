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
/* harmony import */ var _modal_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modal.js */ "./src/modal.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _tasks_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./tasks.js */ "./src/tasks.js");
 
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
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.removeObjTask (project.taskList, task.id);
        console.log (project);
        container.remove ();
    }

    function createHiddenDetails (obj, location) {
        const active = useDOM.createContainer ('active', 'div');
        // active.style.display = "none";
        addToHTML (active, location);
        _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.addTaskData (obj, active);
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
        createImg: createImg,
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

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createImg ('./img/list-blck.svg', '40px', 'List with checks icon.', headerContent);
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

    const mealTasks = [];
    const mon = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Pasta', 'pick up pesto and noodles for Monday',
     '2023-12-29', 'Low', `Pasta-id#0`);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (mon, mealTasks);
    const tues = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Fish', 'head to the market and pick up something fresh',
     '2023-12-30', 'High', `Fish-id#1`);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (tues, mealTasks);
    const wed = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Burgers', 'Wednesday is supposed to be great BBQ weather',
     '2023-12-31', 'Medium', `Burgers-id#2`);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (wed, mealTasks);

    const moroccoTasks = [];
    const cook = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Cook', 'try to cook tagine like the locals',
     '2023-12-1', 'Medium', `Cook-id#0`);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (cook, moroccoTasks);
    const shop = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Shop', 'go shopping for a cool new rug to bring home',
     '2023-12-3', 'None', `Shop-id#1`);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (shop, moroccoTasks);
    const camel = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Feed a Camel', 'find out what camels eat and feed one',
    '2023-12-5', 'Medium', `Feed-id#2`);
   _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (camel, moroccoTasks);

    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.push (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject ('Morocco', moroccoTasks));
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.push (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject ('Meal Plan', mealTasks));

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects[0], gridContainer);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderSidebar (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects, sidebarContent, 'div', gridContainer)

    _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.createProjectOptions (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUFlO0FBQ2YsQ0FBc0M7QUFDSztBQUNOOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBVTtBQUNWO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLG9EQUFVO0FBQ2xCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsOENBQU87QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7OztBQ2xKZ0I7QUFDakIsQ0FBK0I7QUFDTztBQUNOOztBQUVoQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLGlEQUFVO0FBQ2xCLDJCQUEyQix3Q0FBTTtBQUNqQyxZQUFZLHdDQUFNO0FBQ2xCO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsMkNBQU87QUFDZjtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLElBQUksaURBQVUsa0JBQWtCO0FBQ3hELGdCQUFnQixpREFBVTtBQUMxQix1QkFBdUIsaURBQVU7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDJDQUFPO0FBQy9CO0FBQ0EsZUFBZSxlQUFlLE1BQU0sd0JBQXdCO0FBQzVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsaURBQVUsa0NBQWtDLGlEQUFVO0FBQzlELFFBQVEsd0NBQU07QUFDZCxRQUFRLHdDQUFNLGdCQUFnQixpREFBVTtBQUN4QztBQUNBLDhCQUE4QixpREFBVTtBQUN4Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3ZHbUI7O0FBRXBCOztBQUVBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUJnQjtBQUNjOzs7QUFHL0I7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLDJDQUFNO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUNBQWlDLDJDQUFNLHNCQUFzQixJQUFJLFNBQVM7QUFDMUUsZ0JBQWdCLDJDQUFNLFlBQVksMkNBQU07QUFDeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7VUNuQ0Q7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ04rQjtBQUNTO0FBQ047QUFDQzs7QUFFbkM7QUFDQTs7QUFFQSwwQkFBMEIsMkNBQU07QUFDaEMsMkJBQTJCLDJDQUFNO0FBQ2pDLDBCQUEwQiwyQ0FBTTs7QUFFaEMsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU07QUFDVixJQUFJLDJDQUFNOztBQUVWLElBQUksMkNBQU07QUFDVixJQUFJLDJDQUFNLFlBQVksMkNBQU07O0FBRTVCLHVCQUF1QiwyQ0FBTTtBQUM3QixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTSx3Q0FBd0MsK0NBQVE7O0FBRTFELHVCQUF1QiwyQ0FBTTtBQUM3QixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTSx3Q0FBd0MsK0NBQVE7O0FBRTFEO0FBQ0EsSUFBSSwyQ0FBTSw4Q0FBOEMsK0NBQVE7QUFDaEU7O0FBRUE7QUFDQSxJQUFJLDJDQUFNLDhDQUE4QywrQ0FBUTtBQUNoRTs7QUFFQSxJQUFJLDJDQUFNLFlBQVksMkNBQU07O0FBRTVCO0FBQ0EsZ0JBQWdCLDhDQUFPO0FBQ3ZCO0FBQ0EsSUFBSSw4Q0FBTztBQUNYLGlCQUFpQiw4Q0FBTztBQUN4QjtBQUNBLElBQUksOENBQU87QUFDWCxnQkFBZ0IsOENBQU87QUFDdkI7QUFDQSxJQUFJLDhDQUFPOztBQUVYO0FBQ0EsaUJBQWlCLDhDQUFPO0FBQ3hCO0FBQ0EsSUFBSSw4Q0FBTztBQUNYLGlCQUFpQiw4Q0FBTztBQUN4QjtBQUNBLElBQUksOENBQU87QUFDWCxrQkFBa0IsOENBQU87QUFDekI7QUFDQSxHQUFHLDhDQUFPOztBQUVWLElBQUksb0RBQVUsZ0JBQWdCLG9EQUFVO0FBQ3hDLElBQUksb0RBQVUsZ0JBQWdCLG9EQUFVOztBQUV4QyxJQUFJLDJDQUFNLGdCQUFnQixvREFBVTtBQUNwQyxJQUFJLDJDQUFNLGdCQUFnQixvREFBVTs7QUFFcEMsSUFBSSwrQ0FBUSx1QkFBdUIsb0RBQVU7QUFDN0M7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHt1c2VET019IFxuaW1wb3J0IHsgbW9kYWxNb2QgfSBmcm9tIFwiLi9tb2RhbC5qc1wiO1xuaW1wb3J0IHsgcHJvamVjdE1vZCB9IGZyb20gXCIuL3Byb2plY3RzLmpzXCI7XG5pbXBvcnQgeyB0YXNrTW9kIH0gZnJvbSBcIi4vdGFza3MuanNcIjtcblxuY29uc3QgdXNlRE9NID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgdGV4dCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzc1RleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0LCBjc3NDbGFzcykge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvSFRNTCAoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIgKGNzc0NsYXNzLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvaiAob2JqLCBsb2NhdGlvbiwgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIG9iai50aXRsZSlcbiAgICAgICAgYWRkVG9IVE1MIChuZXdFbGVtZW50LCBsb2NhdGlvbik7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEFsbFRhc2tzIChwcm9qZWN0LCB0YXNrQXJyLCBsb2NhdGlvbikge1xuICAgICAgICB0YXNrQXJyLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICBjb25zdCByb3dDb250ICA9IGNyZWF0ZUNvbnRhaW5lciAoJ3Jvdy1jb250JywgJ2RpdicpO1xuICAgICAgICAgICAgYWRkVG9IVE1MIChyb3dDb250LCBsb2NhdGlvbik7XG4gICAgICAgICAgICBjb25zdCByb3dJY29ucyA9IGNyZWF0ZVRhc2tSb3cgKHJvd0NvbnQpO1xuICAgICAgICAgICAgY29uc3QgdGFza1RpdGxlID0gYXBwZW5kUHJvaiAodGFzaywgcm93SWNvbnMsICdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IGRlbGV0ZUljb24gPSBjcmVhdGVJbWcgKCcuL2ltZy9kZWxldGUuc3ZnJywgJzIwcHgnLCAnVHJhc2ggYmluIGljb24uJywgcm93SWNvbnMpO1xuICAgICAgICAgICAgY29uc3QgdGFza0RldGFpbHMgPSBjcmVhdGVIaWRkZW5EZXRhaWxzICh0YXNrLCByb3dDb250KTtcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKHRhc2tUaXRsZSwgJ2NsaWNrJywgKCkgPT4gdG9nZ2xlRGV0YWlscyAodGFzaywgdGFza0RldGFpbHMpKTtcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKHRhc2tEZXRhaWxzLCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCB0YXNrRGV0YWlscykpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAoZGVsZXRlSWNvbiwgJ2NsaWNrJywgKCkgPT4gZGVsZXRlVGFzayAocHJvamVjdCwgdGFzaywgcm93Q29udCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrUm93IChwYXJlbnQpIHtcbiAgICAgICAgY29uc3Qgcm93SWNvbnMgID0gY3JlYXRlQ29udGFpbmVyICgncm93LWljb24nLCAnZGl2Jyk7XG4gICAgICAgIGFkZFRvSFRNTCAocm93SWNvbnMsIHBhcmVudCk7XG4gICAgICAgIHJldHVybiByb3dJY29ucztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVJbWcgKHNyYywgd2lkdGgsIGFsdCwgcGFyZW50KSB7XG4gICAgICAgIGNvbnN0IGltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpXG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgc3JjKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcIndpZHRoXCIsIHdpZHRoKTtcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcImFsdFwiLCBhbHQpO1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoaW1nKTtcbiAgICAgICAgcmV0dXJuIGltZztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzIChlbGVtZW50LCBldmVudCwgYWN0aW9uKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVEZXRhaWxzIChvYmosIGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlVGFzayAocHJvamVjdCwgdGFzaywgY29udGFpbmVyKSB7XG4gICAgICAgIGNvbnNvbGUubG9nIChwcm9qZWN0KTtcbiAgICAgICAgY29uc29sZS5sb2cgKCdSZW1vdmUgZnJvbSBhcnJheS4nKTtcbiAgICAgICAgcHJvamVjdE1vZC5yZW1vdmVPYmpUYXNrIChwcm9qZWN0LnRhc2tMaXN0LCB0YXNrLmlkKTtcbiAgICAgICAgY29uc29sZS5sb2cgKHByb2plY3QpO1xuICAgICAgICBjb250YWluZXIucmVtb3ZlICgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhpZGRlbkRldGFpbHMgKG9iaiwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2FjdGl2ZScsICdkaXYnKTtcbiAgICAgICAgLy8gYWN0aXZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYWRkVG9IVE1MIChhY3RpdmUsIGxvY2F0aW9uKTtcbiAgICAgICAgdGFza01vZC5hZGRUYXNrRGF0YSAob2JqLCBhY3RpdmUpO1xuICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgZGVsZXRlRGlzcGxheSAoKTtcbiAgICAgICAgcmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheUNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZGlzcGxheScsICdkaXYnKTtcbiAgICAgICAgYWRkVG9IVE1MIChkaXNwbGF5Q29udGVudCwgcGFyZW50KTtcblxuICAgICAgICBhcHBlbmRQcm9qIChwcm9qZWN0LCBkaXNwbGF5Q29udGVudCwgJ2gzJyk7XG4gICAgICAgIGFwcGVuZEFsbFRhc2tzIChwcm9qZWN0LCBwcm9qZWN0LnRhc2tMaXN0LCBkaXNwbGF5Q29udGVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFNpZGViYXIgKHByb2pBcnIsIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgZGVsZXRlU2lkZWJhciAoKTtcbiAgICAgICAgcmVmcmVzaFNpZGViYXIgKHByb2pBcnIsIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQpO1xuICAgIH1cbiBcbiAgICBmdW5jdGlvbiByZW5kZXJTaWRlYmFyIChwcm9qQXJyLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50LCBkaXNwbGF5Q29udGFpbmVyKSB7XG4gICAgICAgIHByb2pBcnIuZm9yRWFjaChwcm9qID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2pEaXYgPSBhcHBlbmRQcm9qIChwcm9qLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50KVxuICAgICAgICAgICAgYmluZEV2ZW50cyAocHJvakRpdiwgJ2NsaWNrJywgKCkgPT4gcmVmcmVzaERpc3BsYXkgKHByb2osIGRpc3BsYXlDb250YWluZXIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGRlbGV0ZURpc3BsYXkgKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLmRpc3BsYXknKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVTaWRlYmFyICgpIHtcbiAgICAgICAgY29uc3Qgc2lkZWJhckRpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICgnLnNpZGViYXIgPiBkaXYnKTtcbiAgICAgICAgc2lkZWJhckRpdnMuZm9yRWFjaChwcm9qID0+IHByb2oucmVtb3ZlKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhcEZpcnN0TGV0dGVyIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUZXh0RWxlbWVudDogY3JlYXRlVGV4dEVsZW1lbnQsXG4gICAgICAgIGFkZFRvSFRNTDogYWRkVG9IVE1MLFxuICAgICAgICBjcmVhdGVDb250YWluZXIsIGNyZWF0ZUNvbnRhaW5lcixcbiAgICAgICAgYXBwZW5kUHJvajogYXBwZW5kUHJvaixcbiAgICAgICAgYXBwZW5kQWxsVGFza3M6IGFwcGVuZEFsbFRhc2tzLFxuICAgICAgICBjcmVhdGVDbGFzc1RleHRFbGVtZW50OiBjcmVhdGVDbGFzc1RleHRFbGVtZW50LFxuICAgICAgICBiaW5kRXZlbnRzOiBiaW5kRXZlbnRzLFxuICAgICAgICByZW5kZXJEaXNwbGF5OiByZW5kZXJEaXNwbGF5LFxuICAgICAgICBkZWxldGVEaXNwbGF5OiBkZWxldGVEaXNwbGF5LFxuICAgICAgICByZW5kZXJTaWRlYmFyOiByZW5kZXJTaWRlYmFyLFxuICAgICAgICByZWZyZXNoRGlzcGxheTogcmVmcmVzaERpc3BsYXksXG4gICAgICAgIGRlbGV0ZVNpZGViYXI6IGRlbGV0ZVNpZGViYXIsXG4gICAgICAgIHJlZnJlc2hTaWRlYmFyOiByZWZyZXNoU2lkZWJhcixcbiAgICAgICAgY2FwRmlyc3RMZXR0ZXI6IGNhcEZpcnN0TGV0dGVyLFxuICAgICAgICBjcmVhdGVJbWc6IGNyZWF0ZUltZyxcbiAgICB9XG59KSgpOyIsImV4cG9ydCB7bW9kYWxNb2R9XG5pbXBvcnQgeyB1c2VET00gfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7dGFza01vZH0gZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgbW9kYWxNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgdGFza0RpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcudGFzay1kaWFsb2cnKTtcbiAgICBjb25zdCB0YXNrSW5wdXRzID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yQWxsICgnaW5wdXQnKTtcbiAgICBjb25zdCBzZWxlY3QgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjcHJvamVjdC1zZWwnKTtcbiAgICBjb25zdCB0YXNrRGVzY3IgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjZGVzY3InKTtcbiAgICBjb25zdCB0YXNrUHJpbyAgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjcHJpb3JpdHknKTtcblxuICAgIGNvbnN0IHByb2pEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLnByb2otZGlhbG9nJyk7XG4gICAgY29uc3QgcHJvaklucHV0cyA9IHByb2pEaWFsb2cucXVlcnlTZWxlY3RvciAoJ2lucHV0Jyk7XG5cbiAgICBjb25zdCBhbGxJbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICgnaW5wdXQnKTtcblxuICAgIGZ1bmN0aW9uIHNob3dUYXNrTW9kYWwgKCkge1xuICAgICAgICB0YXNrRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNob3dQcm9qTW9kYWwgKCkge1xuICAgICAgICBwcm9qRGlhbG9nLnNob3dNb2RhbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3RPcHRpb25zICgpIHtcbiAgICAgICAgcmVtb3ZlUHJvak9wdGlvbnMgKClcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBwcm9qZWN0TW9kLnByb2plY3RzLmZvckVhY2gocHJvamVjdCA9PiB7XG4gICAgICAgICAgICBjb25zdCBvcHRpb24gPSB1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdvcHRpb24nLCBwcm9qZWN0LnRpdGxlKTtcbiAgICAgICAgICAgIHVzZURPTS5hZGRUb0hUTUwgKG9wdGlvbiwgc2VsZWN0KTtcbiAgICAgICAgICAgIGkgKz0gMTtcbiAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qT3B0aW9ucyAoKSB7XG4gICAgICAgIGNvbnN0IHByb2pPcHRpb25zID0gc2VsZWN0LnF1ZXJ5U2VsZWN0b3JBbGwgKCdvcHRpb24nKTtcbiAgICAgICAgcHJvak9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLnJlbW92ZSgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtVGFzayAoZXZlbnQsIHBhcmVudCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCAoKTtcbiAgICAgICAgY29uc3QgcHJvamVjdCA9IGZpbmRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIHRhc2tNb2QuYWRkVG9Qcm9qZWN0IChwcm9qZWN0LnRhc2tMaXN0LCBjcmVhdGVUYXNrICh0YXNrSW5wdXRzLCBwcm9qZWN0KSwgcHJvamVjdCwgcGFyZW50KTtcbiAgICAgICAgY2xvc2VNb2RhbCAodGFza0RpYWxvZyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgcmV0dXJuIHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNwcm9qZWN0LXNlbCcpLnZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRTZWxlY3RlZFByb2ogKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2ogPSBnZXRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdE1vZC5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RNb2QucHJvamVjdHNbaV0udGl0bGUgPT09IHNlbGVjdGVkUHJvaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0TW9kLnByb2plY3RzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNvcnRJbnB1dHMgKGlucHV0QXJyKSB7XG4gICAgICAgIGNvbnN0IG9iakFyciA9IFtdO1xuICAgICAgICBpbnB1dEFyci5mb3JFYWNoKGlucHV0ID0+IG9iakFyci5wdXNoIChpbnB1dC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gb2JqQXJyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKGlucHV0QXJyLCBwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWVzID0gc29ydElucHV0cyhpbnB1dEFycik7XG4gICAgICAgIGFkZE1vZGFsTm9uSW5wdXRzIChpbnB1dFZhbHVlcylcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHRhc2tNb2QuY3JlYXRlVGFzayhpbnB1dFZhbHVlc1swXSwgXG4gICAgICAgICAgICBpbnB1dFZhbHVlc1syXSwgaW5wdXRWYWx1ZXNbMV0sIGlucHV0VmFsdWVzWzNdLCBcbiAgICAgICAgICAgIGAke2lucHV0VmFsdWVzWzBdfS1pZCMke3Byb2plY3QudGFza0xpc3QubGVuZ3RofWApO1xuICAgICAgICByZXR1cm4gbmV3VGFzaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRNb2RhbE5vbklucHV0cyAodmFsdWVBcnIpIHtcbiAgICAgICAgdmFsdWVBcnIucHVzaCAodGFza0Rlc2NyLnZhbHVlKTtcbiAgICAgICAgdmFsdWVBcnIucHVzaCAodGFza1ByaW8udmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwgKG1vZGFsKSB7XG4gICAgICAgIGFsbElucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gJycpO1xuICAgICAgICBtb2RhbC5jbG9zZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpcm1Qcm9qIChldmVudCwgcHJvakNvbnRhaW5lciwgZGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCAoKTtcbiAgICAgICAgcHJvamVjdE1vZC5jcmVhdGVGcm9tQnRuIChwcm9qSW5wdXRzLnZhbHVlLCBwcm9qZWN0TW9kLnByb2plY3RzKTtcbiAgICAgICAgdXNlRE9NLmRlbGV0ZVNpZGViYXIgKCk7XG4gICAgICAgIHVzZURPTS5yZW5kZXJTaWRlYmFyIChwcm9qZWN0TW9kLnByb2plY3RzLCBwcm9qQ29udGFpbmVyLCAnZGl2JywgZGlzcGxheUNvbnRhaW5lcik7XG4gICAgICAgIGNsb3NlTW9kYWwgKHByb2pEaWFsb2cpO1xuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9ucyAocHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd1Rhc2tNb2RhbDogc2hvd1Rhc2tNb2RhbCxcbiAgICAgICAgc2hvd1Byb2pNb2RhbDogc2hvd1Byb2pNb2RhbCxcbiAgICAgICAgY29uZmlybVRhc2s6IGNvbmZpcm1UYXNrLFxuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9uczogY3JlYXRlUHJvamVjdE9wdGlvbnMsXG4gICAgICAgIGNvbmZpcm1Qcm9qLCBjb25maXJtUHJvaixcbiAgICB9XG5cbn0pKCk7IiwiZXhwb3J0IHtwcm9qZWN0TW9kfTtcblxuY29uc3QgcHJvamVjdE1vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCBwcm9qZWN0cyA9IFtdO1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdCAodGl0bGUsIHRhc2tMaXN0KSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIHRhc2tMaXN0fVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUZyb21CdG4gKHRpdGxlLCBwcm9qZWN0c0Fycikge1xuICAgICAgICBwcm9qZWN0c0Fyci5wdXNoIChjcmVhdGVQcm9qZWN0ICh0aXRsZSwgW10pKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVPYmpUYXNrIChwcm9qZWN0VGFza0xpc3QsIHRhc2tJZCkge1xuICAgICAgICBwcm9qZWN0VGFza0xpc3QuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIHRhc2suaWQgPT09IHRhc2tJZCA/IHByb2plY3RUYXNrTGlzdC5zcGxpY2UocHJvamVjdFRhc2tMaXN0LmluZGV4T2YodGFzayksIDEpIDogZmFsc2U7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVByb2plY3Q6IGNyZWF0ZVByb2plY3QsXG4gICAgICAgIGNyZWF0ZUZyb21CdG4sIGNyZWF0ZUZyb21CdG4sXG4gICAgICAgIHJlbW92ZU9ialRhc2s6IHJlbW92ZU9ialRhc2ssXG4gICAgICAgIHByb2plY3RzLFxuICAgIH1cbn0pKCk7IiwiZXhwb3J0IHt0YXNrTW9kfTtcbmltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcblxuXG5jb25zdCB0YXNrTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZSwgcHJpb3JpdHksIGlkfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2lnblRhc2sgKHRhc2tPYmosIHRhc2tBcnIpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoKHRhc2tPYmopO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvUHJvamVjdCAodGFza0FyciwgdGFza09iaiwgcHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCAodGFza09iaik7XG4gICAgICAgIHVzZURPTS5yZWZyZXNoRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrRGF0YSAob2JqLCBwYXJlbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBgJHt1c2VET00uY2FwRmlyc3RMZXR0ZXIgKGtleSl9OiAke29ialtrZXldfWA7XG4gICAgICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgZmllbGQpLCBwYXJlbnQpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRhc2s6IGNyZWF0ZVRhc2ssXG4gICAgICAgIGFzc2lnblRhc2s6IGFzc2lnblRhc2ssXG4gICAgICAgIGFkZFRhc2tEYXRhOiBhZGRUYXNrRGF0YSxcbiAgICAgICAgYWRkVG9Qcm9qZWN0OiBhZGRUb1Byb2plY3QsXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tICcuL3Rhc2tzLmpzJ1xuaW1wb3J0IHttb2RhbE1vZH0gZnJvbSAnLi9tb2RhbC5qcydcblxuY29uc3QgbG9hZFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGh0bWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJyNjb250ZW50JylcblxuICAgIGNvbnN0IGhlYWRlckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnaGVhZGVyJywgJ2RpdicpO1xuICAgIGNvbnN0IHNpZGViYXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ3NpZGViYXInLCAnZGl2Jyk7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdncmlkJywgJ2RpdicpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoaGVhZGVyQ29udGVudCwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGdyaWRDb250YWluZXIsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcik7XG5cbiAgICB1c2VET00uY3JlYXRlSW1nICgnLi9pbWcvbGlzdC1ibGNrLnN2ZycsICc0MHB4JywgJ0xpc3Qgd2l0aCBjaGVja3MgaWNvbi4nLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMicsICdUbyBEbyBMaXN0JyksIGhlYWRlckNvbnRlbnQpO1xuXG4gICAgY29uc3QgYWRkUHJvakJ0biA9IHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50ICgnYnV0dG9uJywgJ0FkZCBQcm9qZWN0JywgJ2FkZC1wcm9qZWN0Jyk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoYWRkUHJvakJ0biwgaGVhZGVyQ29udGVudCk7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGFkZFByb2pCdG4sICdjbGljaycsICgpID0+IG1vZGFsTW9kLnNob3dQcm9qTW9kYWwoKSk7XG5cbiAgICBjb25zdCBhZGRUYXNrQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFRhc2snLCAnYWRkLXRhc2snKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRUYXNrQnRuLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoYWRkVGFza0J0biwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2Quc2hvd1Rhc2tNb2RhbCgpKTtcblxuICAgIGNvbnN0IGNvbmZpcm1UYXNrID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtVGFza1wiKTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybVRhc2ssICdjbGljaycsIChldmVudCkgPT4gbW9kYWxNb2QuY29uZmlybVRhc2sgXG4gICAgKGV2ZW50LCBncmlkQ29udGFpbmVyKSk7XG5cbiAgICBjb25zdCBjb25maXJtUHJvaiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVByb2pcIik7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGNvbmZpcm1Qcm9qLCAnY2xpY2snLCAoZXZlbnQpID0+IG1vZGFsTW9kLmNvbmZpcm1Qcm9qIFxuICAgIChldmVudCwgc2lkZWJhckNvbnRlbnQsIGdyaWRDb250YWluZXIpKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2gzJywgJ1Byb2plY3RzJyksIHNpZGViYXJDb250ZW50KTtcblxuICAgIGNvbnN0IG1lYWxUYXNrcyA9IFtdO1xuICAgIGNvbnN0IG1vbiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ1Bhc3RhJywgJ3BpY2sgdXAgcGVzdG8gYW5kIG5vb2RsZXMgZm9yIE1vbmRheScsXG4gICAgICcyMDIzLTEyLTI5JywgJ0xvdycsIGBQYXN0YS1pZCMwYCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChtb24sIG1lYWxUYXNrcyk7XG4gICAgY29uc3QgdHVlcyA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0Zpc2gnLCAnaGVhZCB0byB0aGUgbWFya2V0IGFuZCBwaWNrIHVwIHNvbWV0aGluZyBmcmVzaCcsXG4gICAgICcyMDIzLTEyLTMwJywgJ0hpZ2gnLCBgRmlzaC1pZCMxYCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrICh0dWVzLCBtZWFsVGFza3MpO1xuICAgIGNvbnN0IHdlZCA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0J1cmdlcnMnLCAnV2VkbmVzZGF5IGlzIHN1cHBvc2VkIHRvIGJlIGdyZWF0IEJCUSB3ZWF0aGVyJyxcbiAgICAgJzIwMjMtMTItMzEnLCAnTWVkaXVtJywgYEJ1cmdlcnMtaWQjMmApO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAod2VkLCBtZWFsVGFza3MpO1xuXG4gICAgY29uc3QgbW9yb2Njb1Rhc2tzID0gW107XG4gICAgY29uc3QgY29vayA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0Nvb2snLCAndHJ5IHRvIGNvb2sgdGFnaW5lIGxpa2UgdGhlIGxvY2FscycsXG4gICAgICcyMDIzLTEyLTEnLCAnTWVkaXVtJywgYENvb2staWQjMGApO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoY29vaywgbW9yb2Njb1Rhc2tzKTtcbiAgICBjb25zdCBzaG9wID0gdGFza01vZC5jcmVhdGVUYXNrICgnU2hvcCcsICdnbyBzaG9wcGluZyBmb3IgYSBjb29sIG5ldyBydWcgdG8gYnJpbmcgaG9tZScsXG4gICAgICcyMDIzLTEyLTMnLCAnTm9uZScsIGBTaG9wLWlkIzFgKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKHNob3AsIG1vcm9jY29UYXNrcyk7XG4gICAgY29uc3QgY2FtZWwgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdGZWVkIGEgQ2FtZWwnLCAnZmluZCBvdXQgd2hhdCBjYW1lbHMgZWF0IGFuZCBmZWVkIG9uZScsXG4gICAgJzIwMjMtMTItNScsICdNZWRpdW0nLCBgRmVlZC1pZCMyYCk7XG4gICB0YXNrTW9kLmFzc2lnblRhc2sgKGNhbWVsLCBtb3JvY2NvVGFza3MpO1xuXG4gICAgcHJvamVjdE1vZC5wcm9qZWN0cy5wdXNoIChwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdNb3JvY2NvJywgbW9yb2Njb1Rhc2tzKSk7XG4gICAgcHJvamVjdE1vZC5wcm9qZWN0cy5wdXNoIChwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdNZWFsIFBsYW4nLCBtZWFsVGFza3MpKTtcblxuICAgIHVzZURPTS5yZW5kZXJEaXNwbGF5IChwcm9qZWN0TW9kLnByb2plY3RzWzBdLCBncmlkQ29udGFpbmVyKTtcbiAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgc2lkZWJhckNvbnRlbnQsICdkaXYnLCBncmlkQ29udGFpbmVyKVxuXG4gICAgbW9kYWxNb2QuY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9