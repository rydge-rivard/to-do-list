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
/* harmony export */   manipulateDOM: () => (/* binding */ manipulateDOM)
/* harmony export */ });
/* harmony import */ var _view_task__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view-task */ "./src/view-task.js");
 
;

const manipulateDOM = (function () {
    function createTextElement (element, text) {
        const newElement = document.createElement(element);
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
            bindEvents (element, 'click', () => createActiveCont (task, element));
        });
    }

    // function appendTask (task, location) {
    //     appendProj (task.title, location, 'div');
    // }

    function bindEvents (element, event, action) {
        element.addEventListener(event, action);
    }

    function createActiveCont (obj, location) {
        const active = manipulateDOM.createContainer ('active', 'div');
        manipulateDOM.addToHTML (active, location);
        _view_task__WEBPACK_IMPORTED_MODULE_0__.viewTask.populateFields (obj, active);
        return obj;
    }

    return {
        createTextElement: createTextElement,
        addToHTML: addToHTML,
        createContainer, createContainer,
        appendProj: appendProj,
        appendAllTasks: appendAllTasks,
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


const taskMod = (function () {

    function createTask (title, description, dueDate, priority, id) {
        return {title, description, dueDate, priority, id}
    }

    function assignTask (taskObj, taskArr) {
        taskArr.push(taskObj);
    }

    return {
        createTask: createTask,
        assignTask: assignTask,
    }

})();

/***/ }),

/***/ "./src/view-task.js":
/*!**************************!*\
  !*** ./src/view-task.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   viewTask: () => (/* binding */ viewTask)
/* harmony export */ });
/* harmony import */ var _dom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom.js */ "./src/dom.js");



const viewTask = (function () {
    function populateFields (obj, parent) {
        for (const key in obj) {
            const field = `${key}: ${obj[key]}`;
            _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('div', field),
            parent);
        }
    }

    return {
        populateFields: populateFields,
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
/* harmony import */ var _view_task_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view-task.js */ "./src/view-task.js");






const loadPage = (function () {
    const htmlContent = document.querySelector ('#content')

    const headerContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createContainer ('header', 'div');
    const sidebarContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createContainer ('sidebar', 'div');
    const displayContent = _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createContainer ('display', 'div');
    const gridContainer = _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createContainer ('grid', 'div');

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (headerContent, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (gridContainer, htmlContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (sidebarContent, gridContainer);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (displayContent, gridContainer);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('h2', 'To Do List'), headerContent);
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('button', 'Add Project'), headerContent);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.addToHTML (_dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.createTextElement ('div', 'Projects'), sidebarContent);

    const tasks = [];
    const clean = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', tasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (clean, tasks);
    const surf = _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', tasks.length);
    _tasks_js__WEBPACK_IMPORTED_MODULE_2__.taskMod.assignTask (surf, tasks);

    const today = _projects_js__WEBPACK_IMPORTED_MODULE_1__.projectMod.createProject ('Today', tasks);

    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.appendProj (today, sidebarContent, 'div');
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.appendProj (today, displayContent, 'h3');
    _dom_js__WEBPACK_IMPORTED_MODULE_0__.manipulateDOM.appendAllTasks (today.tasks, displayContent, 'div');

    
})();


})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0I7QUFDdEIsQ0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBUSxnREFBUTtBQUNoQjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDeERtQjs7QUFFcEI7O0FBRUE7O0FBRUE7QUFDQSxnQkFBZ0I7QUFDaEI7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUNiZ0I7O0FBRWpCOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUNqQnFDO0FBQ3JCOztBQUVqQjtBQUNBO0FBQ0E7QUFDQSw2QkFBNkIsSUFBSSxJQUFJLFNBQVM7QUFDOUMsWUFBWSxrREFBYSxZQUFZLGtEQUFhO0FBQ2xEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOzs7Ozs7VUNmRDtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7OztXQ3RCQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLHlDQUF5Qyx3Q0FBd0M7V0FDakY7V0FDQTtXQUNBOzs7OztXQ1BBOzs7OztXQ0FBO1dBQ0E7V0FDQTtXQUNBLHVEQUF1RCxpQkFBaUI7V0FDeEU7V0FDQSxnREFBZ0QsYUFBYTtXQUM3RDs7Ozs7Ozs7Ozs7Ozs7O0FDTnNDO0FBQ0U7QUFDTjtBQUNLOzs7QUFHdkM7QUFDQTs7QUFFQSwwQkFBMEIsa0RBQWE7QUFDdkMsMkJBQTJCLGtEQUFhO0FBQ3hDLDJCQUEyQixrREFBYTtBQUN4QywwQkFBMEIsa0RBQWE7O0FBRXZDLElBQUksa0RBQWE7QUFDakIsSUFBSSxrREFBYTtBQUNqQixJQUFJLGtEQUFhO0FBQ2pCLElBQUksa0RBQWE7O0FBRWpCLElBQUksa0RBQWEsWUFBWSxrREFBYTtBQUMxQyxJQUFJLGtEQUFhLFlBQVksa0RBQWE7O0FBRTFDLElBQUksa0RBQWEsWUFBWSxrREFBYTs7QUFFMUM7QUFDQSxrQkFBa0IsOENBQU87QUFDekIsSUFBSSw4Q0FBTztBQUNYLGlCQUFpQiw4Q0FBTztBQUN4QixJQUFJLDhDQUFPOztBQUVYLGtCQUFrQixvREFBVTs7QUFFNUIsSUFBSSxrREFBYTtBQUNqQixJQUFJLGtEQUFhO0FBQ2pCLElBQUksa0RBQWE7O0FBRWpCO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvZG9tLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvcHJvamVjdHMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy90YXNrcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3ZpZXctdGFzay5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL3RvLWRvLWxpc3Qvd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQge21hbmlwdWxhdGVET019IFxuaW1wb3J0IHsgdmlld1Rhc2sgfSBmcm9tIFwiLi92aWV3LXRhc2tcIjtcblxuY29uc3QgbWFuaXB1bGF0ZURPTSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gY3JlYXRlVGV4dEVsZW1lbnQgKGVsZW1lbnQsIHRleHQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoZWxlbWVudCk7XG4gICAgICAgIG5ld0VsZW1lbnQudGV4dENvbnRlbnQgPSB0ZXh0O1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRUb0hUTUwgKGVsZW1lbnQsIHBhcmVudCkge1xuICAgICAgICBwYXJlbnQuYXBwZW5kQ2hpbGQoZWxlbWVudCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQ29udGFpbmVyIChjc3NDbGFzcywgZWxlbWVudCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBjb250YWluZXIuY2xhc3NMaXN0LmFkZChjc3NDbGFzcyk7XG4gICAgICAgIHJldHVybiBjb250YWluZXI7XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFwcGVuZFByb2ogKG9iaiwgbG9jYXRpb24sIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgbmV3RWxlbWVudCA9IGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCBvYmoudGl0bGUpXG4gICAgICAgIGFkZFRvSFRNTCAobmV3RWxlbWVudCwgbG9jYXRpb24pO1xuICAgICAgICByZXR1cm4gbmV3RWxlbWVudDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRBbGxUYXNrcyAodGFza0FyciwgbG9jYXRpb24pIHtcbiAgICAgICAgdGFza0Fyci5mb3JFYWNoKHRhc2sgPT4ge1xuICAgICAgICAgICAgY29uc3QgZWxlbWVudCA9IGFwcGVuZFByb2ogKHRhc2ssIGxvY2F0aW9uLCAnZGl2Jyk7XG4gICAgICAgICAgICBiaW5kRXZlbnRzIChlbGVtZW50LCAnY2xpY2snLCAoKSA9PiBjcmVhdGVBY3RpdmVDb250ICh0YXNrLCBlbGVtZW50KSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIGZ1bmN0aW9uIGFwcGVuZFRhc2sgKHRhc2ssIGxvY2F0aW9uKSB7XG4gICAgLy8gICAgIGFwcGVuZFByb2ogKHRhc2sudGl0bGUsIGxvY2F0aW9uLCAnZGl2Jyk7XG4gICAgLy8gfVxuXG4gICAgZnVuY3Rpb24gYmluZEV2ZW50cyAoZWxlbWVudCwgZXZlbnQsIGFjdGlvbikge1xuICAgICAgICBlbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoZXZlbnQsIGFjdGlvbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY3JlYXRlQWN0aXZlQ29udCAob2JqLCBsb2NhdGlvbikge1xuICAgICAgICBjb25zdCBhY3RpdmUgPSBtYW5pcHVsYXRlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2FjdGl2ZScsICdkaXYnKTtcbiAgICAgICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKGFjdGl2ZSwgbG9jYXRpb24pO1xuICAgICAgICB2aWV3VGFzay5wb3B1bGF0ZUZpZWxkcyAob2JqLCBhY3RpdmUpO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRleHRFbGVtZW50OiBjcmVhdGVUZXh0RWxlbWVudCxcbiAgICAgICAgYWRkVG9IVE1MOiBhZGRUb0hUTUwsXG4gICAgICAgIGNyZWF0ZUNvbnRhaW5lciwgY3JlYXRlQ29udGFpbmVyLFxuICAgICAgICBhcHBlbmRQcm9qOiBhcHBlbmRQcm9qLFxuICAgICAgICBhcHBlbmRBbGxUYXNrczogYXBwZW5kQWxsVGFza3MsXG4gICAgfVxuXG59KSgpOyIsImV4cG9ydCB7cHJvamVjdE1vZH07XG5cbmNvbnN0IHByb2plY3RNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgY29uc3QgcHJvamVjdHMgPSBbXTtcblxuICAgIGZ1bmN0aW9uIGNyZWF0ZVByb2plY3QgKHRpdGxlLCB0YXNrcykge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCB0YXNrc31cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVQcm9qZWN0OiBjcmVhdGVQcm9qZWN0LFxuICAgIH1cbn0pKCk7IiwiZXhwb3J0IHt0YXNrTW9kfTtcblxuY29uc3QgdGFza01vZCA9IChmdW5jdGlvbiAoKSB7XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVUYXNrICh0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBpZCkge1xuICAgICAgICByZXR1cm4ge3RpdGxlLCBkZXNjcmlwdGlvbiwgZHVlRGF0ZSwgcHJpb3JpdHksIGlkfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFzc2lnblRhc2sgKHRhc2tPYmosIHRhc2tBcnIpIHtcbiAgICAgICAgdGFza0Fyci5wdXNoKHRhc2tPYmopO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAgIGNyZWF0ZVRhc2s6IGNyZWF0ZVRhc2ssXG4gICAgICAgIGFzc2lnblRhc2s6IGFzc2lnblRhc2ssXG4gICAgfVxuXG59KSgpOyIsImltcG9ydCB7bWFuaXB1bGF0ZURPTX0gZnJvbSAnLi9kb20uanMnXG5leHBvcnQge3ZpZXdUYXNrfVxuXG5jb25zdCB2aWV3VGFzayA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gcG9wdWxhdGVGaWVsZHMgKG9iaiwgcGFyZW50KSB7XG4gICAgICAgIGZvciAoY29uc3Qga2V5IGluIG9iaikge1xuICAgICAgICAgICAgY29uc3QgZmllbGQgPSBgJHtrZXl9OiAke29ialtrZXldfWA7XG4gICAgICAgICAgICBtYW5pcHVsYXRlRE9NLmFkZFRvSFRNTCAobWFuaXB1bGF0ZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2RpdicsIGZpZWxkKSxcbiAgICAgICAgICAgIHBhcmVudCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBwb3B1bGF0ZUZpZWxkczogcG9wdWxhdGVGaWVsZHMsXG4gICAgfVxufSkoKTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB7bWFuaXB1bGF0ZURPTX0gZnJvbSAnLi9kb20uanMnXG5pbXBvcnQge3Byb2plY3RNb2R9IGZyb20gJy4vcHJvamVjdHMuanMnXG5pbXBvcnQge3Rhc2tNb2R9IGZyb20gJy4vdGFza3MuanMnXG5pbXBvcnQge3ZpZXdUYXNrfSBmcm9tICcuL3ZpZXctdGFzay5qcydcblxuXG5jb25zdCBsb2FkUGFnZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgY29uc3QgaHRtbENvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yICgnI2NvbnRlbnQnKVxuXG4gICAgY29uc3QgaGVhZGVyQ29udGVudCA9IG1hbmlwdWxhdGVET00uY3JlYXRlQ29udGFpbmVyICgnaGVhZGVyJywgJ2RpdicpO1xuICAgIGNvbnN0IHNpZGViYXJDb250ZW50ID0gbWFuaXB1bGF0ZURPTS5jcmVhdGVDb250YWluZXIgKCdzaWRlYmFyJywgJ2RpdicpO1xuICAgIGNvbnN0IGRpc3BsYXlDb250ZW50ID0gbWFuaXB1bGF0ZURPTS5jcmVhdGVDb250YWluZXIgKCdkaXNwbGF5JywgJ2RpdicpO1xuICAgIGNvbnN0IGdyaWRDb250YWluZXIgPSBtYW5pcHVsYXRlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2dyaWQnLCAnZGl2Jyk7XG5cbiAgICBtYW5pcHVsYXRlRE9NLmFkZFRvSFRNTCAoaGVhZGVyQ29udGVudCwgaHRtbENvbnRlbnQpO1xuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChncmlkQ29udGFpbmVyLCBodG1sQ29udGVudCk7XG4gICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKHNpZGViYXJDb250ZW50LCBncmlkQ29udGFpbmVyKTtcbiAgICBtYW5pcHVsYXRlRE9NLmFkZFRvSFRNTCAoZGlzcGxheUNvbnRlbnQsIGdyaWRDb250YWluZXIpO1xuXG4gICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKG1hbmlwdWxhdGVET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdoMicsICdUbyBEbyBMaXN0JyksIGhlYWRlckNvbnRlbnQpO1xuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChtYW5pcHVsYXRlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnYnV0dG9uJywgJ0FkZCBQcm9qZWN0JyksIGhlYWRlckNvbnRlbnQpO1xuXG4gICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKG1hbmlwdWxhdGVET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCAnUHJvamVjdHMnKSwgc2lkZWJhckNvbnRlbnQpO1xuXG4gICAgY29uc3QgdGFza3MgPSBbXTtcbiAgICBjb25zdCBjbGVhbiA9IHRhc2tNb2QuY3JlYXRlVGFzayAoJ0NsZWFuJywgJ2NsZWFuIHlvdXIgcm9vbScsIERhdGUoKSwgJ0xvdycsIHRhc2tzLmxlbmd0aCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChjbGVhbiwgdGFza3MpO1xuICAgIGNvbnN0IHN1cmYgPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdTdXJmJywgJ2hpZ2ggdGlkZSBhdCAzUE0nLCBEYXRlKCksICdIaWdoJywgdGFza3MubGVuZ3RoKTtcbiAgICB0YXNrTW9kLmFzc2lnblRhc2sgKHN1cmYsIHRhc2tzKTtcblxuICAgIGNvbnN0IHRvZGF5ID0gcHJvamVjdE1vZC5jcmVhdGVQcm9qZWN0ICgnVG9kYXknLCB0YXNrcyk7XG5cbiAgICBtYW5pcHVsYXRlRE9NLmFwcGVuZFByb2ogKHRvZGF5LCBzaWRlYmFyQ29udGVudCwgJ2RpdicpO1xuICAgIG1hbmlwdWxhdGVET00uYXBwZW5kUHJvaiAodG9kYXksIGRpc3BsYXlDb250ZW50LCAnaDMnKTtcbiAgICBtYW5pcHVsYXRlRE9NLmFwcGVuZEFsbFRhc2tzICh0b2RheS50YXNrcywgZGlzcGxheUNvbnRlbnQsICdkaXYnKTtcblxuICAgIFxufSkoKTtcblxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9