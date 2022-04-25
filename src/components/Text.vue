<template>
  <h4>{{ title }}</h4>
  <p>{{ text }}</p>
</template>

<script>
export default {
  name: 'Text',
  props: {
    title: String,
    text: String,
  }
}
</script>

<style lang="css" scoped>
</style>
