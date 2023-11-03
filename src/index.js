import {manipulateDOM} from './dom.js'

const loadPage = (function () {
    const htmlContent = document.querySelector('#content')

    const headerContent = manipulateDOM.createContainer ('header');
    const sidebarContent = manipulateDOM.createContainer ('sidebar');
    const displayContent = manipulateDOM.createContainer ('display');

    manipulateDOM.addToHTML (headerContent, htmlContent);
    manipulateDOM.addToHTML (sidebarContent, htmlContent);
    manipulateDOM.addToHTML (displayContent, htmlContent);

    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('h2', 'To Do List'), headerContent);
    manipulateDOM.addToHTML (manipulateDOM.createTextElement ('button', 'Add Project'), headerContent)

})();

