<template>
  <header>
    <Header />
    <div class="wrapper">

    </div>
  </header>

  <main>
    <router-view></router-view>
  </main>
  <Footer />
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      content: null,
    }
  },
  methods: {
    /*
    fetchData() {
      axios.get('system/ajax/getModules.php').then(response => (this.content = response.data));
    },
    */
  },
  created() {
    //this.fetchData();
  },
}

</script>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap');

  :root {
  --main-bg-color: #fff;
  --main-text-color: #000;
  --dark-bg-text-color: #fff;
  --main-accent-color: #ff8c1a;
  --main-dark-color: #000d1a;
  --confirm-color: #85e085;
  --mistake-color: #cc2900;
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }
  body {
    font-family: 'Poppins', sans-serif;
  }
  h3 {
    margin-left: 50px;
    margin-bottom: 30px;
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
    background: var(--main-dark-color);
    color: var(--dark-bg-text-color);
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
  .site-title {
    margin-left: 50px;
    margin-right: 50px;
  }
  .main-container {
    margin-left: 50px;
    margin-right: 750px;
    margin-top: 50px;
    border-style: dashed;
    border-width: thin;
  }
  .clickbox {
    border-style: solid;
    max-width: 500px;
    min-height: 100px;
    text-align: center;
    margin-top: 50px;
    padding: 10px;
    font-weight: bold;
    background-color: var(--main-accent-color);
  }
  .site-title {
    margin-top: 50px;
  }
  .unstyled-link {
    text-decoration: none;
    color: var(--main-text-color);
  }
  .temporary-style {
    margin-top: 100px;
  }
  input[type=text], select {
    max-width: 25%;
    padding: 5px;
    margin: 10px;
    margin-top: 5px;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
  input[type=number] {
    margin: 10px;
  }
  label {
    margin: 5px;
    margin-bottom: 0px;
    margin-top: 20px;
  }
</style>
