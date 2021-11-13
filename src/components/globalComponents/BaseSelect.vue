<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <select
      :value="value"
      @change="updateValue"
      v-bind="$attrs"
      v-on="$listeners"
    >
      <option v-for="option in options" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
import { formFieldMixin } from "@/mixins/formFieldMixin.js";

export default {
  mixins: [formFieldMixin],
  props: {
    options: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>
select {
  height: 30px;
  outline: none;
  font-size: 1.1rem;
}

option {
  font-size: 1.1rem;
  text-align: center;
}
</style>
