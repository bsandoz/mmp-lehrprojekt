<template>
  <router-link class="unstyled-link" v-if="singleModule && userIsLoggedIn" :to="moduleLink">
    <div>
      <h3>{{ singleModule.title }}</h3>
      <p>{{ singleModule.text }}</p>
      <p class="completed" v-if="singleModule.isCompleted">Du hast dieses Kapitel erfolgreich abgeschlossen!</p>
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
    width: 65%;
    height: 0;
    padding-bottom: 20%;
  }
  .completed {
    font-size: 14pt;
    color: var(--confirm-color);
    margin-top: 25px;

  }
  .progress-bar {
    font-style: italic;
  }
</style>
