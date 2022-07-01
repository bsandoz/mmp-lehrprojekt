<script>
import { useUserStore } from '@/store/UserStore.js'
import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: "Profile",
  components: {

  },
  data() {
    return {
      userName: null,
      userMail: null,

      completedModules: [],
      completionBooleanArray: [],
      moduleScores: [],
    }
  },
  computed: {
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['userIsLoggedIn']),
    ...mapState(useUserStore, ['completedModulesArray']),

    ...mapState(useModuleStore, ['allModules']),
  },
  methods: {
    ...mapActions(useUserStore, ['setCompletedModulesArray']),

    setModuleScores() {
      this.moduleScores = [];

      this.moduleScores.push(this.userData.module1Score);
      this.moduleScores.push(this.userData.module2Score);
      this.moduleScores.push(this.userData.module3Score);

      console.log(this.moduleScores);
    },
  },
  mounted() {
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
      this.setCompletedModulesArray();

      //Compare module IDs with IDs of completed modules saved in userStore
      //console.log("User data: " + this.userData);
      //console.log("allModules Array: " + this.allModules);
      console.log("completedModulesArray: " + this.completedModulesArray);
      for (var i = 0; i < this.completedModulesArray.length; i++) {
         if (this.completedModulesArray[i]) {
           this.completedModules.push(this.allModules[i].title);
           console.log(this.completedModulesArray);
           console.log(this.completedModules);
         }
      }
      this.setModuleScores();
    }
  },
}
</script>

<template>
  <div class="profile" v-if="userIsLoggedIn">
    <div class="welcome">
      <h2 id="welcome-title">Willkommen, {{ userName }}!</h2>
      <p id="welcome-text">Dies ist deine Profilseite. Hier findest du alle deine abgeschlossenen Kapitel, die erreichten Punktzahlen sowie Infos zu deinem Nutzerprofil.</p>
    </div>
    <div class="module-progress">
      <p v-if="this.completedModules[0] === true">Du hast folgende Kapitel abgeschlossen:</p>
      <div v-for="item in this.completedModules" :key="item.id">
        <div class="module-box">
          <p v-html="item"></p>
        </div>
      </div>
      <p v-if="this.completedModulesArray[0] === false">Du hast noch keine Kapitel abgeschlossen. Wie wäre es, gleich mit Kapitel 1 zu beginnen?</p>
      <div class="module-points">
        <p v-if="this.userData.module1Score">Punktzahl Modul 1: {{ this.userData.module1Score }}</p>
        <p v-if="this.userData.module2Score">Punktzahl Modul 2: {{ this.userData.module2Score }}</p>
        <p v-if="this.userData.module3Score">Punktzahl Modul 3: {{ this.userData.module3Score }}</p>
      </div>
    </div>
    <div class="user-infos">
      <h3>Deine Profilinfos:</h3>
      <p><b>Nutzername: </b>{{ this.userName }}</p>
      <p><b>E-Mail Adresse: </b>{{ this.userMail }}</p>
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
    grid-template-columns: 2fr 1fr;
    grid-template-rows: 1fr 3fr;
    background-color: var(--main-bg-color);
    border-radius: 10px;

  }
  .welcome {
    margin-bottom: 40px;
  }
  .module-box {
    border-style: solid;
    border-radius: 5px;
    padding: 15px;
    min-height: 100px;
    max-width: 500px;
    margin-bottom: 10px;
    margin-right: 10px;
    background-color: var(--confirm-color);
  }
  .module-progress {
    grid-column-start: 1;
  }
  .user-infos {
    background-color: var(--main-accent-color);
    border-style: solid;
    border-radius: 5px;
    max-width: 750px;
    padding: 15px;
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
</style>
