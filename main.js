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
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/storage.js");
 
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
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.removeObjTask (project.taskList, task.id);
        container.remove ();
        _storage__WEBPACK_IMPORTED_MODULE_3__.storMod.storeProj (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
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
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./storage */ "./src/storage.js");

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
        _storage__WEBPACK_IMPORTED_MODULE_3__.storMod.storeProj (_projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
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
        _storage__WEBPACK_IMPORTED_MODULE_3__.storMod.storeProj (_projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
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
/* harmony import */ var _storage__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./storage */ "./src/storage.js");





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

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   storMod: () => (/* binding */ storMod)
/* harmony export */ });
/* harmony import */ var _projects__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./projects */ "./src/projects.js");



const storMod = (function () {

    function storeProj (projectsArr) {
        localStorage.setItem("projects", JSON.stringify (projectsArr));
        console.log (_projects__WEBPACK_IMPORTED_MODULE_0__.projectMod.projects);
    }

    function checkStorage (projectsArr) {
        if (!localStorage.getItem ("projects")) {
            console.log ('no existing storage')
            storeProj (projectsArr);
          } else {
            setProjArr ();
          }
    }

    function setProjArr () {
        _projects__WEBPACK_IMPORTED_MODULE_0__.projectMod.projects = JSON.parse(localStorage.getItem("projects"));
    }

    return {
        storeProj: storeProj,
        setProjArr: setProjArr,
        checkStorage: checkStorage,
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
/* harmony import */ var _storage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./storage.js */ "./src/storage.js");






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

    _storage_js__WEBPACK_IMPORTED_MODULE_4__.storMod.checkStorage (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects)

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects[0], gridContainer);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderSidebar (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects, sidebarContent, 'div', gridContainer)

    _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.createProjectOptions (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmLENBQXNDO0FBQ0s7QUFDTjtBQUNIOzs7QUFHbEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxRQUFRLG9EQUFVO0FBQ2xCO0FBQ0EsUUFBUSw2Q0FBTyxZQUFZLG9EQUFVO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4Q0FBTztBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xKZ0I7QUFDakIsQ0FBK0I7QUFDTztBQUNOO0FBQ0U7O0FBRWxDOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaURBQVU7QUFDbEIsMkJBQTJCLHdDQUFNO0FBQ2pDLFlBQVksd0NBQU07QUFDbEI7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSwyQ0FBTztBQUNmO0FBQ0EsUUFBUSw2Q0FBTyxZQUFZLGlEQUFVO0FBQ3JDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLElBQUksaURBQVUsa0JBQWtCO0FBQ3hELGdCQUFnQixpREFBVTtBQUMxQix1QkFBdUIsaURBQVU7QUFDakM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLDJDQUFPO0FBQy9CO0FBQ0EsZUFBZSxlQUFlLE1BQU0sd0JBQXdCO0FBQzVEO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsaURBQVUsa0NBQWtDLGlEQUFVO0FBQzlELFFBQVEsd0NBQU07QUFDZCxRQUFRLHdDQUFNLGdCQUFnQixpREFBVTtBQUN4QztBQUNBLDhCQUE4QixpREFBVTtBQUN4QyxRQUFRLDZDQUFPLFlBQVksaURBQVU7QUFDckM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDMUdtQzs7QUFFaEI7OztBQUdwQjs7QUFFQTs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzdCZ0I7QUFDcUI7O0FBRXRDOztBQUVBO0FBQ0E7QUFDQSxxQkFBcUIsaURBQVU7QUFDL0I7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUSxpREFBVTtBQUNsQjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzdCZ0I7QUFDYzs7O0FBRy9COztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUSwyQ0FBTTtBQUNkOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlDQUFpQywyQ0FBTSxzQkFBc0IsSUFBSSxTQUFTO0FBQzFFLGdCQUFnQiwyQ0FBTSxZQUFZLDJDQUFNO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7O1VDbkNEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7O0FDTitCO0FBQ1M7QUFDTjtBQUNDO0FBQ0M7O0FBRXBDO0FBQ0E7O0FBRUEsMEJBQTBCLDJDQUFNO0FBQ2hDLDJCQUEyQiwyQ0FBTTtBQUNqQywwQkFBMEIsMkNBQU07O0FBRWhDLElBQUksMkNBQU07QUFDVixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTTs7QUFFVixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTSxZQUFZLDJDQUFNOztBQUU1Qix1QkFBdUIsMkNBQU07QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRCx1QkFBdUIsMkNBQU07QUFDN0IsSUFBSSwyQ0FBTTtBQUNWLElBQUksMkNBQU0sd0NBQXdDLCtDQUFROztBQUUxRDtBQUNBLElBQUksMkNBQU0sOENBQThDLCtDQUFRO0FBQ2hFOztBQUVBO0FBQ0EsSUFBSSwyQ0FBTSw4Q0FBOEMsK0NBQVE7QUFDaEU7O0FBRUEsSUFBSSwyQ0FBTSxZQUFZLDJDQUFNOztBQUU1QjtBQUNBLGdCQUFnQiw4Q0FBTztBQUN2QjtBQUNBLElBQUksOENBQU87QUFDWCxpQkFBaUIsOENBQU87QUFDeEI7QUFDQSxJQUFJLDhDQUFPO0FBQ1gsZ0JBQWdCLDhDQUFPO0FBQ3ZCO0FBQ0EsSUFBSSw4Q0FBTzs7QUFFWDtBQUNBLGlCQUFpQiw4Q0FBTztBQUN4QjtBQUNBLElBQUksOENBQU87QUFDWCxpQkFBaUIsOENBQU87QUFDeEI7QUFDQSxJQUFJLDhDQUFPO0FBQ1gsa0JBQWtCLDhDQUFPO0FBQ3pCO0FBQ0EsR0FBRyw4Q0FBTzs7QUFFVixJQUFJLG9EQUFVLGdCQUFnQixvREFBVTtBQUN4QyxJQUFJLG9EQUFVLGdCQUFnQixvREFBVTs7QUFFeEMsSUFBSSxnREFBTyxlQUFlLG9EQUFVOztBQUVwQyxJQUFJLDJDQUFNLGdCQUFnQixvREFBVTtBQUNwQyxJQUFJLDJDQUFNLGdCQUFnQixvREFBVTs7QUFFcEMsSUFBSSwrQ0FBUSx1QkFBdUIsb0RBQVU7QUFDN0M7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7dXNlRE9NfSBcbmltcG9ydCB7IG1vZGFsTW9kIH0gZnJvbSBcIi4vbW9kYWwuanNcIjtcbmltcG9ydCB7IHByb2plY3RNb2QgfSBmcm9tIFwiLi9wcm9qZWN0cy5qc1wiO1xuaW1wb3J0IHsgdGFza01vZCB9IGZyb20gXCIuL3Rhc2tzLmpzXCI7XG5pbXBvcnQge3N0b3JNb2R9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuXG5jb25zdCB1c2VET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQsIGNzc0NsYXNzKSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9IVE1MIChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoY3NzQ2xhc3MsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qIChvYmosIGxvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgb2JqLnRpdGxlKVxuICAgICAgICBhZGRUb0hUTUwgKG5ld0VsZW1lbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kQWxsVGFza3MgKHByb2plY3QsIHRhc2tBcnIsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRhc2tBcnIuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0NvbnQgID0gY3JlYXRlQ29udGFpbmVyICgncm93LWNvbnQnLCAnZGl2Jyk7XG4gICAgICAgICAgICBhZGRUb0hUTUwgKHJvd0NvbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHJvd0ljb25zID0gY3JlYXRlVGFza1JvdyAocm93Q29udCk7XG4gICAgICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBhcHBlbmRQcm9qICh0YXNrLCByb3dJY29ucywgJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGNyZWF0ZUltZyAoJy4vaW1nL2RlbGV0ZS5zdmcnLCAnMjBweCcsICdUcmFzaCBiaW4gaWNvbi4nLCByb3dJY29ucyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrRGV0YWlscyA9IGNyZWF0ZUhpZGRlbkRldGFpbHMgKHRhc2ssIHJvd0NvbnQpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAodGFza1RpdGxlLCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCB0YXNrRGV0YWlscykpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAodGFza0RldGFpbHMsICdjbGljaycsICgpID0+IHRvZ2dsZURldGFpbHMgKHRhc2ssIHRhc2tEZXRhaWxzKSk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChkZWxldGVJY29uLCAnY2xpY2snLCAoKSA9PiBkZWxldGVUYXNrIChwcm9qZWN0LCB0YXNrLCByb3dDb250KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tSb3cgKHBhcmVudCkge1xuICAgICAgICBjb25zdCByb3dJY29ucyAgPSBjcmVhdGVDb250YWluZXIgKCdyb3ctaWNvbicsICdkaXYnKTtcbiAgICAgICAgYWRkVG9IVE1MIChyb3dJY29ucywgcGFyZW50KTtcbiAgICAgICAgcmV0dXJuIHJvd0ljb25zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUltZyAoc3JjLCB3aWR0aCwgYWx0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGFsdCk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMgKGVsZW1lbnQsIGV2ZW50LCBhY3Rpb24pIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZURldGFpbHMgKG9iaiwgZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrIChwcm9qZWN0LCB0YXNrLCBjb250YWluZXIpIHtcbiAgICAgICAgcHJvamVjdE1vZC5yZW1vdmVPYmpUYXNrIChwcm9qZWN0LnRhc2tMaXN0LCB0YXNrLmlkKTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZSAoKTtcbiAgICAgICAgc3Rvck1vZC5zdG9yZVByb2ogKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUhpZGRlbkRldGFpbHMgKG9iaiwgbG9jYXRpb24pIHtcbiAgICAgICAgY29uc3QgYWN0aXZlID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2FjdGl2ZScsICdkaXYnKTtcbiAgICAgICAgLy8gYWN0aXZlLnN0eWxlLmRpc3BsYXkgPSBcIm5vbmVcIjtcbiAgICAgICAgYWRkVG9IVE1MIChhY3RpdmUsIGxvY2F0aW9uKTtcbiAgICAgICAgdGFza01vZC5hZGRUYXNrRGF0YSAob2JqLCBhY3RpdmUpO1xuICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgZGVsZXRlRGlzcGxheSAoKTtcbiAgICAgICAgcmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgZGlzcGxheUNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZGlzcGxheScsICdkaXYnKTtcbiAgICAgICAgYWRkVG9IVE1MIChkaXNwbGF5Q29udGVudCwgcGFyZW50KTtcblxuICAgICAgICBhcHBlbmRQcm9qIChwcm9qZWN0LCBkaXNwbGF5Q29udGVudCwgJ2gzJyk7XG4gICAgICAgIGFwcGVuZEFsbFRhc2tzIChwcm9qZWN0LCBwcm9qZWN0LnRhc2tMaXN0LCBkaXNwbGF5Q29udGVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaFNpZGViYXIgKHByb2pBcnIsIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgZGVsZXRlU2lkZWJhciAoKTtcbiAgICAgICAgcmVmcmVzaFNpZGViYXIgKHByb2pBcnIsIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQpO1xuICAgIH1cbiBcbiAgICBmdW5jdGlvbiByZW5kZXJTaWRlYmFyIChwcm9qQXJyLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50LCBkaXNwbGF5Q29udGFpbmVyKSB7XG4gICAgICAgIHByb2pBcnIuZm9yRWFjaChwcm9qID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb2pEaXYgPSBhcHBlbmRQcm9qIChwcm9qLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50KVxuICAgICAgICAgICAgYmluZEV2ZW50cyAocHJvakRpdiwgJ2NsaWNrJywgKCkgPT4gcmVmcmVzaERpc3BsYXkgKHByb2osIGRpc3BsYXlDb250YWluZXIpKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIFxuICAgIGZ1bmN0aW9uIGRlbGV0ZURpc3BsYXkgKCkge1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLmRpc3BsYXknKS5yZW1vdmUoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVTaWRlYmFyICgpIHtcbiAgICAgICAgY29uc3Qgc2lkZWJhckRpdnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsICgnLnNpZGViYXIgPiBkaXYnKTtcbiAgICAgICAgc2lkZWJhckRpdnMuZm9yRWFjaChwcm9qID0+IHByb2oucmVtb3ZlKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhcEZpcnN0TGV0dGVyIChzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUZXh0RWxlbWVudDogY3JlYXRlVGV4dEVsZW1lbnQsXG4gICAgICAgIGFkZFRvSFRNTDogYWRkVG9IVE1MLFxuICAgICAgICBjcmVhdGVDb250YWluZXIsIGNyZWF0ZUNvbnRhaW5lcixcbiAgICAgICAgYXBwZW5kUHJvajogYXBwZW5kUHJvaixcbiAgICAgICAgYXBwZW5kQWxsVGFza3M6IGFwcGVuZEFsbFRhc2tzLFxuICAgICAgICBjcmVhdGVDbGFzc1RleHRFbGVtZW50OiBjcmVhdGVDbGFzc1RleHRFbGVtZW50LFxuICAgICAgICBiaW5kRXZlbnRzOiBiaW5kRXZlbnRzLFxuICAgICAgICByZW5kZXJEaXNwbGF5OiByZW5kZXJEaXNwbGF5LFxuICAgICAgICBkZWxldGVEaXNwbGF5OiBkZWxldGVEaXNwbGF5LFxuICAgICAgICByZW5kZXJTaWRlYmFyOiByZW5kZXJTaWRlYmFyLFxuICAgICAgICByZWZyZXNoRGlzcGxheTogcmVmcmVzaERpc3BsYXksXG4gICAgICAgIGRlbGV0ZVNpZGViYXI6IGRlbGV0ZVNpZGViYXIsXG4gICAgICAgIHJlZnJlc2hTaWRlYmFyOiByZWZyZXNoU2lkZWJhcixcbiAgICAgICAgY2FwRmlyc3RMZXR0ZXI6IGNhcEZpcnN0TGV0dGVyLFxuICAgICAgICBjcmVhdGVJbWc6IGNyZWF0ZUltZyxcbiAgICB9XG59KSgpOyIsImV4cG9ydCB7bW9kYWxNb2R9XG5pbXBvcnQgeyB1c2VET00gfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7dGFza01vZH0gZnJvbSBcIi4vdGFza3NcIjtcbmltcG9ydCB7c3Rvck1vZH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5jb25zdCBtb2RhbE1vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBjb25zdCB0YXNrRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy50YXNrLWRpYWxvZycpO1xuICAgIGNvbnN0IHRhc2tJbnB1dHMgPSB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3JBbGwgKCdpbnB1dCcpO1xuICAgIGNvbnN0IHNlbGVjdCA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNwcm9qZWN0LXNlbCcpO1xuICAgIGNvbnN0IHRhc2tEZXNjciA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNkZXNjcicpO1xuICAgIGNvbnN0IHRhc2tQcmlvICA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNwcmlvcml0eScpO1xuXG4gICAgY29uc3QgcHJvakRpYWxvZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcucHJvai1kaWFsb2cnKTtcbiAgICBjb25zdCBwcm9qSW5wdXRzID0gcHJvakRpYWxvZy5xdWVyeVNlbGVjdG9yICgnaW5wdXQnKTtcblxuICAgIGNvbnN0IGFsbElucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKCdpbnB1dCcpO1xuXG4gICAgZnVuY3Rpb24gc2hvd1Rhc2tNb2RhbCAoKSB7XG4gICAgICAgIHRhc2tEaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2hvd1Byb2pNb2RhbCAoKSB7XG4gICAgICAgIHByb2pEaWFsb2cuc2hvd01vZGFsKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlUHJvamVjdE9wdGlvbnMgKCkge1xuICAgICAgICByZW1vdmVQcm9qT3B0aW9ucyAoKVxuICAgICAgICBsZXQgaSA9IDA7XG4gICAgICAgIHByb2plY3RNb2QucHJvamVjdHMuZm9yRWFjaChwcm9qZWN0ID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG9wdGlvbiA9IHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ29wdGlvbicsIHByb2plY3QudGl0bGUpO1xuICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAob3B0aW9uLCBzZWxlY3QpO1xuICAgICAgICAgICAgaSArPSAxO1xuICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVByb2pPcHRpb25zICgpIHtcbiAgICAgICAgY29uc3QgcHJvak9wdGlvbnMgPSBzZWxlY3QucXVlcnlTZWxlY3RvckFsbCAoJ29wdGlvbicpO1xuICAgICAgICBwcm9qT3B0aW9ucy5mb3JFYWNoKG9wdGlvbiA9PiBvcHRpb24ucmVtb3ZlKCkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpcm1UYXNrIChldmVudCwgcGFyZW50KSB7XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0ICgpO1xuICAgICAgICBjb25zdCBwcm9qZWN0ID0gZmluZFNlbGVjdGVkUHJvaiAoKTtcbiAgICAgICAgdGFza01vZC5hZGRUb1Byb2plY3QgKHByb2plY3QudGFza0xpc3QsIGNyZWF0ZVRhc2sgKHRhc2tJbnB1dHMsIHByb2plY3QpLCBwcm9qZWN0LCBwYXJlbnQpO1xuICAgICAgICBjbG9zZU1vZGFsICh0YXNrRGlhbG9nKTtcbiAgICAgICAgc3Rvck1vZC5zdG9yZVByb2ogKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUHJvaiAoKSB7XG4gICAgICAgIHJldHVybiB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjcHJvamVjdC1zZWwnKS52YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kU2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qID0gZ2V0U2VsZWN0ZWRQcm9qICgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RNb2QucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TW9kLnByb2plY3RzW2ldLnRpdGxlID09PSBzZWxlY3RlZFByb2opIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdE1vZC5wcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzb3J0SW5wdXRzIChpbnB1dEFycikge1xuICAgICAgICBjb25zdCBvYmpBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRBcnIuZm9yRWFjaChpbnB1dCA9PiBvYmpBcnIucHVzaCAoaW5wdXQudmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iakFycjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrIChpbnB1dEFyciwgcHJvamVjdCkge1xuICAgICAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHNvcnRJbnB1dHMoaW5wdXRBcnIpO1xuICAgICAgICBhZGRNb2RhbE5vbklucHV0cyAoaW5wdXRWYWx1ZXMpXG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSB0YXNrTW9kLmNyZWF0ZVRhc2soaW5wdXRWYWx1ZXNbMF0sIFxuICAgICAgICAgICAgaW5wdXRWYWx1ZXNbMl0sIGlucHV0VmFsdWVzWzFdLCBpbnB1dFZhbHVlc1szXSwgXG4gICAgICAgICAgICBgJHtpbnB1dFZhbHVlc1swXX0taWQjJHtwcm9qZWN0LnRhc2tMaXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgcmV0dXJuIG5ld1Rhc2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkTW9kYWxOb25JbnB1dHMgKHZhbHVlQXJyKSB7XG4gICAgICAgIHZhbHVlQXJyLnB1c2ggKHRhc2tEZXNjci52YWx1ZSk7XG4gICAgICAgIHZhbHVlQXJyLnB1c2ggKHRhc2tQcmlvLnZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsIChtb2RhbCkge1xuICAgICAgICBhbGxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtUHJvaiAoZXZlbnQsIHByb2pDb250YWluZXIsIGRpc3BsYXlDb250YWluZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgKCk7XG4gICAgICAgIHByb2plY3RNb2QuY3JlYXRlRnJvbUJ0biAocHJvaklucHV0cy52YWx1ZSwgcHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgICAgIHVzZURPTS5kZWxldGVTaWRlYmFyICgpO1xuICAgICAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgcHJvakNvbnRhaW5lciwgJ2RpdicsIGRpc3BsYXlDb250YWluZXIpO1xuICAgICAgICBjbG9zZU1vZGFsIChwcm9qRGlhbG9nKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgICAgICBzdG9yTW9kLnN0b3JlUHJvaiAocHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd1Rhc2tNb2RhbDogc2hvd1Rhc2tNb2RhbCxcbiAgICAgICAgc2hvd1Byb2pNb2RhbDogc2hvd1Byb2pNb2RhbCxcbiAgICAgICAgY29uZmlybVRhc2s6IGNvbmZpcm1UYXNrLFxuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9uczogY3JlYXRlUHJvamVjdE9wdGlvbnMsXG4gICAgICAgIGNvbmZpcm1Qcm9qLCBjb25maXJtUHJvaixcbiAgICB9XG5cbn0pKCk7IiwiaW1wb3J0IHsgc3Rvck1vZCB9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuZXhwb3J0IHtwcm9qZWN0TW9kfTtcblxuXG5jb25zdCBwcm9qZWN0TW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHByb2plY3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0ICh0aXRsZSwgdGFza0xpc3QpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgdGFza0xpc3R9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUJ0biAodGl0bGUsIHByb2plY3RzQXJyKSB7XG4gICAgICAgIHByb2plY3RzQXJyLnB1c2ggKGNyZWF0ZVByb2plY3QgKHRpdGxlLCBbXSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU9ialRhc2sgKHByb2plY3RUYXNrTGlzdCwgdGFza0lkKSB7XG4gICAgICAgIHByb2plY3RUYXNrTGlzdC5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgdGFzay5pZCA9PT0gdGFza0lkID8gcHJvamVjdFRhc2tMaXN0LnNwbGljZShwcm9qZWN0VGFza0xpc3QuaW5kZXhPZih0YXNrKSwgMSkgOiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdDogY3JlYXRlUHJvamVjdCxcbiAgICAgICAgY3JlYXRlRnJvbUJ0biwgY3JlYXRlRnJvbUJ0bixcbiAgICAgICAgcmVtb3ZlT2JqVGFzazogcmVtb3ZlT2JqVGFzayxcbiAgICAgICAgcHJvamVjdHMsXG4gICAgfVxufSkoKTsiLCJleHBvcnQge3N0b3JNb2R9O1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuXG5jb25zdCBzdG9yTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIHN0b3JlUHJvaiAocHJvamVjdHNBcnIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeSAocHJvamVjdHNBcnIpKTtcbiAgICAgICAgY29uc29sZS5sb2cgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrU3RvcmFnZSAocHJvamVjdHNBcnIpIHtcbiAgICAgICAgaWYgKCFsb2NhbFN0b3JhZ2UuZ2V0SXRlbSAoXCJwcm9qZWN0c1wiKSkge1xuICAgICAgICAgICAgY29uc29sZS5sb2cgKCdubyBleGlzdGluZyBzdG9yYWdlJylcbiAgICAgICAgICAgIHN0b3JlUHJvaiAocHJvamVjdHNBcnIpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXRQcm9qQXJyICgpO1xuICAgICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRQcm9qQXJyICgpIHtcbiAgICAgICAgcHJvamVjdE1vZC5wcm9qZWN0cyA9IEpTT04ucGFyc2UobG9jYWxTdG9yYWdlLmdldEl0ZW0oXCJwcm9qZWN0c1wiKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RvcmVQcm9qOiBzdG9yZVByb2osXG4gICAgICAgIHNldFByb2pBcnI6IHNldFByb2pBcnIsXG4gICAgICAgIGNoZWNrU3RvcmFnZTogY2hlY2tTdG9yYWdlLFxuICAgIH1cblxufSkoKTsiLCJleHBvcnQge3Rhc2tNb2R9O1xuaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuXG5cbmNvbnN0IHRhc2tNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWUsIHByaW9yaXR5LCBpZCkge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlLCBwcmlvcml0eSwgaWR9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXNzaWduVGFzayAodGFza09iaiwgdGFza0Fycikge1xuICAgICAgICB0YXNrQXJyLnB1c2godGFza09iaik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9Qcm9qZWN0ICh0YXNrQXJyLCB0YXNrT2JqLCBwcm9qZWN0LCBwYXJlbnQpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoICh0YXNrT2JqKTtcbiAgICAgICAgdXNlRE9NLnJlZnJlc2hEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRhc2tEYXRhIChvYmosIHBhcmVudCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09ICdpZCcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBmaWVsZCA9IGAke3VzZURPTS5jYXBGaXJzdExldHRlciAoa2V5KX06ICR7b2JqW2tleV19YDtcbiAgICAgICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCBmaWVsZCksIHBhcmVudCk7XG4gICAgICAgICAgICB9IFxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGFzazogY3JlYXRlVGFzayxcbiAgICAgICAgYXNzaWduVGFzazogYXNzaWduVGFzayxcbiAgICAgICAgYWRkVGFza0RhdGE6IGFkZFRhc2tEYXRhLFxuICAgICAgICBhZGRUb1Byb2plY3Q6IGFkZFRvUHJvamVjdCxcbiAgICB9XG5cbn0pKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge3VzZURPTX0gZnJvbSAnLi9kb20uanMnXG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gJy4vdGFza3MuanMnXG5pbXBvcnQge21vZGFsTW9kfSBmcm9tICcuL21vZGFsLmpzJ1xuaW1wb3J0IHtzdG9yTW9kfSBmcm9tICcuL3N0b3JhZ2UuanMnXG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBodG1sQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcjY29udGVudCcpXG5cbiAgICBjb25zdCBoZWFkZXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2hlYWRlcicsICdkaXYnKTtcbiAgICBjb25zdCBzaWRlYmFyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdzaWRlYmFyJywgJ2RpdicpO1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZ3JpZCcsICdkaXYnKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKGhlYWRlckNvbnRlbnQsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChncmlkQ29udGFpbmVyLCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoc2lkZWJhckNvbnRlbnQsIGdyaWRDb250YWluZXIpO1xuXG4gICAgdXNlRE9NLmNyZWF0ZUltZyAoJy4vaW1nL2xpc3QtYmxjay5zdmcnLCAnNDBweCcsICdMaXN0IHdpdGggY2hlY2tzIGljb24uJywgaGVhZGVyQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDInLCAnVG8gRG8gTGlzdCcpLCBoZWFkZXJDb250ZW50KTtcblxuICAgIGNvbnN0IGFkZFByb2pCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgUHJvamVjdCcsICdhZGQtcHJvamVjdCcpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFByb2pCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRQcm9qQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93UHJvak1vZGFsKCkpO1xuXG4gICAgY29uc3QgYWRkVGFza0J0biA9IHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50ICgnYnV0dG9uJywgJ0FkZCBUYXNrJywgJ2FkZC10YXNrJyk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoYWRkVGFza0J0biwgaGVhZGVyQ29udGVudCk7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGFkZFRhc2tCdG4sICdjbGljaycsICgpID0+IG1vZGFsTW9kLnNob3dUYXNrTW9kYWwoKSk7XG5cbiAgICBjb25zdCBjb25maXJtVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVRhc2tcIik7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGNvbmZpcm1UYXNrLCAnY2xpY2snLCAoZXZlbnQpID0+IG1vZGFsTW9kLmNvbmZpcm1UYXNrIFxuICAgIChldmVudCwgZ3JpZENvbnRhaW5lcikpO1xuXG4gICAgY29uc3QgY29uZmlybVByb2ogPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1Qcm9qXCIpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtUHJvaiwgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtUHJvaiBcbiAgICAoZXZlbnQsIHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKSk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMycsICdQcm9qZWN0cycpLCBzaWRlYmFyQ29udGVudCk7XG5cbiAgICBjb25zdCBtZWFsVGFza3MgPSBbXTtcbiAgICBjb25zdCBtb24gPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdQYXN0YScsICdwaWNrIHVwIHBlc3RvIGFuZCBub29kbGVzIGZvciBNb25kYXknLFxuICAgICAnMjAyMy0xMi0yOScsICdMb3cnLCBgUGFzdGEtaWQjMGApO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAobW9uLCBtZWFsVGFza3MpO1xuICAgIGNvbnN0IHR1ZXMgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdGaXNoJywgJ2hlYWQgdG8gdGhlIG1hcmtldCBhbmQgcGljayB1cCBzb21ldGhpbmcgZnJlc2gnLFxuICAgICAnMjAyMy0xMi0zMCcsICdIaWdoJywgYEZpc2gtaWQjMWApO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAodHVlcywgbWVhbFRhc2tzKTtcbiAgICBjb25zdCB3ZWQgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdCdXJnZXJzJywgJ1dlZG5lc2RheSBpcyBzdXBwb3NlZCB0byBiZSBncmVhdCBCQlEgd2VhdGhlcicsXG4gICAgICcyMDIzLTEyLTMxJywgJ01lZGl1bScsIGBCdXJnZXJzLWlkIzJgKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKHdlZCwgbWVhbFRhc2tzKTtcblxuICAgIGNvbnN0IG1vcm9jY29UYXNrcyA9IFtdO1xuICAgIGNvbnN0IGNvb2sgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdDb29rJywgJ3RyeSB0byBjb29rIHRhZ2luZSBsaWtlIHRoZSBsb2NhbHMnLFxuICAgICAnMjAyMy0xMi0xJywgJ01lZGl1bScsIGBDb29rLWlkIzBgKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKGNvb2ssIG1vcm9jY29UYXNrcyk7XG4gICAgY29uc3Qgc2hvcCA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ1Nob3AnLCAnZ28gc2hvcHBpbmcgZm9yIGEgY29vbCBuZXcgcnVnIHRvIGJyaW5nIGhvbWUnLFxuICAgICAnMjAyMy0xMi0zJywgJ05vbmUnLCBgU2hvcC1pZCMxYCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChzaG9wLCBtb3JvY2NvVGFza3MpO1xuICAgIGNvbnN0IGNhbWVsID0gdGFza01vZC5jcmVhdGVUYXNrICgnRmVlZCBhIENhbWVsJywgJ2ZpbmQgb3V0IHdoYXQgY2FtZWxzIGVhdCBhbmQgZmVlZCBvbmUnLFxuICAgICcyMDIzLTEyLTUnLCAnTWVkaXVtJywgYEZlZWQtaWQjMmApO1xuICAgdGFza01vZC5hc3NpZ25UYXNrIChjYW1lbCwgbW9yb2Njb1Rhc2tzKTtcblxuICAgIHByb2plY3RNb2QucHJvamVjdHMucHVzaCAocHJvamVjdE1vZC5jcmVhdGVQcm9qZWN0ICgnTW9yb2NjbycsIG1vcm9jY29UYXNrcykpO1xuICAgIHByb2plY3RNb2QucHJvamVjdHMucHVzaCAocHJvamVjdE1vZC5jcmVhdGVQcm9qZWN0ICgnTWVhbCBQbGFuJywgbWVhbFRhc2tzKSk7XG5cbiAgICBzdG9yTW9kLmNoZWNrU3RvcmFnZSAocHJvamVjdE1vZC5wcm9qZWN0cylcblxuICAgIHVzZURPTS5yZW5kZXJEaXNwbGF5IChwcm9qZWN0TW9kLnByb2plY3RzWzBdLCBncmlkQ29udGFpbmVyKTtcbiAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgc2lkZWJhckNvbnRlbnQsICdkaXYnLCBncmlkQ29udGFpbmVyKVxuXG4gICAgbW9kYWxNb2QuY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9