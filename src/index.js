import {useDOM} from './dom.js'
import {projectMod} from './projects.js'
import {taskMod} from './tasks.js'
import {modalMod} from './modal.js'

const loadPage = (function () {
    const htmlContent = document.querySelector ('#content')

    const headerContent = useDOM.createContainer ('header', 'div');
    const sidebarContent = useDOM.createContainer ('sidebar', 'div');
    const gridContainer = useDOM.createContainer ('grid', 'div');

    useDOM.addToHTML (headerContent, htmlContent);
    useDOM.addToHTML (gridContainer, htmlContent);
    useDOM.addToHTML (sidebarContent, gridContainer);

    useDOM.addToHTML (useDOM.createTextElement ('h2', 'To Do List'), headerContent);

    const addProjBtn = useDOM.createClassTextElement ('button', 'Add Project', 'add-project');
    useDOM.addToHTML (addProjBtn, headerContent);
    useDOM.bindEvents (addProjBtn, 'click', () => modalMod.showProjModal());

    const addTaskBtn = useDOM.createClassTextElement ('button', 'Add Task', 'add-task');
    useDOM.addToHTML (addTaskBtn, headerContent);
    useDOM.bindEvents (addTaskBtn, 'click', () => modalMod.showTaskModal());

    const confirmTask = document.querySelector("#confirmTask");
    useDOM.bindEvents (confirmTask, 'click', (event) => modalMod.confirmTask 
    (event, gridContainer));

    const confirmProj = document.querySelector("#confirmProj");
    useDOM.bindEvents (confirmProj, 'click', (event) => modalMod.confirmProj (event, sidebarContent, gridContainer));

    useDOM.addToHTML (useDOM.createTextElement ('h3', 'Projects'), sidebarContent);

    const todayTasks = [];
    const clean = taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', todayTasks.length);
    taskMod.assignTask (clean, todayTasks);
    const surf = taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', todayTasks.length);
    taskMod.assignTask (surf, todayTasks);

    const moroccoTasks = [];
    const cook = taskMod.createTask ('Cook', 'tagine', Date(), 'Medium', moroccoTasks.length);
    taskMod.assignTask (cook, moroccoTasks);

    projectMod.createFromBtn ('test', projectMod.projects);

    projectMod.projects.push (projectMod.createProject ('Morocco', moroccoTasks));
    projectMod.projects.push (projectMod.createProject ('Today', todayTasks));

    useDOM.renderDisplay (projectMod.projects[0], gridContainer);
    useDOM.renderSidebar (projectMod.projects, sidebarContent, 'div', gridContainer)

    //need to re-render this after a new projec is added
    //cross this bridge when working on add proj btn
    modalMod.createProjectOptions (projectMod.projects);
    
})();

