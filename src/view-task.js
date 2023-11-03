import {manipulateDOM} from './dom.js'
export {viewTask}

const viewTask = (function () {
    function populateFields (obj, parent) {
        for (const key in obj) {
            const field = `${key}: ${obj[key]}`;
            manipulateDOM.addToHTML (manipulateDOM.createTextElement ('div', field),
            parent);
        }
    }

    return {
        populateFields: populateFields,
    }
})();