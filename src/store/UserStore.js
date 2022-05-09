import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  //state
  state: () => {
    return {
      userIsLoggedIn: false,
      userData: null,

      //Data for test
      testUserId: null,
      testUserAge: null,
      testUserGender: null,
      testUserPreviousKnowledge: null,
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
        } catch (error) {
          console.log(error);
        }
      },
      setTestUserId(id) {
        this.testUserId = id;
      },
      setTestUserAge(a) {
        this.testUserAge = a;
        console.log(this.testUserAge);
      },
      setTestUserGender(g) {
        this.testUserGender = g;
      },
      setTestUserPreviousKnowledge(pk) {
        this.testUserPreviousKnowledge = pk;
      },
    }

  //getters

});
