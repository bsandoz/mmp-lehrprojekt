import { defineStore } from "pinia";

export const useUserStore = defineStore("UserStore", {
  //state
  state: () => {
    return {
      userIsLoggedIn: false,
      userData: null,
      completedModulesArray: [],

      apiToken: "C0l2X9yCEevB2a1ibOWT8YWbJ34HE3c8",

      activeLeaderboard: null,

      userDataForLeaderboard: [],
      userDataForLeaderboard2: [],
      userDataForLeaderboard3: [],

      //Module user data
      //module1Completed: null,
      //module1Score: null,
      //module2Completed: null,
      //module2Score: null,
      //module3Completed: null,
      //module3Score: null,

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
      this.userData = null;
      this.completedModulesArray = [];
      this.module1Score = null;
      this.module2Score = null;
      this.module3Score = null;
      this.userIsLoggedIn = false;
    },
    async getAllUsersData(api) {
      const headers = { "Authorization": `Bearer ${this.apiToken}` };
      try {
        await console.log("Called getAllUsersData from UserStore.js");
        await axios
          .get (api, { headers })
          .then (response => (this.userData = response.data.data))
          .catch (function(error) {
            console.log(error);
          })
          } catch (error) {
            console.log(error);
          }
        },
    setUserData(data) {
      this.userData = data;
      console.log(this.userData);
    },
    setCompletedModulesArray() {
        //clear array before filling
        this.completedModulesArray = [];

        this.completedModulesArray.push(this.userData.module1Completed);
        this.completedModulesArray.push(this.userData.module2Completed);
        this.completedModulesArray.push(this.userData.module3Completed);
    },

    setModule1Score(score) {
      this.module1Score = score;
    },

    setModule2Score(score) {
      this.module2Score = score;
      console.log(this.module2Score);
    },

    setModule3Score(score) {
      this.module3Score = score;
    },

    async getUsersDataForLeaderboard(api, id) {
      this.userDataForLeaderboard = [];
      this.userDataForLeaderboard2 = [];
      this.userDataForLeaderboard3 = [];

      let usersData = [];

      console.log(id);
      this.activeLeaderboard = id;

      const headers = { "Authorization": `Bearer ${this.apiToken}` };
      try {
        await console.log("Called getUsersDataForLeaderboard from UserStore.js");
        await axios
          .get (api, { headers })
          .then (response => (usersData = response.data.data))
          .catch (function(error) {
            console.log(error);
          })
          } catch (error) {
            console.log(error);
          }

      if (id === 1) {
        for (var i = 0; i < usersData.length; i++) {
          if (usersData[i].module1Completed) {
            await this.userDataForLeaderboard.push(usersData[i]);
            await console.log("Module 1 Leaderboard: " + this.userDataForLeaderboard);
            //Sort by descending score
            await this.userDataForLeaderboard.sort((a, b) => b.module1Score - a.module1Score);
          }
        }
      } else if (id === 2) {
        for (var i = 0; i < usersData.length; i++) {
          if (usersData[i].module2Completed) {
            await this.userDataForLeaderboard.push(usersData[i]);
            await console.log("Module 2 Leaderboard: " + this.userDataForLeaderboard);
            //Sort by descending score
            await this.userDataForLeaderboard.sort((a, b) => b.module2Score - a.module2Score);
          }
        }
      } else if (id === 3) {
        for (var i = 0; i < usersData.length; i++) {
          if (usersData[i].module3Completed) {
            await this.userDataForLeaderboard.push(usersData[i]);
            await console.log("Module 3 Leaderboard: " + this.userDataForLeaderboard);
            //Sort by descending score
            await this.userDataForLeaderboard.sort((a, b) => b.module3Score - a.module3Score);
          }
        }
      }

      /*

      for (var i = 0; i < usersData.length; i++) {
        if (usersData[i].module1Completed) {
          await this.userDataForLeaderboard1.push(usersData[i]);
          await console.log("Module 1 Leaderboard: " + this.userDataForLeaderboard1);
        } if (usersData[i].module2Completed) {
          await this.userDataForLeaderboard2.push(usersData[i]);
          await console.log("Module 2 Leaderboard: " + this.userDataForLeaderboard2);
        } if (usersData[i].module3Completed) {
          await this.userDataForLeaderboard3.push(usersData[i]);
          await console.log("Module 3 Leaderboard: " + this.userDataForLeaderboard3);
        } else {
          await console.log("No data found");
        }
      }

      */
    },

      //Actions for Test
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
    },

  //getters

  //persist option
  persist: true,
});
