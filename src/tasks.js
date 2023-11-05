export {taskMod};
import {useDOM} from './dom.js'


const taskMod = (function () {

    function createTask (title, description, dueDate, priority, id) {
        return {title, description, dueDate, priority, id}
    }

    function assignTask (taskObj, taskArr) {
        taskArr.push(taskObj);
    }

    function appendTask (task, location) {
        const element = useDOM.appendProj (task, location, 'div');
        return element;
        // bindEvents (element, 'click', () => toggleDetails (task, element));
    }

    function addToProject (taskArr, taskObj, project, parent) {
        taskArr.push (taskObj);
        useDOM.deleteDisplay ();
        useDOM.renderDisplay (project, parent);
    }

    //create content divs on task create that are display = none
    //toggle display = block on click
    //on task edit, the item is removed and re-added to array?

    function addTaskData (obj, parent) {
        for (const key in obj) {
            const field = `${key}: ${obj[key]}`;
            useDOM.addToHTML (useDOM.createTextElement ('div', field), parent);
        }
    }

    return {
        createTask: createTask,
        assignTask: assignTask,
        addTaskData: addTaskData,
        appendTask: appendTask,
        addToProject: addToProject,
    }

})();