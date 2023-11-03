import {manipulateDOM} from './dom.js'
import {projectMod} from './projects.js'
import {taskMod} from './tasks.js'



const loadPage = (function () {
    const htmlContent = document.querySelector('#content')

    const headerContent = manipulateDOM.createContainer ('header');
    const sidebarContent = manipulateDOM.createContainer ('sidebar');
    const displayContent = manipulateDOM.createContainer ('display');
    const gridContainer = manipulateDOM.createContainer ('grid');

    manipulateDOM.addToHTML (headerContent, htmlContent);
    manipulateDOM.addToHTML (gridContainer, htmlContent);
    manipulateDOM.addToHTML (sidebarContent, gridContainer);
    manipulateDOM.addToHTML (displayContent, gridContainer);

    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('h2', 'To Do List'), headerContent);
    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('button', 'Add Project'), headerContent);

    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('div', 'Projects'), sidebarContent);

    const tasks = [];
    const clean = taskMod.createTask('Clean', 'clean your room', Date(), 'Low');
    const surf = taskMod.createTask('Surf', 'high tide at 3PM', Date(), 'High');
    taskMod.assignTask(clean, tasks);
    taskMod.assignTask(surf, tasks);

    const today = projectMod.createProject('Today', tasks);
    console.log(today);

    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('div', today.title), sidebarContent);
    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('h3', today.title), displayContent)
})();

