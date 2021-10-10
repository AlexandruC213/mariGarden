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
      2500
    );
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  },
};
</script>

<style scoped>
.notification {
  margin: 10px 0;
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--white);
  font-size: 1rem;
}

.-text-error {
  color: red;
  padding: 10px 15px;
  border: 2px solid red;
}

.-text-success {
  color: var(--green);
  padding: 10px 15px;
  border: 2px solid var(--green);
}
</style>
