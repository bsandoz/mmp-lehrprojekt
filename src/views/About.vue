<template>
  <div class="about-box">
    <div id="home-link">
      <router-link to="/">Zurück zur Startseite</router-link>
    </div>
    <div class="about-content">
      <h3>v0.5.1</h3>
      <p>Es handelt sich bei dieser Seite um eine Beta-Version, die sich noch im Aufbau befindet. Diese Webseite entstand im Rahmen meiner Bachelorarbeit im Studiengang Multimedia Production der Fachhochschule Graubünden.</p>
      <div class="credits">
        <h3>Credits:</h3>
        <p>Arrow by unlimicon from NounProject.com</p>
      </div>
      <div class="impressum">
        <h3>Impressum:</h3>
        <br/>
        <p class="nomargin"><strong><i>Kontakt-Adresse</i></strong></p>
        <p class="nomargin">Bénédict Sandoz<br/>Kirschenweg 6<br/>4112 B&auml;ttwil<br/>Schweiz</p>
        <p class="nomargin">E-Mail:<br/>benedict.sandoz@bluewin.ch</p>
        <br/><br/>
        <p class="nomargin"><strong><i>Haftungsausschluss</i></strong></p><p class="nomargin">Der Autor &uuml;bernimmt keinerlei Gew&auml;hr hinsichtlich der inhaltlichen Richtigkeit, Genauigkeit, Aktualit&auml;t, Zuverl&auml;ssigkeit und Vollst&auml;ndigkeit der Informationen.</p>
        <p class="nomargin">Haftungsanspr&uuml;che gegen den Autor wegen Sch&auml;den materieller oder immaterieller Art, welche aus dem Zugriff oder der Nutzung bzw. Nichtnutzung der ver&ouml;ffentlichten Informationen, durch Missbrauch der Verbindung oder durch technische St&ouml;rungen entstanden sind, werden ausgeschlossen.</p><p>Alle Angebote sind unverbindlich. Der Autor beh&auml;lt es sich ausdr&uuml;cklich vor, Teile der Seiten oder das gesamte Angebot ohne besondere Ank&uuml;ndigung zu ver&auml;ndern, zu erg&auml;nzen, zu l&ouml;schen oder die Ver&ouml;ffentlichung zeitweise oder endg&uuml;ltig einzustellen.</p>
        <br/><br/><p class="nomargin"><strong><i>Haftungsausschluss f&uuml;r Links</i></strong></p>
        <p class="nomargin">Verweise und Links auf Webseiten Dritter liegen ausserhalb unseres Verantwortungsbereichs. Es wird jegliche Verantwortung f&uuml;r solche Webseiten abgelehnt. Der Zugriff und die Nutzung solcher Webseiten erfolgen auf eigene Gefahr des jeweiligen Nutzers.</p>
        <br/><br/><p class="nomargin"><strong><i>Urheberrechte</i></strong></p><p>Die Urheber- und alle anderen Rechte an Inhalten, Bildern, Fotos oder anderen Dateien auf dieser Website, geh&ouml;ren ausschliesslich <strong>Bénédict Sandoz</strong> oder den speziell genannten Rechteinhabern. F&uuml;r die Reproduktion jeglicher Elemente ist die schriftliche Zustimmung des Urheberrechtstr&auml;gers im Voraus einzuholen.</p><br/>
        <!--ACHTUNG: Wenn Sie die Quelle ohne Erlaubnis von SwissAnwalt entfernen, dann begehen Sie eine Urheberrechtsverletzung welche in jedem Fall geahndet wird.-->Quelle: <a href="https://www.swissanwalt.ch" target="_blank" rel="noopener">SwissAnwalt</a><!--Bitte beachten Sie die AGB von SwissAnwalt betreffend allf&auml;llig anfallenden Kosten bei Weglassen der Quelle!-->
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  inheritAttrs: false, // disable 'non-props' warning
};
</script>

<style scoped>
  .about-box {
    background-color: var(--main-bg-color);
    padding: 5%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 100px;
    margin-bottom: 100px;
    border-radius: 10px;
  }
  .about-content {
    max-width: 900px;
  }
  .impressum {
    margin-top: 50px;
  }
  #home-link {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 50px;
    text-align: center;
  }
</style>
