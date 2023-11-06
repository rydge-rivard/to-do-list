export {modalMod}
import {projects} from "./index";
import {taskMod} from "./tasks";

const modalMod = (function () {

    const dialog = document.querySelector('dialog');
    const inputs = dialog.querySelectorAll('input');

    function showModal () {
        console.log('click')
        dialog.showModal();
    }

    function getProjects () {
        projectMod.projectMod;
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
        //return an object to push to array in index
        showModal: showModal,
        confirmTask: confirmTask,
    }

})();