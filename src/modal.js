export { modalMod };
import { useDOM } from "./dom";
import { projectMod } from "./projects";
import { taskMod } from "./tasks";
import { storMod } from "./storage";

const modalMod = (function () {
  const taskDialog = document.querySelector(".task-dialog");
  const taskInputs = taskDialog.querySelectorAll("input");
  const select = taskDialog.querySelector("#project-sel");
  const taskDescr = taskDialog.querySelector("#descr");
  const taskPrio = taskDialog.querySelector("#priority");

  const projDialog = document.querySelector(".proj-dialog");
  const projInputs = projDialog.querySelector("input");

  const allInputs = document.querySelectorAll("input");

  function showTaskModal() {
    taskDialog.showModal();
  }

  function showProjModal() {
    projDialog.showModal();
  }

  function createProjectOptions() {
    removeProjOptions();
    let i = 0;
    projectMod.projects.forEach((project) => {
      const option = useDOM.createTextElement("option", project.title);
      useDOM.addToHTML(option, select);
      i += 1;
    });
  }

  function removeProjOptions() {
    const projOptions = select.querySelectorAll("option");
    projOptions.forEach((option) => option.remove());
  }

  function confirmTask(event, parent) {
    event.preventDefault();
    const project = findSelectedProj();
    taskMod.addToProject(
      project.taskList,
      createTask(taskInputs, project),
      project,
      parent
    );
    closeModal(taskDialog);
    storMod.storeProj(projectMod.projects);
  }

  function getSelectedProj() {
    return taskDialog.querySelector("#project-sel").value;
  }

  function findSelectedProj() {
    const selectedProj = getSelectedProj();
    for (let i = 0; i < projectMod.projects.length; i++) {
      if (projectMod.projects[i].title === selectedProj) {
        return projectMod.projects[i];
      }
    }
  }

  function sortInputs(inputArr) {
    const objArr = [];
    inputArr.forEach((input) => objArr.push(input.value));
    return objArr;
  }

  function createTask(inputArr, project) {
    const inputValues = sortInputs(inputArr);
    addModalNonInputs(inputValues);
    const newTask = taskMod.createTask(
      inputValues[0],
      inputValues[2],
      inputValues[1],
      inputValues[3],
      `${inputValues[0]}-id#${project.taskList.length}`
    );
    return newTask;
  }

  function addModalNonInputs(valueArr) {
    valueArr.push(taskDescr.value);
    valueArr.push(taskPrio.value);
  }

  function closeModal(modal) {
    allInputs.forEach((input) => (input.value = ""));
    modal.close();
  }

  function confirmProj(event, projContainer, displayContainer) {
    event.preventDefault();
    projectMod.createFromBtn(projInputs.value, projectMod.projects);
    useDOM.deleteSidebar();
    useDOM.renderSidebar(
      projectMod.projects,
      projContainer,
      "div",
      displayContainer
    );
    closeModal(projDialog);
    createProjectOptions(projectMod.projects);
    storMod.storeProj(projectMod.projects);
  }

  return {
    showTaskModal: showTaskModal,
    showProjModal: showProjModal,
    confirmTask: confirmTask,
    createProjectOptions: createProjectOptions,
    confirmProj,
    confirmProj,
  };
})();
