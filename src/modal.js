export {modalMod}
import {useDOM} from "./dom";

const modalMod = (function () {

    const dialog = document.querySelector('dialog')
    const confirmBtn = dialog.querySelector("#confirmBtn");

    useDOM.bindEvents (confirmBtn, 'click', (event) => confirmTask (event));

    function showModal () {
        console.log('click')
        dialog.showModal();
    }

    function confirmTask (event) {
        event.preventDefault();
        loopInputs (getInputs());
        console.log ('create task function')
    }

    function getInputs () {
        const inputs = dialog.querySelectorAll('input')
        return inputs;
    }

    function loopInputs (inputArr) {
        inputArr.forEach(input => {
            console.log (input.value)
        });
    }

    return {
        //return an object to push to array in index
        showModal: showModal,
    }

})();