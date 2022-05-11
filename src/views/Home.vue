<template>
  <div class="placeholder-hero">
    <p>Platzhalter Hero-Image</p>
  </div>
  <Lead lead="Willkommen auf der Homepage dieses Lerntools! Dies ist ein Leadtext. Lorem ipsum dolor sit amet,
  consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
  nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
  Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. "/>
  <Content :content="content" />
  <h3 v-if="!userIsLoggedIn">Bitte logge dich ein, um Zugriff auf die Inhalte dieser Webseite zu erhalten.</h3>
</template>

<script>
import Lead from '../components/Lead.vue'
import Content from '../components/Content.vue'
import { useUserStore } from '@/store/UserStore.js'
import { useModuleStore } from '@/store/ModuleStore.js'

import { mapState } from 'pinia';
import { mapActions } from 'pinia';

export default {
  name: 'Home',
  components: {
    Lead,
    Content,
  },
  data() {
    return {
      content: null,
      singleModule: null,
    }
  },
  computed: {
    ...mapState(useUserStore, ['userIsLoggedIn']),
    ...mapState(useModuleStore, ['allModules']),
  },
  methods: {
    ...mapActions(useModuleStore, ['getAllModules']),
  },
  async mounted() {
    await this.getAllModules('https://ifuu2646.directus.app/items/modules')
    await console.log(this.allModules);
    return this.content = this.allModules;
  },
}
</script>

<style lang="css" scoped>
  .placeholder-hero {
    background-color: gray;
    width: 100%;
    height: 400px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
