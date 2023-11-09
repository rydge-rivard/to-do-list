import { storMod } from "./storage";

export { projectMod };

const projectMod = (function () {
  const projects = [];

  function createProject(title, taskList) {
    return { title, taskList };
  }

  function createFromBtn(title, projectsArr) {
    projectsArr.push(createProject(title, []));
  }

  function removeObjTask(projectTaskList, taskId) {
    projectTaskList.forEach((task) => {
      task.id === taskId
        ? projectTaskList.splice(projectTaskList.indexOf(task), 1)
        : false;
    });
  }

  return {
    createProject: createProject,
    createFromBtn,
    createFromBtn,
    removeObjTask: removeObjTask,
    projects,
  };
})();
