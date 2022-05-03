<template>
  <h3>Begriffs-Memory</h3>
  <p>In diesem Memory-Spiel sind X Begriffe und ihre Definitionen versteckt.
    Ordne den Begriffen ihre zugehörigen Definitionen zu!
  </p>
  <Memory />
</template>

<script>
import Memory from '../components/gameComponents/Memory.vue'

export default {
  name: 'Exercise',
  components: {
    Memory,
  },
  
}
</script>

<style lang="css" scoped>
</style>
