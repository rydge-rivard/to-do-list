import {manipulateDOM} from './dom.js'
import {projectMod} from './projects.js'
import {taskMod} from './tasks.js'

const loadPage = (function () {
    const htmlContent = document.querySelector ('#content')

    const headerContent = manipulateDOM.createContainer ('header', 'div');
    const sidebarContent = manipulateDOM.createContainer ('sidebar', 'div');
    const displayContent = manipulateDOM.createContainer ('display', 'div');
    const gridContainer = manipulateDOM.createContainer ('grid', 'div');

    manipulateDOM.addToHTML (headerContent, htmlContent);
    manipulateDOM.addToHTML (gridContainer, htmlContent);
    manipulateDOM.addToHTML (sidebarContent, gridContainer);
    manipulateDOM.addToHTML (displayContent, gridContainer);

    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('h2', 'To Do List'), headerContent);
    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('button', 'Add Project'), headerContent);

    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('div', 'Projects'), sidebarContent);

    const tasks = [];
    const clean = taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', tasks.length);
    taskMod.assignTask (clean, tasks);
    const surf = taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', tasks.length);
    taskMod.assignTask (surf, tasks);

    const today = projectMod.createProject ('Today', tasks);

    manipulateDOM.appendProj (today, sidebarContent, 'div');
    manipulateDOM.appendProj (today, displayContent, 'h3');
    manipulateDOM.appendAllTasks (today.tasks, displayContent, 'div');

    
})();

