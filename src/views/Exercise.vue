<template>
  <div class="" v-if="isQuiz">
    <p>Quiz</p>
    <Quiz />
  </div>
  <div class="" v-if="isMemory">
    <h3>Begriffs-Memory</h3>
    <p>In diesem Memory-Spiel sind X Begriffe und ihre Definitionen versteckt.
      Ordne den Begriffen ihre zugehörigen Definitionen zu!
    </p>
    <Memory />
  </div>
</template>

<script>
import Memory from '../components/gameComponents/Memory.vue'
import Quiz from '../components/gameComponents/Quiz.vue'

import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';

export default {
  name: 'Exercise',
  components: {
    Memory,
    Quiz,
  },
  data() {
    return {
      isMemory: false,
      isQuiz: false,
    }
  },
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
  },
  mounted() {
    if (this.activeModule.gameType === "memory") {
      this.isMemory = true;
    } else if (this.activeModule.gameType === "quiz") {
      this.isQuiz = true;
    }
  }
}
</script>

<style lang="css" scoped>
</style>
