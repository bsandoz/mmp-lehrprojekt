<template>
  <div :class="{ completed: item.isCompleted }">
    <h3>{{ item.title }}</h3>
    <p>{{ item.text }}</p>
    <p class="progress-bar">Progress: {{ item.progress }}%</p>
  </div>
</template>

<script>
export default {
  name: 'Item',
  props: {
    item: Object,
  }
}
</script>

<style lang="css" scoped>
  div {
    width: 50%;
    height: 0;
    padding-bottom: 20%;
  }
  .completed {
    background-color: green;
  }
  .progress-bar {
    font-style: italic;
  }
</style>
