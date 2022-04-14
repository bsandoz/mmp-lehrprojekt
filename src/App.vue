<template>
  <header>
    <Header />
    <div class="wrapper">

    </div>
  </header>

  <main>
    <Lead lead="Willkommen auf der Homepage dieses Lerntools! Dies ist ein Leadtext. Lorem ipsum dolor sit amet,
    consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes,
    nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.
    Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. "/>
    <Content :content="content"/>
  </main>
  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Lead from './components/Lead.vue'
import Content from './components/Content.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
    Lead,
    Content,
  },
  data() {
    return {
      content: [],
    }
  },
  methods: {
    fetchData() {
      axios.get('system/ajax/getModules.php').then(response => (this.content = response.data));
    },
  },
  created() {
    this.fetchData();
  },
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  .container {
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px;
    border-radius: 5px;
  }
  .btn {
    display: inline-block;
    background: #000;
    color: #fff;
    border: none;
    padding: 10px 20px;
    margin: 5px;
    border-radius: 5px;
    cursor: pointer;
    text-decoration: none;
    font-size: 15px;
    font-family: inherit;
  }
    .btn:focus {
    outline: none;
  }
    .btn:active {
    transform: scale(0.98);
  }
    .btn-block {
    display: block;
    width: 100%;
  }
</style>
