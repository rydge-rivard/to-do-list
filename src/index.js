import {manipulateDOM} from './dom.js'

const loadPage = (function () {
    const htmlContent = document.querySelector('#content')

    manipulateDOM.addToHTML (manipulateDOM.createContainer ('header'), htmlContent);
    manipulateDOM.addToHTML (manipulateDOM.createContainer ('sidebar'), htmlContent);
    manipulateDOM.addToHTML (manipulateDOM.createContainer ('display'), htmlContent);

})();

