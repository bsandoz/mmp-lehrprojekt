<template>
  <div class="header">
    <div class="header-left">
      <h2>Platzhalter Logo</h2>
      <router-link class="home-link" to="/">Versuch Gamifiziertes Lernen - Datenvisualisierungen</router-link>
    </div>
    <div class="header-right">
      <button type="button" class="btn" name="button-register" v-if="!userIsLoggedIn" @click="showModalRegister = true">Registrieren</button>
      <button type="button" class="btn" name="button-login" v-if="!userIsLoggedIn" @click="showModalLogin = true">Login</button>
      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <ModalLogin :show="showModalLogin" @close="showModalLogin = false">
          <template #header>
            <h3>Login</h3>
          </template>
        </ModalLogin>
      </Teleport>
      <Teleport to="body">
        <!-- use the modal component, pass in the prop -->
        <ModalRegister :show="showModalRegister" @close="showModalRegister = false">
          <template #header>
            <h3>Registrierung</h3>
          </template>
        </ModalRegister>
      </Teleport>
      <span v-if="userIsLoggedIn">Willkommen, User!</span>
      <button type="button" name="button-logout" v-if="userIsLoggedIn" @click="logInOut()">Logout</button>
    </div>
  </div>
</template>

<script>
import ModalLogin from './modals/ModalLogin.vue'
import ModalRegister from './modals/ModalRegister.vue'

import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  components: {
    ModalLogin,
    ModalRegister,
  },
  data() {
    return {
      showModalLogin: false,
      showModalRegister: false,
    }
  },
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
  align-items: center;
  justify-content: space-between;
  background-color: orange;
  min-height: 100px;
}
.header-left {
  margin-left: 25px;
}
.header-right {
  margin-right: 25px;
  align-self: center;
  justify-content: flex-end;
}
.home-link {
  font-size: 20pt;
  text-decoration: none;
  color: black;
}
</style>
