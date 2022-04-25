import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  //state
  state: () => {
    return {
      userIsLoggedIn: false,
      userData: null,
      userTest: "Test 2",
    };
  },
  //actions

  //getters

});
