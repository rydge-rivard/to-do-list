export {manipulateDOM} 
import { taskMod } from "./tasks.js";

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

    //potentially split this into tasks.js
    function appendAllTasks (taskArr, location) {
        taskArr.forEach(task => {
            const element = appendProj (task, location, 'div');
            bindEvents (element, 'click', () => toggleDetails (task, element));
        });
    }

    function bindEvents (element, event, action) {
        element.addEventListener(event, action);
    }

    //circle back to this and split function int tasks.js
    function toggleDetails (obj, location) {
        const active = manipulateDOM.createContainer ('active', 'div');
        manipulateDOM.addToHTML (active, location);
        taskMod.addTaskData (obj, active);
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