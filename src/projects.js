export {projectMod};

const projectMod = (function () {

    const projects = [];

    function createProject (title, tasks) {
        return {title, tasks}
    }

    return {
        createProject: createProject,
    }
})();