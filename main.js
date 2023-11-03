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
        manipulateDOM.addToHTML (manipulateDOM.createContainer ('active', 'div'), location);
        _view_task__WEBPACK_IMPORTED_MODULE_0__.viewTask.populateFields (obj, location);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFBc0I7QUFDdEIsQ0FBdUM7O0FBRXZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQVEsZ0RBQVE7QUFDaEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxDQUFDOzs7Ozs7Ozs7Ozs7OztBQ3ZEbUI7O0FBRXBCOztBQUVBOztBQUVBO0FBQ0EsZ0JBQWdCO0FBQ2hCOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7Ozs7Ozs7Ozs7Ozs7O0FDYmdCOztBQUVqQjs7QUFFQTtBQUNBLGdCQUFnQjtBQUNoQjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O0FDakJxQztBQUNyQjs7QUFFakI7QUFDQTtBQUNBO0FBQ0EsNkJBQTZCLElBQUksSUFBSSxTQUFTO0FBQzlDLFlBQVksa0RBQWEsWUFBWSxrREFBYTtBQUNsRDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7Ozs7O1VDZkQ7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7OztBQ05zQztBQUNFO0FBQ047QUFDSzs7O0FBR3ZDO0FBQ0E7O0FBRUEsMEJBQTBCLGtEQUFhO0FBQ3ZDLDJCQUEyQixrREFBYTtBQUN4QywyQkFBMkIsa0RBQWE7QUFDeEMsMEJBQTBCLGtEQUFhOztBQUV2QyxJQUFJLGtEQUFhO0FBQ2pCLElBQUksa0RBQWE7QUFDakIsSUFBSSxrREFBYTtBQUNqQixJQUFJLGtEQUFhOztBQUVqQixJQUFJLGtEQUFhLFlBQVksa0RBQWE7QUFDMUMsSUFBSSxrREFBYSxZQUFZLGtEQUFhOztBQUUxQyxJQUFJLGtEQUFhLFlBQVksa0RBQWE7O0FBRTFDO0FBQ0Esa0JBQWtCLDhDQUFPO0FBQ3pCLElBQUksOENBQU87QUFDWCxpQkFBaUIsOENBQU87QUFDeEIsSUFBSSw4Q0FBTzs7QUFFWCxrQkFBa0Isb0RBQVU7O0FBRTVCLElBQUksa0RBQWE7QUFDakIsSUFBSSxrREFBYTtBQUNqQixJQUFJLGtEQUFhOztBQUVqQjtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL2RvbS5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL3Byb2plY3RzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvdGFza3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy92aWV3LXRhc2suanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90by1kby1saXN0L3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IHttYW5pcHVsYXRlRE9NfSBcbmltcG9ydCB7IHZpZXdUYXNrIH0gZnJvbSBcIi4vdmlldy10YXNrXCI7XG5cbmNvbnN0IG1hbmlwdWxhdGVET00gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIGNyZWF0ZVRleHRFbGVtZW50IChlbGVtZW50LCB0ZXh0KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGVsZW1lbnQpO1xuICAgICAgICBuZXdFbGVtZW50LnRleHRDb250ZW50ID0gdGV4dDtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkVG9IVE1MIChlbGVtZW50LCBwYXJlbnQpIHtcbiAgICAgICAgcGFyZW50LmFwcGVuZENoaWxkKGVsZW1lbnQpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUNvbnRhaW5lciAoY3NzQ2xhc3MsIGVsZW1lbnQpIHtcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbGVtZW50KTtcbiAgICAgICAgY29udGFpbmVyLmNsYXNzTGlzdC5hZGQoY3NzQ2xhc3MpO1xuICAgICAgICByZXR1cm4gY29udGFpbmVyO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhcHBlbmRQcm9qIChvYmosIGxvY2F0aW9uLCBlbGVtZW50KSB7XG4gICAgICAgIGNvbnN0IG5ld0VsZW1lbnQgPSBjcmVhdGVUZXh0RWxlbWVudCAoZWxlbWVudCwgb2JqLnRpdGxlKVxuICAgICAgICBhZGRUb0hUTUwgKG5ld0VsZW1lbnQsIGxvY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG5ld0VsZW1lbnQ7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBwZW5kQWxsVGFza3MgKHRhc2tBcnIsIGxvY2F0aW9uKSB7XG4gICAgICAgIHRhc2tBcnIuZm9yRWFjaCh0YXNrID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVsZW1lbnQgPSBhcHBlbmRQcm9qICh0YXNrLCBsb2NhdGlvbiwgJ2RpdicpO1xuICAgICAgICAgICAgYmluZEV2ZW50cyAoZWxlbWVudCwgJ2NsaWNrJywgKCkgPT4gY3JlYXRlQWN0aXZlQ29udCAodGFzaywgZWxlbWVudCkpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBmdW5jdGlvbiBhcHBlbmRUYXNrICh0YXNrLCBsb2NhdGlvbikge1xuICAgIC8vICAgICBhcHBlbmRQcm9qICh0YXNrLnRpdGxlLCBsb2NhdGlvbiwgJ2RpdicpO1xuICAgIC8vIH1cblxuICAgIGZ1bmN0aW9uIGJpbmRFdmVudHMgKGVsZW1lbnQsIGV2ZW50LCBhY3Rpb24pIHtcbiAgICAgICAgZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKGV2ZW50LCBhY3Rpb24pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNyZWF0ZUFjdGl2ZUNvbnQgKG9iaiwgbG9jYXRpb24pIHtcbiAgICAgICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKG1hbmlwdWxhdGVET00uY3JlYXRlQ29udGFpbmVyICgnYWN0aXZlJywgJ2RpdicpLCBsb2NhdGlvbik7XG4gICAgICAgIHZpZXdUYXNrLnBvcHVsYXRlRmllbGRzIChvYmosIGxvY2F0aW9uKTtcbiAgICAgICAgcmV0dXJuIG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUZXh0RWxlbWVudDogY3JlYXRlVGV4dEVsZW1lbnQsXG4gICAgICAgIGFkZFRvSFRNTDogYWRkVG9IVE1MLFxuICAgICAgICBjcmVhdGVDb250YWluZXIsIGNyZWF0ZUNvbnRhaW5lcixcbiAgICAgICAgYXBwZW5kUHJvajogYXBwZW5kUHJvaixcbiAgICAgICAgYXBwZW5kQWxsVGFza3M6IGFwcGVuZEFsbFRhc2tzLFxuICAgIH1cblxufSkoKTsiLCJleHBvcnQge3Byb2plY3RNb2R9O1xuXG5jb25zdCBwcm9qZWN0TW9kID0gKGZ1bmN0aW9uICgpIHtcblxuICAgIGNvbnN0IHByb2plY3RzID0gW107XG5cbiAgICBmdW5jdGlvbiBjcmVhdGVQcm9qZWN0ICh0aXRsZSwgdGFza3MpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgdGFza3N9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgY3JlYXRlUHJvamVjdDogY3JlYXRlUHJvamVjdCxcbiAgICB9XG59KSgpOyIsImV4cG9ydCB7dGFza01vZH07XG5cbmNvbnN0IHRhc2tNb2QgPSAoZnVuY3Rpb24gKCkge1xuXG4gICAgZnVuY3Rpb24gY3JlYXRlVGFzayAodGl0bGUsIGRlc2NyaXB0aW9uLCBkdWVEYXRlLCBwcmlvcml0eSwgaWQpIHtcbiAgICAgICAgcmV0dXJuIHt0aXRsZSwgZGVzY3JpcHRpb24sIGR1ZURhdGUsIHByaW9yaXR5LCBpZH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhc3NpZ25UYXNrICh0YXNrT2JqLCB0YXNrQXJyKSB7XG4gICAgICAgIHRhc2tBcnIucHVzaCh0YXNrT2JqKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBjcmVhdGVUYXNrOiBjcmVhdGVUYXNrLFxuICAgICAgICBhc3NpZ25UYXNrOiBhc3NpZ25UYXNrLFxuICAgIH1cblxufSkoKTsiLCJpbXBvcnQge21hbmlwdWxhdGVET019IGZyb20gJy4vZG9tLmpzJ1xuZXhwb3J0IHt2aWV3VGFza31cblxuY29uc3Qgdmlld1Rhc2sgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIHBvcHVsYXRlRmllbGRzIChvYmosIHBhcmVudCkge1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgICAgIGNvbnN0IGZpZWxkID0gYCR7a2V5fTogJHtvYmpba2V5XX1gO1xuICAgICAgICAgICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKG1hbmlwdWxhdGVET00uY3JlYXRlVGV4dEVsZW1lbnQgKCdkaXYnLCBmaWVsZCksXG4gICAgICAgICAgICBwYXJlbnQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcG9wdWxhdGVGaWVsZHM6IHBvcHVsYXRlRmllbGRzLFxuICAgIH1cbn0pKCk7IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb25zIGZvciBoYXJtb255IGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uZCA9IChleHBvcnRzLCBkZWZpbml0aW9uKSA9PiB7XG5cdGZvcih2YXIga2V5IGluIGRlZmluaXRpb24pIHtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZGVmaW5pdGlvbiwga2V5KSAmJiAhX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIGtleSkpIHtcblx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBrZXksIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBkZWZpbml0aW9uW2tleV0gfSk7XG5cdFx0fVxuXHR9XG59OyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJpbXBvcnQge21hbmlwdWxhdGVET019IGZyb20gJy4vZG9tLmpzJ1xuaW1wb3J0IHtwcm9qZWN0TW9kfSBmcm9tICcuL3Byb2plY3RzLmpzJ1xuaW1wb3J0IHt0YXNrTW9kfSBmcm9tICcuL3Rhc2tzLmpzJ1xuaW1wb3J0IHt2aWV3VGFza30gZnJvbSAnLi92aWV3LXRhc2suanMnXG5cblxuY29uc3QgbG9hZFBhZ2UgPSAoZnVuY3Rpb24gKCkge1xuICAgIGNvbnN0IGh0bWxDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvciAoJyNjb250ZW50JylcblxuICAgIGNvbnN0IGhlYWRlckNvbnRlbnQgPSBtYW5pcHVsYXRlRE9NLmNyZWF0ZUNvbnRhaW5lciAoJ2hlYWRlcicsICdkaXYnKTtcbiAgICBjb25zdCBzaWRlYmFyQ29udGVudCA9IG1hbmlwdWxhdGVET00uY3JlYXRlQ29udGFpbmVyICgnc2lkZWJhcicsICdkaXYnKTtcbiAgICBjb25zdCBkaXNwbGF5Q29udGVudCA9IG1hbmlwdWxhdGVET00uY3JlYXRlQ29udGFpbmVyICgnZGlzcGxheScsICdkaXYnKTtcbiAgICBjb25zdCBncmlkQ29udGFpbmVyID0gbWFuaXB1bGF0ZURPTS5jcmVhdGVDb250YWluZXIgKCdncmlkJywgJ2RpdicpO1xuXG4gICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKGhlYWRlckNvbnRlbnQsIGh0bWxDb250ZW50KTtcbiAgICBtYW5pcHVsYXRlRE9NLmFkZFRvSFRNTCAoZ3JpZENvbnRhaW5lciwgaHRtbENvbnRlbnQpO1xuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChzaWRlYmFyQ29udGVudCwgZ3JpZENvbnRhaW5lcik7XG4gICAgbWFuaXB1bGF0ZURPTS5hZGRUb0hUTUwgKGRpc3BsYXlDb250ZW50LCBncmlkQ29udGFpbmVyKTtcblxuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChtYW5pcHVsYXRlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnaDInLCAnVG8gRG8gTGlzdCcpLCBoZWFkZXJDb250ZW50KTtcbiAgICBtYW5pcHVsYXRlRE9NLmFkZFRvSFRNTCAobWFuaXB1bGF0ZURPTS5jcmVhdGVUZXh0RWxlbWVudCAoJ2J1dHRvbicsICdBZGQgUHJvamVjdCcpLCBoZWFkZXJDb250ZW50KTtcblxuICAgIG1hbmlwdWxhdGVET00uYWRkVG9IVE1MIChtYW5pcHVsYXRlRE9NLmNyZWF0ZVRleHRFbGVtZW50ICgnZGl2JywgJ1Byb2plY3RzJyksIHNpZGViYXJDb250ZW50KTtcblxuICAgIGNvbnN0IHRhc2tzID0gW107XG4gICAgY29uc3QgY2xlYW4gPSB0YXNrTW9kLmNyZWF0ZVRhc2sgKCdDbGVhbicsICdjbGVhbiB5b3VyIHJvb20nLCBEYXRlKCksICdMb3cnLCB0YXNrcy5sZW5ndGgpO1xuICAgIHRhc2tNb2QuYXNzaWduVGFzayAoY2xlYW4sIHRhc2tzKTtcbiAgICBjb25zdCBzdXJmID0gdGFza01vZC5jcmVhdGVUYXNrICgnU3VyZicsICdoaWdoIHRpZGUgYXQgM1BNJywgRGF0ZSgpLCAnSGlnaCcsIHRhc2tzLmxlbmd0aCk7XG4gICAgdGFza01vZC5hc3NpZ25UYXNrIChzdXJmLCB0YXNrcyk7XG5cbiAgICBjb25zdCB0b2RheSA9IHByb2plY3RNb2QuY3JlYXRlUHJvamVjdCAoJ1RvZGF5JywgdGFza3MpO1xuXG4gICAgbWFuaXB1bGF0ZURPTS5hcHBlbmRQcm9qICh0b2RheSwgc2lkZWJhckNvbnRlbnQsICdkaXYnKTtcbiAgICBtYW5pcHVsYXRlRE9NLmFwcGVuZFByb2ogKHRvZGF5LCBkaXNwbGF5Q29udGVudCwgJ2gzJyk7XG4gICAgbWFuaXB1bGF0ZURPTS5hcHBlbmRBbGxUYXNrcyAodG9kYXkudGFza3MsIGRpc3BsYXlDb250ZW50LCAnZGl2Jyk7XG5cbiAgICBcbn0pKCk7XG5cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==