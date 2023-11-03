import {useDOM} from './dom.js'
import {projectMod} from './projects.js'
import {taskMod} from './tasks.js'

const loadPage = (function () {
    const htmlContent = document.querySelector ('#content')

    const headerContent = useDOM.createContainer ('header', 'div');
    const sidebarContent = useDOM.createContainer ('sidebar', 'div');
    const displayContent = useDOM.createContainer ('display', 'div');
    const gridContainer = useDOM.createContainer ('grid', 'div');

    useDOM.addToHTML (headerContent, htmlContent);
    useDOM.addToHTML (gridContainer, htmlContent);
    useDOM.addToHTML (sidebarContent, gridContainer);
    useDOM.addToHTML (displayContent, gridContainer);

    useDOM.addToHTML (useDOM.createTextElement ('h2', 'To Do List'), headerContent);
    useDOM.addToHTML (useDOM.createClassTextElement 
        ('button', 'Add Project', 'add-project'), headerContent);
    const addTaskBtn = useDOM.createClassTextElement ('button', 'Add Task', 'add-task');
    useDOM.addToHTML (addTaskBtn, headerContent);

    useDOM.addToHTML (useDOM.createTextElement ('div', 'Projects'), sidebarContent);

    const tasks = [];
    const clean = taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', tasks.length);
    taskMod.assignTask (clean, tasks);
    const surf = taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', tasks.length);
    taskMod.assignTask (surf, tasks);

    const today = projectMod.createProject ('Today', tasks);

    useDOM.appendProj (today, sidebarContent, 'div');
    useDOM.appendProj (today, displayContent, 'h3');
    useDOM.appendAllTasks (today.tasks, displayContent, 'div');

    useDOM.bindEvents (addTaskBtn, 'click', () => console.log('click'));

    
})();

