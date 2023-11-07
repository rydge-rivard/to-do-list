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

    useDOM.createImg ('./img/list-blck.svg', '40px', 'List with checks icon.', headerContent);
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
    useDOM.bindEvents (confirmProj, 'click', (event) => modalMod.confirmProj 
    (event, sidebarContent, gridContainer));

    useDOM.addToHTML (useDOM.createTextElement ('h3', 'Projects'), sidebarContent);

    const todayTasks = [];
    const clean = taskMod.createTask ('Clean', 'clean your room', '2023-12-31', 'Low', `Clean-id#0`);
    taskMod.assignTask (clean, todayTasks);
    const surf = taskMod.createTask ('Surf', 'high tide at 3PM', '2023-12-31', 'High', `Surf-id#1`);
    taskMod.assignTask (surf, todayTasks);

    const moroccoTasks = [];
    const cook = taskMod.createTask ('Cook', 'tagine', '2023-12-31', 'Medium', `Cook-id#0`);
    taskMod.assignTask (cook, moroccoTasks);

    projectMod.projects.push (projectMod.createProject ('Morocco', moroccoTasks));
    projectMod.projects.push (projectMod.createProject ('Today', todayTasks));

    useDOM.renderDisplay (projectMod.projects[0], gridContainer);
    useDOM.renderSidebar (projectMod.projects, sidebarContent, 'div', gridContainer)

    //need to re-render this after a new projec is added
    //cross this bridge when working on add proj btn
    modalMod.createProjectOptions (projectMod.projects);
    
})();

