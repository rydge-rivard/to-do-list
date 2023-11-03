export {modalMod}

const modalMod = (function () {

    const dialog = document.querySelector('dialog')

    function showModal () {
        console.log('click')
        dialog.showModal();
    }

    return {
        showModal: showModal,
    }

})();