<template>
  <div class="footer-container">
    <div class="icons">
      <SocialIcon><i class="fab fa-facebook-f"></i></SocialIcon>
      <SocialIcon><i class="fab fa-twitter"></i></SocialIcon>
      <SocialIcon><i class="fab fa-linkedin"></i></SocialIcon>
      <SocialIcon><i class="fab fa-instagram"></i></SocialIcon>
    </div>
    <div class="details"></div>
    <div class="credits">
      <p>2022 - Mari Garden</p>
    </div>
  </div>
</template>

<script>
import SocialIcon from "@/components/header&footer/SocialIcon.vue";

export default {
  components: {
    SocialIcon,
  },
};
</script>

<style scoped>
.footer-container {
  color: var(--white);
  background-color: var(--green);

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-container .details,
.footer-container .credits {
  height: 33.33%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.footer-container .icons {
  width: 15%;
  height: 33.33%;

  display: flex;
  justify-content: space-evenly;
  align-items: center;
}
</style>
