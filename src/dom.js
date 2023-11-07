export {useDOM} 
import { modalMod } from "./modal.js";
import { projectMod } from "./projects.js";
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
        projectMod.removeObjTask (project.taskList, task.id);
        console.log (project);
        container.remove ();
    }

    function createHiddenDetails (obj, location) {
        const active = useDOM.createContainer ('active', 'div');
        // active.style.display = "none";
        addToHTML (active, location);
        taskMod.addTaskData (obj, active);
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