<template>
  <router-link to="/">Zurück zur Übersicht</router-link>
  <h2>{{ this.activeModule.title }}</h2>
  <h4>{{ this.activeModule.text }}</h4>
  <p>{{ this.activeModule.details }}</p>
  <div id="content"></div>
  <div class="start-exercise">
    <!--
    <router-link to="/exercise-memory">Übung starten (Memory)</router-link>
    <router-link to="/exercise-hangman">Übung starten (Hangman)</router-link>
    -->
    <router-link v-if="isMounted" :to="this.exerciseLink">Übung starten</router-link>
  </div>
  <div class="next-exercise">
    <h3>Klicke hier, um zur nächsten Übung zu gelangen!</h3>
  </div>
</template>

<script>
import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';

export default {
  name: 'ModuleDescription',
  components: {

  },
  props: {

  },
  data() {
    return {
      content: null,
      exerciseLink: null,
      isMounted: false,
    }
  },
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
  },
  mounted() {
    console.log("Mounted");
    this.content = this.activeModule.content;
    let doc = document.getElementById("content");
    doc.innerHTML = this.content;

    this.exerciseLink = "/exercise/" + this.activeModule.id;
    console.log(this.exerciseLink);

    console.log(this.activeModule);

    this.isMounted = true;

  }
}
</script>

<style lang="css" scoped>
</style>
