<template>
  <div v-if="content">
    <h3 id="basics" v-if="userIsLoggedIn">Die Grundlagen:</h3>
    <SingleModule
      class="container btn"
      :id="'single-module-' + singleModule.id"
      v-for="singleModule in content"
      :key="singleModule.id"
      @click="setActiveModule(singleModule)"
      :single-module="singleModule"
      :class= "{ bgcompleted: singleModule.isCompleted }"
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
    background-color: var(--main-bg-color);
  }
  #basics {
    max-width: 60%;
    margin: 30px auto;
    color: var(--dark-bg-text-color);
  }
  #single-module-1 {
    background-image: url(../assets/img/module1bg.png);
    background-position: right;
    background-repeat: no-repeat;
  }
  #single-module-1:hover {
    box-shadow: 3px 6px #000000;
  }
  #single-module-2 {
    background-image: url(../assets/img/module2bg.png);
    background-position: right;
    background-repeat: no-repeat;
  }
  #single-module-2:hover {
    box-shadow: 3px 6px #000000;
  }
  #single-module-3 {
    background-image: url(../assets/img/module3bg.png);
    background-position: right;
    background-repeat: no-repeat;
  }
  #single-module-3:hover {
    box-shadow: 3px 6px #000000;
  }
  .bgcompleted {
    background-image: linear-gradient(to right, var(--main-bg-color) , var(--confirm-color));
    border-color: var(--confirm-color);
    border-width: thick;
  }
</style>
