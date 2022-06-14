<template>
  <div class="placeholder-hero">
    <p>Platzhalter Hero-Image</p>
  </div>
  <Lead lead="Willkommen auf der Homepage dieses Lerntools! Im Rahmen meiner Bachelorarbeit zum Thema Gamification für Lerntools habe ich einen Test zu
  Datenvisualisierungen erarbeitet, mit dem zwei Ansätze von Gamification getestet werden sollen. Dieser Test dauert ungefähr 15 Minuten. Es sind keine Vorkenntnisse
  notwendig. Ich wünsche Dir viel Spass und bedanke mich für deine Mithilfe! "/>
  <Content :content="content" />
  <h3 v-if="!userIsLoggedIn">Bitte logge dich ein, um Zugriff auf die Inhalte dieser Webseite zu erhalten.</h3>
  <!--<router-link class="clickbox site-title unstyled-link" to="/test">Hier geht es zur Versuchsdurchführung</router-link>-->
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
    ...mapState(useUserStore, ['userData']),
    ...mapState(useUserStore, ['completedModulesArray']),
    ...mapState(useModuleStore, ['allModules']),
  },
  methods: {
    ...mapActions(useModuleStore, ['getAllModules']),
    ...mapActions(useUserStore, ['setCompletedModulesArray']),
  },
  async mounted() {
    await this.getAllModules('https://ifuu2646.directus.app/items/modules')
    this.content = this.allModules;
    await console.log(this.content);
  },
  updated() {
    //Show completed modules
    if (this.userData) {
      this.setCompletedModulesArray();
      for (var i = 0; i < this.completedModulesArray.length; i++) {
        if (this.completedModulesArray[i]) {
          this.content[i].isCompleted = true;
        }
      }
    }
  }
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
