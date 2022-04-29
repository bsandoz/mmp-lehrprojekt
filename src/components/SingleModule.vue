<template>
  <router-link v-if="singleModule && userIsLoggedIn" :to="moduleLink">
    <div :class="{ completed: singleModule.isCompleted }">
      <h3>{{ singleModule.title }}</h3>
      <p>{{ singleModule.text }}</p>
      <p class="progress-bar">Progress: {{ singleModule.progress }}%</p>
    </div>
  </router-link>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';

export default {
  name: 'SingleModule',
  props: {
    singleModule: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      moduleUrl: "/module/",
    }
  },
  computed: {
    ...mapState(useUserStore, ['userIsLoggedIn']),
    moduleLink() {
      //return this.singleModule.id ? this.moduleUrl + this.singleModule.id : null
      return this.moduleUrl + this.singleModule.id;
    },
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
