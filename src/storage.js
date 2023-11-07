export {storMod};
import {projectMod} from "./projects";

const storMod = (function () {

    function storeProj (projectsArr) {
        localStorage.setItem("projects", JSON.stringify (projectsArr));
        console.log ('Remove from local storage.')
        console.log (JSON.parse(localStorage.getItem("projects")));
        setProjArr ();
    }

    function checkStorage (projectsArr) {
        if (!localStorage.getItem ("projects")) {
            console.log ('no storage')
            storeProj (projectsArr);
          } else {
            setProjArr ();
          }
    }

    function setProjArr () {
        projectMod.projects = JSON.parse(localStorage.getItem("projects"));
        console.log (projectMod.projects);
    }

    return {
        storeProj: storeProj,
        setProjArr: setProjArr,
        checkStorage: checkStorage,
    }

})();