import {manipulateDOM} from './dom.js'

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

    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('span', 'Projects'), sidebarContent);

    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('div', 'Today'), displayContent)

})();

