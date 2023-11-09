export { storMod };
import { projectMod } from "./projects";

const storMod = (function () {
  function storeProj(projectsArr) {
    localStorage.setItem("projects", JSON.stringify(projectsArr));
    console.log(projectMod.projects);
  }

  function checkStorage(projectsArr) {
    if (!localStorage.getItem("projects")) {
      console.log("no existing storage");
      storeProj(projectsArr);
    } else {
      setProjArr();
    }
  }

  function setProjArr() {
    projectMod.projects = JSON.parse(localStorage.getItem("projects"));
  }

  return {
    storeProj: storeProj,
    setProjArr: setProjArr,
    checkStorage: checkStorage,
  };
})();
