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
    }
  },
  computed: {
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['userIsLoggedIn']),
    ...mapState(useUserStore, ['completedModulesArray']),

    ...mapState(useUserStore, ['module1Score']),
    ...mapState(useUserStore, ['module2Score']),
    ...mapState(useUserStore, ['module3Score']),

    ...mapState(useModuleStore, ['allModules']),
  },
  methods: {
    ...mapActions(useUserStore, ['setCompletedModulesArray']),
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
    }
  },
}
</script>

<template>
  <div class="profile" v-if="userIsLoggedIn">
    <div class="welcome">
      <h2>Willkommen, {{ userName }}!</h2>
    </div>
    <div class="module-progress">
      <p>Du hast folgende Module abgeschlossen:</p>
      <p>{{ this.completedModules }}</p>
      <div class="module-points">
        <p v-if="this.userData.module1Score">Punktzahl Modul 1: {{ this.userData.module1Score }}</p>
        <p v-if="this.userData.module2Score">Punktzahl Modul 2: {{ this.userData.module2Score }}</p>
        <p v-if="this.userData.module3Score">Punktzahl Modul 3: {{ this.userData.module3Score }}</p>
      </div>
    </div>
    <div class="user-infos">
      <h3>Deine Profilinfos:</h3>
      <p>Nutzername: {{ this.userName }}</p>
      <p>E-Mail Adresse: {{ this.userMail }}</p>
    </div>
  </div>
  <div v-if="!userIsLoggedIn">
    <h2>Bitte logge dich ein, um auf diese Seite zugreifen zu können.</h2>
  </div>
</template>

<style lang="css" scoped>
</style>
