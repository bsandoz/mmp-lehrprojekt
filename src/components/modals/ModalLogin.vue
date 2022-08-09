<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <p class="error-message" v-if="usernameIncorrect">Dieser Benutzername existiert nicht.</p>
            <p class="error-message" v-if="passwordIncorrect">Das Passwort ist nicht korrekt.</p>
            <form id="form" @submit.prevent="login">
              <input v-model="username" type="text" id="username-input" placeholder="Benutzername">
              <input v-model="password" type="password" id="password-input" placeholder="Passwort">
              <input class="btn" type="submit" id="login-btn" value="Einloggen">
            </form>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button btn"
                id="close-btn"
                @click="$emit('close'); this.setPasswordIncorrect();"
              >Abbrechen</button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import bcrypt from 'bcryptjs'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: "ModalLogin",
  props: {
    show: Boolean
  },
  data() {
    return {
      username: "",
      password: "",

      usernameIncorrect: false,
      passwordIncorrect: false,
    }
  },
  computed: {
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['userIsLoggedIn']),
  },
  methods: {
    ...mapActions(useUserStore, ['getAllUsersData']),
    ...mapActions(useUserStore, ['userLogIn']),
    ...mapActions(useUserStore, ['setUserData']),

    async login() {
      await this.getAllUsersData("https://db-easymusictheory.directus.app/items/users");
      await console.log(this.username);
      let filteredUsersData = this.userData.filter(item => item.username === this.username);
      await console.log(filteredUsersData);
      if (filteredUsersData.length > 0) {
        await console.log(filteredUsersData[0].password);
        //await console.log(this.password);
        const res = await bcrypt.compare(this.password, filteredUsersData[0].password);
        if (res) {
          console.log("Login successful");
          this.passwordIncorrect = false;
          this.userLogIn();
          this.setUserData(filteredUsersData[0]);
          localStorage.setItem('username', filteredUsersData[0].username);
          localStorage.setItem('userId', filteredUsersData[0].id);
          localStorage.setItem('testQuizCompleted', filteredUsersData[0].testQuizCompleted);
          this.$emit('close');
        } else {
          console.log("Password is not correct");
          this.passwordIncorrect = true;
        }
      } else {
        console.log("Username not found in database");
        this.usernameIncorrect = true;
      }
    },
    setPasswordIncorrect() {
      //console.log("Set passwordIncorrect false");
      this.passwordIncorrect = false;
    }
  }
}

</script>


<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: var(--main-bg-color);
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: var(--main-text-color);
}

.modal-body {
  margin: 20px 0;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter-from {
  opacity: 0;
}

.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .modal-container,
.modal-leave-to .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

#username-input {
  max-width: 75%;
  margin-top: 5px;
  margin-left: 0;
  padding: 5px;
  border: 1px solid;
  border-radius: 4px;
}

#password-input {
  max-width: 75%;
  margin-top: 5px;
  margin-left: 0;
  padding: 5px;
  border: 1px solid;
  border-radius: 4px;
}

#login-btn {
  margin-top: 20px;
  margin-left: 0;
  padding: 10px;
}

#close-btn {
  margin-left: 0;
  padding: 10px;
}

</style>
