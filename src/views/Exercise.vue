<template>
  <h3>Begriffs-Memory</h3>
  <p>In diesem Memory-Spiel sind X Begriffe und ihre Definitionen versteckt.
    Ordne den Begriffen ihre zugehörigen Definitionen zu!
  </p>
  <Memory />
  <Hangman />
</template>

<script>
import Memory from '../components/gameComponents/Memory.vue'
import Hangman from '../components/gameComponents/Hangman.vue'

export default {
  name: 'Exercise',
  components: {
    Memory,
    Hangman,
  },

}
</script>

<style lang="css" scoped>
</style>
