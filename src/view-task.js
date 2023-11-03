import {manipulateDOM} from './dom.js'
export {viewTask}

const viewTask = (function () {
    function populateFields (obj) {
        for (const key in obj) {
            console.log(`${key}: ${obj[key]}`)
        }
    }

    return {
        populateFields: populateFields,
    }
})();