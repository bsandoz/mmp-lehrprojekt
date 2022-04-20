<template>
  <router-link v-if="module" :to="moduleLink" tag="div" :key="item.id" v-for="item in content" class="container">
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
    module: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      moduleUrl: '/module/'
    }
  },
  computed: {
    moduleLink() {
      return this.module.id ? this.moduleUrl + this.module.id : null
    },
  }
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
