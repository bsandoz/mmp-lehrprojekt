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
      console.log(this.allModules);
      for (var i = 0; i < this.completedModulesArray.length; i++) {
         if (this.completedModulesArray[i]) {
           this.completedModules.push(this.allModules[i].title);
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
