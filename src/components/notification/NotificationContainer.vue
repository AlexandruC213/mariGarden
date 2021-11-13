<template>
  <transition-group name="fade-list" tag="div" class="notification-container">
    <Notification
      v-for="notification in notifications"
      :key="notification.id"
      :notification="notification"
    />
  </transition-group>
</template>

<script>
import Notification from "@/components/notification/Notification.vue";
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

/* Transitions */

.fade-list-enter,
.fade-list-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}

.fade-list-enter-active,
.fade-list-leave-active {
  transition: all 0.3s ease-in;
}
</style>
