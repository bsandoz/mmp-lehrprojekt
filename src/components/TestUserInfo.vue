<template>
  <div class="">
    <h3 @click="setTestStarted">Klicke hier, um zu beginnen!</h3>
  </div>
  <div class="" v-if="testStarted">
    <div class="" v-if="!formSubmitted">
      <p>Bevor du beginnen kannst, benötige ich noch ein paar Infos:</p>
      <form class="" @submit.prevent="handleForm">
        <label>Alter:</label>
        <input v-model="age" type="number" min="1" max="99" required>
        <label>Geschlecht:</label>
        <select v-model="gender" required>
          <option value="weiblich">Weiblich</option>
          <option value="männlich">Männlich</option>
          <option value="divers">Divers</option>
        </select>
        <label>Vorkenntnisse zum Thema Datenvisualisierungen (1 = Keine Vorkenntnisse, 5 = Sehr gute Vorkenntnisse)</label>
        <select v-model="previousKnowledge" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <button class="btn" @click="$emit('setUserInfo'); handleForm();">Fortfahren</button>
      </form>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: "TestUserInfo",
  props: {
    isUserInfoSet: null,
  },
  data() {
    return {
      //Demografische Daten
      age: null,
      gender: "",
      previousKnowledge: null,

      //Rest
      testStarted: false,
      formSubmitted: false,
      //currentUserId: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['testUserId']),
  },
  methods: {
    setTestStarted() {
      this.testStarted = true;
    },
    handleForm() {
      console.log(this.age);
      console.log(this.gender);
      console.log(this.previousKnowledge);
      this.register();
    },
    prepareUserData() {
      return {
        age: this.age,
        gender: this.gender,
        previousKnowledge: this.previousKnowledge,
      }
    },
    async register() {
      await console.log("Called register function in TestUserInfo.vue");
      const user = this.prepareUserData()
      await axios.post("https://ifuu2646.directus.app/items/testUsers", user)
        .then((response) => {
          this.setTestUserId(response.data.data.id);
          console.log(this.testUserId);
          this.formSubmitted = true

        })
        .catch(err => {
          this.error.errorSubmit = true
        }
      )
    },
    /*
    setUserInfo() {
      console.log("Called setUserInfo in TestUserInfo");
      this.$emit('setUserInfo', this.currentUserId);
    }
    */
    ...mapActions(useUserStore, ['setTestUserId']),
  },
  emits: ['setUserInfo']
}
</script>

<style lang="css" scoped>
</style>
