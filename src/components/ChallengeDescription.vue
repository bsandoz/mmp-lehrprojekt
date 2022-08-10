<template>
  <div id="main">
    <router-link to="/">Zurück zur Übersicht</router-link>
    <h2 class="module-title">{{ this.activeChallenge.title }}</h2>
    <h4>{{ this.activeChallenge.text }}</h4>
    <div id="content"></div>
    <router-link v-if="isMounted" :to="this.exerciseLink" class="btn unstyled-link" id="exercise">
        <div class="next-exercise">
          <h3>Challenge starten!</h3>
        </div>
        <div class="start-exercise">
          <!--
          <router-link to="/exercise-memory">Übung starten (Memory)</router-link>
          <router-link to="/exercise-hangman">Übung starten (Hangman)</router-link>
          -->
        </div>
    </router-link>
  </div>
</template>

<script>
import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';

export default {
  name: 'ChallengeDescription',
  components: {

  },
  props: {

  },
  data() {
    return {
      content: null,
      exerciseLink: null,
      isMounted: false,
      adjustedId: null,
    }
  },
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
    ...mapState(useModuleStore, ['activeChallenge']),
  },
  mounted() {
    //console.log("Mounted");
    /*
    this.content = this.activeChallenge.content;
    let doc = document.getElementById("content");
    doc.innerHTML = this.content;
    */
    this.adjustedId = this.activeChallenge.id - 1;

    this.exerciseLink = "/exercise/" + this.adjustedId;
    //console.log(this.exerciseLink);

    //console.log(this.activeChallenge);

    this.isMounted = true;

  }
}
</script>

<style lang="css" scoped>
  #main {
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 15px;
    padding-bottom: 15px;
    margin-left: 5%;
    margin-top: 75px;
    margin-right: 10%;
    margin-bottom: 75px;
    min-width: 750px;
    max-width: 1200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: var(--main-bg-color);
    border-radius: 10px;
  }
  p {
    max-width: 1000px;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  #content {
    max-width: 1000px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .module-title {
    margin-top: 25px;
    margin-bottom: 50px;
  }
  #exercise {
    border-style: solid;
    border-radius: 5px;
    background-color: var(--main-accent-color);
    max-width: 800px;
    margin-top: 75px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

</style>
