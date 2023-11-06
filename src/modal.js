export {modalMod}
import { useDOM } from "./dom";
import {projectMod} from "./projects";
import {taskMod} from "./tasks";

const modalMod = (function () {

    const taskDialog = document.querySelector ('.task-dialog');
    const taskInputs = taskDialog.querySelectorAll ('input');
    const select = taskDialog.querySelector ('select');

    const projDialog = document.querySelector ('.proj-dialog')

    function showTaskModal () {
        taskDialog.showModal();
    }

    function showProjModal () {
        projDialog.showModal();
    }

    function createProjectOptions () {
        let i = 0;
        projectMod.projects.forEach(project => {
            const option = useDOM.createTextElement ('option', project.title);
            useDOM.addToHTML (option, select);
            i += 1;
    });
    }

    function confirmTask (event, parent) {
        event.preventDefault ();
        const project = findSelectedProj ();
        taskMod.addToProject (project.taskList, createTask (taskInputs), project, parent);
        closeModal (taskInputs);
    }

    function getSelectedProj () {
        return taskDialog.querySelector ('select').value;
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
        taskInputs.forEach(input => input.value = '');
        taskDialog.close();
    }

    function confirmProj (event, parent) {
        event.preventDefault ();
        console.log ('click')
        // const project = findSelectedProj ();
        // taskMod.addToProject (project.taskList, createTask (taskInputs), project, parent);
        // closeModal (taskInputs);
    }

    return {
        showTaskModal: showTaskModal,
        showProjModal: showProjModal,
        confirmTask: confirmTask,
        createProjectOptions: createProjectOptions,
        confirmProj, confirmProj,
    }

})();