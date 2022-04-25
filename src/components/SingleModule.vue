<template>
  <div :class="{ completed: singleModule.isCompleted }">
    <h3>{{ singleModule.title }}</h3>
    <p>{{ singleModule.text }}</p>
    <p class="progress-bar">Progress: {{ singleModule.progress }}%</p>
  </div>
</template>

<script>
export default {
  name: 'SingleModule',
  props: {
    singleModule: Object,
    currentModuleId: Number,
  },
  created() {
    console.log(this.currentModuleId);
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
