<template>
  <div v-if="content">
    <SingleModule
      class="container"
      v-for="singleModule in content"
      :key="singleModule.id"
      @click="setActiveModule(singleModule)"
      :single-module="singleModule"
    />
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
  },
  computed: {
    ...mapState(useModuleStore, ['activeModule']),
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
