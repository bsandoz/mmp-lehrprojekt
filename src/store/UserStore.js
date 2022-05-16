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
      testUserScoreMemory: null,
      testUserScoreHangman: null,
      testUserStartTime: null,
      testUserEndTime: null,

      testQuestion1: null,
      testQuestion2: null,
      testQuestion3: null,
      testQuestion4: null,
      testQuestion5: null,
      testQuestion6: null,
      testQuestion7: null,
      testQuestion8: null,
      testQuestion9: null,
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
      setTestUserScoreMemory(sc) {
        this.testUserScoreMemory = sc;
      },
      setTestUserScoreHangman(sc) {
        this.testUserScoreHangman = sc;
      },
      setTestUserStartTime(t) {
        this.testUserStartTime = t;
      },
      setTestUserEndTime(t) {
        this.testUserEndTime = t;
      },
      setTestQuestion1(a) {
        this.testQuestion1 = a;
      },
      setTestQuestion2(a) {
        this.testQuestion2 = a;
      },
      setTestQuestion3(a) {
        this.testQuestion3 = a;
      },
      setTestQuestion4(a) {
        this.testQuestion4 = a;
      },
      setTestQuestion5(a) {
        this.testQuestion5 = a;
      },
      setTestQuestion6(a) {
        this.testQuestion6 = a;
      },
      setTestQuestion7(a) {
        this.testQuestion7 = a;
      },
      setTestQuestion8(a) {
        this.testQuestion8 = a;
      },
      setTestQuestion9(a) {
        this.testQuestion9 = a;
      },
    }

  //getters

});
