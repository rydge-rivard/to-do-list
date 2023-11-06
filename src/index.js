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
    useDOM.bindEvents (addProjBtn, 'click', () => modalMod.showModal());

    const addTaskBtn = useDOM.createClassTextElement ('button', 'Add Task', 'add-task');
    useDOM.addToHTML (addTaskBtn, headerContent);
    useDOM.bindEvents (addTaskBtn, 'click', () => modalMod.showModal());

    const confirmBtn = document.querySelector("#confirmBtn");
    useDOM.bindEvents (confirmBtn, 'click', (event) => modalMod.confirmTask (event,
         tasks, projectMod.projects[1], gridContainer));

    useDOM.addToHTML (useDOM.createTextElement ('h3', 'Projects'), sidebarContent);

    const tasks = [];
    const clean = taskMod.createTask ('Clean', 'clean your room', Date(), 'Low', tasks.length);
    taskMod.assignTask (clean, tasks);
    const surf = taskMod.createTask ('Surf', 'high tide at 3PM', Date(), 'High', tasks.length);
    taskMod.assignTask (surf, tasks);

    const today = projectMod.createProject ('Today', tasks);
    projectMod.projects.push (projectMod.createProject ('Morocco', tasks));
    projectMod.projects.push (today);

    useDOM.renderDisplay (projectMod.projects[0], gridContainer);
    useDOM.renderSidebar (projectMod.projects, sidebarContent, 'div')

    //need to re-render this after a new projec is added
    //cross this bridge when working on add proj btn
    modalMod.createProjectOptions (projectMod.projects);
    
})();

