<template>
  <Lead lead="Dies ist Platzhalter-Modul 1. Hier folgt die Beschreibung bzw. Zusammenfassung dieses Moduls. "/>
</template>

<script>
import Header from '../components/Header.vue'
import Footer from '../components/Footer.vue'
import Lead from '../components/Lead.vue'
import Content from '../components/Content.vue'

export default {
  name: 'Module',
  props: {

  },
  components: {
    Lead,
    Content,
  },
  data() {
    return {
      text: null,
    }
  },
  mounted() {
    axios
      .get ('https://ifuu2646.directus.app/items/modules')
      .then (response => (this.text = response.data.data))
      .catch (function(error) {
        console.log(error);
      })
  },
}
</script>

<style lang="css" scoped>
</style>
