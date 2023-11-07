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
        console.log ('Remove from array.');
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.removeObjTask (project.taskList, task.id);
        console.log (project);
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
        console.log ('Remove from local storage.')
        console.log (JSON.parse(localStorage.getItem("projects")));
    }

    return {
        storeProj: storeProj,
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

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects[0], gridContainer);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderSidebar (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects, sidebarContent, 'div', gridContainer)

    _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.createProjectOptions (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);

    // storMod.storeProj();
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBUTtBQUNoRTs7QUFFQSxJQUFJLDJDQUFNLFlBQVksMkNBQU07O0FBRTVCO0FBQ0EsZ0JBQWdCLDhDQUFPO0FBQ3ZCO0FBQ0EsSUFBSSw4Q0FBTztBQUNYLGlCQUFpQiw4Q0FBTztBQUN4QjtBQUNBLElBQUksOENBQU87QUFDWCxnQkFBZ0IsOENBQU87QUFDdkI7QUFDQSxJQUFJLDhDQUFPOztBQUVYO0FBQ0EsaUJBQWlCLDhDQUFPO0FBQ3hCO0FBQ0EsSUFBSSw4Q0FBTztBQUNYLGlCQUFpQiw4Q0FBTztBQUN4QjtBQUNBLElBQUksOENBQU87QUFDWCxrQkFBa0IsOENBQU87QUFDekI7QUFDQSxHQUFHLDhDQUFPOztBQUVWLElBQUksb0RBQVUsZ0JBQWdCLG9EQUFVO0FBQ3hDLElBQUksb0RBQVUsZ0JBQWdCLG9EQUFVOztBQUV4QyxJQUFJLDJDQUFNLGdCQUFnQixvREFBVTtBQUNwQyxJQUFJLDJDQUFNLGdCQUFnQixvREFBVTs7QUFFcEMsSUFBSSwrQ0FBUSx1QkFBdUIsb0RBQVU7O0FBRTdDO0FBQ0E7QUFDQSxDQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9kb20uanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2RhbC5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3RvcmFnZS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Rhc2tzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCB7dXNlRE9NfSBcbmltcG9ydCB7IG1vZGFsTW9kIH0gZnJvbSBcIi4vbW9kYWwuanNcIjtcbmltcG9ydCB7IHByb2plY3RNb2QgfSBmcm9tIFwiLi9wcm9qZWN0cy5qc1wiO1xuaW1wb3J0IHsgdGFza01vZCB9IGZyb20gXCIuL3Rhc2tzLmpzXCI7XG5pbXBvcnQge3N0b3JNb2R9IGZyb20gXCIuL3N0b3JhZ2VcIjtcblxuXG5jb25zdCB1c2VET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQsIGNzc0NsYXNzKSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9IVE1MIChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoY3NzQ2xhc3MsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qIChvYmosIGxvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgb2JqLnRpdGxlKVxuICAgICAgICBhZGRUb0hUTUwgKG5ld0VsZW1lbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kQWxsVGFza3MgKHByb2plY3QsIHRhc2tBcnIsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRhc2tBcnIuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0NvbnQgID0gY3JlYXRlQ29udGFpbmVyICgncm93LWNvbnQnLCAnZGl2Jyk7XG4gICAgICAgICAgICBhZGRUb0hUTUwgKHJvd0NvbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHJvd0ljb25zID0gY3JlYXRlVGFza1JvdyAocm93Q29udCk7XG4gICAgICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBhcHBlbmRQcm9qICh0YXNrLCByb3dJY29ucywgJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGNyZWF0ZUltZyAoJy4vaW1nL2RlbGV0ZS5zdmcnLCAnMjBweCcsICdUcmFzaCBiaW4gaWNvbi4nLCByb3dJY29ucyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrRGV0YWlscyA9IGNyZWF0ZUhpZGRlbkRldGFpbHMgKHRhc2ssIHJvd0NvbnQpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAodGFza1RpdGxlLCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCB0YXNrRGV0YWlscykpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAodGFza0RldGFpbHMsICdjbGljaycsICgpID0+IHRvZ2dsZURldGFpbHMgKHRhc2ssIHRhc2tEZXRhaWxzKSk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChkZWxldGVJY29uLCAnY2xpY2snLCAoKSA9PiBkZWxldGVUYXNrIChwcm9qZWN0LCB0YXNrLCByb3dDb250KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2tSb3cgKHBhcmVudCkge1xuICAgICAgICBjb25zdCByb3dJY29ucyAgPSBjcmVhdGVDb250YWluZXIgKCdyb3ctaWNvbicsICdkaXYnKTtcbiAgICAgICAgYWRkVG9IVE1MIChyb3dJY29ucywgcGFyZW50KTtcbiAgICAgICAgcmV0dXJuIHJvd0ljb25zO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUltZyAoc3JjLCB3aWR0aCwgYWx0LCBwYXJlbnQpIHtcbiAgICAgICAgY29uc3QgaW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJylcbiAgICAgICAgaW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBzcmMpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwid2lkdGhcIiwgd2lkdGgpO1xuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwiYWx0XCIsIGFsdCk7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChpbWcpO1xuICAgICAgICByZXR1cm4gaW1nO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMgKGVsZW1lbnQsIGV2ZW50LCBhY3Rpb24pIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRvZ2dsZURldGFpbHMgKG9iaiwgZWxlbWVudCkge1xuICAgICAgICBpZiAoZWxlbWVudC5zdHlsZS5kaXNwbGF5ID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkZWxldGVUYXNrIChwcm9qZWN0LCB0YXNrLCBjb250YWluZXIpIHtcbiAgICAgICAgY29uc29sZS5sb2cgKCdSZW1vdmUgZnJvbSBhcnJheS4nKTtcbiAgICAgICAgcHJvamVjdE1vZC5yZW1vdmVPYmpUYXNrIChwcm9qZWN0LnRhc2tMaXN0LCB0YXNrLmlkKTtcbiAgICAgICAgY29uc29sZS5sb2cgKHByb2plY3QpO1xuICAgICAgICBjb250YWluZXIucmVtb3ZlICgpO1xuICAgICAgICBzdG9yTW9kLnN0b3JlUHJvaiAocHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSGlkZGVuRGV0YWlscyAob2JqLCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnYWN0aXZlJywgJ2RpdicpO1xuICAgICAgICAvLyBhY3RpdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICBhZGRUb0hUTUwgKGFjdGl2ZSwgbG9jYXRpb24pO1xuICAgICAgICB0YXNrTW9kLmFkZFRhc2tEYXRhIChvYmosIGFjdGl2ZSk7XG4gICAgICAgIHJldHVybiBhY3RpdmU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVmcmVzaERpc3BsYXkgKHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICBkZWxldGVEaXNwbGF5ICgpO1xuICAgICAgICByZW5kZXJEaXNwbGF5IChwcm9qZWN0LCBwYXJlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICBjb25zdCBkaXNwbGF5Q29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdkaXNwbGF5JywgJ2RpdicpO1xuICAgICAgICBhZGRUb0hUTUwgKGRpc3BsYXlDb250ZW50LCBwYXJlbnQpO1xuXG4gICAgICAgIGFwcGVuZFByb2ogKHByb2plY3QsIGRpc3BsYXlDb250ZW50LCAnaDMnKTtcbiAgICAgICAgYXBwZW5kQWxsVGFza3MgKHByb2plY3QsIHByb2plY3QudGFza0xpc3QsIGRpc3BsYXlDb250ZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCkge1xuICAgICAgICBkZWxldGVTaWRlYmFyICgpO1xuICAgICAgICByZWZyZXNoU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCk7XG4gICAgfVxuIFxuICAgIGZ1bmN0aW9uIHJlbmRlclNpZGViYXIgKHByb2pBcnIsIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQsIGRpc3BsYXlDb250YWluZXIpIHtcbiAgICAgICAgcHJvakFyci5mb3JFYWNoKHByb2ogPT4ge1xuICAgICAgICAgICAgY29uc3QgcHJvakRpdiA9IGFwcGVuZFByb2ogKHByb2osIGNoaWxkTG9jYXRpb24sIGVsZW1lbnQpXG4gICAgICAgICAgICBiaW5kRXZlbnRzIChwcm9qRGl2LCAnY2xpY2snLCAoKSA9PiByZWZyZXNoRGlzcGxheSAocHJvaiwgZGlzcGxheUNvbnRhaW5lcikpO1xuICAgICAgICB9KTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZXRlRGlzcGxheSAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcuZGlzcGxheScpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZVNpZGViYXIgKCkge1xuICAgICAgICBjb25zdCBzaWRlYmFyRGl2cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwgKCcuc2lkZWJhciA+IGRpdicpO1xuICAgICAgICBzaWRlYmFyRGl2cy5mb3JFYWNoKHByb2ogPT4gcHJvai5yZW1vdmUoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2FwRmlyc3RMZXR0ZXIgKHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyLnNsaWNlKDEpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRleHRFbGVtZW50OiBjcmVhdGVUZXh0RWxlbWVudCxcbiAgICAgICAgYWRkVG9IVE1MOiBhZGRUb0hUTUwsXG4gICAgICAgIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQ29udGFpbmVyLFxuICAgICAgICBhcHBlbmRQcm9qOiBhcHBlbmRQcm9qLFxuICAgICAgICBhcHBlbmRBbGxUYXNrczogYXBwZW5kQWxsVGFza3MsXG4gICAgICAgIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQ6IGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQsXG4gICAgICAgIGJpbmRFdmVudHM6IGJpbmRFdmVudHMsXG4gICAgICAgIHJlbmRlckRpc3BsYXk6IHJlbmRlckRpc3BsYXksXG4gICAgICAgIGRlbGV0ZURpc3BsYXk6IGRlbGV0ZURpc3BsYXksXG4gICAgICAgIHJlbmRlclNpZGViYXI6IHJlbmRlclNpZGViYXIsXG4gICAgICAgIHJlZnJlc2hEaXNwbGF5OiByZWZyZXNoRGlzcGxheSxcbiAgICAgICAgZGVsZXRlU2lkZWJhcjogZGVsZXRlU2lkZWJhcixcbiAgICAgICAgcmVmcmVzaFNpZGViYXI6IHJlZnJlc2hTaWRlYmFyLFxuICAgICAgICBjYXBGaXJzdExldHRlcjogY2FwRmlyc3RMZXR0ZXIsXG4gICAgICAgIGNyZWF0ZUltZzogY3JlYXRlSW1nLFxuICAgIH1cbn0pKCk7IiwiZXhwb3J0IHttb2RhbE1vZH1cbmltcG9ydCB7IHVzZURPTSB9IGZyb20gXCIuL2RvbVwiO1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tIFwiLi90YXNrc1wiO1xuaW1wb3J0IHtzdG9yTW9kfSBmcm9tIFwiLi9zdG9yYWdlXCI7XG5cbmNvbnN0IG1vZGFsTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLnRhc2stZGlhbG9nJyk7XG4gICAgY29uc3QgdGFza0lucHV0cyA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvckFsbCAoJ2lucHV0Jyk7XG4gICAgY29uc3Qgc2VsZWN0ID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yICgnI3Byb2plY3Qtc2VsJyk7XG4gICAgY29uc3QgdGFza0Rlc2NyID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yICgnI2Rlc2NyJyk7XG4gICAgY29uc3QgdGFza1ByaW8gID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yICgnI3ByaW9yaXR5Jyk7XG5cbiAgICBjb25zdCBwcm9qRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy5wcm9qLWRpYWxvZycpO1xuICAgIGNvbnN0IHByb2pJbnB1dHMgPSBwcm9qRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCdpbnB1dCcpO1xuXG4gICAgY29uc3QgYWxsSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCAoJ2lucHV0Jyk7XG5cbiAgICBmdW5jdGlvbiBzaG93VGFza01vZGFsICgpIHtcbiAgICAgICAgdGFza0RpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93UHJvak1vZGFsICgpIHtcbiAgICAgICAgcHJvakRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0T3B0aW9ucyAoKSB7XG4gICAgICAgIHJlbW92ZVByb2pPcHRpb25zICgpXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgcHJvamVjdE1vZC5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnb3B0aW9uJywgcHJvamVjdC50aXRsZSk7XG4gICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MIChvcHRpb24sIHNlbGVjdCk7XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvak9wdGlvbnMgKCkge1xuICAgICAgICBjb25zdCBwcm9qT3B0aW9ucyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsICgnb3B0aW9uJyk7XG4gICAgICAgIHByb2pPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5yZW1vdmUoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlybVRhc2sgKGV2ZW50LCBwYXJlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgKCk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBmaW5kU2VsZWN0ZWRQcm9qICgpO1xuICAgICAgICB0YXNrTW9kLmFkZFRvUHJvamVjdCAocHJvamVjdC50YXNrTGlzdCwgY3JlYXRlVGFzayAodGFza0lucHV0cywgcHJvamVjdCksIHByb2plY3QsIHBhcmVudCk7XG4gICAgICAgIGNsb3NlTW9kYWwgKHRhc2tEaWFsb2cpO1xuICAgICAgICBzdG9yTW9kLnN0b3JlUHJvaiAocHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgcmV0dXJuIHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvciAoJyNwcm9qZWN0LXNlbCcpLnZhbHVlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmRTZWxlY3RlZFByb2ogKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RlZFByb2ogPSBnZXRTZWxlY3RlZFByb2ogKCk7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvamVjdE1vZC5wcm9qZWN0cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgaWYgKHByb2plY3RNb2QucHJvamVjdHNbaV0udGl0bGUgPT09IHNlbGVjdGVkUHJvaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBwcm9qZWN0TW9kLnByb2plY3RzW2ldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIHNvcnRJbnB1dHMgKGlucHV0QXJyKSB7XG4gICAgICAgIGNvbnN0IG9iakFyciA9IFtdO1xuICAgICAgICBpbnB1dEFyci5mb3JFYWNoKGlucHV0ID0+IG9iakFyci5wdXNoIChpbnB1dC52YWx1ZSkpO1xuICAgICAgICByZXR1cm4gb2JqQXJyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKGlucHV0QXJyLCBwcm9qZWN0KSB7XG4gICAgICAgIGNvbnN0IGlucHV0VmFsdWVzID0gc29ydElucHV0cyhpbnB1dEFycik7XG4gICAgICAgIGFkZE1vZGFsTm9uSW5wdXRzIChpbnB1dFZhbHVlcylcbiAgICAgICAgY29uc3QgbmV3VGFzayA9IHRhc2tNb2QuY3JlYXRlVGFzayhpbnB1dFZhbHVlc1swXSwgXG4gICAgICAgICAgICBpbnB1dFZhbHVlc1syXSwgaW5wdXRWYWx1ZXNbMV0sIGlucHV0VmFsdWVzWzNdLCBcbiAgICAgICAgICAgIGAke2lucHV0VmFsdWVzWzBdfS1pZCMke3Byb2plY3QudGFza0xpc3QubGVuZ3RofWApO1xuICAgICAgICByZXR1cm4gbmV3VGFzaztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRNb2RhbE5vbklucHV0cyAodmFsdWVBcnIpIHtcbiAgICAgICAgdmFsdWVBcnIucHVzaCAodGFza0Rlc2NyLnZhbHVlKTtcbiAgICAgICAgdmFsdWVBcnIucHVzaCAodGFza1ByaW8udmFsdWUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwgKG1vZGFsKSB7XG4gICAgICAgIGFsbElucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gJycpO1xuICAgICAgICBtb2RhbC5jbG9zZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNvbmZpcm1Qcm9qIChldmVudCwgcHJvakNvbnRhaW5lciwgZGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCAoKTtcbiAgICAgICAgcHJvamVjdE1vZC5jcmVhdGVGcm9tQnRuIChwcm9qSW5wdXRzLnZhbHVlLCBwcm9qZWN0TW9kLnByb2plY3RzKTtcbiAgICAgICAgdXNlRE9NLmRlbGV0ZVNpZGViYXIgKCk7XG4gICAgICAgIHVzZURPTS5yZW5kZXJTaWRlYmFyIChwcm9qZWN0TW9kLnByb2plY3RzLCBwcm9qQ29udGFpbmVyLCAnZGl2JywgZGlzcGxheUNvbnRhaW5lcik7XG4gICAgICAgIGNsb3NlTW9kYWwgKHByb2pEaWFsb2cpO1xuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9ucyAocHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgICAgIHN0b3JNb2Quc3RvcmVQcm9qIChwcm9qZWN0TW9kLnByb2plY3RzKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93VGFza01vZGFsOiBzaG93VGFza01vZGFsLFxuICAgICAgICBzaG93UHJvak1vZGFsOiBzaG93UHJvak1vZGFsLFxuICAgICAgICBjb25maXJtVGFzazogY29uZmlybVRhc2ssXG4gICAgICAgIGNyZWF0ZVByb2plY3RPcHRpb25zOiBjcmVhdGVQcm9qZWN0T3B0aW9ucyxcbiAgICAgICAgY29uZmlybVByb2osIGNvbmZpcm1Qcm9qLFxuICAgIH1cblxufSkoKTsiLCJpbXBvcnQgeyBzdG9yTW9kIH0gZnJvbSBcIi4vc3RvcmFnZVwiO1xuXG5leHBvcnQge3Byb2plY3RNb2R9O1xuXG5jb25zdCBwcm9qZWN0TW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHByb2plY3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0ICh0aXRsZSwgdGFza0xpc3QpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgdGFza0xpc3R9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlRnJvbUJ0biAodGl0bGUsIHByb2plY3RzQXJyKSB7XG4gICAgICAgIHByb2plY3RzQXJyLnB1c2ggKGNyZWF0ZVByb2plY3QgKHRpdGxlLCBbXSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZU9ialRhc2sgKHByb2plY3RUYXNrTGlzdCwgdGFza0lkKSB7XG4gICAgICAgIHByb2plY3RUYXNrTGlzdC5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgdGFzay5pZCA9PT0gdGFza0lkID8gcHJvamVjdFRhc2tMaXN0LnNwbGljZShwcm9qZWN0VGFza0xpc3QuaW5kZXhPZih0YXNrKSwgMSkgOiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdDogY3JlYXRlUHJvamVjdCxcbiAgICAgICAgY3JlYXRlRnJvbUJ0biwgY3JlYXRlRnJvbUJ0bixcbiAgICAgICAgcmVtb3ZlT2JqVGFzazogcmVtb3ZlT2JqVGFzayxcbiAgICAgICAgcHJvamVjdHMsXG4gICAgfVxufSkoKTsiLCJleHBvcnQge3N0b3JNb2R9O1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tIFwiLi9wcm9qZWN0c1wiO1xuXG5jb25zdCBzdG9yTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIHN0b3JlUHJvaiAocHJvamVjdHNBcnIpIHtcbiAgICAgICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oXCJwcm9qZWN0c1wiLCBKU09OLnN0cmluZ2lmeSAocHJvamVjdHNBcnIpKTtcbiAgICAgICAgY29uc29sZS5sb2cgKCdSZW1vdmUgZnJvbSBsb2NhbCBzdG9yYWdlLicpXG4gICAgICAgIGNvbnNvbGUubG9nIChKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKFwicHJvamVjdHNcIikpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzdG9yZVByb2o6IHN0b3JlUHJvaixcbiAgICB9XG5cbn0pKCk7IiwiZXhwb3J0IHt0YXNrTW9kfTtcbmltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcblxuXG5jb25zdCB0YXNrTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVRhc2sgKHRpdGxlLCBkZXNjcmlwdGlvbiwgZHVlLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZSwgcHJpb3JpdHksIGlkfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2lnblRhc2sgKHRhc2tPYmosIHRhc2tBcnIpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoKHRhc2tPYmopO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvUHJvamVjdCAodGFza0FyciwgdGFza09iaiwgcHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCAodGFza09iaik7XG4gICAgICAgIHVzZURPTS5yZWZyZXNoRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrRGF0YSAob2JqLCBwYXJlbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoa2V5ICE9PSAnaWQnKSB7XG4gICAgICAgICAgICAgICAgY29uc3QgZmllbGQgPSBgJHt1c2VET00uY2FwRmlyc3RMZXR0ZXIgKGtleSl9OiAke29ialtrZXldfWA7XG4gICAgICAgICAgICAgICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgZmllbGQpLCBwYXJlbnQpO1xuICAgICAgICAgICAgfSBcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRhc2s6IGNyZWF0ZVRhc2ssXG4gICAgICAgIGFzc2lnblRhc2s6IGFzc2lnblRhc2ssXG4gICAgICAgIGFkZFRhc2tEYXRhOiBhZGRUYXNrRGF0YSxcbiAgICAgICAgYWRkVG9Qcm9qZWN0OiBhZGRUb1Byb2plY3QsXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tICcuL3Rhc2tzLmpzJ1xuaW1wb3J0IHttb2RhbE1vZH0gZnJvbSAnLi9tb2RhbC5qcydcbmltcG9ydCB7c3Rvck1vZH0gZnJvbSAnLi9zdG9yYWdlLmpzJ1xuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaHRtbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI2NvbnRlbnQnKVxuXG4gICAgY29uc3QgaGVhZGVyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdoZWFkZXInLCAnZGl2Jyk7XG4gICAgY29uc3Qgc2lkZWJhckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnc2lkZWJhcicsICdkaXYnKTtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2dyaWQnLCAnZGl2Jyk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MIChoZWFkZXJDb250ZW50LCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoZ3JpZENvbnRhaW5lciwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKTtcblxuICAgIHVzZURPTS5jcmVhdGVJbWcgKCcuL2ltZy9saXN0LWJsY2suc3ZnJywgJzQwcHgnLCAnTGlzdCB3aXRoIGNoZWNrcyBpY29uLicsIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2gyJywgJ1RvIERvIExpc3QnKSwgaGVhZGVyQ29udGVudCk7XG5cbiAgICBjb25zdCBhZGRQcm9qQnRuID0gdXNlRE9NLmNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKCdidXR0b24nLCAnQWRkIFByb2plY3QnLCAnYWRkLXByb2plY3QnKTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChhZGRQcm9qQnRuLCBoZWFkZXJDb250ZW50KTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoYWRkUHJvakJ0biwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2Quc2hvd1Byb2pNb2RhbCgpKTtcblxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgVGFzaycsICdhZGQtdGFzaycpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFRhc2tCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRUYXNrQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93VGFza01vZGFsKCkpO1xuXG4gICAgY29uc3QgY29uZmlybVRhc2sgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1UYXNrXCIpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtVGFzaywgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtVGFzayBcbiAgICAoZXZlbnQsIGdyaWRDb250YWluZXIpKTtcblxuICAgIGNvbnN0IGNvbmZpcm1Qcm9qID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtUHJvalwiKTtcbiAgICB1c2VET00uYmluZEV2ZW50cyAoY29uZmlybVByb2osICdjbGljaycsIChldmVudCkgPT4gbW9kYWxNb2QuY29uZmlybVByb2ogXG4gICAgKGV2ZW50LCBzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcikpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDMnLCAnUHJvamVjdHMnKSwgc2lkZWJhckNvbnRlbnQpO1xuXG4gICAgY29uc3QgbWVhbFRhc2tzID0gW107XG4gICAgY29uc3QgbW9uID0gdGFza01vZC5jcmVhdGVUYXNrICgnUGFzdGEnLCAncGljayB1cCBwZXN0byBhbmQgbm9vZGxlcyBmb3IgTW9uZGF5JyxcbiAgICAgJzIwMjMtMTItMjknLCAnTG93JywgYFBhc3RhLWlkIzBgKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKG1vbiwgbWVhbFRhc2tzKTtcbiAgICBjb25zdCB0dWVzID0gdGFza01vZC5jcmVhdGVUYXNrICgnRmlzaCcsICdoZWFkIHRvIHRoZSBtYXJrZXQgYW5kIHBpY2sgdXAgc29tZXRoaW5nIGZyZXNoJyxcbiAgICAgJzIwMjMtMTItMzAnLCAnSGlnaCcsIGBGaXNoLWlkIzFgKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKHR1ZXMsIG1lYWxUYXNrcyk7XG4gICAgY29uc3Qgd2VkID0gdGFza01vZC5jcmVhdGVUYXNrICgnQnVyZ2VycycsICdXZWRuZXNkYXkgaXMgc3VwcG9zZWQgdG8gYmUgZ3JlYXQgQkJRIHdlYXRoZXInLFxuICAgICAnMjAyMy0xMi0zMScsICdNZWRpdW0nLCBgQnVyZ2Vycy1pZCMyYCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrICh3ZWQsIG1lYWxUYXNrcyk7XG5cbiAgICBjb25zdCBtb3JvY2NvVGFza3MgPSBbXTtcbiAgICBjb25zdCBjb29rID0gdGFza01vZC5jcmVhdGVUYXNrICgnQ29vaycsICd0cnkgdG8gY29vayB0YWdpbmUgbGlrZSB0aGUgbG9jYWxzJyxcbiAgICAgJzIwMjMtMTItMScsICdNZWRpdW0nLCBgQ29vay1pZCMwYCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChjb29rLCBtb3JvY2NvVGFza3MpO1xuICAgIGNvbnN0IHNob3AgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdTaG9wJywgJ2dvIHNob3BwaW5nIGZvciBhIGNvb2wgbmV3IHJ1ZyB0byBicmluZyBob21lJyxcbiAgICAgJzIwMjMtMTItMycsICdOb25lJywgYFNob3AtaWQjMWApO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoc2hvcCwgbW9yb2Njb1Rhc2tzKTtcbiAgICBjb25zdCBjYW1lbCA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0ZlZWQgYSBDYW1lbCcsICdmaW5kIG91dCB3aGF0IGNhbWVscyBlYXQgYW5kIGZlZWQgb25lJyxcbiAgICAnMjAyMy0xMi01JywgJ01lZGl1bScsIGBGZWVkLWlkIzJgKTtcbiAgIHRhc2tNb2QuYXNzaWduVGFzayAoY2FtZWwsIG1vcm9jY29UYXNrcyk7XG5cbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ01vcm9jY28nLCBtb3JvY2NvVGFza3MpKTtcbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ01lYWwgUGxhbicsIG1lYWxUYXNrcykpO1xuXG4gICAgdXNlRE9NLnJlbmRlckRpc3BsYXkgKHByb2plY3RNb2QucHJvamVjdHNbMF0sIGdyaWRDb250YWluZXIpO1xuICAgIHVzZURPTS5yZW5kZXJTaWRlYmFyIChwcm9qZWN0TW9kLnByb2plY3RzLCBzaWRlYmFyQ29udGVudCwgJ2RpdicsIGdyaWRDb250YWluZXIpXG5cbiAgICBtb2RhbE1vZC5jcmVhdGVQcm9qZWN0T3B0aW9ucyAocHJvamVjdE1vZC5wcm9qZWN0cyk7XG5cbiAgICAvLyBzdG9yTW9kLnN0b3JlUHJvaigpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9