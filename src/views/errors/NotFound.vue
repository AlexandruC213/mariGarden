<template>
  <div class="notFound-container">
    <h1>Error</h1>
    <h3>The {{ resource }} you're looking for is not found!</h3>
    <router-link :to="{ name: 'home' }">Go back to Home</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
};
</script>
