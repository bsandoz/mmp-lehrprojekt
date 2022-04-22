<template>
  <router-link :to="`/module/${currentModuleId}`" tag="div" :key="item.id" v-for="item in content" class="container">
    <Item :item="item" />
  </router-link>
</template>

<script>
import Item from './Item.vue';

export default {
  name: 'Content',
  components: {
    Item
  },
  props: {
    content: Array,
    currentModuleId: Number,
  },
  data() {
    return {
      //currentModuleId: 1,
    }
  },
}
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    max-width: 75%;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }
</style>

<!--
<template>
  <div :key="item.id" v-for="item in content" class="container">
    <Item :item="item" />
  </div>
</template>
-->
