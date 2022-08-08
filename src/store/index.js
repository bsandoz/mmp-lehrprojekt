import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', {
  state: () => {
    return {
      // all these properties will have their type inferred automatically (src: pinia doc)

      //Modules stuff
      allModules: null,
      allChallenges: null,
      activeModule: 1,
    }
  },
  getters: {
    double: state => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
