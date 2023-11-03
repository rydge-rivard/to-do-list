export {taskMod};

const taskMod = (function () {

    function createTask (title, description, dueDate, priority) {
        return {title, description, dueDate, priority}
    }

    function assignTask (taskObj, taskArr) {
        taskArr.push(taskObj);
    }

    return {
        createTask: createTask,
        assignTask: assignTask,
    }

})();