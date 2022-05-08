<template>
  <div class="">
    <h2>Bitte wähle ein Spiel aus:</h2>
    <div class="">
      <h1 @click="$emit('setMemory')">Memory</h1>
      <h1 @click="$emit('setHangman')">Hangman</h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "TestSelectGame",
  emits: ['setMemory', 'setHangman']
}
</script>

<style lang="css" scoped>
</style>
