export {storMod};
import {projectMod} from "./projects";

const storMod = (function () {

    function storeProj (projectsArr) {
        localStorage.setItem("projects", JSON.stringify (projectsArr));
        console.log ('Remove from local storage.')
        console.log (JSON.parse(localStorage.getItem("projects")));
    }

    return {
        storeProj: storeProj,
    }

})();