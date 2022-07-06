<template>
  <div class="header">
    <div class="header-left">
      <router-link class="home-link" to="/">
        <img class="logo" src="../assets/img/logo-v1.png" style="width:100px;height:100px;" alt="Logo">
      </router-link>
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
      <span v-if="userIsLoggedIn">Willkommen, {{ userName }}!</span>
      <!-- Temporary profile link -->
      <router-link v-if="userIsLoggedIn" :to="this.profileLink" custom v-slot="{ navigate }">
        <button class="btn" @click="navigate" @keypress.enter="navigate" role="link">Mein Profil</button>
      </router-link>
      <button class="btn" type="button" name="button-logout" v-if="userIsLoggedIn" @click="logInOut()">Logout</button>
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
      userName: null,
      userId: null,

      profileLink: String,
    }
  },
  computed: {
    ...mapState(useUserStore, ['userIsLoggedIn']),
    ...mapState(useUserStore, ['userData']),
  },
  methods: {
    ...mapActions(useUserStore, ['userLogIn']),
    ...mapActions(useUserStore, ['userLogOut']),

    logInOut() {
      console.log("Called logInOut");
      if (this.userIsLoggedIn) {
        //logout
        console.log("Logging out");
        this.userLogOut();
        this.$router.push({ name: 'Home' });
      } else {
        //login
        console.log("Logging in");
        this.userLogIn();
      }
    },
  },
  updated() {
    if (this.userData) {
      this.userName = this.userData.username;
    }
    this.userId = localStorage.getItem("userId");
    this.profileLink = "/profile/" + this.userId;
    console.log(this.profileLink);
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--main-bg-color);
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
  color: var(--main-text-color);
}
.logo {
  margin-top: 10px;
}
</style>
