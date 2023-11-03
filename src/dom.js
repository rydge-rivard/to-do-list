export {manipulateDOM} 

const manipulateDOM = (function () {
    function createTextElement (element, text) {
        const newElement = document.createElement(element);
        newElement.textContent = text;
        return newElement;
    }

    function addToHTML (element, parent) {
        parent.appendChild(element);
    }

    function createContainer (cssClass, element) {
        const container = document.createElement(element);
        container.classList.add(cssClass);
        return container;
    };

    function appendProj (obj, location, element) {
        const newElement = createTextElement (element, obj.title)
        addToHTML (newElement, location);
        return newElement;
    }

    function appendAllTasks (taskArr, location) {
        taskArr.forEach(task => {
            const element = appendProj (task, location, 'div');
            bindEvents (element, 'click', () => createActiveCont (task, element));
        });
    }

    // function appendTask (task, location) {
    //     appendProj (task.title, location, 'div');
    // }

    function bindEvents (element, event, action) {
        element.addEventListener(event, action);
    }

    function createActiveCont (obj, location) {
        manipulateDOM.addToHTML (manipulateDOM.createContainer ('active', 'div'), location);
        return obj;
    }

    return {
        createTextElement: createTextElement,
        addToHTML: addToHTML,
        createContainer, createContainer,
        appendProj: appendProj,
        appendAllTasks: appendAllTasks,
    }

})();