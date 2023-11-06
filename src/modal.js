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
            i += 1;
    });
    }

    function confirmTask (event, taskArr, parent) {
        event.preventDefault ();
        console.log (findSelectedProj ());
        console.log (projectMod.projects[1]);
        taskMod.addToProject (taskArr, createTask (inputs), findSelectedProj (), parent);
        closeModal (inputs);
    }

    function getSelectedProj () {
        const selector = dialog.querySelector ('select');
        console.log (selector.value);
        return selector.value;
    }

    function findSelectedProj () {
        const selectedProj = getSelectedProj ();
        for (let i = 0; i < projectMod.projects.length; i++) {
            if (projectMod.projects[i].title === selectedProj) {
                return projectMod.projects[i];
            }
        }
    };

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