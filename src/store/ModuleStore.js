import { defineStore } from "pinia";

export const useModuleStore = defineStore("ModuleStore", {
  //state
  state: () => {
    return {
      allModules: null,
      activeModule: {
        id: Number,
        title: '',
      }
    };
  },
  //actions
  actions: {
    async getAllModules(api) {
      try {
        await console.log("Called getAllModules from ModuleStore.js");
        await axios
          .get (api)
          .then (response => (this.allModules = response.data.data))
          .catch (function(error) {
            console.log(error);
          })
        await console.log(this.allModules);
      } catch (error) {
        console.log(error);
      }
    },
    setActiveModule(clickedModule) {
      console.log("Called setActiveModule from ModuleStore.js");
      //Subtract 1 from id to correctly correspond to array id (database IDs start with 1, array with 0)
      clickedModule.id -= 1;
      this.activeModule = this.allModules[clickedModule.id];
      console.log(this.activeModule);
      console.log("activeModule ID is " + this.activeModule.id);
      console.log("activeModule Title is " + this.activeModule.title);
    },
  },
  //getters

});
