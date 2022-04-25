<template>
  <router-link
    to="/module"
    tag="div"
    v-for="singleModule in content"
    :key="singleModule.id"
    class="container"
    >
    <SingleModule :single-module="singleModule" />
  </router-link>
</template>

<script>
import SingleModule from './SingleModule.vue';

export default {
  name: 'Content',
  components: {
    SingleModule,
  },
  props: {
    content: Object,
    arrayModuleId: Array,
  },
  data() {
    return {
      currentModuleId: null,
    }
  },
  /*
  methods: {
    updateModuleId() {
      console.log("Called updateModuleId()");
      localStorage.setItem('currentModuleId', '1');
    },
  },*/
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
