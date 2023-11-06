export {modalMod}
import { useDOM } from "./dom";
import {projectMod} from "./projects";
import {taskMod} from "./tasks";

const modalMod = (function () {

    const dialog = document.querySelector ('dialog');
    const inputs = dialog.querySelectorAll ('input');
    const select = dialog.querySelector ('select');

    function showModal () {
        
        dialog.showModal();
    }

    function createProjectOptions () {
        let i = 0;
        projectMod.projects.forEach(project => {
            const option = useDOM.createTextElement ('option', project.title);
            useDOM.addToHTML (option, select);
            console.log (projectMod.projects[i].title === project.title);
    });
    }

    function confirmTask (event, taskArr, project, parent) {
        event.preventDefault();
        taskMod.addToProject (taskArr, createTask (inputs), project, parent);
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

    function removeProjOptions () {
        const options = dialog.querySelectorAll('option');
        options.forEach(option => option.remove());
    }

    return {
        showModal: showModal,
        confirmTask: confirmTask,
        createProjectOptions: createProjectOptions,
    }

})();