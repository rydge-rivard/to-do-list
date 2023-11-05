import {useDOM} from './dom.js'
import {projectMod} from './projects.js'
import {taskMod} from './tasks.js'
import {modalMod} from './modal.js'

const loadPage = (function () {
    const htmlContent = document.querySelector ('#content')
    const confirmBtn = document.querySelector("#confirmBtn");

    const headerContent = useDOM.createContainer ('header', 'div');
    const sidebarContent = useDOM.createContainer ('sidebar', 'div');
    const gridContainer = useDOM.createContainer ('grid', 'div');

    useDOM.addToHTML (headerContent, htmlContent);
    useDOM.addToHTML (gridContainer, htmlContent);
    useDOM.addToHTML (sidebarContent, gridContainer);

    useDOM.addToHTML (useDOM.createTextElement ('h2', 'To Do List'), headerContent);
    useDOM.addToHTML (useDOM.createClassTextElement 
        ('button', 'Add Project', 'add-project'), headerContent);
    const addTaskBtn = useDOM.createClassTextElement ('button', 'Add Task', 'add-task');
    useDOM.addToHTML (addTaskBtn, headerContent);

    useDOM.addToHTML (useDOM.createTextElement ('div', 'Projects'), sidebarContent);

    const projects = [];
    const tasks = [];
    const clean = taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', tasks.length);
    taskMod.assignTask (clean, tasks);
    const surf = taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', tasks.length);
    taskMod.assignTask (surf, tasks);

    const today = projectMod.createProject ('Today', tasks);

    useDOM.appendProj (today, sidebarContent, 'div');
    useDOM.renderDisplay (today, gridContainer);

    useDOM.bindEvents (addTaskBtn, 'click', () => modalMod.showModal());
    useDOM.bindEvents (confirmBtn, 'click', (event) => modalMod.confirmTask (event,
         tasks, today, gridContainer));
    
})();

