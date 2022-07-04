<template>
  <div class="hero">
    <img id="hero-image" src="../assets/img/hero-image-notext.jpg" alt="">
  </div>
  <Lead class="lead-home" lead="Mit EasyMusicTheory lernst du Musiktheorie auf leicht verständliche und spielerische Art. Lege jetzt los und lerne die Grundbausteine der Musik! "/>
  <Content :content="content" />
  <div class="home-infos">
    <div class="infobox" id="infobox-1">
      <p class="info-text" id="info-1">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
      </p>
      <img class="info-image" src="../assets/img/info-image-1.jpg" alt="Frau, die Gitarre spielt">
    </div>
    <div class="infobox" id="infobox-2">
      <img class="info-image" src="../assets/img/info-image-2.jpg" alt="Bild eines Tonstudios">
      <p class="info-text" id="info-2">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
      </p>
    </div>
    <div class="infobox" id="infobox-3">
      <p class="info-text" id="info-3">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.
        Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec,
        pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate
      </p>
    </div>
    <h3 id="notLoggedInWarning" v-if="!userIsLoggedIn">Bitte logge dich ein, um Zugriff auf die Inhalte dieser Webseite zu erhalten.</h3>
  </div>
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
  .hero {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .lead-home {
    font-weight: bold;
    font-size: 16pt;
    padding-top: 65px;
    padding-bottom: 65px;
    margin-bottom: 50px;
    justify-content: center;
    background-color: var(--main-accent-color);
    box-shadow: 3px 6px #000000;
    color: var(--main-text-color);
  }
  .home-infos {
    display: grid;
    grid-template-columns: 1fr 35vw 1fr 35vw 1fr;
    grid-template-rows: 350px 350px 350px 1fr 1fr;
    column-gap: 50px;
    row-gap: 100px;
  }
  #hero-image {
    max-width: 100%;
    height: auto;
  }
  .info-image {
    max-width: 400px;
    height: 100%;
    margin: 20px;
    margin-left: 0;
    margin-right: 0;
    border-radius: 4px;
  }
  .infobox {
    background-color: var(--main-bg-color);
    border-radius: 4px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    box-shadow: 5px 10px var(--main-accent-color);
  }
  .info-text {
    padding: 25px;
    font-size: 12pt;
    margin-right: 10px;
    margin-left: 10px;
  }
  #infobox-1 {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 1;
  }
  #infobox-2 {
    grid-column-start: 3;
    grid-column-end: 5;
    grid-row-start: 2;
  }
  #infobox-3 {
    grid-column-start: 2;
    grid-column-end: 4;
    grid-row-start: 3;
  }
  #notLoggedInWarning {
    color: var(--mistake-color);
    margin-left: 3%;
    grid-column-start: 2;
    grid-column-end: 5;
    grid-row-start: 4;
  }
  #basics {

  }

</style>
