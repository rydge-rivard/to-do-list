export {taskMod};
import {useDOM} from './dom.js'


const taskMod = (function () {

    function createTask (title, description, due, priority, id) {
        return {title, description, due, priority, id}
    }

    function assignTask (taskObj, taskArr) {
        taskArr.push(taskObj);
    }

    function addToProject (taskArr, taskObj, project, parent) {
        taskArr.push (taskObj);
        useDOM.refreshDisplay (project, parent);
    }

    function addTaskData (obj, parent) {
        for (const key in obj) {
            if (key !== 'id') {
                const field = `${useDOM.capFirstLetter (key)}: ${obj[key]}`;
                useDOM.addToHTML (useDOM.createTextElement ('div', field), parent);
            } 
        }
    }

    return {
        createTask: createTask,
        assignTask: assignTask,
        addTaskData: addTaskData,
        addToProject: addToProject,
    }

})();