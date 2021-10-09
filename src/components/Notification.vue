<template>
  <div class="notification" :class="notificationType">
    <p>
      {{ notification.message }}
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  props: {
    notification: Object,
  },
  data() {
    return {
      timeout: null,
    };
  },
  computed: {
    notificationType() {
      return `-text-${this.notification.type}`;
    },
  },
  methods: mapActions("notification", ["deleteNotification"]),
  mounted() {
    this.timeout = setTimeout(
      () => this.deleteNotification(this.notification),
      5000
    );
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped>
.notification {
  margin: 16px 0 16px;
}

.-text-error {
  color: red;
}

.-text-success {
  color: var(--green);
}
</style>
