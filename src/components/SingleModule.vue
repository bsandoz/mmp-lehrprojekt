<template>
  <router-link v-if="singleModule && userIsLoggedIn" :to="moduleLink">
    <div :class="{ completed: singleModule.isCompleted }">
      <h3>{{ singleModule.title }}</h3>
      <p>{{ singleModule.text }}</p>
      <!--Change Progress to Users db
      <p class="progress-bar">Progress: {{ singleModule.progress }}%</p>
      -->
    </div>
  </router-link>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

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
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['completedModulesArray']),

    moduleLink() {
      //return this.singleModule.id ? this.moduleUrl + this.singleModule.id : null
      return this.moduleUrl + this.singleModule.id;
    },
  },
  methods: {
    ...mapActions(useUserStore, ['setCompletedModulesArray']),
  },
  mounted() {
    /* Needs to be moved to Home?
    if (this.userData) {
      this.setCompletedModulesArray();
      for (var i = 0; i < this.completedModulesArray.length; i++) {
        if (this.completedModulesArray[i]) {

        }
      }
    } */
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
    background-color: var(--confirm-color);
  }
  .progress-bar {
    font-style: italic;
  }
</style>
