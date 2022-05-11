<template>
  <div>
    <button class="site-title btn" v-if="!testStarted" @click="setTestStarted">Klicke hier, um zu beginnen!</button>
  </div>
  <div class="main-container" v-if="testStarted">
    <div class="" v-if="!formSubmitted">
      <p class="box-text"><b>Bevor Du beginnen kannst, benötige ich noch ein paar Infos von Dir:</b></p>
      <form class="user-form" @submit.prevent="handleForm">
        <label>Alter:</label>
        <br>
        <input v-model="age" type="number" min="1" max="99" required>
        <br>

        <label>Geschlecht:</label>
        <br>
        <select v-model="gender" required>
          <option value="weiblich">Weiblich</option>
          <option value="männlich">Männlich</option>
          <option value="divers">Divers</option>
        </select>
        <br>

        <label>Vorkenntnisse zum Thema Datenvisualisierungen (1 = Keine Vorkenntnisse, 5 = Sehr gute Vorkenntnisse)</label>
        <br>
        <select v-model="previousKnowledge" required>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <br>

        <button class="btn" @click="handleForm">Fortfahren</button>
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
    ...mapState(useUserStore, ['testUserAge']),
    ...mapState(useUserStore, ['testUserGender']),
    ...mapState(useUserStore, ['testUserPreviousKnowledge']),
  },
  methods: {
    setTestStarted() {
      this.testStarted = true;
    },
    handleForm() {
      if (this.age && this.gender !== "" && this.previousKnowledge) {
        this.$emit('setUserInfo');
        this.saveUserDataInState();
      } else {
        console.log("Empty fields");
      }
    },
    saveUserDataInState() {
      this.setTestUserAge(this.age);
      this.setTestUserGender(this.gender);
      this.setTestUserPreviousKnowledge(this.previousKnowledge);
      console.log("Saved user data in state");
      console.log(this.testUserGender);
      console.log(this.testUserPreviousKnowledge);
    },
    /*
    setUserInfo() {
      console.log("Called setUserInfo in TestUserInfo");
      this.$emit('setUserInfo', this.currentUserId);
    }
    */
    ...mapActions(useUserStore, ['setTestUserId']),
    ...mapActions(useUserStore, ['setTestUserAge']),
    ...mapActions(useUserStore, ['setTestUserGender']),
    ...mapActions(useUserStore, ['setTestUserPreviousKnowledge']),
  },
  emits: ['setUserInfo']
}
</script>

<style lang="css" scoped>
  .box-text {
    margin: 5px;
  }
</style>
