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

    const mealTasks = [];
    const mon = taskMod.createTask ('Pasta', 'pick up pesto and noodles for Monday',
     '2023-12-29', 'Low', `Pasta-id#0`);
    taskMod.assignTask (mon, mealTasks);
    const tues = taskMod.createTask ('Fish', 'head to the market and pick up something fresh',
     '2023-12-30', 'High', `Fish-id#1`);
    taskMod.assignTask (tues, mealTasks);
    const wed = taskMod.createTask ('Burgers', 'Wednesday is supposed to be great BBQ weather',
     '2023-12-31', 'Medium', `Burgers-id#2`);
    taskMod.assignTask (wed, mealTasks);

    const moroccoTasks = [];
    const cook = taskMod.createTask ('Cook', 'try to cook tagine like the locals',
     '2023-12-1', 'Medium', `Cook-id#0`);
    taskMod.assignTask (cook, moroccoTasks);
    const shop = taskMod.createTask ('Shop', 'go shopping for a cool new rug to bring home',
     '2023-12-3', 'None', `Shop-id#1`);
    taskMod.assignTask (shop, moroccoTasks);
    const camel = taskMod.createTask ('Feed a Camel', 'find out what camels eat and feed one',
    '2023-12-5', 'Medium', `Feed-id#2`);
   taskMod.assignTask (camel, moroccoTasks);

    projectMod.projects.push (projectMod.createProject ('Morocco', moroccoTasks));
    projectMod.projects.push (projectMod.createProject ('Meal Plan', mealTasks));

    useDOM.renderDisplay (projectMod.projects[0], gridContainer);
    useDOM.renderSidebar (projectMod.projects, sidebarContent, 'div', gridContainer)

    modalMod.createProjectOptions (projectMod.projects);
    
})();

