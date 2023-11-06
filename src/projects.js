export {projectMod};

const projectMod = (function () {

    const projects = [];

    function createProject (title, taskList) {
        return {title, taskList}
    }

    return {
        createProject: createProject,
        projects,
    }
})();