<template>
  <div v-if="content">
    <router-link
      class="container"
      :to="moduleLink"
      tag="div"
      v-for="singleModule in content"
      :key="singleModule.id"
      @click="setActiveModule(singleModule)"
      :single-module="singleModule"
      >
    </router-link>
  </div>
</template>

<script>
import SingleModule from './SingleModule.vue';

import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: 'Content',
  components: {
    SingleModule,
  },
  props: {
    content: Object,
    //arrayModuleId: Array,
    singleModule: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      currentModuleId: null,
      moduleUrl: "/module/"
    }
  },
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
    moduleLink() {
      return this.singleModule.id ? this.moduleUrl + this.singleModule.id : null
    }
  },
  methods: {
    ...mapActions(useModuleStore, ['setActiveModule']),
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
