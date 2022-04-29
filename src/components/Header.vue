<template>
  <div class="header">
    <div class="header-left">
      <h2>Platzhalter Logo</h2>
      <h1>EasyMusicTheory</h1>
    </div>
    <div class="header-right">
      <button type="button" name="button-login" v-if="!userIsLoggedIn" @click="logInOut()">Login</button>
      <span v-if="userIsLoggedIn">Willkommen, User!</span>
      <button type="button" name="button-logout" v-if="userIsLoggedIn" @click="logInOut()">Logout</button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(useUserStore, ['userIsLoggedIn']),
  },
  methods: {
    ...mapActions(useUserStore, ['userLogIn']),
    ...mapActions(useUserStore, ['userLogOut']),
    logInOut() {
      if (this.userIsLoggedIn) {
        //logout
        console.log("Logging out");
        this.userLogOut();
      } else {
        //login
        console.log("Logging in");
        this.userLogIn();
      }
    },
  },
}
</script>

<style scoped>
.header {
  display: flex;
  background-color: orange;
  margin-bottom: 50px;
  min-height: 100px;
}
</style>
