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
        console.log ('create task')
    }

    return {
        showModal: showModal,
    }

})();