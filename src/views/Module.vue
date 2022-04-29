<template>
  <Text
    v-for="item in filteredModules"
    :key="item.id"
    :text="item.text"
  />
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Content from '../components/Content.vue'

export default {
  name: 'Module',
  components: {
    Content,
  },
  props: {
    content: Object,
  },
  data() {
    return {
      modules: [],
      currentModuleId: Number,
    }
  },
  computed: {
    filteredModules() {
      let self = this;
      console.log(store.activeModule);
      return self.modules.filter(function (obj) {
        return obj.id === self.currentModuleId;
      })
    }
  },
  created() {
    this.currentModuleId = localStorage.getItem('currentModuleId');
  },
  mounted() {
    axios
      .get ('https://ifuu2646.directus.app/items/modules')
      .then (response => (this.modules = response.data.data))
      .catch (function(error) {
        console.log(error);
      })
  },
}
</script>

<style lang="css" scoped>
</style>
