<script>
import { useUserStore } from '@/store/UserStore.js'
import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

import Leaderboard from '../components/modals/Leaderboard.vue'

export default {
  name: "Profile",
  components: {
    Leaderboard,
  },
  data() {
    return {
      userName: null,
      userMail: null,

      completedModules: [],
      completedChallenges: [],
      completionBooleanArray: [],
      moduleScores: [],
      challengeScores: [],

      progressBars: [],
      challengeProgressBars: [],

      moduleUrl: "/module/",
      challengeUrl: "/challenge/",
    }
  },
  computed: {
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['userIsLoggedIn']),
    ...mapState(useUserStore, ['completedModulesArray']),
    ...mapState(useUserStore, ['completedChallengesArray']),

    ...mapState(useModuleStore, ['allModules']),
    ...mapState(useModuleStore, ['allChallenges']),

    cssVars() {
      return {
        '--progress1': this.progressBars[0],
        '--progress2': this.progressBars[1],
        '--progress3': this.progressBars[2],
      }
    },
    cssVarsChallenges() {
      return {
        '--challenge-progress1': this.challengeProgressBars[0],
      }
    }
  },
  methods: {
    ...mapActions(useUserStore, ['setCompletedModulesArray']),
    ...mapActions(useUserStore, ['setCompletedChallengesArray']),
    ...mapActions(useModuleStore, ['setActiveModule']),
    ...mapActions(useModuleStore, ['setActiveChallenge']),

    setModuleScores() {
      this.moduleScores = [];

      this.moduleScores.push(this.userData.module1Score);
      this.moduleScores.push(this.userData.module2Score);
      this.moduleScores.push(this.userData.module3Score);

      console.log(this.moduleScores);
    },

    setChallengeScores() {
      this.challengeScores = [];

      this.challengeScores.push(this.userData.challenge1Score);

      console.log(this.challengeScores);
    },

    calculateProgressBar(score, maxScore) {
      let percentScore = score * 100 / maxScore;
      //console.log(percentScore);
      return percentScore;
    },

    showLeaderboard(id) {
      this.$refs.leaderboard.showLeaderboard(id);
    },

    showChallengeLeaderboard(id) {
      console.log(id);
      this.$refs.leaderboard.showChallengeLeaderboard(id);
    },

    gotoModule(id, item) {
      const path = this.moduleUrl + id;
      this.setActiveModule(item);

      this.$router.push(path);
    },

    gotoChallenge(id, item) {
      const path = this.challengeUrl + id;
      this.setActiveChallenge(item);

      this.$router.push(path);
    },

    updateModulesAndChallenges() {
      this.setCompletedModulesArray();
      this.setCompletedChallengesArray();
      //Compare module IDs with IDs of completed modules saved in userStore
      //console.log("User data: " + this.userData);
      //console.log("allModules Array: " + this.allModules);

      this.setModuleScores();
      this.setChallengeScores();

      console.log("completedModulesArray: " + this.completedModulesArray);
      for (var i = 0; i < this.completedModulesArray.length; i++) {
         if (this.completedModulesArray[i]) {
           this.allModules[i].score = this.moduleScores[i] + " von " + this.allModules[i].maxScore;
           this.progressBars.push(this.calculateProgressBar(this.moduleScores[i], this.allModules[i].maxScore) + "%");
           //console.log(this.progressBars);
           this.completedModules.push(this.allModules[i]);
           //console.log(this.completedModulesArray);
           //console.log(this.completedModules);
           //console.log(this.allModules);
         }
      }
      //console.log("completedChallengesArray: " + this.completedChallengesArray);
      for (var i = 0; i < this.completedChallengesArray.length; i++) {
         if (this.completedChallengesArray[i]) {
           this.allChallenges[i].score = this.challengeScores[i] + " von " + this.allChallenges[i].maxScore;
           this.challengeProgressBars.push(this.calculateProgressBar(this.challengeScores[i], this.allChallenges[i].maxScore) + "%");
           //console.log(this.challengeProgressBars);
           this.completedChallenges.push(this.allChallenges[i]);
           //console.log(this.completedChallengesArray);
           //console.log(this.completedChallenges);
           //console.log(this.allChallenges);
         }
      }
    },

  },
  created() {
    console.log("created() hook in Profile executed");
    if (!this.userData) {
      //this.$router.push({ name: 'Home' });
    } else {
      this.userName = this.userData.username;
      this.userMail = this.userData.email;
      console.log(this.userName);

      /*
      //clear array before filling it
      this.completionBooleanArray = [];

      this.completionBooleanArray.push(this.userData.module1Completed);
      this.completionBooleanArray.push(this.userData.module2Completed);
      this.completionBooleanArray.push(this.userData.module3Completed);
      */

      this.updateModulesAndChallenges();
    }
  },
  /*
  updated() {
    this.setCompletedModulesArray();
    this.setModuleScores();
    console.log("completedModulesArray: " + this.completedModulesArray);
    for (var i = 0; i < this.completedModulesArray.length; i++) {
       if (this.completedModulesArray[i]) {
         this.allModules[i].score = this.moduleScores[i] + " von " + this.allModules[i].maxScore;
         this.progressBars.push(this.calculateProgressBar(this.moduleScores[i], this.allModules[i].maxScore) + "%");
         console.log(this.progressBars);
         this.completedModules.push(this.allModules[i]);
         console.log(this.completedModulesArray);
         console.log(this.completedModules);
       }
    }
  }*/
}
</script>

<template>
  <Leaderboard ref="leaderboard" />
  <div class="profile" v-if="userIsLoggedIn">
    <div class="welcome">
      <h2 id="welcome-title">Willkommen, {{ userName }}!</h2>
      <p class="nomargin" id="welcome-text">Dies ist deine Profilseite. Hier findest du deinen Fortschritt, die erreichten Punktzahlen sowie Infos zu deinem Nutzerprofil.</p>
    </div>
    <div class="module-progress">
      <p id="completed-modules-title" class="nomargin" v-if="this.completedModules[0]">Dein Fortschritt:</p>
      <div class="module-container" v-for="(item, index) in this.allModules" :key="item.id">
        <div>
          <div class="module-box" :class="{completed: item.isCompleted}">
            <p class="bold nomargin" v-html="item.title"></p>
            <div  v-if="item.isCompleted">
              <p class="nomargin">Erreichte Punktzahl:</p>
              <p class="bold nomargin" v-html="item.score"></p>
              <div class="progress-bar-outline">
                <div :id="'progress-bar-' + (index+1)" :style="cssVars"></div>
              </div>
            </div>
            <div id="buttons">
              <button class="btn" id="show-leaderboard-btn" @click="showLeaderboard(index + 1)">Rangliste anzeigen</button>
              <button class="btn" id="goto-module-btn" @click="gotoModule(item.id, item)">Zum Kapitel</button>
            </div>
          </div>
        </div>
      </div>
      <p v-if="this.completedModulesArray[0] === false">Du hast noch keine Kapitel abgeschlossen. Wie wäre es, gleich mit Kapitel 1 zu beginnen?</p>
      <!--
      <div class="module-points">
        <p v-if="this.userData.module1Score">Punktzahl Modul 1: {{ this.userData.module1Score }}</p>
        <p v-if="this.userData.module2Score">Punktzahl Modul 2: {{ this.userData.module2Score }}</p>
        <p v-if="this.userData.module3Score">Punktzahl Modul 3: {{ this.userData.module3Score }}</p>
      </div>
    -->
    </div>
    <div class="challenge-progress">
      <p id="completed-modules-title" class="nomargin" v-if="this.completedChallenges[0]">Deine abgeschlossenen Challenges:</p>
      <p v-if="this.completedChallengesArray[0] === false">Du hast noch keine Challenges abgeschlossen.</p>
      <div class="challenge-container" v-for="(item, index) in this.allChallenges" :key="item.id">
        <div>
          <div class="challenge-box" :class="{completed: item.isCompleted}">
            <p class="bold nomargin" v-html="item.title"></p>
            <div  v-if="item.isCompleted">
              <p class="nomargin">Erreichte Punktzahl:</p>
              <p class="bold nomargin" v-html="item.score"></p>
              <div class="progress-bar-outline">
                <div :id="'challenge-progress-bar-' + (index+1)" :style="cssVarsChallenges"></div>
              </div>
            </div>
            <div id="buttons">
              <button class="btn" id="show-leaderboard-btn" @click="showChallengeLeaderboard(index + 1)">Rangliste anzeigen</button>
              <button class="btn" id="goto-challenge-btn" @click="gotoChallenge(item.id, item)">Zur Challenge</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="user-infos">
      <h3>Deine Profilinfos:</h3>
      <p class="nomargin"><b>Nutzername: </b>{{ this.userName }}</p>
      <p class="nomargin"><b>E-Mail Adresse: </b>{{ this.userMail }}</p>
    </div>
  </div>
  <div v-if="!userIsLoggedIn">
    <h2>Bitte logge dich ein, um auf diese Seite zugreifen zu können.</h2>
  </div>
</template>

<style lang="css" scoped>
  .profile {
    padding-left: 50px;
    padding-right: 50px;
    padding-top: 25px;
    padding-bottom: 100px;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 50px;
    margin-bottom: 100px;
    min-width: 750px;
    max-width: 1200px;
    display: grid;
    grid-template-columns: 1.8fr 1fr;
    grid-template-rows: 1fr 3fr;
    background-color: var(--main-bg-color);
    border-radius: 10px;

  }
  .welcome {
    margin-bottom: 40px;
    margin-right: 75px;
  }
  .module-container {
    max-width: 600px;
    margin-right: 300px;
  }
  .challenge-container {
    max-width: 600px;
  }
  .module-box {
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-radius: 5px;
    border-color: grey;
    color: grey;
    padding: 15px;
    min-height: 150px;
    min-width: 300px;
    max-width: 500px;
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: var(--main-bg-color);
  }
  .challenge-box {
    display: flex;
    flex-direction: column;
    border-style: solid;
    border-radius: 5px;
    border-color: grey;
    color: grey;
    padding: 15px;
    min-height: 150px;
    min-width: 300px;
    max-width: 500px;
    margin-bottom: 10px;
    margin-left: 10px;
    background-color: var(--main-bg-color);
  }
  .completed {
    background-color: var(--main-accent-color);
    border-color: var(--main-dark-color);
    color: var(--main-dark-color);
  }
  .module-progress {
    grid-column-start: 1;
  }
  .challenge-progress {
    grid-column-start: 2;
  }
  .user-infos {
    background-color: var(--main-accent-color);
    border-style: solid;
    border-radius: 5px;
    max-width: 750px;
    padding: 15px;
    grid-row-start: 1;
    grid-column-start: 2;
    align-self: start;
  }
  #welcome-title {
    grid-column-start: 1;
    grid-row-start: 1;
  }
  #welcome-text {
    grid-column-start: 1;
    grid-row-start: 1;
  }
  #completed-modules-title {
    font-size: 14pt;
    margin-bottom: 15px;
  }
  .progress-bar-outline {
    height: 22px;
    width: 100%;
    background-color: var(--main-bg-color);
    border-style: solid;
    border-width: thin;
    border-radius: 2px;
    margin-bottom: 15px;
  }
  #progress-bar-1 {
    height: 20px;
    width: var(--progress1);

    background-color: var(--confirm-color);
  }
  #progress-bar-2 {
    height: 20px;
    width: var(--progress2);

    background-color: var(--confirm-color);
  }
  #progress-bar-3 {
    height: 20px;
    width: var(--progress3);

    background-color: var(--confirm-color);
  }
  #challenge-progress-bar-1 {
    height: 20px;
    width: var(--challenge-progress1);

    background-color: var(--confirm-color);
  }
  #buttons {
    display: flex;
    flex-direction: row;
    align-items: baseline;
    justify-content: space-evenly;

    margin-top: auto;
  }
  #show-leaderboard-btn {
    background-color: var(--main-dark-color);
    color: var(--dark-bg-text-color);
  }
  #show-leaderboard-btn:hover {
    box-shadow: 3px 6px #000000;
  }
  #goto-module-btn {
    background-color: var(--main-dark-color);
    color: var(--dark-bg-text-color);
  }
  #goto-challenge-btn {
    background-color: var(--main-dark-color);
    color: var(--dark-bg-text-color);
  }
  #goto-module-btn:hover {
    box-shadow: 3px 6px #000000;
  }
  #goto-challenge-btn:hover {
    box-shadow: 3px 6px #000000;
  }
</style>
