<template>
  <div class="exercise-if" v-if="isQuiz">
    <Quiz />
  </div>
  <div class="exercise-if" v-if="isMemory">
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
    console.log(this.activeModule.gameType);
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
