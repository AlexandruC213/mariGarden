<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <textarea
      :value="value"
      @input="updateValue"
      v-bind="$attrs"
      v-on="listeners"
    />
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formFieldMixin.js";

export default {
  mixins: [formFieldMixin],
  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: this.updateValue,
      };
    },
  },
};
</script>

<style scoped>
textarea {
  font-size: 1rem;
  padding: 3px 5px;
  outline: none;
  resize: none;
}
</style>
