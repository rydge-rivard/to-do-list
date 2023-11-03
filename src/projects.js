export {createProject};

const createProject = (function () {

    const projects = [];
    const today = createProject('Today', ['clean', 'surf']);
    projects.push(today);
    console.log(today);
    console.log(projects);

    function createProject (title, tasks) {
        return {title, tasks}
    }
})();