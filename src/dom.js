export {useDOM} 
import { taskMod } from "./tasks.js";

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
        taskMod.addTaskData (obj, active);
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