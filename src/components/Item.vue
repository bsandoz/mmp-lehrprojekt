<template>
  <div :class="{ completed: item.isCompleted }">
    <h3>{{ item.title }}</h3>
    <p>{{ item.text }}</p>
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
</style>
