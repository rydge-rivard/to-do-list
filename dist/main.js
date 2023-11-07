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
            const editIcon = createImg ('./img/pencil.svg', '20px', 'Trash bin icon.', rowIcons);
            const deleteIcon = createImg ('./img/delete.svg', '20px', 'Trash bin icon.', rowIcons);
            const taskDetails = createHiddenDetails (task, rowCont);
            bindEvents (taskTitle, 'click', () => toggleDetails (task, taskDetails));
            bindEvents (taskDetails, 'click', () => toggleDetails (task, taskDetails));
            bindEvents (deleteIcon, 'click', () => deleteTask (project, task, rowCont));
            bindEvents (editIcon, 'click', () => _modal_js__WEBPACK_IMPORTED_MODULE_0__.modalMod.editTaskDetails(task));
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

    function editTaskDetails (task) {
        setExistingDetails (task);
        showTaskModal ()
    }

    function setExistingDetails (task) {
        taskInputs[0].value = task.title;
        taskInputs[1].value = task.due;
    }

    return {
        showTaskModal: showTaskModal,
        showProjModal: showProjModal,
        confirmTask: confirmTask,
        createProjectOptions: createProjectOptions,
        confirmProj, confirmProj,
        editTaskDetails: editTaskDetails,
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

    _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.createProjectOptions (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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O0FBQ0EsaUJBQWlCLDhDQUFPO0FBQ3hCLElBQUksOENBQU87O0FBRVgsSUFBSSxvREFBVSxnQkFBZ0Isb0RBQVU7QUFDeEMsSUFBSSxvREFBVSxnQkFBZ0Isb0RBQVU7O0FBRXhDLElBQUksMkNBQU0sZ0JBQWdCLG9EQUFVO0FBQ3BDLElBQUksMkNBQU0sZ0JBQWdCLG9EQUFVOztBQUVwQyxJQUFJLCtDQUFRLHVCQUF1QixvREFBVTtBQUM3QztBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3VzZURPTX0gXG5pbXBvcnQgeyBtb2RhbE1vZCB9IGZyb20gXCIuL21vZGFsLmpzXCI7XG5pbXBvcnQgeyBwcm9qZWN0TW9kIH0gZnJvbSBcIi4vcHJvamVjdHMuanNcIjtcbmltcG9ydCB7IHRhc2tNb2QgfSBmcm9tIFwiLi90YXNrcy5qc1wiO1xuXG5jb25zdCB1c2VET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQsIGNzc0NsYXNzKSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9IVE1MIChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoY3NzQ2xhc3MsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qIChvYmosIGxvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgb2JqLnRpdGxlKVxuICAgICAgICBhZGRUb0hUTUwgKG5ld0VsZW1lbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kQWxsVGFza3MgKHByb2plY3QsIHRhc2tBcnIsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRhc2tBcnIuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHJvd0NvbnQgID0gY3JlYXRlQ29udGFpbmVyICgncm93LWNvbnQnLCAnZGl2Jyk7XG4gICAgICAgICAgICBhZGRUb0hUTUwgKHJvd0NvbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgICAgIGNvbnN0IHJvd0ljb25zID0gY3JlYXRlVGFza1JvdyAocm93Q29udCk7XG4gICAgICAgICAgICBjb25zdCB0YXNrVGl0bGUgPSBhcHBlbmRQcm9qICh0YXNrLCByb3dJY29ucywgJ2RpdicpO1xuICAgICAgICAgICAgY29uc3QgZWRpdEljb24gPSBjcmVhdGVJbWcgKCcuL2ltZy9wZW5jaWwuc3ZnJywgJzIwcHgnLCAnVHJhc2ggYmluIGljb24uJywgcm93SWNvbnMpO1xuICAgICAgICAgICAgY29uc3QgZGVsZXRlSWNvbiA9IGNyZWF0ZUltZyAoJy4vaW1nL2RlbGV0ZS5zdmcnLCAnMjBweCcsICdUcmFzaCBiaW4gaWNvbi4nLCByb3dJY29ucyk7XG4gICAgICAgICAgICBjb25zdCB0YXNrRGV0YWlscyA9IGNyZWF0ZUhpZGRlbkRldGFpbHMgKHRhc2ssIHJvd0NvbnQpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAodGFza1RpdGxlLCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCB0YXNrRGV0YWlscykpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAodGFza0RldGFpbHMsICdjbGljaycsICgpID0+IHRvZ2dsZURldGFpbHMgKHRhc2ssIHRhc2tEZXRhaWxzKSk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChkZWxldGVJY29uLCAnY2xpY2snLCAoKSA9PiBkZWxldGVUYXNrIChwcm9qZWN0LCB0YXNrLCByb3dDb250KSk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChlZGl0SWNvbiwgJ2NsaWNrJywgKCkgPT4gbW9kYWxNb2QuZWRpdFRhc2tEZXRhaWxzKHRhc2spKTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFza1JvdyAocGFyZW50KSB7XG4gICAgICAgIGNvbnN0IHJvd0ljb25zICA9IGNyZWF0ZUNvbnRhaW5lciAoJ3Jvdy1pY29uJywgJ2RpdicpO1xuICAgICAgICBhZGRUb0hUTUwgKHJvd0ljb25zLCBwYXJlbnQpO1xuICAgICAgICByZXR1cm4gcm93SWNvbnM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSW1nIChzcmMsIHdpZHRoLCBhbHQsIHBhcmVudCkge1xuICAgICAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKVxuICAgICAgICBpbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIHNyYyk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJ3aWR0aFwiLCB3aWR0aCk7XG4gICAgICAgIGltZy5zZXRBdHRyaWJ1dGUoXCJhbHRcIiwgYWx0KTtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGltZyk7XG4gICAgICAgIHJldHVybiBpbWc7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyAoZWxlbWVudCwgZXZlbnQsIGFjdGlvbikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdG9nZ2xlRGV0YWlscyAob2JqLCBlbGVtZW50KSB7XG4gICAgICAgIGlmIChlbGVtZW50LnN0eWxlLmRpc3BsYXkgPT09ICdub25lJykge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRlbGV0ZVRhc2sgKHByb2plY3QsIHRhc2ssIGNvbnRhaW5lcikge1xuICAgICAgICBjb25zb2xlLmxvZyAocHJvamVjdCk7XG4gICAgICAgIGNvbnNvbGUubG9nICgnUmVtb3ZlIGZyb20gYXJyYXkuJyk7XG4gICAgICAgIHByb2plY3RNb2QucmVtb3ZlT2JqVGFzayAocHJvamVjdC50YXNrTGlzdCwgdGFzay5pZCk7XG4gICAgICAgIGNvbnNvbGUubG9nIChwcm9qZWN0KTtcbiAgICAgICAgY29udGFpbmVyLnJlbW92ZSAoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVIaWRkZW5EZXRhaWxzIChvYmosIGxvY2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdhY3RpdmUnLCAnZGl2Jyk7XG4gICAgICAgIC8vIGFjdGl2ZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG4gICAgICAgIGFkZFRvSFRNTCAoYWN0aXZlLCBsb2NhdGlvbik7XG4gICAgICAgIHRhc2tNb2QuYWRkVGFza0RhdGEgKG9iaiwgYWN0aXZlKTtcbiAgICAgICAgcmV0dXJuIGFjdGl2ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZWZyZXNoRGlzcGxheSAocHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIGRlbGV0ZURpc3BsYXkgKCk7XG4gICAgICAgIHJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIGNvbnN0IGRpc3BsYXlDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2Rpc3BsYXknLCAnZGl2Jyk7XG4gICAgICAgIGFkZFRvSFRNTCAoZGlzcGxheUNvbnRlbnQsIHBhcmVudCk7XG5cbiAgICAgICAgYXBwZW5kUHJvaiAocHJvamVjdCwgZGlzcGxheUNvbnRlbnQsICdoMycpO1xuICAgICAgICBhcHBlbmRBbGxUYXNrcyAocHJvamVjdCwgcHJvamVjdC50YXNrTGlzdCwgZGlzcGxheUNvbnRlbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZnJlc2hTaWRlYmFyIChwcm9qQXJyLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGRlbGV0ZVNpZGViYXIgKCk7XG4gICAgICAgIHJlZnJlc2hTaWRlYmFyIChwcm9qQXJyLCBjaGlsZExvY2F0aW9uLCBlbGVtZW50KTtcbiAgICB9XG4gXG4gICAgZnVuY3Rpb24gcmVuZGVyU2lkZWJhciAocHJvakFyciwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudCwgZGlzcGxheUNvbnRhaW5lcikge1xuICAgICAgICBwcm9qQXJyLmZvckVhY2gocHJvaiA9PiB7XG4gICAgICAgICAgICBjb25zdCBwcm9qRGl2ID0gYXBwZW5kUHJvaiAocHJvaiwgY2hpbGRMb2NhdGlvbiwgZWxlbWVudClcbiAgICAgICAgICAgIGJpbmRFdmVudHMgKHByb2pEaXYsICdjbGljaycsICgpID0+IHJlZnJlc2hEaXNwbGF5IChwcm9qLCBkaXNwbGF5Q29udGFpbmVyKSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBcbiAgICBmdW5jdGlvbiBkZWxldGVEaXNwbGF5ICgpIHtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy5kaXNwbGF5JykucmVtb3ZlKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZGVsZXRlU2lkZWJhciAoKSB7XG4gICAgICAgIGNvbnN0IHNpZGViYXJEaXZzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCAoJy5zaWRlYmFyID4gZGl2Jyk7XG4gICAgICAgIHNpZGViYXJEaXZzLmZvckVhY2gocHJvaiA9PiBwcm9qLnJlbW92ZSgpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjYXBGaXJzdExldHRlciAoc3RyKSB7XG4gICAgICAgIHJldHVybiBzdHIuY2hhckF0KDApLnRvVXBwZXJDYXNlKCkgKyBzdHIuc2xpY2UoMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlVGV4dEVsZW1lbnQ6IGNyZWF0ZVRleHRFbGVtZW50LFxuICAgICAgICBhZGRUb0hUTUw6IGFkZFRvSFRNTCxcbiAgICAgICAgY3JlYXRlQ29udGFpbmVyLCBjcmVhdGVDb250YWluZXIsXG4gICAgICAgIGFwcGVuZFByb2o6IGFwcGVuZFByb2osXG4gICAgICAgIGFwcGVuZEFsbFRhc2tzOiBhcHBlbmRBbGxUYXNrcyxcbiAgICAgICAgY3JlYXRlQ2xhc3NUZXh0RWxlbWVudDogY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCxcbiAgICAgICAgYmluZEV2ZW50czogYmluZEV2ZW50cyxcbiAgICAgICAgcmVuZGVyRGlzcGxheTogcmVuZGVyRGlzcGxheSxcbiAgICAgICAgZGVsZXRlRGlzcGxheTogZGVsZXRlRGlzcGxheSxcbiAgICAgICAgcmVuZGVyU2lkZWJhcjogcmVuZGVyU2lkZWJhcixcbiAgICAgICAgcmVmcmVzaERpc3BsYXk6IHJlZnJlc2hEaXNwbGF5LFxuICAgICAgICBkZWxldGVTaWRlYmFyOiBkZWxldGVTaWRlYmFyLFxuICAgICAgICByZWZyZXNoU2lkZWJhcjogcmVmcmVzaFNpZGViYXIsXG4gICAgICAgIGNhcEZpcnN0TGV0dGVyOiBjYXBGaXJzdExldHRlcixcbiAgICAgICAgY3JlYXRlSW1nOiBjcmVhdGVJbWcsXG4gICAgfVxufSkoKTsiLCJleHBvcnQge21vZGFsTW9kfVxuaW1wb3J0IHsgdXNlRE9NIH0gZnJvbSBcIi4vZG9tXCI7XG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gXCIuL3Byb2plY3RzXCI7XG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gXCIuL3Rhc2tzXCI7XG5cbmNvbnN0IG1vZGFsTW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHRhc2tEaWFsb2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnLnRhc2stZGlhbG9nJyk7XG4gICAgY29uc3QgdGFza0lucHV0cyA9IHRhc2tEaWFsb2cucXVlcnlTZWxlY3RvckFsbCAoJ2lucHV0Jyk7XG4gICAgY29uc3Qgc2VsZWN0ID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yICgnI3Byb2plY3Qtc2VsJyk7XG4gICAgY29uc3QgdGFza0Rlc2NyID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yICgnI2Rlc2NyJyk7XG4gICAgY29uc3QgdGFza1ByaW8gID0gdGFza0RpYWxvZy5xdWVyeVNlbGVjdG9yICgnI3ByaW9yaXR5Jyk7XG5cbiAgICBjb25zdCBwcm9qRGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJy5wcm9qLWRpYWxvZycpO1xuICAgIGNvbnN0IHByb2pJbnB1dHMgPSBwcm9qRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCdpbnB1dCcpO1xuXG4gICAgY29uc3QgYWxsSW5wdXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCAoJ2lucHV0Jyk7XG5cbiAgICBmdW5jdGlvbiBzaG93VGFza01vZGFsICgpIHtcbiAgICAgICAgdGFza0RpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzaG93UHJvak1vZGFsICgpIHtcbiAgICAgICAgcHJvakRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0T3B0aW9ucyAoKSB7XG4gICAgICAgIHJlbW92ZVByb2pPcHRpb25zICgpXG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgcHJvamVjdE1vZC5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnb3B0aW9uJywgcHJvamVjdC50aXRsZSk7XG4gICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MIChvcHRpb24sIHNlbGVjdCk7XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlUHJvak9wdGlvbnMgKCkge1xuICAgICAgICBjb25zdCBwcm9qT3B0aW9ucyA9IHNlbGVjdC5xdWVyeVNlbGVjdG9yQWxsICgnb3B0aW9uJyk7XG4gICAgICAgIHByb2pPcHRpb25zLmZvckVhY2gob3B0aW9uID0+IG9wdGlvbi5yZW1vdmUoKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlybVRhc2sgKGV2ZW50LCBwYXJlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgKCk7XG4gICAgICAgIGNvbnN0IHByb2plY3QgPSBmaW5kU2VsZWN0ZWRQcm9qICgpO1xuICAgICAgICB0YXNrTW9kLmFkZFRvUHJvamVjdCAocHJvamVjdC50YXNrTGlzdCwgY3JlYXRlVGFzayAodGFza0lucHV0cywgcHJvamVjdCksIHByb2plY3QsIHBhcmVudCk7XG4gICAgICAgIGNsb3NlTW9kYWwgKHRhc2tEaWFsb2cpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUHJvaiAoKSB7XG4gICAgICAgIHJldHVybiB0YXNrRGlhbG9nLnF1ZXJ5U2VsZWN0b3IgKCcjcHJvamVjdC1zZWwnKS52YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kU2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qID0gZ2V0U2VsZWN0ZWRQcm9qICgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RNb2QucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TW9kLnByb2plY3RzW2ldLnRpdGxlID09PSBzZWxlY3RlZFByb2opIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdE1vZC5wcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzb3J0SW5wdXRzIChpbnB1dEFycikge1xuICAgICAgICBjb25zdCBvYmpBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRBcnIuZm9yRWFjaChpbnB1dCA9PiBvYmpBcnIucHVzaCAoaW5wdXQudmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iakFycjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrIChpbnB1dEFyciwgcHJvamVjdCkge1xuICAgICAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHNvcnRJbnB1dHMoaW5wdXRBcnIpO1xuICAgICAgICBhZGRNb2RhbE5vbklucHV0cyAoaW5wdXRWYWx1ZXMpXG4gICAgICAgIGNvbnN0IG5ld1Rhc2sgPSB0YXNrTW9kLmNyZWF0ZVRhc2soaW5wdXRWYWx1ZXNbMF0sIFxuICAgICAgICAgICAgaW5wdXRWYWx1ZXNbMl0sIGlucHV0VmFsdWVzWzFdLCBpbnB1dFZhbHVlc1szXSwgXG4gICAgICAgICAgICBgJHtpbnB1dFZhbHVlc1swXX0taWQjJHtwcm9qZWN0LnRhc2tMaXN0Lmxlbmd0aH1gKTtcbiAgICAgICAgcmV0dXJuIG5ld1Rhc2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkTW9kYWxOb25JbnB1dHMgKHZhbHVlQXJyKSB7XG4gICAgICAgIHZhbHVlQXJyLnB1c2ggKHRhc2tEZXNjci52YWx1ZSk7XG4gICAgICAgIHZhbHVlQXJyLnB1c2ggKHRhc2tQcmlvLnZhbHVlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsIChtb2RhbCkge1xuICAgICAgICBhbGxJbnB1dHMuZm9yRWFjaChpbnB1dCA9PiBpbnB1dC52YWx1ZSA9ICcnKTtcbiAgICAgICAgbW9kYWwuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjb25maXJtUHJvaiAoZXZlbnQsIHByb2pDb250YWluZXIsIGRpc3BsYXlDb250YWluZXIpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgKCk7XG4gICAgICAgIHByb2plY3RNb2QuY3JlYXRlRnJvbUJ0biAocHJvaklucHV0cy52YWx1ZSwgcHJvamVjdE1vZC5wcm9qZWN0cyk7XG4gICAgICAgIHVzZURPTS5kZWxldGVTaWRlYmFyICgpO1xuICAgICAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgcHJvakNvbnRhaW5lciwgJ2RpdicsIGRpc3BsYXlDb250YWluZXIpO1xuICAgICAgICBjbG9zZU1vZGFsIChwcm9qRGlhbG9nKTtcbiAgICAgICAgY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGVkaXRUYXNrRGV0YWlscyAodGFzaykge1xuICAgICAgICBzZXRFeGlzdGluZ0RldGFpbHMgKHRhc2spO1xuICAgICAgICBzaG93VGFza01vZGFsICgpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0RXhpc3RpbmdEZXRhaWxzICh0YXNrKSB7XG4gICAgICAgIHRhc2tJbnB1dHNbMF0udmFsdWUgPSB0YXNrLnRpdGxlO1xuICAgICAgICB0YXNrSW5wdXRzWzFdLnZhbHVlID0gdGFzay5kdWU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgc2hvd1Rhc2tNb2RhbDogc2hvd1Rhc2tNb2RhbCxcbiAgICAgICAgc2hvd1Byb2pNb2RhbDogc2hvd1Byb2pNb2RhbCxcbiAgICAgICAgY29uZmlybVRhc2s6IGNvbmZpcm1UYXNrLFxuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9uczogY3JlYXRlUHJvamVjdE9wdGlvbnMsXG4gICAgICAgIGNvbmZpcm1Qcm9qLCBjb25maXJtUHJvaixcbiAgICAgICAgZWRpdFRhc2tEZXRhaWxzOiBlZGl0VGFza0RldGFpbHMsXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7cHJvamVjdE1vZH07XG5cbmNvbnN0IHByb2plY3RNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QgKHRpdGxlLCB0YXNrTGlzdCkge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCB0YXNrTGlzdH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVGcm9tQnRuICh0aXRsZSwgcHJvamVjdHNBcnIpIHtcbiAgICAgICAgcHJvamVjdHNBcnIucHVzaCAoY3JlYXRlUHJvamVjdCAodGl0bGUsIFtdKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlT2JqVGFzayAocHJvamVjdFRhc2tMaXN0LCB0YXNrSWQpIHtcbiAgICAgICAgcHJvamVjdFRhc2tMaXN0LmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICB0YXNrLmlkID09PSB0YXNrSWQgPyBwcm9qZWN0VGFza0xpc3Quc3BsaWNlKHByb2plY3RUYXNrTGlzdC5pbmRleE9mKHRhc2spLCAxKSA6IGZhbHNlO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVQcm9qZWN0OiBjcmVhdGVQcm9qZWN0LFxuICAgICAgICBjcmVhdGVGcm9tQnRuLCBjcmVhdGVGcm9tQnRuLFxuICAgICAgICByZW1vdmVPYmpUYXNrOiByZW1vdmVPYmpUYXNrLFxuICAgICAgICBwcm9qZWN0cyxcbiAgICB9XG59KSgpOyIsImV4cG9ydCB7dGFza01vZH07XG5pbXBvcnQge3VzZURPTX0gZnJvbSAnLi9kb20uanMnXG5cblxuY29uc3QgdGFza01vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZSwgcHJpb3JpdHksIGlkKSB7XG4gICAgICAgIHJldHVybiB7dGl0bGUsIGRlc2NyaXB0aW9uLCBkdWUsIHByaW9yaXR5LCBpZH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3NpZ25UYXNrICh0YXNrT2JqLCB0YXNrQXJyKSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCh0YXNrT2JqKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb1Byb2plY3QgKHRhc2tBcnIsIHRhc2tPYmosIHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICB0YXNrQXJyLnB1c2ggKHRhc2tPYmopO1xuICAgICAgICB1c2VET00ucmVmcmVzaERpc3BsYXkgKHByb2plY3QsIHBhcmVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVGFza0RhdGEgKG9iaiwgcGFyZW50KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgaWYgKGtleSAhPT0gJ2lkJykge1xuICAgICAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gYCR7dXNlRE9NLmNhcEZpcnN0TGV0dGVyIChrZXkpfTogJHtvYmpba2V5XX1gO1xuICAgICAgICAgICAgICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2RpdicsIGZpZWxkKSwgcGFyZW50KTtcbiAgICAgICAgICAgIH0gXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUYXNrOiBjcmVhdGVUYXNrLFxuICAgICAgICBhc3NpZ25UYXNrOiBhc3NpZ25UYXNrLFxuICAgICAgICBhZGRUYXNrRGF0YTogYWRkVGFza0RhdGEsXG4gICAgICAgIGFkZFRvUHJvamVjdDogYWRkVG9Qcm9qZWN0LFxuICAgIH1cblxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7dXNlRE9NfSBmcm9tICcuL2RvbS5qcydcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSAnLi9wcm9qZWN0cy5qcydcbmltcG9ydCB7dGFza01vZH0gZnJvbSAnLi90YXNrcy5qcydcbmltcG9ydCB7bW9kYWxNb2R9IGZyb20gJy4vbW9kYWwuanMnXG5cbmNvbnN0IGxvYWRQYWdlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBjb25zdCBodG1sQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcjY29udGVudCcpXG5cbiAgICBjb25zdCBoZWFkZXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2hlYWRlcicsICdkaXYnKTtcbiAgICBjb25zdCBzaWRlYmFyQ29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdzaWRlYmFyJywgJ2RpdicpO1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnZ3JpZCcsICdkaXYnKTtcblxuICAgIHVzZURPTS5hZGRUb0hUTUwgKGhlYWRlckNvbnRlbnQsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChncmlkQ29udGFpbmVyLCBodG1sQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoc2lkZWJhckNvbnRlbnQsIGdyaWRDb250YWluZXIpO1xuXG4gICAgdXNlRE9NLmNyZWF0ZUltZyAoJy4vaW1nL2xpc3QtYmxjay5zdmcnLCAnNDBweCcsICdMaXN0IHdpdGggY2hlY2tzIGljb24uJywgaGVhZGVyQ29udGVudCk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAodXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDInLCAnVG8gRG8gTGlzdCcpLCBoZWFkZXJDb250ZW50KTtcblxuICAgIGNvbnN0IGFkZFByb2pCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgUHJvamVjdCcsICdhZGQtcHJvamVjdCcpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFByb2pCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRQcm9qQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93UHJvak1vZGFsKCkpO1xuXG4gICAgY29uc3QgYWRkVGFza0J0biA9IHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50ICgnYnV0dG9uJywgJ0FkZCBUYXNrJywgJ2FkZC10YXNrJyk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoYWRkVGFza0J0biwgaGVhZGVyQ29udGVudCk7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGFkZFRhc2tCdG4sICdjbGljaycsICgpID0+IG1vZGFsTW9kLnNob3dUYXNrTW9kYWwoKSk7XG5cbiAgICBjb25zdCBjb25maXJtVGFzayA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY29uZmlybVRhc2tcIik7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGNvbmZpcm1UYXNrLCAnY2xpY2snLCAoZXZlbnQpID0+IG1vZGFsTW9kLmNvbmZpcm1UYXNrIFxuICAgIChldmVudCwgZ3JpZENvbnRhaW5lcikpO1xuXG4gICAgY29uc3QgY29uZmlybVByb2ogPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NvbmZpcm1Qcm9qXCIpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtUHJvaiwgJ2NsaWNrJywgKGV2ZW50KSA9PiBtb2RhbE1vZC5jb25maXJtUHJvaiBcbiAgICAoZXZlbnQsIHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKSk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMycsICdQcm9qZWN0cycpLCBzaWRlYmFyQ29udGVudCk7XG5cbiAgICBjb25zdCB0b2RheVRhc2tzID0gW107XG4gICAgY29uc3QgY2xlYW4gPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdDbGVhbicsICdjbGVhbiB5b3VyIHJvb20nLCAnMjAyMy0xMi0zMScsICdMb3cnLCBgQ2xlYW4taWQjMGApO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoY2xlYW4sIHRvZGF5VGFza3MpO1xuICAgIGNvbnN0IHN1cmYgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdTdXJmJywgJ2hpZ2ggdGlkZSBhdCAzUE0nLCAnMjAyMy0xMi0zMScsICdIaWdoJywgYFN1cmYtaWQjMWApO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoc3VyZiwgdG9kYXlUYXNrcyk7XG5cbiAgICBjb25zdCBtb3JvY2NvVGFza3MgPSBbXTtcbiAgICBjb25zdCBjb29rID0gdGFza01vZC5jcmVhdGVUYXNrICgnQ29vaycsICd0YWdpbmUnLCAnMjAyMy0xMi0zMScsICdNZWRpdW0nLCBgQ29vay1pZCMwYCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChjb29rLCBtb3JvY2NvVGFza3MpO1xuXG4gICAgcHJvamVjdE1vZC5wcm9qZWN0cy5wdXNoIChwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdNb3JvY2NvJywgbW9yb2Njb1Rhc2tzKSk7XG4gICAgcHJvamVjdE1vZC5wcm9qZWN0cy5wdXNoIChwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdUb2RheScsIHRvZGF5VGFza3MpKTtcblxuICAgIHVzZURPTS5yZW5kZXJEaXNwbGF5IChwcm9qZWN0TW9kLnByb2plY3RzWzBdLCBncmlkQ29udGFpbmVyKTtcbiAgICB1c2VET00ucmVuZGVyU2lkZWJhciAocHJvamVjdE1vZC5wcm9qZWN0cywgc2lkZWJhckNvbnRlbnQsICdkaXYnLCBncmlkQ29udGFpbmVyKVxuXG4gICAgbW9kYWxNb2QuY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9