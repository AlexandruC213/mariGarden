<template>
  <div id="app">
    <div id="nav">
      <Header />
    </div>
    <router-view :key="$route.fullPath" />
    <NotificationContainer />
    <Footer class="footer" />
  </div>
</template>

<script>
import Header from "@/components/header&footer/Header.vue";
import Footer from "@/components/header&footer/Footer.vue";
import NotificationContainer from "@/components/notification/NotificationContainer.vue";

export default {
  components: {
    Header,
    Footer,
    NotificationContainer,
  },
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400&display=swap");

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Roboto", sans-serif;
}

:root {
  --green: #2e7d32;
  --white: #fff;
  --black: #000;
  --orange: #ffc107;
  --gray: #757575;
}

#app {
  position: relative;
  min-height: 100vh;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 150px;
}

.notFound-container {
  width: 100%;
  height: 12vh;
  margin-top: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.notFound-container a {
  text-decoration: none;
  color: var(--green);
}

/*** TRANSITIONS ***/

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease-out;
}

.slide-fade-enter {
  transform: translateX(10px);
  opacity: 0;
}
</style>
