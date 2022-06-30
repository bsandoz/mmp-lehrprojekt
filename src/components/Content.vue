<template>
  <div v-if="content">
    <h3 id="basics" v-if="userIsLoggedIn">Die Grundlagen:</h3>
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
import { useUserStore } from '@/store/UserStore.js'

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
    ...mapState(useUserStore, ['userIsLoggedIn']),
  },
  methods: {
    /*
    setModulesCompleted() {
      let containers = document.getElementsByClassName("container");
      let containersArray = Array.from(containers);
      console.log(containersArray);
      containersArray.classList.add("complete");
    },
    */

    ...mapActions(useModuleStore, ['setActiveModule']),
  },
}
</script>

<style lang="css" scoped>
  .container {
    display: flex;
    flex-wrap: wrap;
    align-items: flex-start;
    max-width: 60%;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid var(--main-dark-color);
    padding: 30px;
    border-radius: 5px;
    background-color: var(--main-accent-color);
  }
  #basics {
    max-width: 60%;
    margin: 30px auto;
  }
</style>
