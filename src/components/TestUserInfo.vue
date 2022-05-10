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
    ...mapState(useUserStore, ['testUserAge']),
    ...mapState(useUserStore, ['testUserGender']),
    ...mapState(useUserStore, ['testUserPreviousKnowledge']),
  },
  methods: {
    setTestStarted() {
      this.testStarted = true;
    },
    handleForm() {
      this.saveUserDataInState();
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
</style>
