<template>
  <ChallengeDescription />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
//import Content from '../components/Content.vue'
//import SingleModule from '../components/SingleModule.vue'
import ChallengeDescription from '../components/ChallengeDescription.vue'

export default {
  name: 'Challenge',
  components: {
    //Content,
    //SingleModule,
    ChallengeDescription,
  },
  props: {
    //content: null,
  },
  data() {
    return {

    }
  },
  computed: {

  },
}
</script>

<style lang="css" scoped>
</style>
