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
        useDOM.appendAllTasks (project.tasks, displayContent, 'div');
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

    function confirmTask (event, taskArr, parent) {
        event.preventDefault ();
        console.log (findSelectedProj ());
        console.log (_projects__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects[1]);
        _tasks__WEBPACK_IMPORTED_MODULE_2__.taskMod.addToProject (taskArr, createTask (inputs), findSelectedProj (), parent);
        closeModal (inputs);
    }

    function getSelectedProj () {
        const selector = dialog.querySelector ('select');
        console.log (selector.value);
        return selector.value;
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

    function createProject (title, tasks) {
        return {title, tasks}
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
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.bindEvents (confirmBtn, 'click', (event) => _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.confirmTask (event,
         tasks, gridContainer));

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.createTextElement ('h3', 'Projects'), sidebarContent);

    const tasks = [];
    const clean = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', tasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (clean, tasks);
    const surf = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', tasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (surf, tasks);

    const today = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject ('Today', tasks);
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.push (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject ('Morocco', tasks));
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects.push (today);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderDisplay (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects[0], gridContainer);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.useDOM.renderSidebar (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects, sidebarContent, 'div')

    //need to re-render this after a new projec is added
    //cross this bridge when working on add proj btn
    _modal_js__WEBPACK_IMPORTED_MODULE_3__.modalMod.createProjectOptions (_projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.projects);
    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBZTtBQUNmLENBQXFDOztBQUVyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUSw4Q0FBTztBQUNmO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUN6RmdCO0FBQ2pCLENBQStCO0FBQ087QUFDTjs7QUFFaEM7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRLGlEQUFVO0FBQ2xCLDJCQUEyQix3Q0FBTTtBQUNqQyxZQUFZLHdDQUFNO0FBQ2xCO0FBQ0EsS0FBSztBQUNMOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQixpREFBVTtBQUMvQixRQUFRLDJDQUFPO0FBQ2Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx3QkFBd0IsSUFBSSxpREFBVSxrQkFBa0I7QUFDeEQsZ0JBQWdCLGlEQUFVO0FBQzFCLHVCQUF1QixpREFBVTtBQUNqQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0JBQXdCLDJDQUFPO0FBQy9CO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQzVFbUI7O0FBRXBCOztBQUVBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDZGdCO0FBQ2M7OztBQUcvQjs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsMkNBQU07QUFDZCxRQUFRLDJDQUFNO0FBQ2Q7O0FBRUE7QUFDQTtBQUNBLDZCQUE2QixJQUFJLElBQUksU0FBUztBQUM5QyxZQUFZLDJDQUFNLFlBQVksMkNBQU07QUFDcEM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7O1VDbENEO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7Ozs7QUNOK0I7QUFDUztBQUNOO0FBQ0M7O0FBRW5DO0FBQ0E7O0FBRUEsMEJBQTBCLDJDQUFNO0FBQ2hDLDJCQUEyQiwyQ0FBTTtBQUNqQywwQkFBMEIsMkNBQU07O0FBRWhDLElBQUksMkNBQU07QUFDVixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTTs7QUFFVixJQUFJLDJDQUFNLFlBQVksMkNBQU07O0FBRTVCLHVCQUF1QiwyQ0FBTTtBQUM3QixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTSx3Q0FBd0MsK0NBQVE7O0FBRTFELHVCQUF1QiwyQ0FBTTtBQUM3QixJQUFJLDJDQUFNO0FBQ1YsSUFBSSwyQ0FBTSx3Q0FBd0MsK0NBQVE7O0FBRTFEO0FBQ0EsSUFBSSwyQ0FBTSw2Q0FBNkMsK0NBQVE7QUFDL0Q7O0FBRUEsSUFBSSwyQ0FBTSxZQUFZLDJDQUFNOztBQUU1QjtBQUNBLGtCQUFrQiw4Q0FBTztBQUN6QixJQUFJLDhDQUFPO0FBQ1gsaUJBQWlCLDhDQUFPO0FBQ3hCLElBQUksOENBQU87O0FBRVgsa0JBQWtCLG9EQUFVO0FBQzVCLElBQUksb0RBQVUsZ0JBQWdCLG9EQUFVO0FBQ3hDLElBQUksb0RBQVU7O0FBRWQsSUFBSSwyQ0FBTSxnQkFBZ0Isb0RBQVU7QUFDcEMsSUFBSSwyQ0FBTSxnQkFBZ0Isb0RBQVU7O0FBRXBDO0FBQ0E7QUFDQSxJQUFJLCtDQUFRLHVCQUF1QixvREFBVTtBQUM3QztBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZGFsLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge3VzZURPTX0gXG5pbXBvcnQgeyB0YXNrTW9kIH0gZnJvbSBcIi4vdGFza3MuanNcIjtcblxuY29uc3QgdXNlRE9NID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgdGV4dCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cbiAgICBmdW5jdGlvbiBjcmVhdGVDbGFzc1RleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0LCBjc3NDbGFzcykge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgbmV3RWxlbWVudC5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgbmV3RWxlbWVudC50ZXh0Q29udGVudCA9IHRleHQ7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvSFRNTCAoZWxlbWVudCwgcGFyZW50KSB7XG4gICAgICAgIHBhcmVudC5hcHBlbmRDaGlsZChlbGVtZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVDb250YWluZXIgKGNzc0NsYXNzLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIGNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKGNzc0NsYXNzKTtcbiAgICAgICAgcmV0dXJuIGNvbnRhaW5lcjtcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXBwZW5kUHJvaiAob2JqLCBsb2NhdGlvbiwgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBuZXdFbGVtZW50ID0gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIG9iai50aXRsZSlcbiAgICAgICAgYWRkVG9IVE1MIChuZXdFbGVtZW50LCBsb2NhdGlvbik7XG4gICAgICAgIHJldHVybiBuZXdFbGVtZW50O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwcGVuZEFsbFRhc2tzICh0YXNrQXJyLCBsb2NhdGlvbikge1xuICAgICAgICB0YXNrQXJyLmZvckVhY2godGFzayA9PiB7XG4gICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gYXBwZW5kUHJvaiAodGFzaywgbG9jYXRpb24sICdkaXYnKTtcbiAgICAgICAgICAgIGNvbnN0IHRhc2tEZXRhaWxzID0gY3JlYXRlSGlkZGVuRGV0YWlscyAodGFzaywgZWxlbWVudCk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChlbGVtZW50LCAnY2xpY2snLCAoKSA9PiB0b2dnbGVEZXRhaWxzICh0YXNrLCB0YXNrRGV0YWlscykpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBiaW5kRXZlbnRzIChlbGVtZW50LCBldmVudCwgYWN0aW9uKSB7XG4gICAgICAgIGVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihldmVudCwgYWN0aW9uKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0b2dnbGVEZXRhaWxzIChvYmosIGVsZW1lbnQpIHtcbiAgICAgICAgaWYgKGVsZW1lbnQuc3R5bGUuZGlzcGxheSA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICBlbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlSGlkZGVuRGV0YWlscyAob2JqLCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnYWN0aXZlJywgJ2RpdicpO1xuICAgICAgICBhY3RpdmUuc3R5bGUuZGlzcGxheSA9IFwibm9uZVwiO1xuICAgICAgICB1c2VET00uYWRkVG9IVE1MIChhY3RpdmUsIGxvY2F0aW9uKTtcbiAgICAgICAgdGFza01vZC5hZGRUYXNrRGF0YSAob2JqLCBhY3RpdmUpO1xuICAgICAgICByZXR1cm4gYWN0aXZlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbmRlckRpc3BsYXkgKHByb2plY3QsIHBhcmVudCkge1xuICAgICAgICBjb25zdCBkaXNwbGF5Q29udGVudCA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdkaXNwbGF5JywgJ2RpdicpO1xuICAgICAgICB1c2VET00uYWRkVG9IVE1MIChkaXNwbGF5Q29udGVudCwgcGFyZW50KTtcblxuICAgICAgICB1c2VET00uYXBwZW5kUHJvaiAocHJvamVjdCwgZGlzcGxheUNvbnRlbnQsICdoMycpO1xuICAgICAgICB1c2VET00uYXBwZW5kQWxsVGFza3MgKHByb2plY3QudGFza3MsIGRpc3BsYXlDb250ZW50LCAnZGl2Jyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVuZGVyU2lkZWJhciAocHJvakFyciwgbG9jYXRpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgcHJvakFyci5mb3JFYWNoKHByb2plY3QgPT4gYXBwZW5kUHJvaiAocHJvamVjdCwgbG9jYXRpb24sIGVsZW1lbnQpKTtcbiAgICB9XG4gICAgXG4gICAgZnVuY3Rpb24gZGVsZXRlRGlzcGxheSAoKSB7XG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IgKCcuZGlzcGxheScpLnJlbW92ZSgpO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRleHRFbGVtZW50OiBjcmVhdGVUZXh0RWxlbWVudCxcbiAgICAgICAgYWRkVG9IVE1MOiBhZGRUb0hUTUwsXG4gICAgICAgIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQ29udGFpbmVyLFxuICAgICAgICBhcHBlbmRQcm9qOiBhcHBlbmRQcm9qLFxuICAgICAgICBhcHBlbmRBbGxUYXNrczogYXBwZW5kQWxsVGFza3MsXG4gICAgICAgIGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQ6IGNyZWF0ZUNsYXNzVGV4dEVsZW1lbnQsXG4gICAgICAgIGJpbmRFdmVudHM6IGJpbmRFdmVudHMsXG4gICAgICAgIHJlbmRlckRpc3BsYXk6IHJlbmRlckRpc3BsYXksXG4gICAgICAgIGRlbGV0ZURpc3BsYXk6IGRlbGV0ZURpc3BsYXksXG4gICAgICAgIHJlbmRlclNpZGViYXI6IHJlbmRlclNpZGViYXIsXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7bW9kYWxNb2R9XG5pbXBvcnQgeyB1c2VET00gfSBmcm9tIFwiLi9kb21cIjtcbmltcG9ydCB7cHJvamVjdE1vZH0gZnJvbSBcIi4vcHJvamVjdHNcIjtcbmltcG9ydCB7dGFza01vZH0gZnJvbSBcIi4vdGFza3NcIjtcblxuY29uc3QgbW9kYWxNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgZGlhbG9nID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJ2RpYWxvZycpO1xuICAgIGNvbnN0IGlucHV0cyA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yQWxsICgnaW5wdXQnKTtcbiAgICBjb25zdCBzZWxlY3QgPSBkaWFsb2cucXVlcnlTZWxlY3RvciAoJ3NlbGVjdCcpO1xuXG4gICAgZnVuY3Rpb24gc2hvd01vZGFsICgpIHtcbiAgICAgICAgXG4gICAgICAgIGRpYWxvZy5zaG93TW9kYWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0T3B0aW9ucyAoKSB7XG4gICAgICAgIGxldCBpID0gMDtcbiAgICAgICAgcHJvamVjdE1vZC5wcm9qZWN0cy5mb3JFYWNoKHByb2plY3QgPT4ge1xuICAgICAgICAgICAgY29uc3Qgb3B0aW9uID0gdXNlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnb3B0aW9uJywgcHJvamVjdC50aXRsZSk7XG4gICAgICAgICAgICB1c2VET00uYWRkVG9IVE1MIChvcHRpb24sIHNlbGVjdCk7XG4gICAgICAgICAgICBpICs9IDE7XG4gICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY29uZmlybVRhc2sgKGV2ZW50LCB0YXNrQXJyLCBwYXJlbnQpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQgKCk7XG4gICAgICAgIGNvbnNvbGUubG9nIChmaW5kU2VsZWN0ZWRQcm9qICgpKTtcbiAgICAgICAgY29uc29sZS5sb2cgKHByb2plY3RNb2QucHJvamVjdHNbMV0pO1xuICAgICAgICB0YXNrTW9kLmFkZFRvUHJvamVjdCAodGFza0FyciwgY3JlYXRlVGFzayAoaW5wdXRzKSwgZmluZFNlbGVjdGVkUHJvaiAoKSwgcGFyZW50KTtcbiAgICAgICAgY2xvc2VNb2RhbCAoaW5wdXRzKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZFByb2ogKCkge1xuICAgICAgICBjb25zdCBzZWxlY3RvciA9IGRpYWxvZy5xdWVyeVNlbGVjdG9yICgnc2VsZWN0Jyk7XG4gICAgICAgIGNvbnNvbGUubG9nIChzZWxlY3Rvci52YWx1ZSk7XG4gICAgICAgIHJldHVybiBzZWxlY3Rvci52YWx1ZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBmaW5kU2VsZWN0ZWRQcm9qICgpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWRQcm9qID0gZ2V0U2VsZWN0ZWRQcm9qICgpO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHByb2plY3RNb2QucHJvamVjdHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmIChwcm9qZWN0TW9kLnByb2plY3RzW2ldLnRpdGxlID09PSBzZWxlY3RlZFByb2opIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gcHJvamVjdE1vZC5wcm9qZWN0c1tpXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBzb3J0SW5wdXRzIChpbnB1dEFycikge1xuICAgICAgICBjb25zdCBvYmpBcnIgPSBbXTtcbiAgICAgICAgaW5wdXRBcnIuZm9yRWFjaChpbnB1dCA9PiBvYmpBcnIucHVzaCAoaW5wdXQudmFsdWUpKTtcbiAgICAgICAgcmV0dXJuIG9iakFycjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrIChpbnB1dEFycikge1xuICAgICAgICBjb25zdCBpbnB1dFZhbHVlcyA9IHNvcnRJbnB1dHMoaW5wdXRBcnIpO1xuICAgICAgICBjb25zdCBuZXdUYXNrID0gdGFza01vZC5jcmVhdGVUYXNrKGlucHV0VmFsdWVzWzBdKTtcbiAgICAgICAgcmV0dXJuIG5ld1Rhc2s7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xvc2VNb2RhbCAoKSB7XG4gICAgICAgIGlucHV0cy5mb3JFYWNoKGlucHV0ID0+IGlucHV0LnZhbHVlID0gJycpO1xuICAgICAgICBkaWFsb2cuY2xvc2UoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVQcm9qT3B0aW9ucyAoKSB7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSBkaWFsb2cucXVlcnlTZWxlY3RvckFsbCgnb3B0aW9uJyk7XG4gICAgICAgIG9wdGlvbnMuZm9yRWFjaChvcHRpb24gPT4gb3B0aW9uLnJlbW92ZSgpKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBzaG93TW9kYWw6IHNob3dNb2RhbCxcbiAgICAgICAgY29uZmlybVRhc2s6IGNvbmZpcm1UYXNrLFxuICAgICAgICBjcmVhdGVQcm9qZWN0T3B0aW9uczogY3JlYXRlUHJvamVjdE9wdGlvbnMsXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7cHJvamVjdE1vZH07XG5cbmNvbnN0IHByb2plY3RNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QgKHRpdGxlLCB0YXNrcykge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCB0YXNrc31cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVQcm9qZWN0OiBjcmVhdGVQcm9qZWN0LFxuICAgICAgICBwcm9qZWN0cyxcbiAgICB9XG59KSgpOyIsImV4cG9ydCB7dGFza01vZH07XG5pbXBvcnQge3VzZURPTX0gZnJvbSAnLi9kb20uanMnXG5cblxuY29uc3QgdGFza01vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBpZCkge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGlkfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2lnblRhc2sgKHRhc2tPYmosIHRhc2tBcnIpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoKHRhc2tPYmopO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRvUHJvamVjdCAodGFza0FyciwgdGFza09iaiwgcHJvamVjdCwgcGFyZW50KSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCAodGFza09iaik7XG4gICAgICAgIHVzZURPTS5kZWxldGVEaXNwbGF5ICgpO1xuICAgICAgICB1c2VET00ucmVuZGVyRGlzcGxheSAocHJvamVjdCwgcGFyZW50KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUYXNrRGF0YSAob2JqLCBwYXJlbnQpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gb2JqKSB7XG4gICAgICAgICAgICBjb25zdCBmaWVsZCA9IGAke2tleX06ICR7b2JqW2tleV19YDtcbiAgICAgICAgICAgIHVzZURPTS5hZGRUb0hUTUwgKHVzZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2RpdicsIGZpZWxkKSwgcGFyZW50KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRhc2s6IGNyZWF0ZVRhc2ssXG4gICAgICAgIGFzc2lnblRhc2s6IGFzc2lnblRhc2ssXG4gICAgICAgIGFkZFRhc2tEYXRhOiBhZGRUYXNrRGF0YSxcbiAgICAgICAgYWRkVG9Qcm9qZWN0OiBhZGRUb1Byb2plY3QsXG4gICAgfVxuXG59KSgpOyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHt1c2VET019IGZyb20gJy4vZG9tLmpzJ1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tICcuL3Rhc2tzLmpzJ1xuaW1wb3J0IHttb2RhbE1vZH0gZnJvbSAnLi9tb2RhbC5qcydcblxuY29uc3QgbG9hZFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGh0bWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJyNjb250ZW50JylcblxuICAgIGNvbnN0IGhlYWRlckNvbnRlbnQgPSB1c2VET00uY3JlYXRlQ29udGFpbmVyICgnaGVhZGVyJywgJ2RpdicpO1xuICAgIGNvbnN0IHNpZGViYXJDb250ZW50ID0gdXNlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ3NpZGViYXInLCAnZGl2Jyk7XG4gICAgY29uc3QgZ3JpZENvbnRhaW5lciA9IHVzZURPTS5jcmVhdGVDb250YWluZXIgKCdncmlkJywgJ2RpdicpO1xuXG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoaGVhZGVyQ29udGVudCwgaHRtbENvbnRlbnQpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGdyaWRDb250YWluZXIsIGh0bWxDb250ZW50KTtcbiAgICB1c2VET00uYWRkVG9IVE1MIChzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcik7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMicsICdUbyBEbyBMaXN0JyksIGhlYWRlckNvbnRlbnQpO1xuXG4gICAgY29uc3QgYWRkUHJvakJ0biA9IHVzZURPTS5jcmVhdGVDbGFzc1RleHRFbGVtZW50ICgnYnV0dG9uJywgJ0FkZCBQcm9qZWN0JywgJ2FkZC1wcm9qZWN0Jyk7XG4gICAgdXNlRE9NLmFkZFRvSFRNTCAoYWRkUHJvakJ0biwgaGVhZGVyQ29udGVudCk7XG4gICAgdXNlRE9NLmJpbmRFdmVudHMgKGFkZFByb2pCdG4sICdjbGljaycsICgpID0+IG1vZGFsTW9kLnNob3dNb2RhbCgpKTtcblxuICAgIGNvbnN0IGFkZFRhc2tCdG4gPSB1c2VET00uY3JlYXRlQ2xhc3NUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgVGFzaycsICdhZGQtdGFzaycpO1xuICAgIHVzZURPTS5hZGRUb0hUTUwgKGFkZFRhc2tCdG4sIGhlYWRlckNvbnRlbnQpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChhZGRUYXNrQnRuLCAnY2xpY2snLCAoKSA9PiBtb2RhbE1vZC5zaG93TW9kYWwoKSk7XG5cbiAgICBjb25zdCBjb25maXJtQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjb25maXJtQnRuXCIpO1xuICAgIHVzZURPTS5iaW5kRXZlbnRzIChjb25maXJtQnRuLCAnY2xpY2snLCAoZXZlbnQpID0+IG1vZGFsTW9kLmNvbmZpcm1UYXNrIChldmVudCxcbiAgICAgICAgIHRhc2tzLCBncmlkQ29udGFpbmVyKSk7XG5cbiAgICB1c2VET00uYWRkVG9IVE1MICh1c2VET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMycsICdQcm9qZWN0cycpLCBzaWRlYmFyQ29udGVudCk7XG5cbiAgICBjb25zdCB0YXNrcyA9IFtdO1xuICAgIGNvbnN0IGNsZWFuID0gdGFza01vZC5jcmVhdGVUYXNrICgnQ2xlYW4nLCAnY2xlYW4geW91ciByb29tJywgRGF0ZSgpLCAnTG93JywgdGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKGNsZWFuLCB0YXNrcyk7XG4gICAgY29uc3Qgc3VyZiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ1N1cmYnLCAnaGlnaCB0aWRlIGF0IDNQTScsIERhdGUoKSwgJ0hpZ2gnLCB0YXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoc3VyZiwgdGFza3MpO1xuXG4gICAgY29uc3QgdG9kYXkgPSBwcm9qZWN0TW9kLmNyZWF0ZVByb2plY3QgKCdUb2RheScsIHRhc2tzKTtcbiAgICBwcm9qZWN0TW9kLnByb2plY3RzLnB1c2ggKHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ01vcm9jY28nLCB0YXNrcykpO1xuICAgIHByb2plY3RNb2QucHJvamVjdHMucHVzaCAodG9kYXkpO1xuXG4gICAgdXNlRE9NLnJlbmRlckRpc3BsYXkgKHByb2plY3RNb2QucHJvamVjdHNbMF0sIGdyaWRDb250YWluZXIpO1xuICAgIHVzZURPTS5yZW5kZXJTaWRlYmFyIChwcm9qZWN0TW9kLnByb2plY3RzLCBzaWRlYmFyQ29udGVudCwgJ2RpdicpXG5cbiAgICAvL25lZWQgdG8gcmUtcmVuZGVyIHRoaXMgYWZ0ZXIgYSBuZXcgcHJvamVjIGlzIGFkZGVkXG4gICAgLy9jcm9zcyB0aGlzIGJyaWRnZSB3aGVuIHdvcmtpbmcgb24gYWRkIHByb2ogYnRuXG4gICAgbW9kYWxNb2QuY3JlYXRlUHJvamVjdE9wdGlvbnMgKHByb2plY3RNb2QucHJvamVjdHMpO1xuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9