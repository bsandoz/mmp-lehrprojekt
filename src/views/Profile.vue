<template>
  <div class="profile" v-if="userIsLoggedIn">
    <h2>Willkommen, User!</h2>
  </div>
  <div v-if="!userIsLoggedIn">
    <h2>Bitte logge dich ein, um auf diese Seite zugreifen zu können.</h2>
  </div>
</template>

<script>
import { useUserStore } from '@/store/UserStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: "Profile",
  components: {

  },
  data() {
    return {

    }
  },
  computed: {
    ...mapState(useUserStore, ['userIsLoggedIn']),
  }
}
</script>

<style lang="css" scoped>
</style>
