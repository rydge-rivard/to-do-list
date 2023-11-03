export {modalMod}
import {useDOM} from "./dom";
import {taskMod} from "./tasks";

const modalMod = (function () {

    const dialog = document.querySelector('dialog')
    const confirmBtn = dialog.querySelector("#confirmBtn");
    let newTask;

    useDOM.bindEvents (confirmBtn, 'click', (event) => confirmTask (event));

    function showModal () {
        console.log('click')
        dialog.showModal();
    }

    function confirmTask (event) {
        event.preventDefault();
        newTask = createTask ();
        taskMod.appendTask (newTask, document.querySelector('.display'));
        console.log(newTask);
    }

    function sortInputs () {
        const inputs = dialog.querySelectorAll('input')
        const objArr = [];
        inputs.forEach(input => objArr.push (input.value));
        return objArr;
    }

    function createTask () {
        const inputValues = sortInputs();
        const newTask = taskMod.createTask(inputValues[0]);
        return newTask;
    }

    return {
        //return an object to push to array in index
        showModal: showModal,
        newTask,
    }

})();