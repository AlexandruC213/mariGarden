<template>
  <div class="notification-container">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </div>
</template>

<script>
import Notification from "@/components/Notification.vue";
import { mapState } from "vuex";

export default {
  components: {
    Notification,
  },
  computed: {
    ...mapState("notification", ["notifications"]),
  },
};
</script>

<style scoped>
.notification-container {
  width: 40%;
  position: fixed;
  top: 65px;
  left: 30%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 1;
}
</style>
