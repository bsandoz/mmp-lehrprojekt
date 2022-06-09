<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <form @submit.prevent="login">
              <input v-model="username" type="text" placeholder="Benutzername">
              <input v-model="password" type="password" placeholder="Passwort">
              <input type="submit" value="Einloggen">
            </form>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              <button
                class="modal-default-button"
                @click="$emit('close')"
              >Close</button>
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
    }
  },
  computed: {
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['userIsLoggedIn']),
  },
  methods: {
    ...mapActions(useUserStore, ['getAllUsersData']),
    ...mapActions(useUserStore, ['userLogIn']),

    async login() {
      await this.getAllUsersData("https://ifuu2646.directus.app/items/users");
      await console.log(this.username);
      let filteredUsersData = this.userData.filter(item => item.username === this.username);
      await console.log(filteredUsersData);
      await console.log(filteredUsersData[0].password);
      await console.log(this.password);
      const res = await bcrypt.compare(this.password, filteredUsersData[0].password);
      if (res) {
        console.log("Login successful");
        this.userLogIn();
        localStorage.setItem('username', filteredUsersData[0].username);
        localStorage.setItem('testQuizCompleted', filteredUsersData[0].testQuizCompleted);
        this.$emit('close');
      } else {
        console.log("Password is not correct");
      }
    }
  }
}

</script>


<style>
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
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  float: right;
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
</style>
