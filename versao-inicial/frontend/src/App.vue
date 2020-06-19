<template>
  <div id="app" :class="{'hide-menu':!isMenuVisible}">
    <Header title="Coder - Base de Conhecimento" :hideToggle="false" :hideUserDropdown="false" />
    <Menu />
    <Content />
    <Footer />
  </div>
</template>

<script>
import { mapState } from "vuex";
import Header from "@/components/templates/Header";
import Menu from "@/components/templates/Menu";
import Content from "@/components/templates/Content";
import Footer from "@/components/templates/Footer";
export default {
  name: "App",
  components: { Header, Menu, Content, Footer },
  computed: mapState(["isMenuVisible"])
};
</script>

<style>
* {
  font-family: "Lato", sans-serif;
}

body {
  margin: 0;
}

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  transition: all 0.2s ease-in;
  height: 100vh;
  display: grid;
  grid-template-rows: 60px 1fr 40px;
  grid-template-columns: 300px 1fr;
  grid-template-areas:
    "header header"
    "menu content"
    "menu footer";
}

#app.hide-menu {
  transition: all 0.2s ease-in;
  grid-template-areas:
    "header header"
    "content content"
    "footer footer";
}
</style>