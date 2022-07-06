<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>
          <div class="errors msg" v-if="hasErrors">
            <p class="error-message" v-if="errors.invalidFields">Bitte überprüfe deine Eingaben.</p>
            <p class="error-message" v-if="errors.errorSubmit">Das Formular konnte nicht abgeschickt werden.</p>
            <p class="error-message" v-if="errors.missingFields">Du hast nicht alle Felder ausgefüllt.</p>
          </div>
          <div class="modal-body">
            <form v-if="!formSubmitted" @submit.prevent="handleForm" class="user-form">
              <div v-for="input in userForm" :key="input.name">
                <label :for="input.name">{{ input.placeholder }}
                  <span :class="input.req">*</span>
                </label>
                <input :type="input.type" :id="input.name" :name="input.name" v-model="input.value">
              </div>
              <button class="btn" id="register-button">Registrieren</button>
            </form>
            <div v-if="formSubmitted">
              <p>Du hast dich erfolgreich registriert. Bitte logge dich nun über den Login-Button ein.</p>
            </div>
          </div>

          <div class="modal-footer">
            <slot name="footer">

              <button
                class="btn"
                @click="$emit('close')"
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
  name: "ModalRegister",
  props: {
    show: Boolean
  },
  data() {
    return {
      formSubmitted: false,
      userForm: [
        {
          name: 'username',
          placeholder: "Benutzername",
          value: '',

          req: true,
          invalid: false
        },
        {
          name: 'email',
          placeholder: "E-Mail",
          value: '',
          type: 'email',
          req: true,
          invalid: false
        },
        {
          name: 'password',
          placeholder: "Passwort",
          value: '',
          type: 'password',
          req: true,
          invalid: false
        },
      ],
      formValidation: {
        isValid: false,
        note: '',
      },
      hasErrors: false,
      errors: {
        invalidFields: false,
        missingFields: false,
        errorSubmit: false,
      }
    }
  },
  computed: {
    ...mapState(useUserStore, ['userData']),
  },
  methods: {
    ...mapActions(useUserStore, ['getAllUsersData']),

    handleForm() {
      this.resetErrors();
      this.validateFormData(this.userForm)
      const invalid = Object.values(this.errors).some(item => item)
      if (!invalid) this.register();
      else this.hasErrors = true
    },
    resetErrors() {
      this.hasErrors = false
      this.errors = {
        invalidFields: false,
        missingFields: false,
        errorSubmit: false
      }
      for (const value of Object.values(this.userForm)) {
        if (value.invalid) value.invalid = false
      }
    },
    validateEmail(email) {
      const re =  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateFormData(data) {
      data.forEach(it => {
        if (it.type === 'email') {
          const valid = this.validateEmail(it.value) || it.req === false
          if (!valid) {
            it.invalid = true
            this.errors.invalidFields = true
          }
        } else if (it.req && it.value === '') {
          it.invalid = true
          this.errors.missingFields = true
        }
      })
    },
    prepareUserData() {
      const pw = this.userForm.find(item => item.name === "password").value
      //Sync oder async verwenden?
      const hashedpw = bcrypt.hashSync(pw, 10);
      return {
        username: this.userForm.find(item => item.name === "username").value,
        email: this.userForm.find(item => item.name === "email").value,
        password: hashedpw,
      }
    },
    async register() {
      await console.log("Called register function in ModalRegister.vue");
      const user = this.prepareUserData()
      await axios.post("https://ifuu2646.directus.app/items/users", user)
        .then((response) => {
          this.formSubmitted = true
        })
        .catch(err => {
          this.error.errorSubmit = true
        }
      )
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
  background-color: #fff;
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

#register-button {
  margin-top: 30px;
}
</style>
