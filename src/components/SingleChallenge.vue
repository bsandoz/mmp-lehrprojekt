<template>
  <router-link class="unstyled-link" v-if="singleChallenge && userIsLoggedIn" :to="challengeLink">
    <div>
      <h3 class="module-title">{{ singleChallenge.title }}</h3>
      <p class="module-summary">{{ singleChallenge.text }}</p>
      <p class="completed" v-if="singleChallenge.isCompleted">Du hast dieses Kapitel erfolgreich abgeschlossen!</p>
    </div>
  </router-link>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: 'SingleChallenge',
  props: {
    singleChallenge: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      challengeUrl: "/challenge/",
    }
  },
  computed: {
    ...mapState(useUserStore, ['userIsLoggedIn']),
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['completedModulesArray']),

    challengeLink() {
      //return this.singleModule.id ? this.moduleUrl + this.singleModule.id : null
      return this.challengeUrl + this.singleChallenge.id;
    },
  },
  methods: {
    ...mapActions(useUserStore, ['setCompletedModulesArray']),
  },
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
    text-shadow: 0.5px 0.5px 0 #000,
     -0.5px -0.5px 0 #000,
      0.5px -0.5px 0 #000,
      -0.5px 0.5px 0 #000,
       0.5px 0.5px 0 #000;

  }
  .progress-bar {
    font-style: italic;
  }
  .module-title {
    font-size: 18pt;
  }
  .module-summary {
    font-size: 14pt;
  }
</style>
