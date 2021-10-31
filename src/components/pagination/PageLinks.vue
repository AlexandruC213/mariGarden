<template>
  <router-link :to="{ name: 'home', query: { page: this.page } }" class="link"
    ><slot></slot
  ></router-link>
</template>

<script>
export default {
  props: {
    page: Number,
  },
};
</script>

<style scoped>
.link {
  text-decoration: none;
  color: var(--black);
  background-color: var(--white);

  display: flex;
  justify-content: center;
  align-items: center;
}

.link:hover {
  background-color: rgba(0, 0, 0, 0.15);
}
</style>
