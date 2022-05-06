import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  //state
  state: () => {
    return {
      userIsLoggedIn: false,
      userData: null,
    };
  },
  //actions
  actions: {
    userLogIn() {
      this.userIsLoggedIn = true;
    },
    userLogOut() {
      this.userIsLoggedIn = false;
    },
    async getAllUsersData(api) {
      try {
        await console.log("Called getAllUsersData from UserStore.js");
        await axios
          .get (api)
          .then (response => (this.userData = response.data.data))
          .catch (function(error) {
            console.log(error);
          })
        await console.log(this.userData);
        } catch (error) {
          console.log(error);
        }
      },
    }

  //getters

});
