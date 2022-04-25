<template>
  <Lead lead="Willkommen auf der Homepage dieses Lerntools! Dies ist ein Leadtext. Lorem ipsum dolor sit amet,
  consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
  nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
  Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. "/>
  <Content :content="content" :array-module-id="arrayModuleId"/>
</template>

<script>
import Lead from '../components/Lead.vue'
import Content from '../components/Content.vue'

export default {
  name: 'Home',
  components: {
    Lead,
    Content,
  },
  props: {
    //currentModuleId: Number,
  },
  data() {
    return {
      content: null,
      arrayModuleId: null,
    }
  },
  computed: {

  },
  mounted() {
    axios
      .get ('https://ifuu2646.directus.app/items/modules')
      .then (response => (this.content = response.data.data))
      .catch (function(error) {
        console.log(error);
      })
    axios
      .get ('https://ifuu2646.directus.app/items/modules')
      .then (response => (this.arrayModuleId = response.data.data.id))
      .catch (function(error) {
        console.log(error);
      })
  },
}
</script>

<style lang="css" scoped>
</style>
