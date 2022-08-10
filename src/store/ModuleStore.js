import { defineStore } from "pinia";

export const useModuleStore = defineStore("ModuleStore", {
  //state
  state: () => {
    return {
      allModules: null,
      allChallenges: null,
      activeModule: {
        id: Number,
        title: '',
      },
      activeChallenge: {
        id: Number,
        title: '',
      },

      apiToken: import.meta.env.VITE_API_KEY,
    }
  },
  //actions
  actions: {
    async getAllModules(api) {
      const headers = { "Authorization": `Bearer ${this.apiToken}` };
      try {
        await console.log("Called getAllModules from ModuleStore.js");
        await axios
          .get (api, { headers })
          .then (response => (this.allModules = response.data.data))
          .catch (function(error) {
            console.log(error);
          })
        //await console.log(this.allModules);
      } catch (error) {
        console.log(error);
      }
    },
    async getAllChallenges(api) {
      const headers = { "Authorization": `Bearer ${this.apiToken}` };
      try {
        await console.log("Called getAllChallenges from ModuleStore.js");
        await axios
          .get (api, { headers })
          .then (response => (this.allChallenges = response.data.data))
          .catch (function(error) {
            console.log(error);
          })
        //await console.log(this.allChallenges);
      } catch (error) {
        console.log(error);
      }
    },
    setActiveModule(clickedModule) {
      //Clear activeModule and activeChallenge
      this.activeModule = null;
      this.activeChallenge = null;
      console.log("Called setActiveModule from ModuleStore.js");
      this.activeModule = this.allModules[clickedModule.id - 1];
      //console.log(this.activeModule);
      //console.log("activeModule ID is " + this.activeModule.id);
      //console.log("activeModule Title is " + this.activeModule.title);
    },
    setActiveChallenge(clickedChallenge) {
      //Clear activeModule and activeChallenge
      this.activeModule = null;
      this.activeChallenge = null;
      //console.log("Called setActiveChallenge from ModuleStore.js");
      //console.log(clickedChallenge);
      //console.log(clickedChallenge.id);
      this.activeChallenge = this.allChallenges[clickedChallenge.id - 1];
      //console.log(this.activeChallenge);
      //console.log("activeChallenge ID is " + this.activeChallenge.id);
      //console.log("activeChallenge Title is " + this.activeChallenge.title);


    },
  },
  //getters

  //persist option
  persist: true,
});
