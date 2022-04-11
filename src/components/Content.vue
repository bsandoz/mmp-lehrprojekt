<template>
  <div class="container">
    <div>
      <Item />
    </div>
  </div>
</template>

<script>
import Item from './Item.vue'

export default {
  name: 'Container',
  props: {
    containerItems: Array,
  },
  components: {
    Item,
  }
}
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    align-items: center;
  }
</style>
