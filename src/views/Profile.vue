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
      userName: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['userIsLoggedIn']),
  },
  mounted() {
    this.userName = this.userData.username;
    console.log(this.userName);
  },
}
</script>

<template>
  <div class="profile" v-if="userIsLoggedIn">
    <h2>Willkommen, {{ userName }}!</h2>
  </div>
  <div v-if="!userIsLoggedIn">
    <h2>Bitte logge dich ein, um auf diese Seite zugreifen zu können.</h2>
  </div>
</template>

<style lang="css" scoped>
</style>
