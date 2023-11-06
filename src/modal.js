export {modalMod}
import { useDOM } from "./dom";
import {projectMod} from "./projects";
import {taskMod} from "./tasks";

const modalMod = (function () {

    const dialog = document.querySelector ('dialog');
    const inputs = dialog.querySelectorAll ('input');
    const select = dialog.querySelector ('select');

    function showModal () {
        createProjectOptions (projectMod.projects);
        dialog.showModal();
    }

    function createProjectOptions () {
        projectMod.projects.forEach(project => useDOM.addToHTML (useDOM.createTextElement 
            ('option', project.title), select));
    }

    function confirmTask (event, taskArr, project, parent) {
        event.preventDefault();
        taskMod.addToProject (taskArr, createTask (inputs), project, parent)
        closeModal (inputs);
    }

    function sortInputs (inputArr) {
        const objArr = [];
        inputArr.forEach(input => objArr.push (input.value));
        return objArr;
    }

    function createTask (inputArr) {
        const inputValues = sortInputs(inputArr);
        const newTask = taskMod.createTask(inputValues[0]);
        return newTask;
    }

    function closeModal () {
        inputs.forEach(input => input.value = '');
        dialog.close();
    }

    return {
        showModal: showModal,
        confirmTask: confirmTask,
    }

})();