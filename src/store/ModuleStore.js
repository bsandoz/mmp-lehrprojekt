import { defineStore } from "pinia";

export const useModuleStore = defineStore("ModuleStore", {
  //state
  state: () => {
    return {
      allModules: null,
      activeModule: {
        id: null,
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
      this.activeModule = this.allModules[clickedModule.id];
      console.log(this.activeModule);
    },
  },
  //getters

});
