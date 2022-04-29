<template>
  <router-link to="/">Zurück zur Übersicht</router-link>
  <h2>{{ this.activeModule.title }}</h2>
  <h4>{{ this.activeModule.text }}</h4>
  <p>{{ this.activeModule.details }}</p>
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
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
  },
}
</script>

<style lang="css" scoped>
</style>
