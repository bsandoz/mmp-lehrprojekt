<template>
  <ModuleDescription />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
//import Content from '../components/Content.vue'
//import SingleModule from '../components/SingleModule.vue'
import ModuleDescription from '../components/ModuleDescription.vue'

export default {
  name: 'Module',
  components: {
    //Content,
    //SingleModule,
    ModuleDescription,
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
